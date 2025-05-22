// supabase/functions/record-and-get-interaction-stats/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts' // Certifique-se que este ficheiro existe e está correto

console.log('Function "record-and-get-interaction-stats" up and running!')

Deno.serve(async (req: Request) => {
  // Lidar com preflight requests para CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    const {
      clicked_option_name, // O nome da opção que foi clicada (para registar)
      stats_for_option_type, // O tipo de opção para o qual queremos as estatísticas
      // session_id // Opcional, se quiser rastrear funis
    } = payload

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Obter o país do utilizador a partir dos headers (Cloudflare específico)
    // Documentação: https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties
    const country = req.headers.get('cf-ipcountry')?.toUpperCase() || null;


    // 1. Registar o clique, se `clicked_option_name` for fornecido
    if (clicked_option_name) {
      // Primeiro, obter o option_id a partir do option_name
      const { data: optionData, error: optionError } = await supabaseClient
        .from('interaction_options')
        .select('id')
        .eq('option_name', clicked_option_name)
        .single()

      if (optionError || !optionData) {
        console.error('Error finding option_id or option not found:', clicked_option_name, optionError)
        // Pode decidir não lançar um erro aqui e apenas não registar, ou retornar um erro parcial
        // dependendo da sua lógica de frontend. Por agora, vamos logar e continuar para as estatísticas.
      } else {
        const { error: insertError } = await supabaseClient
          .from('user_interactions')
          .insert({
            option_id: optionData.id,
            user_country: country,
            // session_id: session_id // Se estiver a usar
          })

        if (insertError) {
          console.error('Error inserting user interaction:', insertError)
          // Novamente, pode decidir como lidar com este erro
        } else {
          console.log(`Interaction recorded for ${clicked_option_name} from country ${country}`);
        }
      }
    }

    // 2. Calcular e retornar estatísticas para `stats_for_option_type`, se fornecido
    let statsResponse: { percentages: Array<any>, by_country?: any } = { percentages: [] };

    if (stats_for_option_type) {
      // Usar uma função RPC para agregação eficiente
      const { data: rpcData, error: rpcError } = await supabaseClient.rpc('get_interaction_stats_by_type', {
        p_option_type: stats_for_option_type,
      });

      if (rpcError) {
        console.error('RPC Error for get_interaction_stats_by_type:', rpcError);
        // Não quebra a função, apenas não teremos estatísticas
      } else if (rpcData) {
        statsResponse.percentages = rpcData;
      }

      // Opcional: Adicionar estatísticas por país se precisar
      // const { data: countryData, error: countryRpcError } = await supabaseClient.rpc('get_interaction_stats_by_country', {
      //   p_option_type: stats_for_option_type,
      // });
      // if (!countryRpcError && countryData) {
      //   statsResponse.by_country = countryData;
      // }
    }


    return new Response(JSON.stringify({ success: true, ...statsResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Catch Error in record-and-get-interaction-stats:', error)
    return new Response(JSON.stringify({ error: error || 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})