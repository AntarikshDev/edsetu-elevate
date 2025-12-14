#!/bin/bash

# ===========================================
# LMS Backend Deployment Script
# ===========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT=${1:-development}
COMPOSE_FILE="docker-compose.yml"

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  LMS Backend Deployment Script${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

# Check for required files
check_requirements() {
    echo -e "${YELLOW}Checking requirements...${NC}"
    
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}Error: Docker is not installed${NC}"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}Error: Docker Compose is not installed${NC}"
        exit 1
    fi
    
    if [ ! -f ".env" ]; then
        echo -e "${YELLOW}Warning: .env file not found. Copying from .env.example...${NC}"
        cp .env.example .env
        echo -e "${RED}Please update .env with your configuration before running again.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ All requirements met${NC}"
}

# Set environment-specific compose files
setup_environment() {
    echo -e "${YELLOW}Setting up ${ENVIRONMENT} environment...${NC}"
    
    case $ENVIRONMENT in
        development|dev)
            COMPOSE_FILE="docker-compose.yml -f docker-compose.dev.yml"
            PROFILE="--profile development"
            ;;
        production|prod)
            COMPOSE_FILE="docker-compose.yml -f docker-compose.prod.yml"
            PROFILE="--profile production"
            ;;
        *)
            echo -e "${RED}Unknown environment: ${ENVIRONMENT}${NC}"
            echo "Usage: $0 [development|production]"
            exit 1
            ;;
    esac
    
    echo -e "${GREEN}✓ Environment: ${ENVIRONMENT}${NC}"
}

# Build images
build_images() {
    echo -e "${YELLOW}Building Docker images...${NC}"
    docker-compose -f $COMPOSE_FILE build --no-cache
    echo -e "${GREEN}✓ Images built successfully${NC}"
}

# Start services
start_services() {
    echo -e "${YELLOW}Starting services...${NC}"
    docker-compose -f $COMPOSE_FILE $PROFILE up -d
    echo -e "${GREEN}✓ Services started${NC}"
}

# Wait for services to be healthy
wait_for_health() {
    echo -e "${YELLOW}Waiting for services to be healthy...${NC}"
    
    # Wait for PostgreSQL
    echo -n "  PostgreSQL: "
    until docker-compose -f $COMPOSE_FILE exec -T postgres pg_isready -U lms_user > /dev/null 2>&1; do
        echo -n "."
        sleep 2
    done
    echo -e "${GREEN}Ready${NC}"
    
    # Wait for Redis
    echo -n "  Redis: "
    until docker-compose -f $COMPOSE_FILE exec -T redis redis-cli ping > /dev/null 2>&1; do
        echo -n "."
        sleep 2
    done
    echo -e "${GREEN}Ready${NC}"
    
    # Wait for API
    echo -n "  API: "
    until curl -sf http://localhost:8080/actuator/health > /dev/null 2>&1; do
        echo -n "."
        sleep 5
    done
    echo -e "${GREEN}Ready${NC}"
    
    echo -e "${GREEN}✓ All services are healthy${NC}"
}

# Show status
show_status() {
    echo ""
    echo -e "${GREEN}=========================================${NC}"
    echo -e "${GREEN}  Deployment Complete!${NC}"
    echo -e "${GREEN}=========================================${NC}"
    echo ""
    echo -e "Services running:"
    docker-compose -f $COMPOSE_FILE ps
    echo ""
    echo -e "Access points:"
    echo -e "  - API:        ${GREEN}http://localhost:8080${NC}"
    echo -e "  - Swagger UI: ${GREEN}http://localhost:8080/swagger-ui.html${NC}"
    echo -e "  - Health:     ${GREEN}http://localhost:8080/actuator/health${NC}"
    
    if [ "$ENVIRONMENT" = "development" ] || [ "$ENVIRONMENT" = "dev" ]; then
        echo -e "  - pgAdmin:    ${GREEN}http://localhost:5050${NC}"
        echo -e "  - Debug Port: ${GREEN}localhost:5005${NC}"
    fi
    echo ""
}

# Cleanup function
cleanup() {
    echo -e "${YELLOW}Cleaning up...${NC}"
    docker-compose -f $COMPOSE_FILE down -v --remove-orphans
    docker system prune -f
    echo -e "${GREEN}✓ Cleanup complete${NC}"
}

# Main execution
main() {
    check_requirements
    setup_environment
    
    case ${2:-up} in
        up)
            build_images
            start_services
            wait_for_health
            show_status
            ;;
        down)
            docker-compose -f $COMPOSE_FILE down
            echo -e "${GREEN}✓ Services stopped${NC}"
            ;;
        restart)
            docker-compose -f $COMPOSE_FILE restart
            wait_for_health
            show_status
            ;;
        logs)
            docker-compose -f $COMPOSE_FILE logs -f ${3:-}
            ;;
        cleanup)
            cleanup
            ;;
        *)
            echo "Usage: $0 [environment] [up|down|restart|logs|cleanup]"
            exit 1
            ;;
    esac
}

main "$@"
