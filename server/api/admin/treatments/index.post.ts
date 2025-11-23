import { z } from 'zod';
import { serverSupabaseServiceRole } from '#supabase/server';

const createTreatmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  duration_minutes: z.number().min(1),
  price_cents: z.number().min(0),
  discount_enabled: z.boolean().optional(),
  discount_price_cents: z.number().min(0).optional(),
  icon: z.string().optional(),
  display_order: z.number().optional(),
});

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);

  try {
    const body = await readBody(event);
    const validatedData = createTreatmentSchema.parse(body);

    // Generate slug if not provided
    if (!validatedData.slug) {
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
      .insert([validatedData])
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
      message: 'Treatment created successfully',
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
      statusMessage: 'Failed to create treatment',
    });
  }
});
