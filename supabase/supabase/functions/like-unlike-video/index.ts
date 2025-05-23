// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { video_identifier, anonymous_session_id, action } = await req.json()

  if (!video_identifier || !anonymous_session_id || !['like', 'unlike'].includes(action)) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  let result

  if (action === 'like') {
    result = await supabase
      .from('video_likes')
      .upsert({ video_identifier, anonymous_session_id }, { onConflict: 'video_identifier,anonymous_session_id' })
  } else {
    result = await supabase
      .from('video_likes')
      .delete()
      .eq('video_identifier', video_identifier)
      .eq('anonymous_session_id', anonymous_session_id)
  }

  if (result.error) {
    return new Response(JSON.stringify({ error: result.error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  })
})
