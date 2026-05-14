# ShopIT E-commerce Project

> Complete E-commerce site built with Node.js, React, Redux, Express, MongoDB

### Env Variables

Add your config variables values in the config.env file in backend/config folder as shown in the course.

### Install Dependencies (Frontend)

```
cd frontend
npm i
```

### Install Dependencies (Backend)

```
npm i
```

### Seed Database

Use the following commeand to put some dummy products in that database.
Run it in the root folder.

```
npm run seeder
```



- Build and start containers (first run will install dependencies):

```bash
docker-compose -f docker-compose.yml up --build
```

- Backend dev server will be available at: http://localhost:4000
- Frontend dev server will be available at: http://localhost:3000

Notes
- The frontend's `package.json` currently proxies API requests to `http://127.0.0.1:4000`.
  - When the frontend runs inside Docker it should proxy to the backend service name `http://backend:4000`.
  - Easiest options:
    - Edit `frontend/package.json` `proxy` value to `http://backend:4000` for dockerized development.
    - Or run the frontend locally (outside Docker) to keep the proxy as `127.0.0.1:4000`.
