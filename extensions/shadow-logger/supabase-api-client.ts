export interface SupabaseClient {
  insert<T>(schema: string, table: string, payload: T): Promise<void>;
}

export function createSupabaseApiClient(): SupabaseClient {
  const projectId = process.env.SUPABASE_PROJECT_ID;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!projectId || !key) {
    throw new Error("SUPABASE_PROJECT_ID or SUPABASE_SECRET_KEY not set for Shadow Logger.");
  }

  const baseUrl = `https://${projectId}.supabase.co/rest/v1`;

  return {
    async insert<T>(schema: string, table: string, payload: T): Promise<void> {
      const url = `${baseUrl}/${table}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
          'Content-Profile': schema, // Wichtig für den Zugriff auf das custom schema
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Supabase insert error: ${response.status} ${errorText}`);
      }
    }
  };
}
