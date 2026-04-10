# Frontend Folder Structure

```bash

eco-spark-hub-client/
│
├── public/
│ ├── images/
│ ├── icons/
│ └── fonts/
│
├── src/
│
│ ├── app/
│ │ ├── layout.tsx
│ │ ├── globals.css
│ │ ├── providers.tsx
│ │
│ │ ├── (public)/
│ │ │ ├── layout.tsx
│ │ │ ├── page.tsx # Home
│ │ │
│ │ │ ├── ideas/
│ │ │ │ ├── page.tsx # All Ideas (search + filter + pagination)
│ │ │ │ └── [id]/page.tsx # Idea Details (vote + comment + paywall)
│ │ │
│ │ │ ├── blog/
│ │ │ │ ├── page.tsx
│ │ │ │ └── [slug]/page.tsx
│ │ │
│ │ │ ├── about/page.tsx
│ │ │ ├── testimonials/page.tsx
│ │ │ └── contact/page.tsx
│ │
│ │ ├── (auth)/
│ │ │ ├── layout.tsx
│ │ │ ├── login/page.tsx
│ │ │ ├── register/page.tsx
│ │ │ └── forgot-password/page.tsx
│ │
│ │ ├── (dashboard)/
│ │ │ ├── layout.tsx
│ │ │
│ │ │ ├── admin/
│ │ │ │ ├── page.tsx
│ │ │ │ ├── users/page.tsx
│ │ │ │ ├── ideas/page.tsx
│ │ │ │ ├── reports/page.tsx
│ │ │ │ └── categories/page.tsx
│ │ │
│ │ │ ├── member/
│ │ │ ├── page.tsx
│ │ │ ├── ideas/
│ │ │ │ ├── page.tsx
│ │ │ │ ├── create/page.tsx
│ │ │ │ └── edit/[id]/page.tsx
│ │ │ │
│ │ │ ├── profile/page.tsx
│ │ │ ├── payments/page.tsx
│ │ │ └── bookmarks/page.tsx
│ │
│ │ ├── api/
│ │ │ └── auth/[...nextauth]/route.ts
│ │
│ │ ├── error.tsx
│ │ └── not-found.tsx
│
│
│ ├── features/ 🔥 FEATURE-BASED (CORE LOGIC)
│ │
│ │ ├── auth/
│ │ │ ├── components/
│ │ │ ├── hooks/
│ │ │ ├── services/
│ │ │ ├── schemas/
│ │ │ ├── types/
│ │ │ └── index.ts
│ │
│ │ ├── idea/
│ │ │ ├── components/
│ │ │ │ ├── IdeaCard.tsx
│ │ │ │ ├── IdeaDetails.tsx
│ │ │ │ ├── IdeaForm.tsx
│ │ │ │ ├── IdeaSearch.tsx
│ │ │ │ ├── IdeaFilter.tsx
│ │ │ │ ├── TopIdeas.tsx # testimonials
│ │ │ │ └── IdeaGallery.tsx
│ │ │ │
│ │ │ ├── hooks/
│ │ │ │ ├── useIdeas.ts
│ │ │ │ ├── useIdeaDetails.ts
│ │ │ │ └── useCreateIdea.ts
│ │ │ │
│ │ │ ├── services/
│ │ │ ├── schemas/
│ │ │ ├── types/
│ │ │ └── index.ts
│ │
│ │ ├── comment/
│ │ │ ├── components/
│ │ │ │ ├── CommentItem.tsx #  nested
│ │ │ │ ├── CommentThread.tsx #  nested
│ │ │ │ └── CommentForm.tsx
│ │ │ ├── hooks/
│ │ │ ├── services/
│ │ │ ├── schemas/
│ │ │ ├── types/
│ │ │ └── index.ts
│ │
│ │ ├── vote/
│ │ │ ├── components/
│ │ │ │ └── VoteButtons.tsx # reusable
│ │ │ ├── hooks/
│ │ │ ├── services/
│ │ │ ├── types/
│ │ │ └── index.ts
│ │
│ │ ├── payment/
│ │ │ ├── components/
│ │ │ │ ├── Paywall.tsx # VERY IMPORTANT
│ │ │ │ └── PaymentButton.tsx
│ │ │ ├── hooks/
│ │ │ ├── services/
│ │ │ ├── types/
│ │ │ └── index.ts
│ │
│ │ ├── newsletter/
│ │ │ ├── components/
│ │ │ │ └── NewsletterForm.tsx
│ │ │ ├── services/
│ │ │ └── index.ts
│ │
│ │ ├── admin/
│ │ │ ├── components/
│ │ │ ├── hooks/
│ │ │ ├── services/
│ │ │ ├── types/
│ │ │ └── index.ts
│ │
│ │ ├── user/
│ │ │ ├── components/
│ │ │ ├── hooks/
│ │ │ ├── services/
│ │ │ ├── schemas/
│ │ │ ├── types/
│ │ │ └── index.ts
│ │
│ │ └── bookmark/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── index.ts
│
│
│ ├── components/ 🔁 GLOBAL UI
│ │ ├── ui/ # shadcn
│ │
│ │ ├── layout/
│ │ │ ├── Navbar.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── Sidebar.tsx
│ │ │ └── DashboardLayout.tsx
│ │
│ │ ├── common/
│ │ │ ├── Loading.tsx
│ │ │ ├── Error.tsx
│ │ │ ├── Empty.tsx
│ │ │ ├── Pagination.tsx
│ │ │ ├── Modal.tsx
│ │ │ └── ConfirmDialog.tsx
│ │
│ │ └── shared/
│ │ ├── Badge.tsx
│ │ ├── Avatar.tsx
│ │ └── Skeleton.tsx #  UX boost
│
│
│ ├── lib/ ⚙️ CORE SYSTEM
│ │ ├── axios.ts
│ │ ├── auth.ts
│ │ ├── utils.ts
│ │ ├── errorHandler.ts
│ │ │
│ │ ├── api/ # ✅ API layer separation
│ │ │ ├── base.ts
│ │ │ ├── idea.api.ts
│ │ │ ├── auth.api.ts
│ │ │ └── payment.api.ts
│ │
│ │ ├── react-query/
│ │ │ ├── queryClient.ts
│ │ │ └── mutationKeys.ts
│ │
│ │ └── config/
│ │ ├── env.ts
│ │ └── site.ts
│
│
│ ├── providers/ 🌍 GLOBAL PROVIDERS
│ │ ├── QueryProvider.tsx
│ │ ├── ThemeProvider.tsx
│ │ └── AuthProvider.tsx
│
│
│ ├── hooks/ 🔁 GLOBAL HOOKS
│ │ ├── useDebounce.ts
│ │ ├── useLocalStorage.ts
│ │ ├── useAuthGuard.ts
│ │ └── usePagination.ts
│
│
│ ├── middleware.ts 🔐 route protection
│
│
│ ├── constants/
│ │ ├── routes.ts
│ │ ├── roles.ts
│ │ └── index.ts
│
│
│ ├── types/
│ │ ├── api.types.ts
│ │ ├── idea.types.ts
│ │ └── user.types.ts
│
│
│ ├── shared-types/ #  backend sync
│ │ └── index.ts
│
│
│ └── styles/
│ └── globals.css
│
├── middleware.ts
├──
├── next.config.js
├── package.json
└── README.md
```
