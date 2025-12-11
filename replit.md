# Angola Imobiliária

## Overview

Angola Imobiliária is a real estate platform built for the Angolan market. The application allows users to browse property listings, view property details, and contact agents. It includes a full admin dashboard for managing properties, messages, and system settings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/` for route-level components
- Reusable UI components in `client/src/components/ui/` (shadcn/ui)
- Layout components in `client/src/components/layout/`
- Section components in `client/src/components/sections/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: Turso (SQLite/libSQL) with Drizzle ORM
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Storage**: In-memory store (memorystore) - compatible with serverless
- **Image Storage**: Cloudinary

The server uses a storage abstraction pattern (`server/storage.ts`) for database operations, making it easier to swap implementations if needed.

### Database Schema
Three main tables defined in `shared/schema.ts`:
- **users**: Admin accounts with hashed passwords
- **properties**: Real estate listings with details like price, location, bedrooms, images
- **messages**: Contact form submissions from users

### API Structure
RESTful API endpoints under `/api/`:
- `/api/properties` - CRUD for property listings
- `/api/messages` - Contact form submissions
- `/api/user`, `/api/login`, `/api/logout` - Authentication
- `/api/upload` - Image upload to Cloudinary

Protected admin routes require authentication via `requireAuth` middleware.

### Authentication
- Password hashing using Node.js crypto (scrypt)
- Session-based authentication with secure cookies
- Protected routes redirect to login when unauthenticated

## External Dependencies

### Database
- **Turso**: SQLite database hosted on edge (requires TURSO_DATABASE_URL and TURSO_AUTH_TOKEN)
- **Drizzle ORM**: Type-safe database queries

### Image Storage
- **Cloudinary**: Cloud-based image storage and transformation

### Authentication & Sessions
- **Passport.js**: Authentication middleware
- **memorystore**: In-memory session store (serverless compatible)
- **express-session**: Session management

### Environment Variables Required
- `TURSO_DATABASE_URL`: Turso database URL (libsql://...)
- `TURSO_AUTH_TOKEN`: Turso authentication token
- `SESSION_SECRET`: Secret key for session encryption
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Third-Party UI Libraries
- **Radix UI**: Accessible UI primitives
- **Embla Carousel**: Carousel component
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Development server and build tool
- **tsx**: TypeScript execution for development

## Deployment

### Vercel Deployment
The project is configured for Vercel deployment with `vercel.json`:
- Build command: `npm run build`
- Output directory: `dist`
- API rewrites configured for backend routes

### Admin Access
- Email: imobiliarioangola@admin.com
- Password: Imobiliario909192
