import type { Experience } from "@/types/experiences";

export const EXPERIENCES = [
  {
    category: "HealthTech",
    experienceDescription: [
      "Architected a <u>FastAPI async REST backend</u> (Pydantic + SQLAlchemy async ORM) serving real-time clinical data across 6 departments, cutting average API response time from 4.1s to 900ms (78%) for 1,000+ daily users.",
      "Built a JWT/OAuth2 auth layer with refresh-token rotation and role-based access across 4 services, cutting auth support tickets by 40%.",
      "Designed a <u>Celery + Redis task queue</u> to offload lab-result and discharge jobs, reducing synchronous API wait time 65% under peak load.",
      "Optimized PostgreSQL on 5M+ row tables via Alembic migrations and composite indexes, dropping p95 read latency from 3.8s to 680ms with zero downtime.",
      "Containerized the stack with Docker and shipped to <u>AWS EKS</u> through GitHub Actions CI/CD with pytest gates — daily releases and zero deployment incidents over 3 months.",
    ],
    experienceLinks: {
      linkedin: "https://www.linkedin.com/company/uf-health/",
      website: "https://ufhealth.org/",
    },
    experienceOrg: {
      link: "https://ufhealth.org/",
      name: "UF Health",
      websiteDisplayName: "ufhealth.org",
    },
    experienceStatus: {
      endAt: "Present",
      startAt: "Jan, 2025",
    },
    experienceTech: [
      "Python",
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Alembic",
      "Docker",
      "Kubernetes",
      "AWS",
      "GitHub Actions",
      "pytest",
    ],
    experienceTitle: "Software Engineer",
    orgDescription:
      "UF Health is the University of Florida's academic health system — hospitals, clinics and research institutes across Florida, where clinical software has to be both fast and provably correct.",
    slug: "uf-health",
  },
  {
    category: "Consulting",
    experienceDescription: [
      "Built a client project-management portal with <u>React, Redux and Node/Express</u> (JWT auth, S3 uploads), cutting onboarding from 5 days to 1 (80%) across 3 teams.",
      "Architected a Node/Express <u>API gateway</u> consolidating 4 microservices with MongoDB aggregation pipelines, cutting frontend API calls by 60%.",
      "Diagnosed slow reporting on a 2M+ document MongoDB collection; compound indexes and <code>$lookup</code> rewrites cut report load from 5.8s to 1.2s (79%).",
      "Refactored a high-traffic React data grid with virtualization and memoization, lifting the Lighthouse score from 54 to 89.",
      "Instrumented services with <u>Prometheus + Grafana</u>, catching 2 memory-leak incidents before they breached SLAs.",
    ],
    experienceLinks: {},
    experienceOrg: {
      link: "",
      name: "BesInfra",
      websiteDisplayName: "Hyderabad, India",
    },
    experienceStatus: {
      endAt: "Jul, 2024",
      startAt: "Dec, 2023",
    },
    experienceTech: [
      "JavaScript",
      "TypeScript",
      "React",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "AWS",
      "Prometheus",
      "Grafana",
    ],
    experienceTitle: "Software Engineer",
    orgDescription:
      "BesInfra builds internal tooling and client-facing portals for infrastructure and construction teams — project tracking, document workflows, and reporting dashboards.",
    slug: "besinfra",
  },
] as const satisfies readonly Experience[];
