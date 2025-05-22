-- Habilitar a extensão pgcrypto se ainda não estiver habilitada (para gen_random_uuid())
-- Na maioria dos projetos Supabase, já está habilitada.
-- CREATE EXTENSION IF NOT EXISTS pgcrypto; -- Para Supabase, uuid_generate_v4() é da extensão uuid-ossp, geralmente ativa.

-- Tabela para visualizações de vídeo
CREATE TABLE IF NOT EXISTS public.video_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- uuid_generate_v4() é mais comum no Supabase
    video_identifier TEXT NOT NULL UNIQUE, -- Adicionado NOT NULL
    view_count BIGINT DEFAULT 0, -- BIGINT (int8) é bom para contagens grandes
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ -- Será atualizado pela função
);

COMMENT ON TABLE public.video_views IS 'Armazena a contagem total de visualizações para cada vídeo identificado.';
COMMENT ON COLUMN public.video_views.video_identifier IS 'Identificador único para o vídeo (ex: "main_viral_video").';

-- Função para incrementar a contagem de visualizações de vídeo
CREATE OR REPLACE FUNCTION public.increment_video_view_count(p_video_identifier TEXT)
RETURNS BIGINT -- Retorna a nova contagem
LANGUAGE plpgsql
AS $$
DECLARE
  new_view_count BIGINT;
BEGIN
  INSERT INTO public.video_views (video_identifier, view_count, updated_at)
  VALUES (p_video_identifier, 1, NOW())
  ON CONFLICT (video_identifier) DO UPDATE
    SET view_count = public.video_views.view_count + 1,
        updated_at = NOW()
  RETURNING public.video_views.view_count INTO new_view_count;

  RETURN new_view_count;
END;
$$;
COMMENT ON FUNCTION public.increment_video_view_count(TEXT) IS 'Incrementa atomicamente a contagem de visualizações para um vídeo específico ou cria o registo se não existir.';

-- Tabela para definir as opções de interação disponíveis
CREATE TABLE IF NOT EXISTS public.interaction_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    option_name TEXT NOT NULL UNIQUE,
    option_type TEXT NOT NULL, -- Usado para agrupar opções para estatísticas
    option_redirect_url TEXT,  -- URL para onde o utilizador é redirecionado (para links de doação)
    display_label TEXT NOT NULL,
    display_order INT DEFAULT 0 NOT NULL, -- Ordem de exibição no frontend
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.interaction_options IS 'Define as opções de interação (botões, links) que os utilizadores podem clicar.';
COMMENT ON COLUMN public.interaction_options.option_name IS 'Identificador único da opção, usado pelo frontend (ex: "3_euros", "donate_revolut_link").';
COMMENT ON COLUMN public.interaction_options.option_type IS 'Categoriza a opção (ex: "donation_amount_choice", "donation_final_step_choice").';
COMMENT ON COLUMN public.interaction_options.option_redirect_url IS 'URL de destino se esta opção for um link externo.';
COMMENT ON COLUMN public.interaction_options.display_label IS 'Texto exibido ao utilizador para esta opção (ex: "3€ 🙏").';
COMMENT ON COLUMN public.interaction_options.display_order IS 'Define a ordem em que as opções de um mesmo tipo são exibidas.';

-- Habilitar Row Level Security para interaction_options
ALTER TABLE public.interaction_options ENABLE ROW LEVEL SECURITY;

-- Política RLS: Permitir leitura pública de todas as opções
CREATE POLICY "Allow public read access to interaction options"
ON public.interaction_options
FOR SELECT
TO anon, authenticated -- Permite que chaves anon e utilizadores autenticados leiam
USING (true);


-- Tabela para registar cada clique individual do utilizador numa opção
CREATE TABLE IF NOT EXISTS public.user_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    option_id UUID NOT NULL REFERENCES public.interaction_options(id) ON DELETE CASCADE,
    user_country TEXT, -- Código ISO de 2 letras do país (ex: "PT", "US"), pode ser NULL
    -- session_id TEXT,   -- Opcional, para rastrear funis de utilizador anónimo
    clicked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.user_interactions IS 'Regista cada clique individual de um utilizador numa opção de interação.';
COMMENT ON COLUMN public.user_interactions.option_id IS 'Referência à opção clicada na tabela interaction_options.';
COMMENT ON COLUMN public.user_interactions.user_country IS 'Código ISO de 2 letras do país do utilizador (ex: "PT", "US"), obtido via header cf-ipcountry.';
-- COMMENT ON COLUMN public.user_interactions.session_id IS 'Identificador de sessão opcional para agrupar interações e rastrear funis.';

-- Índices para otimizar queries
CREATE INDEX IF NOT EXISTS idx_user_interactions_option_id ON public.user_interactions(option_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_country ON public.user_interactions(user_country);
CREATE INDEX IF NOT EXISTS idx_user_interactions_clicked_at ON public.user_interactions(clicked_at);

-- Habilitar Row Level Security para user_interactions
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

-- Nenhuma política de INSERT/SELECT explícita para 'anon' ou 'authenticated' em user_interactions.
-- A Edge Function usará a SERVICE_ROLE_KEY (que ignora RLS) para inserções.
-- As estatísticas serão lidas através de funções RPC que podem operar com permissões elevadas ou com políticas específicas.


-- Função para obter estatísticas de interação por tipo de opção, ordenadas
CREATE OR REPLACE FUNCTION public.get_interaction_stats_by_type(p_option_type TEXT)
RETURNS TABLE (
  option_name TEXT,
  display_label TEXT,
  click_count BIGINT,
  percentage NUMERIC,
  display_order INT -- Para manter a ordem no resultado
)
LANGUAGE sql
STABLE -- Indica que a função não modifica a base de dados e retorna o mesmo resultado para os mesmos argumentos dentro de uma transação.
AS $$
WITH type_options AS (
  SELECT io.id, io.option_name, io.display_label, io.display_order
  FROM public.interaction_options io
  WHERE io.option_type = p_option_type
),
clicks_for_type AS (
  SELECT
    to_opt.option_name,
    to_opt.display_label,
    to_opt.display_order,
    COUNT(ui.id) AS num_clicks
  FROM type_options to_opt
  LEFT JOIN public.user_interactions ui ON ui.option_id = to_opt.id
  GROUP BY to_opt.option_name, to_opt.display_label, to_opt.display_order
),
total_clicks_for_type AS (
  SELECT SUM(cft.num_clicks) AS total_count
  FROM clicks_for_type cft
  WHERE cft.num_clicks > 0 -- Considerar apenas opções que tiveram cliques para o total
)
SELECT
  cft.option_name,
  cft.display_label,
  cft.num_clicks AS click_count,
  COALESCE(
    ROUND((cft.num_clicks::NUMERIC * 100.0 / NULLIF((SELECT total_count FROM total_clicks_for_type), 0)::NUMERIC), 1),
    0.0 -- Se total_count for 0 ou NULL, a percentagem é 0
  ) AS percentage,
  cft.display_order
FROM clicks_for_type cft
ORDER BY cft.display_order ASC, cft.option_name ASC;
$$;
COMMENT ON FUNCTION public.get_interaction_stats_by_type(TEXT) IS 'Retorna a contagem de cliques e a percentagem para cada opção de um determinado tipo, ordenado por display_order.';


-- Dados iniciais para povoar a tabela interaction_options (EXEMPLO)
-- Adapte os option_name, option_type, display_label, display_order e option_redirect_url.
-- Os option_name DEVEM corresponder aos usados no seu componente React HelpInteraction.jsx.

-- Remover dados existentes para evitar conflitos de UNIQUE constraint se o script for corrido múltiplas vezes
-- DELETE FROM public.interaction_options WHERE option_name IN (
--     '3_euros', '7_euros', '15_euros', 'sorry_option',
--     'donate_revolut_link', 'buy_beer_link', 'buy_screenprotector_link'
-- );

INSERT INTO public.interaction_options
    (option_name, option_type, display_label, display_order, option_redirect_url)
VALUES
    ('3_euros', 'donation_amount_choice', '3€ 🙏', 10, NULL),
    ('7_euros', 'donation_amount_choice', '7€ 💪', 20, NULL),
    ('15_euros', 'donation_amount_choice', '15€ 🚀', 30, NULL),
    ('sorry_option', 'donation_amount_choice', 'Não posso agora 😔', 40, NULL),

    ('donate_revolut_link', 'donation_final_step_choice', 'Doar (Revolut/Outros)', 10, 'https://LINK_PARA_SUA_PAGINA_DOACAO_GERAL'),
    ('buy_beer_link', 'donation_final_step_choice', 'Paga-me um Fino!', 20, 'https://revolut.me/SEU_USER_REVOLUT_PARA_FINO'),
    ('buy_screenprotector_link', 'donation_final_step_choice', 'Protetor de Ecrã Novo!', 30, 'https://revolut.me/SEU_USER_REVOLUT_PARA_PROTETOR')
ON CONFLICT (option_name) DO UPDATE SET -- Para idempotência, atualiza se já existir
    option_type = EXCLUDED.option_type,
    display_label = EXCLUDED.display_label,
    display_order = EXCLUDED.display_order,
    option_redirect_url = EXCLUDED.option_redirect_url;

-- (Opcional) Habilitar Realtime para a tabela video_views se quiser subscrições diretas
-- ALTER TABLE public.video_views REPLICA IDENTITY FULL;
-- (Depois, no Supabase Studio, em Database -> Replication, adicionar `video_views` à publicação `supabase_realtime`)
-- O mesmo para `interaction_options` ou estatísticas agregadas, se necessário.

SELECT 'Initial migration script completed successfully.' AS status;