export interface Publication {
  key: string;
  title: string;
  /** Journal or venue. */
  venue: string;
  /** Publication date, shown in the right-hand meta column. */
  date: string;
  href: string;
  abstract: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    abstract:
      "A streaming pipeline that clusters social posts into emergent events in near real time, trading a small amount of precision for a large drop in detection latency.",
    date: "Aug 2023",
    href: "https://www.ijraset.com/research-paper/real-time-event-detection-in-social-media-streams",
    key: "ijraset-event-detection",
    title: "Real-Time Event Detection in Social Media Streams",
    venue: "IJRASET",
  },
  {
    abstract:
      "Hybrid CNN and classical-ML models for breast cancer detection, benchmarked against single-model baselines, with a survey of the remaining failure modes.",
    date: "Jul 2023",
    href: "https://ijsrem.com/download/a-novel-approaches-of-detecting-breast-cancer-with-hybrid-models-techniques-and-challenges/",
    key: "ijsrem-breast-cancer",
    title: "Detecting Breast Cancer with Hybrid Models",
    venue: "IJSREM",
  },
];
