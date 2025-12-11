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
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

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

Protected admin routes require authentication via `requireAuth` middleware.

### Authentication
- Password hashing using Node.js crypto (scrypt)
- Session-based authentication with secure cookies
- Protected routes redirect to login when unauthenticated

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe database queries and migrations

### Authentication & Sessions
- **Passport.js**: Authentication middleware
- **connect-pg-simple**: PostgreSQL session store
- **express-session**: Session management

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session encryption

### Third-Party UI Libraries
- **Radix UI**: Accessible UI primitives
- **Embla Carousel**: Carousel component
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Development server and build tool
- **tsx**: TypeScript execution for development
- **drizzle-kit**: Database migration tooling