# Frontend <-> Backend Handoff Documentation

## Overview
The frontend application has been containerized and configured to communicate with the backend exclusively via the internal Docker network.

## Network Configuration

### 1. Internal API URL
- **Environment Variable**: `INTERNAL_API_URL`
- **Default Value**: `http://backend:3001`
- **Scope**: Server-side only (Next.js Server Actions & Route Handlers).
- **Behavior**: The frontend proxies requests to this URL. The browser **never** connects to this URL directly.

### 2. Frontend Service Definition (Expected)
The frontend expects to run in a Docker Compose environment similar to this:

```yaml
services:
  frontend:
    # ... build context ...
    environment:
      - INTERNAL_API_URL=http://backend:3001 # Points to the backend service name
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

## Backend Requirements

To ensure successful integration, the backend agent should ensure:

1.  **Service Name**: The backend service in `docker-compose.yml` should be named `backend` (or `INTERNAL_API_URL` must be updated to match).
2.  **Internal Port**: The backend must listen on or expose port `3001` to the internal Docker network.
3.  **Endpoints**:
    - The frontend currently expects:
        - `POST /predict` (Single prediction)
        - `POST /batch_predict` (Batch prediction - JSON & File Upload)

## API Usage Reference
*From `app/actions.ts` and `app/api/proxy/upload/route.ts`*

- **Single Prediction**:
  `POST http://backend:3001/predict`
  Body: `{ "smiles": "..." }`

- **Batch Prediction**:
  `POST http://backend:3001/batch_predict`
  Body: `{ "smiles_list": [...] }`
  *OR*
  Multipart/FormData (File Upload)
