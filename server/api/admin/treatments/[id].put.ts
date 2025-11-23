import { z } from 'zod';
import { serverSupabaseServiceRole } from '#supabase/server';

const updateTreatmentSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  duration_minutes: z.number().min(1).optional(),
  price_cents: z.number().min(0).optional(),
  icon: z.string().optional(),
  display_order: z.number().optional(),
  is_active: z.boolean().optional(),
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
    const validatedData = updateTreatmentSchema.parse(body);

    // If name is being updated, regenerate slug
    if (validatedData.name && !validatedData.slug) {
      validatedData.slug = validatedData.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
    }

    const { data: treatment, error } = await client
      .from('treatments')
      .update(validatedData)
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
      message: 'Treatment updated successfully',
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
      statusMessage: 'Failed to update treatment',
    });
  }
});
