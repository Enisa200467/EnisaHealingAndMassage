import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  try {
    const { data: treatments, error } = await client
      .from("treatments")
      .select("*, treatment_trajects(*)")
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
});
