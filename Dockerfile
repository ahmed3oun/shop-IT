
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source
COPY . .

# RUN cd frontend && npm install && npm run build
RUN npm install --prefix frontend && npm run build --prefix frontend*

# ENV NODE_ENV=PRODUCTION

CMD [ "npm", "run", "prod" ]


