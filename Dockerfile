# Use an official Node runtime as a parent image
FROM node:18 as build-stage

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the content of the local src directory to the working directory
COPY . .

# COPY tnc.html .
# COPY privacy_policy.html .

RUN apt-get update && apt-get install -y tzdata
ENV TZ=Asia/Kolkata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone


# Build the Vue.js app
RUN npm run build

# Use NGINX as the base image for the production image
FROM nginx:1.21-alpine

# COPY tnc.html /usr/share/nginx/html/
# COPY privacy_policy.html /usr/share/nginx/html/

# Copy the build output to the NGINX public directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]