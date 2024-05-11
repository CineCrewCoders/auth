FROM oven/bun:latest as base
WORKDIR /app

# Copy package.json and bun.lockb from auth directory
COPY ./auth/package.json ./auth/bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the auth directory
COPY ./auth .

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["bun", "run", "src/server.ts"]
