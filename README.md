# Project Setup

## Database with Docker

### Prerequisites
- Docker
- Docker Compose

### Starting the Database

1. Start the PostgreSQL database:
```bash
docker-compose up -d
```

2. Stop the database:
```bash
docker-compose down
```

### Database Details
- **Host:** localhost
- **Port:** 5432
- **Database:** myapp
- **Username:** postgres
- **Password:** postgres

### Data Persistence
- Database data is stored in a Docker volume 
- Data will persist between container restarts
- Volume can be manually managed with Docker volume commands

### Environment Configuration
Copy `.env.example` to `.env` and adjust settings as needed:
```bash
cp .env.example .env
```

### PgAdmin Access
- **URL:** http://localhost:5050
- **Email:** admin@example.com
- **Password:** pgadmin

#### Connecting to PostgreSQL in PgAdmin
1. Click "Add New Server"
2. In the "General" tab, give the server a name
3. In the "Connection" tab:
   - Host: postgres (or host.docker.internal for Mac/Windows)
   - Port: 5432
   - Maintenance Database: myapp
   - Username: postgres
   - Password: postgres

### Connecting to the Database
Use the following connection string in your `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=myapp
```

### Database Scripts

#### Create Database Migrations
```bash
npm run db:generate
```
Generate Drizzle ORM migrations based on your schema changes.

#### Apply Database Migrations
```bash
npm run db:migrate
```
Apply pending database migrations to update your database schema.

### Setting Up .env File
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and fill in the following details:
- `DB_HOST`: Database host (usually `localhost` for local development)
- `DB_PORT`: Database port (default is `5432`)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Name of your database

**Important:** Never commit your `.env` file to version control. It is already included in `.gitignore`.

### Google Authentication Setup

To set up Google authentication, follow these steps:

1. Register your app on the [Google Cloud Platform console](https://console.cloud.google.com/) and select or create a project.
2. Navigate to the [APIs & Services page](https://console.cloud.google.com/apis) and select [Credentials](https://console.cloud.google.com/apis/credentials).
3. Add `http://localhost:3000` as an authorized origin URI.
4. Add `http://localhost:3000/api/auth/google/callback` to the authorized redirect URIs.
5. Update your `.env` file with the following values:
   - `GOOGLE_CLIENT_ID`: Copy the client ID from the credentials page.
   - `GOOGLE_CLIENT_SECRET`: Copy the client secret from the credentials page.
   - `GOOGLE_CALLBACK_URL`: Set to `http://localhost:3000/api/auth/google/callback`.

After setting up Google authentication, you can access the API at:
http://localhost:3000/api/auth/google/login