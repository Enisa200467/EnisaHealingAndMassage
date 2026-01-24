import { z } from 'zod';
import { serverSupabaseServiceRole } from '#supabase/server';

const trajectSchema = z.object({
  id: z.string().uuid().optional(),
  treatment_id: z.string().uuid(),
  sessions: z.number().min(1),
  price_cents: z.number().min(0),
  is_active: z.boolean().optional(),
});

const updateSchema = z.object({
  trajects: z.array(trajectSchema),
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
    const { trajects } = updateSchema.parse(body);

    const payload = trajects.map((traject) => ({
      ...traject,
      treatment_id: treatmentId,
    }));

    const { error: deleteError } = await client
      .from('treatment_trajects')
      .delete()
      .eq('treatment_id', treatmentId);

    if (deleteError) {
      throw createError({
        statusCode: 400,
        statusMessage: deleteError.message,
      });
    }

    if (payload.length > 0) {
      const { error } = await client.from('treatment_trajects').insert(payload);
      if (error) {
        throw createError({
          statusCode: 400,
          statusMessage: error.message,
        });
      }
    }

    const { data, error: fetchError } = await client
      .from('treatment_trajects')
      .select('*')
      .eq('treatment_id', treatmentId)
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw createError({
        statusCode: 400,
        statusMessage: fetchError.message,
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
      statusMessage: 'Failed to update treatment trajects',
    });
  }
});
