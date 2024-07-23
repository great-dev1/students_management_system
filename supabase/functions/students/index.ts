import * as postgres from 'https://deno.land/x/postgres@v0.17.0/mod.ts'
import { corsHeaders } from '../_shared/cors.ts'

// Get the connection string from the environment variable "SUPABASE_DB_URL"
const databaseURL = Deno.env.get("DATABASE_URL");
console.log(databaseURL)
const defaultPool = new postgres.Pool(databaseURL, 3, true)
// Create a database pool with three connections that are lazily established
export const handler = async (_req: any) => {
  if (_req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    // Grab a connection from the pool
    let connection
    if (_req.pool?.connect) {
      connection = await _req.pool.connect()
    } else {
      connection = await defaultPool.connect()
    }

    try {
      // Run a query
      const result = await connection.queryObject`SELECT * FROM students`
      const students = result.rows
      
      // Encode the result as pretty printed JSON
      const body = JSON.stringify(
        students,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value),
        2
      )

      // Return the response with the correct content type header
      return new Response(body, {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json; charset=utf-8',
        },
        status: 200,
      })
    } finally {
      // Release the connection back into the pool
      connection.release()
    }
  } catch (err) {
    console.error(err)
    return new Response(String(err?.message ?? err), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500 
    })
  }
}
Deno.serve(handler)