# Specify a base image
FROM node:12.13.0-alpine AS alpine
WORKDIR /usr/src/app
# Install dependencies
COPY package*.json ./
RUN npm install 
COPY . .
# Default command
CMD ["npm", "run", "start"]