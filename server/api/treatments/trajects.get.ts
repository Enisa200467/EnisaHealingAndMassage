import { z } from 'zod';
import { serverSupabaseServiceRole } from '#supabase/server';

const querySchema = z.object({
  ids: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);

  try {
    const { ids } = querySchema.parse(getQuery(event));

    if (!ids) {
      return { data: [] };
    }

    const trajectIds = ids
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);

    if (trajectIds.length === 0) {
      return { data: [] };
    }

    console.log('[trajects.get] ids', trajectIds);

    const { data, error } = await client
      .from('treatment_trajects')
      .select('*')
      .in('id', trajectIds)
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    console.log('[trajects.get] supabase error', error);
    console.log('[trajects.get] supabase data', data);

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }

    return {
      data: data || [],
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
      statusMessage: 'Failed to fetch trajects',
    });
  }
});
