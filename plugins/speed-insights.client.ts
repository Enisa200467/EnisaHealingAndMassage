import { injectSpeedInsights } from '@vercel/speed-insights';

export default defineNuxtPlugin(() => {
  // Only inject Speed Insights in production
  if (process.env.NODE_ENV === 'production') {
    injectSpeedInsights();
  }
});
