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
    const { video_identifier, viewer_session_id, country_code } = await req.json()

    if (!video_identifier) {
      return new Response(JSON.stringify({ error: 'video_identifier is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }
    // viewer_session_id is also crucial for the new table
    if (!viewer_session_id) {
        return new Response(JSON.stringify({ error: 'viewer_session_id is required' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        })
    }
    // country_code is optional, but if provided, should be 2 chars
    if (country_code && country_code.length !== 2) {
        return new Response(JSON.stringify({ error: 'country_code must be a 2-character string' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        })
    }

    // --- Get country code from request headers ---
    const countryCodeFromHeader = req.headers.get('x-country-code')?.toUpperCase(); // Standard header, make uppercase for consistency
    // For local testing, this header might not be present.
    // You might want a fallback or to allow it to be null if not found.
    console.log(`Detected country code from header: ${countryCodeFromHeader}`);

    // Criar cliente Supabase DENTRO da função com a SERVICE_ROLE_KEY
    // As variáveis de ambiente são configuradas no dashboard do Supabase ou via `supabase secrets set`
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // IMPORTANTE: Usar a service_role key aqui
    )

    // 1. Insert into individual_video_views
    const { error: insertError } = await supabaseClient
      .from('individual_video_views')
      .insert({
        video_identifier: video_identifier,
        viewer_session_id: viewer_session_id, // Make sure client sends this as UUID
        country_code: countryCodeFromHeader || country_code || null, // Allow null if not provided
      })

    if (insertError) {
      console.error('Error inserting individual view:', insertError)
      // Depending on requirements, you might still want to increment the total count
      // or return an error immediately. For now, let's return an error.
      return new Response(JSON.stringify({ error: 'Failed to record individual view', details: insertError.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }
    console.log('Individual view recorded successfully.');

    // 2. Increment total view count using RPC (assuming this function still exists and is desired)
    // Usar uma função RPC no PostgreSQL é a forma mais robusta e atómica
    // Vamos criar esta função SQL no passo seguinte
    const { data: rpcData, error: rpcError } = await supabaseClient.rpc('increment_video_view_count', {
      p_video_identifier: video_identifier,
    })

    if (rpcError) {
      console.error('RPC Error:', rpcError)
      throw rpcError
    }

    // Opcional: devolver a nova contagem, embora o frontend já o faça via real-time
    // A função RPC pode ser modificada para retornar a nova contagem
    return new Response(JSON.stringify({
      success: true,
      message: 'View recorded and total count incremented',
      new_total_count: rpcData
    }), {
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
