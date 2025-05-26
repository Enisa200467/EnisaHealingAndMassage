import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const query = getQuery(event);

  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const status = query.status as
    | 'pending'
    | 'approved'
    | 'rejected'
    | undefined;
  const offset = (page - 1) * limit;

  try {
    let queryBuilder = client.from('reviews').select('*', { count: 'exact' });

    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      queryBuilder = queryBuilder.eq('status', status);
    }

    const { count } = await queryBuilder;

    // Get paginated reviews
    let dataQuery = client
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      dataQuery = dataQuery.eq('status', status);
    }

    const { data: reviews, error } = await dataQuery;

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
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Fout bij ophalen van reviews',
    });
  }
});
