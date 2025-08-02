/**
 * Client-side plugin to initialize treatment data
 * Ensures treatment data is loaded early in the application lifecycle
 */
export default defineNuxtPlugin(async () => {
  // Initialize the treatments composable to fetch data
  const { fetchTreatments } = useTreatments();

  try {
    await fetchTreatments();
  } catch (err) {
    console.warn('Failed to load treatment data on initialization:', err);
    // Don't block app startup if treatments fail to load
    // The app will fall back to static data
  }
});
