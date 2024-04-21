FROM oven/bun:latest as base
WORKDIR /app/src

COPY package.json bun.lockb ./
RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run", "index.ts"]