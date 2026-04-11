# Frontend Folder Structure

```bash
eco-spark-hub-client/
│
├── public/                          # STATIC ASSETS
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── src/
│   │
│   ├── app/                         # ⚡ NEXT.JS APP ROUTER (UI & ROUTING ONLY)
│   │   │
│   │   ├── (public)/                # Public Routes Group
│   │   │   ├── page.tsx             # Home Page
│   │   │   ├── about/
│   │   │   ├── ideas/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   └── blog/
│   │   │
│   │   ├── (auth)/                  # Authentication Routes Group
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx           # Auth Layout (Centered Card)
│   │   │
│   │   ├── (dashboard)/             # Protected Routes Group
│   │   │   ├── layout.tsx           # Dashboard Layout (Sidebar + Header)
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx
│   │   │   │   └── users/page.tsx
│   │   │   └── member/
│   │   │       ├── page.tsx
│   │   │       └── ideas/
│   │   │           ├── create/page.tsx
│   │   │           └── [id]/edit/page.tsx
│   │   │
│   │   ├── api/     # API Routes (Optional if using Backend as separate service)
│   │   │   └── webhooks/stripe/route.ts
│   │   │
│   │   ├── layout.tsx               # Root Layout
│   │   ├── page.tsx                 # Fallback
│   │   ├── globals.css
│   │   └── not-found.tsx
│   │
│   │
│   ├── components/                  # 🧩 PRESENTATIONAL LAYER
│   │   │
│   │   ├── ui/               # [SHADCN UI] Raw Design System (Dumb Components)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form/                # Reusable Form wrappers
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                  # Structural Components (Page Skeletons)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── DashboardShell.tsx   # Wrapper for dashboard pages
│   │   │
│   │   └── common/                  # Generic Utility Components
│   │       ├── LoadingSpinner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   │
│   ├── features/                    # 🏢 BUSINESS LOGIC LAYER (SCALABLE SLICES)
│   │   │
│   │   ├── auth/                    # AUTHENTICATION SLICE
│   │   │   ├── components/          # Auth Specific UI
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── SocialLoginButtons.tsx
│   │   │   ├── hooks/               # Auth Logic
│   │   │   │   ├── useAuth.ts       # Global Auth Hook
│   │   │   │   ├── useLogin.ts
│   │   │   │   └── useRegister.ts
│   │   │   ├── services/            # API Calls Wrapper
│   │   │   │   └── auth.service.ts
│   │   │   ├── types/               # Local Types
│   │   │   │   └── auth.types.ts
│   │   │   └── index.ts             # Public Export
│   │   │
│   │   ├── idea/                    # IDEA MANAGEMENT SLICE
│   │   │   ├── components/
│   │   │   │   ├── IdeaCard.tsx
│   │   │   │   ├── IdeaForm.tsx
│   │   │   │   ├── IdeaList.tsx
│   │   │   │   └── IdeaFilters.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useIdeas.ts
│   │   │   │   ├── useCreateIdea.ts
│   │   │   │   └── useDeleteIdea.ts
│   │   │   ├── services/
│   │   │   │   └── idea.service.ts
│   │   │   └── types/
│   │   │
│   │   ├── user/                    # USER PROFILE SLICE
│   │   │   ├── components/ProfileCard.tsx
│   │   │   ├── hooks/useProfile.ts
│   │   │   └── services/user.service.ts
│   │   │
│   │   ├── comment/                 # COMMENT SYSTEM SLICE
│   │   ├── vote/                    # VOTING SYSTEM SLICE
│   │   └── admin/                   # ADMIN DASHBOARD SLICE
│   │
│   │
│   ├── lib/                         # ⚙️ CORE INFRASTRUCTURE (TECHNICAL)
│   │   │
│   │   ├── api/                     # AXIOS & API CLIENTS
│   │   │   ├── axiosInstance.ts     # Configured Axios
│   │   │   ├── endpoints.ts         # URL Constants
│   │   │   └── interceptors.ts      # Token Refresh Logic
│   │   │
│   │   ├── react-query/             # TANSTACK QUERY CONFIG
│   │   │   ├── queryClient.ts
│   │   │   ├── queryKeys.ts         # Centralized Keys
│   │   │   └── mutations.ts
│   │   │
│   │   ├── utils/                   # PURE JS HELPERS
│   │   │   ├── cn.ts                # Class names merger
│   │   │   ├── format.ts            # Date/Currency formatters
│   │   │   └── validation.ts        # Regex helpers
│   │   │
│   │   └── hooks/                   # LOW-LEVEL HOOKS (Technical)
│   │       ├── useDebounce.ts
│   │       └── useMediaQuery.ts
│   │
│   │
│   ├── providers/                   # 🌐 GLOBAL STATE PROVIDERS
│   │   ├── QueryProvider.tsx        # Wraps App with QueryClient
│   │   ├── AuthProvider.tsx         # Wraps App with Auth Context
│   │   ├── ThemeProvider.tsx        # Wraps App with Next Themes
│   │   └── ToasterProvider.tsx      # Wraps App with Sonner/HotToast
│   │
│   │
│   ├── hooks/                       # 🎣 GLOBAL BUSINESS HOOKS
│   │   ├── useAuthGuard.ts          # Redirects if not authenticated
│   │   ├── usePermission.ts         # Checks Role (Admin/User)
│   │   └── usePagination.ts        # Generic Pagination Logic
│   │
│   │
│   ├── config/                      # ⚙️ APP CONFIGURATION
│   │   ├── env.ts                   # Environment Variables (Type-safe)
│   │   ├── navigation.ts            # Nav Links Config
│   │   └── constants.ts             # Magic Numbers/Strings
│   │
│   │
│   ├── types/                       # 📘 GLOBAL SHARED TYPES
│   │   ├── api.types.ts             # API Response Formats
│   │   ├── models.ts                # Database Schemas (Shared)
│   │   └── index.ts
│   │
│   │
│   ├── styles/                      # 🎨 GLOBAL STYLES
│   │   └── globals.css
│   │
│   └── middleware.ts                # 🛡️ NEXT.JS MIDDLEWARE (Route Protection)
│
│
├── .env.local                       # ENVIRONMENT VARIABLES
├── .env.example
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
└── package.json

```
