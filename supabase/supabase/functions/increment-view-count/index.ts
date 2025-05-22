// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log('Function "increment-view-count" up and running!')

Deno.serve(async (req) => {
  // Lidar com preflight requests para CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { video_identifier } = await req.json()

    if (!video_identifier) {
      return new Response(JSON.stringify({ error: 'video_identifier is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Criar cliente Supabase DENTRO da função com a SERVICE_ROLE_KEY
    // As variáveis de ambiente são configuradas no dashboard do Supabase ou via `supabase secrets set`
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // IMPORTANTE: Usar a service_role key aqui
    )

    // Usar uma função RPC no PostgreSQL é a forma mais robusta e atómica
    // Vamos criar esta função SQL no passo seguinte
    const { data, error: rpcError } = await supabaseClient.rpc('increment_video_view_count', {
      p_video_identifier: video_identifier,
    })

    if (rpcError) {
      console.error('RPC Error:', rpcError)
      throw rpcError
    }

    // Opcional: devolver a nova contagem, embora o frontend já o faça via real-time
    // A função RPC pode ser modificada para retornar a nova contagem
    return new Response(JSON.stringify({ success: true, message: 'View count incremented', data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Catch Error:', error)
    return new Response(JSON.stringify({ error: error }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/increment-view-count' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
