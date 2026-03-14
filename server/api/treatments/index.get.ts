import { serverSupabaseServiceRole } from "#supabase/server";

export default defineCachedEventHandler(
  async (event) => {
    const client = serverSupabaseServiceRole(event);
    try {
      const { data: treatments, error } = await client
      .from("treatments")
      .select(
        "id, name, slug, duration_minutes, price_cents, discount_enabled, discount_price_cents, icon, display_order, is_active, created_at, updated_at, treatment_trajects(*)",
      )
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }

    const normalized = (treatments || []).map((treatment) => ({
      ...treatment,
      trajects: treatment.treatment_trajects || [],
    }));

    setHeader(
      event,
      "Cache-Control",
      "public, max-age=0, s-maxage=600, stale-while-revalidate=86400",
    );

    return {
      data: normalized,
    };
  } catch (error: unknown) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch treatments",
    });
  }
  },
  {
    maxAge: 600,
    staleMaxAge: 86400,
  },
);
