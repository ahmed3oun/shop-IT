Development Docker instructions

- Build and start containers (first run will install dependencies):

```bash
docker-compose -f docker-compose.dev.yml up --build
```

- Backend dev server will be available at: http://localhost:4000
- Frontend dev server will be available at: http://localhost:3000

Notes
- The frontend's `package.json` currently proxies API requests to `http://127.0.0.1:4000`.
  - When the frontend runs inside Docker it should proxy to the backend service name `http://backend:4000`.
  - Easiest options:
    - Edit `frontend/package.json` `proxy` value to `http://backend:4000` for dockerized development.
    - Or run the frontend locally (outside Docker) to keep the proxy as `127.0.0.1:4000`.
