import { Icons } from "@/components/icons";
import { LINK } from "@/constants/links";
import type {
  Project,
  ProjectSource,
  ProjectSourceOption,
} from "@/types/projects";

export const HOME_FEATURED_PROJECT_COUNT = 4 as const;

export const PROJECT_SOURCES = [
  {
    icon: Icons.logo,
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
      "Intelligent document Q&A — a LangGraph multi-step RAG pipeline with pgvector embeddings and FastAPI streaming, cutting hallucinations 40% across 50K+ indexed pages.",
    featured: true,
    links: {
      github: `${LINK.GITHUB}?tab=repositories`,
    },
    slug: "documind",
    source: "personal",
    title: "Documind",
  },
  {
    category: "Platform",
    date: {
      month: "November",
      year: 2025,
    },
    description:
      "Real-time ride-sharing for campus — a stateless Go backend with geospatial MongoDB indexes and Redis pub/sub WebSocket push, holding sub-200ms location updates.",
    featured: true,
    links: {
      github: `${LINK.GITHUB}?tab=repositories`,
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
    featured: true,
    links: {
      github: `${LINK.GITHUB}?tab=repositories`,
    },
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
    featured: true,
    links: {
      github: `${LINK.GITHUB}?tab=repositories`,
    },
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
    featured: false,
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
      "Hybrid CNN + classical-ML models for breast cancer detection, benchmarked against single-model baselines. Published in IJSREM.",
    featured: false,
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
