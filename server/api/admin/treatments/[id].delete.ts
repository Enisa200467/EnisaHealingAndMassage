import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const treatmentId = getRouterParam(event, 'id');

  if (!treatmentId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Treatment ID is required',
    });
  }

  try {
    const { error } = await client
      .from('treatments')
      .delete()
      .eq('id', treatmentId);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      });
    }

    return {
      message: 'Treatment deleted successfully',
    };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete treatment',
    });
  }
});
