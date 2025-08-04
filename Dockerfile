# ---- Build Stage ----
# Use a specific Node.js version for the build environment
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json ONLY to force a clean install from the package file
# This avoids potential conflicts with package-lock.json
COPY package.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application for production
RUN npm run build

# ---- Production Stage ----
# Use a lightweight Nginx image for the final production environment
FROM nginx:stable-alpine

# Copy the static build files from the 'build' stage to the Nginx server directory
COPY --from=build /app/build /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Expose port 80 for the Nginx server
EXPOSE 80

# The command to start the Nginx server when the container launches
CMD ["nginx", "-g", "daemon off;"]
