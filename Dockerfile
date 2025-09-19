# Use Node.js 18 Alpine base image (supports multiple platforms)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Secure: Create non-root user and switch
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

# Expose your app's port
EXPOSE 5500

#Add a HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://pos-merchant:5500/pos-merchant/health || exit 1

# Start the app
CMD ["node", "index.js"]