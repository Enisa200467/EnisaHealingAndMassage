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
    .select(
      'id, name, slug, duration_minutes, price_cents, discount_enabled, discount_price_cents, icon, display_order, is_active, created_at, updated_at, treatment_trajects(*)',
    )
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
