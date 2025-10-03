export interface VideoSource {
  label: string;
  url: string;
}

export interface SportVideos {
  football: VideoSource[];
  tableTennisBoys: VideoSource[];
  tableTennisGirls: VideoSource[];
  futsal: VideoSource[];
}

export const VIDEO_CONFIG: SportVideos = {
  football: [
    // { label: 'View 1', url: 'https://www.youtube.com/embed/VIDEO_ID_FOOTBALL_1' },
    // { label: 'View 2', url: 'https://www.youtube.com/embed/VIDEO_ID_FOOTBALL_2' },
  ],
  tableTennisBoys: [
    // { label: 'View 1', url: 'https://www.youtube.com/embed/VIDEO_ID_TT_BOYS_1' },
    // { label: 'View 2', url: 'https://www.youtube.com/embed/VIDEO_ID_TT_BOYS_2' },
  ],
  tableTennisGirls: [
    // { label: 'View 1', url: 'https://www.youtube.com/embed/VIDEO_ID_TT_GIRLS_1' },
    // { label: 'View 2', url: 'https://www.youtube.com/embed/VIDEO_ID_TT_GIRLS_2' },
  ],
  futsal: [
    // { label: 'View 1', url: 'https://www.youtube.com/embed/VIDEO_ID_FUTSAL_1' },
    // { label: 'View 2', url: 'https://www.youtube.com/embed/VIDEO_ID_FUTSAL_2' },
  ],
};
