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
    { label: 'Football Ground 1', url: 'https://www.youtube.com/embed/zIdWatipF0A?si=vX-MM8njuGuK9vf5' },
    { label: 'Football Ground 4', url: 'https://www.youtube.com/embed/MxisEf0Ujew?si=pdzHEy8Dw-6XmzWN' },
  ],
  tableTennisBoys: [
    { label: 'Table Tennis Live', url: 'https://www.youtube.com/embed/eUcDm38B1Xw?si=l_E6PEHch0BEy1yk' },
  ],
  tableTennisGirls: [
    { label: 'Table Tennis Live', url: 'https://www.youtube.com/embed/eUcDm38B1Xw?si=l_E6PEHch0BEy1yk' },
  ],
  futsal: [
    { label: 'Footbal Ground 2', url: 'https://www.youtube.com/embed/jwL3qufOLA0?si=mtiWU5vPKV4HzCEF' },
  ],
};
