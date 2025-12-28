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
    url: "https://vimeo.com/548770484",
    title: "Een Kijkje in de Praktijk",
  },
  {
    url: "https://www.youtube.com/embed/Xu3gja5_psg?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.enisahealingenmassage.nl&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1&amp;forigin=https%3A%2F%2Fwww.enisahealingenmassage.nl%2F&amp;aoriginsup=0&amp;vf=4",
    title: "Welkom bij Enisa Healing & Massage",
  },
  {
    url: "https://www.youtube.com/embed/0LjLD3fE1b4?autoplay=0&mute=0&controls=1&loop=0&origin=https%3A%2F%2Fwww.enisahealingenmassage.nl&playsinline=1&enablejsapi=1&widgetid=3&forigin=https%3A%2F%2Fwww.enisahealingenmassage.nl%2F&aoriginsup=0&vf=3",

    title: "Ontdek de Kracht van Holistische Behandelingen",
  },
];

/**
 * About page specific videos
 * Focus on Enisa's story and approach
 */
const ABOUT_VIDEOS: VideoData[] = [
  {
    url: "https://www.youtube.com/embed/Xu3gja5_psg?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.enisahealingenmassage.nl&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1&amp;forigin=https%3A%2F%2Fwww.enisahealingenmassage.nl%2F&amp;aoriginsup=0&amp;vf=4",
    title: "Welkom bij Enisa Healing & Massage",
  },
  {
    url: "https://www.youtube.com/embed/0LjLD3fE1b4?autoplay=0&mute=0&controls=1&loop=0&origin=https%3A%2F%2Fwww.enisahealingenmassage.nl&playsinline=1&enablejsapi=1&widgetid=3&forigin=https%3A%2F%2Fwww.enisahealingenmassage.nl%2F&aoriginsup=0&vf=3",

    title: "Ontdek de Kracht van Holistische Behandelingen",
  },
];

export const useVideos = () => {
  return {
    promotionalVideos: PROMOTIONAL_VIDEOS,
    aboutVideos: ABOUT_VIDEOS,
  };
};
