/**
 * Composable for managing video content across the site
 * Provides centralized video URLs and metadata
 */

export interface VideoData {
  url: string;
  title: string;
}

/**
 * Main promotional videos for Enisa Healing & Massage
 * Used in homepage carousel and about page
 */
const PROMOTIONAL_VIDEOS: VideoData[] = [
  {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Welkom bij Enisa Healing & Massage',
  },
  {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Ontdek de Kracht van Holistische Behandelingen',
  },
  {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Een Kijkje in de Praktijk',
  },
];

/**
 * About page specific videos
 * Focus on Enisa's story and approach
 */
const ABOUT_VIDEOS: VideoData[] = [
  {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Mijn Verhaal en Filosofie',
  },
  {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Hoe Ik Werk met Cliënten',
  },
];

export const useVideos = () => {
  return {
    promotionalVideos: PROMOTIONAL_VIDEOS,
    aboutVideos: ABOUT_VIDEOS,
  };
};
