# Building Stage
FROM node:14 AS builder

WORKDIR /app


RUN npm config set registry https://registry.npmjs.org/

# Copy package files first and install dependencies (leveraging Docker cache)
COPY package*.json ./

RUN npm cache clean --force

# Use npm install with --legacy-peer-deps to handle any peer dependency issues
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copy the rest of your application files
COPY . .

# Build the React application
RUN npm run build  

# Serving Stage
FROM node:14

WORKDIR /app

# Install serve globally to serve static files
RUN npm install -g serve

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist

# Serve the application on the specified port
CMD ["serve", "-s", "dist", "-l", "5424"]
