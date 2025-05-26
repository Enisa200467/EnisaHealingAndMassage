import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);

  try {
    const { data, error } = await client
      .from('review_stats')
      .select('*')
      .single();

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }

    return {
      data: {
        total: data.total || 0,
        approved: data.approved || 0,
        pending: data.pending || 0,
        rejected: data.rejected || 0,
        averageRating: parseFloat(data.average_rating) || 0,
      },
    };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Fout bij ophalen van statistieken',
    });
  }
});
