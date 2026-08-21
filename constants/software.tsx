import { Icons } from "@/components/icons";

export interface SoftwareItem {
  categories: string[];
  href: string;
  /** Optional brand mark. Items without one fall back to a monogram tile. */
  icon?: React.ReactNode;
  key: string;
  title: string;
}

export const SOFTWARE_ITEMS: SoftwareItem[] = [
  // ── Languages ──
  {
    categories: ["Languages"],
    href: "https://www.python.org",
    icon: <Icons.python />,
    key: "python",
    title: "Python",
  },
  {
    categories: ["Languages"],
    href: "https://go.dev",
    key: "go",
    title: "Go",
  },
  {
    categories: ["Languages"],
    href: "https://www.typescriptlang.org",
    icon: <Icons.ts />,
    key: "typescript",
    title: "TypeScript",
  },
  {
    categories: ["Languages"],
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: <Icons.js />,
    key: "javascript",
    title: "JavaScript",
  },
  {
    categories: ["Languages"],
    href: "https://dev.java",
    key: "java",
    title: "Java",
  },
  {
    categories: ["Languages"],
    href: "https://www.postgresql.org/docs/current/sql.html",
    key: "sql",
    title: "SQL",
  },

  // ── Backend ──
  {
    categories: ["Backend"],
    href: "https://fastapi.tiangolo.com",
    key: "fastapi",
    title: "FastAPI",
  },
  {
    categories: ["Backend"],
    href: "https://docs.pydantic.dev",
    key: "pydantic",
    title: "Pydantic",
  },
  {
    categories: ["Backend"],
    href: "https://www.sqlalchemy.org",
    key: "sqlalchemy",
    title: "SQLAlchemy",
  },
  {
    categories: ["Backend"],
    href: "https://docs.celeryq.dev",
    key: "celery",
    title: "Celery",
  },
  {
    categories: ["Backend"],
    href: "https://nodejs.org",
    icon: <Icons.nodejs />,
    key: "nodejs",
    title: "Node.js",
  },
  {
    categories: ["Backend"],
    href: "https://expressjs.com",
    key: "express",
    title: "Express",
  },
  {
    categories: ["Backend"],
    href: "https://dotnet.microsoft.com/apps/aspnet",
    key: "aspnet",
    title: "ASP.NET Core",
  },

  // ── AI ──
  {
    categories: ["AI"],
    href: "https://www.langchain.com",
    key: "langchain",
    title: "LangChain",
  },
  {
    categories: ["AI"],
    href: "https://langchain-ai.github.io/langgraph/",
    key: "langgraph",
    title: "LangGraph",
  },
  {
    categories: ["AI"],
    href: "https://pytorch.org",
    key: "pytorch",
    title: "PyTorch",
  },
  {
    categories: ["AI"],
    href: "https://github.com/pgvector/pgvector",
    key: "pgvector",
    title: "pgvector",
  },
  {
    categories: ["AI"],
    href: "https://claude.com/product/claude-code",
    icon: <Icons.claude />,
    key: "claude-code",
    title: "Claude Code",
  },
  {
    categories: ["AI"],
    href: "https://cursor.com",
    icon: <Icons.cursor />,
    key: "cursor",
    title: "Cursor",
  },

  // ── Data ──
  {
    categories: ["Data"],
    href: "https://www.postgresql.org",
    icon: <Icons.postgresql />,
    key: "postgresql",
    title: "PostgreSQL",
  },
  {
    categories: ["Data"],
    href: "https://www.mongodb.com",
    icon: <Icons.mongodb />,
    key: "mongodb",
    title: "MongoDB",
  },
  {
    categories: ["Data"],
    href: "https://redis.io",
    icon: <Icons.redis />,
    key: "redis",
    title: "Redis",
  },
  {
    categories: ["Data"],
    href: "https://alembic.sqlalchemy.org",
    key: "alembic",
    title: "Alembic",
  },

  // ── Cloud & Ops ──
  {
    categories: ["Cloud & Ops"],
    href: "https://aws.amazon.com",
    key: "aws",
    title: "AWS",
  },
  {
    categories: ["Cloud & Ops"],
    href: "https://www.docker.com",
    icon: <Icons.docker />,
    key: "docker",
    title: "Docker",
  },
  {
    categories: ["Cloud & Ops"],
    href: "https://kubernetes.io",
    key: "kubernetes",
    title: "Kubernetes",
  },
  {
    categories: ["Cloud & Ops"],
    href: "https://github.com/features/actions",
    icon: <Icons.github />,
    key: "github-actions",
    title: "GitHub Actions",
  },
  {
    categories: ["Cloud & Ops"],
    href: "https://prometheus.io",
    key: "prometheus",
    title: "Prometheus",
  },
  {
    categories: ["Cloud & Ops"],
    href: "https://grafana.com",
    key: "grafana",
    title: "Grafana",
  },
  {
    categories: ["Cloud & Ops"],
    href: "https://docs.pytest.org",
    key: "pytest",
    title: "pytest",
  },
  {
    categories: ["Cloud & Ops"],
    href: "https://git-scm.com",
    icon: <Icons.git />,
    key: "git",
    title: "Git",
  },

  // ── Frontend ──
  {
    categories: ["Frontend"],
    href: "https://react.dev",
    icon: <Icons.react />,
    key: "react",
    title: "React",
  },
  {
    categories: ["Frontend"],
    href: "https://nextjs.org",
    icon: <Icons.nextjs />,
    key: "nextjs",
    title: "Next.js",
  },
  {
    categories: ["Frontend"],
    href: "https://redux.js.org",
    icon: <Icons.redux />,
    key: "redux",
    title: "Redux",
  },
  {
    categories: ["Frontend"],
    href: "https://tailwindcss.com",
    icon: <Icons.tailwindcss />,
    key: "tailwindcss",
    title: "Tailwind CSS",
  },
];
