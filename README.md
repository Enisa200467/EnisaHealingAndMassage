# Enisa Healing & Massage

> Modern, mobile-first website for Enisa Healing & Massage - a healing and massage therapy practice based in the Netherlands.

[![Nuxt](https://img.shields.io/badge/Nuxt-4.1.3-00DC82?logo=nuxt.js)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Private-red)]()

---

## 🌟 Features

### Client-Facing Features
- 📱 **Mobile-First Design** - Optimized for all devices
- 🌐 **Dutch Language** - Fully localized for Dutch audience
- ♿ **Accessibility** - WCAG 2.1 compliant with skip navigation
- ⚡ **Performance** - Optimized with Vercel Speed Insights
- 🔍 **SEO Optimized** - Comprehensive meta tags and structured data
- ⭐ **Review System** - Customer reviews with moderation
- 📅 **Booking Integration** - Appointment booking functionality
- 📧 **Contact Form** - Secure contact form with email notifications

### Admin Features
- 🔐 **Secure Authentication** - Supabase Auth with session timeout
- 📝 **Treatment Management** - CRUD operations for treatments
- ⭐ **Review Moderation** - Approve/reject customer reviews
- 📊 **SEO Analysis** - Multi-page SEO audit tools
- 🎨 **Content Management** - Markdown-based treatment pages

### Technical Features
- 🔒 **Security Hardening** - Rate limiting, input sanitization, CSRF protection
- 🛡️ **Error Handling** - Global error boundaries with user-friendly messages
- 📈 **Monitoring** - Vercel Analytics & Speed Insights
- 🎯 **Type Safety** - Full TypeScript coverage
- 🧩 **Feature-Based Architecture** - Modular, scalable codebase

---

## 🛠️ Tech Stack

### Framework & Core
- **[Nuxt 4](https://nuxt.com/)** - Vue.js meta-framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### UI & Styling
- **[Nuxt UI](https://ui.nuxt.com/)** - UI component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Nuxt Icon](https://nuxt.com/modules/icon)** - Icon management
- **[Nuxt Image](https://image.nuxt.com/)** - Image optimization

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend as a Service (PostgreSQL + Auth)
- **[Resend](https://resend.com/)** - Email delivery service
- **[Zod](https://zod.dev/)** - Schema validation

### Content Management
- **[Nuxt Content](https://content.nuxt.com/)** - File-based CMS
- **[Markdown](https://www.markdownguide.org/)** - Treatment content pages

### Security & Performance
- **[nuxt-security](https://nuxt-security.vercel.app/)** - Security headers & CSP
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - XSS protection
- **[Vercel Analytics](https://vercel.com/analytics)** - Web analytics
- **[Vercel Speed Insights](https://vercel.com/docs/speed-insights)** - Performance monitoring

### State Management
- **[Pinia](https://pinia.vuejs.org/)** - Vue store

### Development Tools
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime & package manager
- **[ESLint](https://eslint.org/)** - Code linting
- **[Nuxt DevTools](https://devtools.nuxt.com/)** - Enhanced DX

---

## 🏗️ Architecture

### Feature-Based Structure

The codebase follows a **feature-based architecture** where each feature is self-contained:

```
app/
├── features/
│   ├── admin/           # Admin panel
│   │   ├── components/
│   │   ├── composables/
│   │   └── types/
│   ├── booking/         # Appointment booking
│   ├── contact/         # Contact form
│   ├── home/            # Homepage
│   ├── navigation/      # Site navigation
│   ├── pricing/         # Pricing display
│   ├── reviews/         # Review system
│   ├── treatments/      # Treatment catalog
│   └── shared/          # Shared utilities
├── components/          # Global components
├── composables/         # Global composables
├── pages/              # Routes
└── plugins/            # Nuxt plugins

server/
├── api/                # API endpoints
│   ├── admin/          # Admin routes
│   ├── contact/        # Contact form API
│   ├── reviews/        # Reviews API
│   └── treatments/     # Treatments API
├── middleware/         # Server middleware
└── utils/              # Server utilities

content/
└── treatments/         # Markdown treatment pages
```

### Key Design Patterns

- **Auto-imports**: Composables and components are automatically imported
- **Type Safety**: Supabase types auto-generated from database schema
- **Composable Pattern**: Reusable logic extracted into composables
- **API Layer**: Standardized error responses and success messages

---

## 🚀 Getting Started

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- **Supabase Account** (for database and auth)
- **Resend Account** (for email delivery)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EnisaHealingAndMassage
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.development` file in the root directory:
   ```env
   # Supabase Configuration
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Email Configuration
   RESEND_API_KEY=your-resend-api-key
   CONTACT_EMAIL=info@enisahealing.nl
   ```

4. **Set up Supabase**

   See [Supabase Setup Guide](#supabase-setup) below.

5. **Start the development server**
   ```bash
   bun run dev
   ```

6. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and API keys

### 2. Database Schema

Run these SQL commands in the Supabase SQL Editor:

#### Treatments Table
```sql
CREATE TABLE treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  duration INTEGER, -- in minutes
  intensity INTEGER CHECK (intensity BETWEEN 1 AND 5),
  intensity_label TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read active treatments"
  ON treatments FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated admins have full access"
  ON treatments FOR ALL
  USING (auth.role() = 'authenticated');
```

#### Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  treatment TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read approved reviews"
  ON reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can submit reviews"
  ON reviews FOR INSERT
  WITH CHECK (status = 'pending');

CREATE POLICY "Authenticated admins have full access"
  ON reviews FOR ALL
  USING (auth.role() = 'authenticated');
```

### 3. Create Admin User

1. Go to Supabase Dashboard → Authentication → Users
2. Create a new user with email/password
3. Use these credentials to log in at `/admin/login`

**Development Credentials:**
- Email: `matthijs@test.nl`
- Password: `test1234`

### 4. Generate TypeScript Types

```bash
bun run supabase:types
```

This generates type-safe database types in `types/database.types.ts`.

---

## 📧 Resend Setup

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up and verify your email

### 2. Configure Domain (Production)

1. Add your domain in Resend dashboard
2. Add DNS records provided by Resend
3. Verify domain ownership

### 3. Get API Key

1. Navigate to API Keys section
2. Create a new API key
3. Add to `.env.development` as `RESEND_API_KEY`

### 4. Update Email Sender

In `server/api/contact/index.post.ts`, update the `from` field:

```typescript
from: 'Enisa Healing Website <noreply@yourdomain.com>'
```

---

## 🔧 Development

### Available Scripts

```bash
# Development
bun run dev              # Start dev server

# Build
bun run build            # Build for production
bun run preview          # Preview production build
bun run generate         # Generate static site

# Database
bun run supabase:types   # Generate Supabase types

# Linting
bun run lint             # Run ESLint
```

### Project Configuration

- **Nuxt Config**: `nuxt.config.ts` - Framework configuration
- **App Config**: `app.config.ts` - Nuxt UI customization
- **Content Config**: `content.config.ts` - Content collections
- **TypeScript**: `tsconfig.json` - TypeScript settings

### Admin Access

**Development Login:**
- URL: `http://localhost:3000/admin/login`
- Email: `matthijs@test.nl`
- Password: `test1234`

**Session Timeout:** 5 minutes of inactivity

---

## 📝 Content Management

### Treatment Pages

Treatment content is managed through markdown files in `/content/treatments/`:

```markdown
::behandeling-hero
---
id: database-uuid-here
---
::

::behandeling-sectie
---
title: Wat kun je verwachten?
image: /images/treatment.webp
imageAlt: Description
items:
  - Point 1
  - Point 2
---
::
```

**Available Components:**
- `::behandeling-hero` - Page header
- `::behandeling-sectie` - Section with image
- `::info-blok` - Info box
- `::voordelen-lijst` - Benefits list
- `::voor-wie` - Target audience
- `::twee-kolommen` - Two-column layout

See `/docs/BEHANDELINGEN_BEHEREN.md` for full documentation (Dutch).

---

## 🔒 Security

The website implements comprehensive security measures:

- ✅ **Rate Limiting** - Prevents abuse (contact: 5/hour, reviews: 3/day)
- ✅ **Input Sanitization** - DOMPurify removes XSS attempts
- ✅ **Authentication** - Supabase Auth with session timeout
- ✅ **Security Headers** - HSTS, CSP, X-Frame-Options, etc.
- ✅ **Session Timeout** - 5-minute admin inactivity logout
- ✅ **RLS Policies** - Database-level access control

See `/docs/SECURITY.md` for detailed security documentation.

---

## 🐛 Error Handling

Comprehensive error handling system:

- ✅ **Standardized API Errors** - Consistent Dutch error messages
- ✅ **Global Error Boundaries** - Prevents app crashes
- ✅ **Toast Notifications** - User-friendly error feedback
- ✅ **Vercel Monitoring** - Analytics & Speed Insights

See `/docs/ERROR_HANDLING.md` for detailed documentation.

---

## 📊 Monitoring

### Vercel Analytics (Production)

- **Speed Insights**: Core Web Vitals tracking
- **Web Analytics**: Page views, sessions, referrers
- Access: [Vercel Dashboard](https://vercel.com/dashboard)

### Performance Targets

- Lighthouse Score: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s
- Cumulative Layout Shift: <0.1

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project in Vercel Dashboard
   - Connect GitHub/GitLab repository

2. **Set Environment Variables**
   - Add all variables from `.env.development`
   - Ensure production URLs are used

3. **Deploy**
   - Push to `main` branch for automatic deployment
   - Preview deployments on pull requests

### Other Platforms

The app can be deployed on any Node.js hosting platform:

```bash
bun run build
node .output/server/index.mjs
```

---

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Claude Code AI assistant instructions
- **[TODO-CLAUDE.MD](./TODO-CLAUDE.MD)** - Project improvement roadmap
- **[docs/SECURITY.md](./docs/SECURITY.md)** - Security implementation guide
- **[docs/ERROR_HANDLING.md](./docs/ERROR_HANDLING.md)** - Error handling guide
- **[docs/BEHANDELINGEN_BEHEREN.md](./docs/BEHANDELINGEN_BEHEREN.md)** - Treatment management (Dutch)

---

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.

---

## 📄 License

Private - All rights reserved.

---

## 🙏 Acknowledgments

- Built with [Nuxt](https://nuxt.com/)
- UI by [Nuxt UI](https://ui.nuxt.com/)
- Hosted on [Vercel](https://vercel.com/)
- Backend by [Supabase](https://supabase.com/)

---

**Last Updated:** 2025-11-17
