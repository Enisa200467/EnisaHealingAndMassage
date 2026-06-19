import { serverSupabaseServiceRole } from '#supabase/server';
import { soulKeyTherapyTreatment } from '~~/server/utils/soulKeyTherapyTreatment';

export default defineCachedEventHandler(
  async (event) => {
    try {
      const client = serverSupabaseServiceRole(event);
      const { data: treatments, error } = await client
        .from('treatments')
        .select(
          'id, name, slug, duration_minutes, price_cents, discount_enabled, discount_price_cents, icon, display_order, is_active, created_at, updated_at, treatment_trajects(*)',
        )
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        throw createError({
          statusCode: 500,
          statusMessage: error.message,
        });
      }

      const treatmentsWithSoulKey = [
        ...(treatments || []).filter(
          (treatment) => treatment.slug !== soulKeyTherapyTreatment.slug,
        ),
        soulKeyTherapyTreatment,
      ].sort((a, b) => a.display_order - b.display_order);

      const normalized = treatmentsWithSoulKey.map((treatment) => ({
        ...treatment,
        trajects: treatment.treatment_trajects || [],
      }));

      setHeader(
        event,
        'Cache-Control',
        'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
      );

      return {
        data: normalized,
      };
    } catch (error: unknown) {
      const fallbackData = {
        ...soulKeyTherapyTreatment,
        trajects: soulKeyTherapyTreatment.treatment_trajects,
      };

      if (error && typeof error === 'object' && 'statusCode' in error) {
        return {
          data: [fallbackData],
        };
      }

      return {
        data: [fallbackData],
      };
    }
  },
  {
    maxAge: 600,
    staleMaxAge: 86400,
  },
);
