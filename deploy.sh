#!/bin/bash

# 1. Create .env from example if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file from example..."
  cp .defaultenv.example .env
else
  echo ".env already exists. Skipping creation."
fi

# 2. Copy .env to backend and frontend directories
echo "Copying .env to project directories..."
cp .env backend/.env
cp .env frontend/.env

# 3. Build and run production containers
echo "Starting production environment..."
docker-compose -f docker-compose.prod.yml up --build

# Check for errors
if [ $? -eq 0 ]; then
  echo "Deployment completed successfully!"
else
  echo "Deployment failed. Check the logs above for errors."
  exit 1
fi