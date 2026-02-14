FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps
# RUN npm install
COPY . .

# EXPOSE 4000
RUN npm run seeder

CMD ["npm", "run", "dev"]