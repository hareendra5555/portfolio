import { Icons } from "@/components/icons";
import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";
import type {
  Project,
  ProjectSource,
  ProjectSourceOption,
} from "@/types/projects";

export const HOME_FEATURED_PROJECT_COUNT = 4 as const;

export const PROJECT_SOURCES = [
  {
    image: SITE.AUTHOR.AVATAR,
    label: "Personal",
    value: "personal",
  },
  {
    icon: Icons.paper,
    label: "Research",
    value: "research",
  },
] as const satisfies readonly ProjectSourceOption[];

export const DEFAULT_PROJECT_SOURCE: ProjectSource = "personal";

export const PROJECTS = [
  {
    category: "AI",
    date: {
      month: "March",
      year: 2026,
    },
    description:
      "Q&A over large document collections — LangChain embeddings into pgvector, GPT-4o synthesis, and FastAPI streaming answers over SSE behind Nginx.",
    featured: true,
    links: {
      github: `${LINK.GITHUB}/documind`,
    },
    slug: "documind",
    source: "personal",
    title: "DocuMind",
  },
  {
    category: "Machine Learning",
    date: {
      month: "April",
      year: 2026,
    },
    description:
      "Real-time credit card fraud detection — a PyTorch MLP trained on 1M+ transactions, served through Django REST and deployable to AWS Lambda. F1 0.964, AUC-ROC 0.991, sub-80ms p99.",
    featured: true,
    links: {
      github: `${LINK.GITHUB}/SentinelNet_Fraud_Detection_System`,
    },
    slug: "sentinelnet",
    source: "personal",
    title: "SentinelNet",
  },
  {
    category: "Platform",
    date: {
      month: "March",
      year: 2026,
    },
    description:
      "A distributed job scheduler — Spring Boot over Redis priority sorted sets with SQS persistence, a worker pool with exponential backoff, and a React dashboard on STOMP WebSockets.",
    featured: true,
    links: {
      github: `${LINK.GITHUB}/smartqueue`,
    },
    slug: "smartqueue",
    source: "personal",
    title: "SmartQueue",
  },
  {
    category: "Platform",
    date: {
      month: "April",
      year: 2025,
    },
    description:
      "A campus ride-sharing platform built by a four-person team. I worked on the Go backend — auth, ride matching, and the ratings API.",
    featured: true,
    links: {
      github: "https://github.com/DhanushUF18/SE_GatoRides",
    },
    slug: "gatorides",
    source: "personal",
    title: "GatoRides",
  },
  {
    category: "API",
    date: {
      month: "June",
      year: 2025,
    },
    description:
      "API, dashboard and notifications spanning ASP.NET Core and FastAPI services, a React dashboard, Redis caching, and AWS-backed event-driven delivery.",
    featured: false,
    links: {},
    slug: "task-management-platform",
    source: "personal",
    title: "Task Management Platform",
  },
  {
    category: "Machine Learning",
    date: {
      month: "February",
      year: 2025,
    },
    description:
      "An ML inference pipeline for medical imaging using PyTorch and FastAPI, with versioned datasets and model artifacts stored in AWS S3.",
    featured: false,
    links: {},
    slug: "medical-imaging-prediction",
    source: "personal",
    title: "Medical Imaging Prediction",
  },
  {
    category: "Web",
    date: {
      month: "July",
      year: 2026,
    },
    description:
      "A Gotham-themed personal site built on hand-authored SVG filters — feTurbulence and feDisplacementMap driving a real refraction effect instead of a blur.",
    featured: false,
    links: {
      website: "https://hareendra5555.github.io/",
    },
    slug: "liquid-glass-portfolio",
    source: "personal",
    title: "Liquid Glass Portfolio",
  },
  {
    category: "Machine Learning",
    date: {
      month: "August",
      year: 2023,
    },
    description:
      "Streaming pipeline that clusters social posts into emergent events in near real time, published in IJRASET.",
    featured: true,
    links: {
      post: "https://www.ijraset.com/research-paper/real-time-event-detection-in-social-media-streams",
      website:
        "https://www.ijraset.com/research-paper/real-time-event-detection-in-social-media-streams",
    },
    slug: "real-time-event-detection",
    source: "research",
    title: "Real-Time Event Detection",
  },
  {
    category: "Machine Learning",
    date: {
      month: "July",
      year: 2023,
    },
    description:
      "Hybrid CNN and classical-ML models for breast cancer detection, benchmarked against single-model baselines. Published in IJSREM.",
    featured: true,
    links: {
      post: "https://ijsrem.com/download/a-novel-approaches-of-detecting-breast-cancer-with-hybrid-models-techniques-and-challenges/",
      website:
        "https://ijsrem.com/download/a-novel-approaches-of-detecting-breast-cancer-with-hybrid-models-techniques-and-challenges/",
    },
    slug: "hybrid-breast-cancer-detection",
    source: "research",
    title: "Hybrid Breast Cancer Detection",
  },
] as const satisfies readonly Project[];
