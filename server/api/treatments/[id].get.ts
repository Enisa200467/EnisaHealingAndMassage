import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);

  const id = getRouterParam(event, 'id');

  if (!id) {
    return null;
  }

  // Fetch treatment data from the database
  const { data: treatment, error } = await client
    .from('treatments')
    .select('*, treatment_trajects(*)')
    .eq('is_active', true)
    .eq('id', id)
    .single();

  if (error || !treatment) {
    return null;
  }

  return {
    ...treatment,
    trajects: treatment.treatment_trajects || [],
  };
});
