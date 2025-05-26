export default defineEventHandler(async (event) => {
  const supabase = useSupabaseServiceRole();

  try {
    const { data, error } = await supabase
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
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Fout bij ophalen van statistieken',
    });
  }
});
