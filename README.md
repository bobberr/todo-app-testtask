## To do Test task

This project consists of a **NestJS backend** and a **React frontend**, both running via Docker Compose.

## Requirements

- [Docker](https://www.docker.com/get-started) ≥ 20.x
- [Docker Compose](https://docs.docker.com/compose/) ≥ 1.29.x

To run the application, execute the following commands in order:

## Running the Application

1. **Build the containers without using cache**

```bash
docker-compose build --no-cache
```

2. **Run containers via docker-compose**

```bash
docker-compose up
```

3. Open http://localhost:5173 to test the application

## Testing

For end-to-end back-end testing enter backend directory and run:

```bash
npm run test:e2e
```
