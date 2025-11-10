API Gateway (simple Express proxy)

This gateway forwards:
- /api/auth -> auth-service at http://localhost:3001/api/auth
- /api/* -> admin-service at http://localhost:3000/api/*

Quick start:

1. cd backend/api-gateway
2. npm install
3. npm start

Gateway listens on port 4000 by default. Adjust `PORT` environment variable to change it.
