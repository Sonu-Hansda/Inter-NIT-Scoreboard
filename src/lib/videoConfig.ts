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
    { label: 'Football Ground 1', url: 'https://www.youtube.com/embed/nqgioYWf5tc?si=BjcbPYP_pejX_AEp' },
    { label: 'Football Ground 4', url: 'https://www.youtube.com/embed/58ZG09L81YM?si=Pcytc9cxnpPnyEpa' },
  ],
  tableTennisBoys: [
    { label: 'Table Tennis Live', url: 'https://www.youtube.com/embed/YikUAH1Pwus?si=TcbjCXNyFB5CEtCh' },
  ],
  tableTennisGirls: [
    { label: 'Table Tennis Live', url: 'https://www.youtube.com/embed/YikUAH1Pwus?si=TcbjCXNyFB5CEtCh' },
  ],
  futsal: [
    { label: 'Footbal Ground 2', url: 'https://www.youtube.com/embed/jOW0uiiHqlI?si=hnaqlcC7t5DOv1K_' },
  ],
};
