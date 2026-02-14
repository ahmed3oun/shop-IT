# Use the exact Node.js version your project needs (v16 for compatibility)
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# USER node

# Copy package files first (better for Docker caching)
# COPY --chown=node:node package*.json ./
COPY package*.json ./

# Install dependencies
# RUN npm install --legacy-peer-deps
# RUN npm install
RUN npm install --legacy-peer-deps && \
    chmod -R 755 node_modules/.bin

# Copy the rest of the application code
COPY . .


# Fix execute permissions for react-scripts
# RUN chmod +x node_modules/.bin/*
# The port the app will run on
# EXPOSE 3000

# Start the development server
# CMD [   "npm", "start"]
CMD ["npx", "react-scripts", "start"]