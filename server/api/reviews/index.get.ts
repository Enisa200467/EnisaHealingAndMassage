export default defineEventHandler(async (event) => {
  const supabase = useSupabaseServiceRole();
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 6;
  const offset = (page - 1) * limit;

  try {
    // Get total count
    const { count } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    // Get paginated reviews
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('id, name, treatment, rating, review, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }

    return {
      data: {
        reviews: reviews || [],
        total: count || 0,
        page,
        limit,
        hasMore: (count || 0) > offset + limit,
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Fout bij ophalen van reviews',
    });
  }
});
