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
