# Typescript Drizzle Postgres API with JWT and Google Auth
🚀 A production-ready REST API boilerplate built with TypeScript, Express, PostgreSQL, and Drizzle ORM, featuring:
- JWT Authentication
- Google OAuth 2.0
- AI-Friendly Development (Cursor, Windsurf, or GitHub Copilot)

## Features
- **Secure**: JWT + Google OAuth 2.0 authentication
- **Modern Stack**: TypeScript + Drizzle ORM
- **AI-Friendly**: Works with Cursor, Windsurf, or GitHub Copilot
- **Dockerized**: PostgreSQL with PgAdmin included

## Tech Stack
| Category       | Technologies Used               |
|----------------|---------------------------------|
| Backend        | TypeScript, Express.js          |
| Database       | PostgreSQL, Drizzle ORM         |
| Authentication | Passport.js, JWT, Google OAuth |
| Security       | Helmet, CORS, Rate Limiting     |
| Validation     | Zod                             |

## Getting Started

### 1. Environment Setup
Copy `.env.example` to `.env` and adjust settings as needed:

The example `.env` file has the variables to access the local development database. For Google OAuth authentication, you need to provide your own `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the Google Cloud Console. More on that later in the document.

## Database with Docker
### Docker Database for Development

This project uses Docker to run a PostgreSQL database for development. The database is configured to persist data using a Docker volume.

```bash
docker-compose up -d    # starts the Postgres docker
docker-compose down     # stops the Postgres docker
```

### PgAdmin Access
- **URL:** http://localhost:5050
- **Email:** admin@example.com
- **Password:** pgadmin
- **Host:** postgres (or host.docker.internal for Mac/Windows)

### Database Scripts
```bash
npm run db:generate  # Create migrations
npm run db:migrate   # Apply migrations
npm run db:studio    # Launch Drizzle Studio
```

## Google Authentication Setup

To set up Google authentication, follow these steps:

1. Register your app on the [Google Cloud Platform console](https://console.cloud.google.com/) and select or create a project.
2. Navigate to the [APIs & Services page](https://console.cloud.google.com/apis) and select [Credentials](https://console.cloud.google.com/apis/credentials).
3. Add `http://localhost:3001` as an authorized origin URI.
4. Add `http://localhost:3001/api/auth/google/callback` to the authorized redirect URIs.
5. Update your `.env` file with the following values:
   - `GOOGLE_CLIENT_ID`: Copy the client ID from the credentials page.
   - `GOOGLE_CLIENT_SECRET`: Copy the client secret from the credentials page.
   - `GOOGLE_CALLBACK_URL`: Set to `http://localhost:3001/auth/google/callback`.

After setting up Google authentication, you can access the API at:
http://localhost:3001/auth/google/login

## API Documentation
The current API documentation is available at `docs/openapi.yaml`.
You can import it on Postman or a swagger editor to view it.
Prompt AI tools to regenerate when endpoints change.

## Requesting new features to AI
If you are using AI code editor, you can request for new features to be added to the codebase.
The AI rules are written to the .windsurfrules file. If you want to use other AI editor, copy the same rules to the file of the AI editor:
- Cursor IA: .cursor/rules
- Copilot: .github/copilot-instructions.md

### Prompting AI for new features
Try something like:

```
Create a table and API CRUD for movies.
Movies should have actors.
```
This will create Drizzle schemas, with relations, for both tables and API routes for CRUD operations.
AI can make good assumptions on fields names and types, but be specific for real world applications.


## Extending Authentication options
The API uses Passport.js, so you can easily add more authentication providers like GitHub or Facebook. 

To add a new provider:

1. Install its Passport strategy package
2. Follow the existing Google Auth implementation as a reference:
   - Routes in `src/routes/auth/google.ts`
   - Strategy in `src/controllers/auth/google-auth.ts`

The process mirrors the Google Auth implementation.