import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);

  const reviewId = getRouterParam(event, 'id');

  if (event.method === 'PATCH') {
    try {
      const body = await readBody(event);
      const { status, reviewed_by, reviewed_at } = body;

      if (!['approved', 'rejected'].includes(status)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Ongeldige status',
        });
      }

      const { error } = await client
        .from('reviews')
        .update({
          status,
          reviewed_by,
          reviewed_at,
        })
        .eq('id', reviewId!);

      if (error) {
        throw createError({
          statusCode: 500,
          statusMessage: error.message,
        });
      }

      return { success: true, message: 'Review status bijgewerkt' };
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'statusCode' in error) {
        throw error;
      }
      throw createError({
        statusCode: 500,
        statusMessage: 'Fout bij bijwerken van review',
      });
    }
  }

  if (event.method === 'DELETE') {
    try {
      const { error } = await client
        .from('reviews')
        .delete()
        .eq('id', reviewId!);

      if (error) {
        throw createError({
          statusCode: 500,
          statusMessage: error.message,
        });
      }

      return { success: true, message: 'Review verwijderd' };
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'statusCode' in error) {
        throw error;
      }
      throw createError({
        statusCode: 500,
        statusMessage: 'Fout bij verwijderen van review',
      });
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed',
  });
});
