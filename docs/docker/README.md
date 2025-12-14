# LMS Backend Docker Configuration

Complete Docker setup for deploying the LMS Java backend with PostgreSQL and Redis.

## Quick Start

### Development

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Update .env with your settings

# 3. Start services
./scripts/deploy.sh development up

# Or manually:
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### Production

```bash
# 1. Configure production .env
cp .env.example .env
# Edit .env with production values

# 2. Deploy
./scripts/deploy.sh production up

# Or manually:
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| API | 8080 | Spring Boot application |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache & sessions |
| pgAdmin | 5050 | Database admin (dev only) |
| Nginx | 80/443 | Reverse proxy (prod only) |

## Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down

# Rebuild images
docker-compose build --no-cache

# Access database
docker-compose exec postgres psql -U lms_user -d lms_db

# Access Redis CLI
docker-compose exec redis redis-cli

# Clean up everything
docker-compose down -v --remove-orphans
docker system prune -f
```

## File Structure

```
docker/
├── Dockerfile              # Production multi-stage build
├── Dockerfile.dev          # Development with hot reload
├── docker-compose.yml      # Base configuration
├── docker-compose.dev.yml  # Development overrides
├── docker-compose.prod.yml # Production overrides
├── .env.example            # Environment template
├── nginx/
│   └── nginx.conf          # Nginx reverse proxy config
├── init-scripts/
│   └── 01-init.sql         # Database initialization
├── scripts/
│   └── deploy.sh           # Deployment script
└── README.md               # This file
```

## Environment Variables

See `.env.example` for all available configuration options.

### Required for Production

- `POSTGRES_PASSWORD` - Secure database password
- `REDIS_PASSWORD` - Secure Redis password
- `JWT_SECRET` - 256-bit secret for JWT tokens
- `MAIL_USERNAME` / `MAIL_PASSWORD` - SMTP credentials

## Health Checks

- API: `http://localhost:8080/actuator/health`
- PostgreSQL: `pg_isready` command
- Redis: `redis-cli ping`

## SSL/TLS (Production)

1. Place certificates in `nginx/ssl/`:
   - `fullchain.pem`
   - `privkey.pem`

2. Or use Let's Encrypt with certbot

## Scaling

```bash
# Scale API instances
docker-compose up -d --scale api=3
```

## Troubleshooting

```bash
# Check container status
docker-compose ps

# View specific service logs
docker-compose logs -f postgres

# Restart a service
docker-compose restart api

# Check container resources
docker stats
```
