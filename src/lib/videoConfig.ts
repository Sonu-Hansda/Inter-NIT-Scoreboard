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
    { label: 'Football Ground 1', url: 'https://www.youtube.com/embed/AGBY6b3z7h4?si=4KUMCma6-guchQGN' },
    { label: 'Football Ground 4', url: 'https://www.youtube.com/embed/_p2Sui8CoV4?si=2E3bAwvPvp-cC4mk' },
  ],
  tableTennisBoys: [
    { label: 'Table Tennis Live', url: 'https://www.youtube.com/embed/sAPxdldoYLg?si=2uPkcAnsaHCx_eJo' },
    // { label: 'View 2', url: 'https://www.youtube.com/embed/VIDEO_ID_TT_BOYS_2' },
  ],
  tableTennisGirls: [
    { label: 'Table Tennis Live', url: 'https://www.youtube.com/embed/sAPxdldoYLg?si=2uPkcAnsaHCx_eJo' },
    // { label: 'View 2', url: 'https://www.youtube.com/embed/VIDEO_ID_TT_GIRLS_2' },
  ],
  futsal: [
    { label: 'Footbal Ground 2', url: 'https://www.youtube.com/embed/NpdMipd_ums?si=SWiqSxmde-LF7yAL' },
    // { label: 'View 1', url: 'https://www.youtube.com/embed/VIDEO_ID_FUTSAL_1' },
    // { label: 'View 2', url: 'https://www.youtube.com/embed/VIDEO_ID_FUTSAL_2' },
  ],
};
