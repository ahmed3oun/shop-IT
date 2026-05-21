
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source
COPY . .

RUN cd frontend && npm install --legacy-peer-deps && npm run build

CMD [ "npm", "run", "prod" ]


