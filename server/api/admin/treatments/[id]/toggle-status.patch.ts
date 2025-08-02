import { z } from 'zod';
import { serverSupabaseServiceRole } from '#supabase/server';

const toggleStatusSchema = z.object({
  is_active: z.boolean(),
});

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
    const body = await readBody(event);
    const { is_active } = toggleStatusSchema.parse(body);

    const { data: treatment, error } = await client
      .from('treatments')
      .update({ is_active })
      .eq('id', treatmentId)
      .select()
      .single();

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      });
    }

    return {
      data: treatment,
      message: `Treatment ${is_active ? 'activated' : 'deactivated'} successfully`,
    };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'issues' in error) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation error',
        data: { errors: error.issues },
      });
    }
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to toggle treatment status',
    });
  }
});
