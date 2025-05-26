import { z } from 'zod';
import { serverSupabaseServiceRole } from '#supabase/server';

const reviewSubmissionSchema = z.object({
  name: z.string().min(2, 'Naam moet minimaal 2 karakters lang zijn'),
  email: z.string().email('Voer een geldig e-mailadres in'),
  treatment: z.string().optional(),
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(1000),
});

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);

  if (event.method === 'POST') {
    try {
      const body = await readBody(event);
      const validatedData = reviewSubmissionSchema.parse(body);

      const { error } = await supabase.from('reviews').insert({
        ...validatedData,
        status: 'pending',
      });

      if (error) {
        throw createError({
          statusCode: 400,
          statusMessage: error.message,
        });
      }

      return {
        success: true,
        message: 'Review succesvol ingediend voor beoordeling',
      };
    } catch (error: any) {
      if (error.issues) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Validatiefout',
          data: { errors: error.issues },
        });
      }
      throw error;
    }
  }

  if (getMethod(event) === 'GET') {
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
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed',
  });
});
