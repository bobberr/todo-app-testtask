import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { PrismaService } from '../src/todos/services/prisma.service';
import fs from 'fs';
import path from 'path';

describe('Todos E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testDbPath: string;

  beforeAll(async () => {
    const prismaDir = path.resolve(__dirname, '..', 'prisma');
    const sourceDbPath = path.join(prismaDir, 'dev.db');
    testDbPath = path.join(prismaDir, 'dev.test.e2e.db');

    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
    if (fs.existsSync(sourceDbPath)) {
      fs.copyFileSync(sourceDbPath, testDbPath);
    } else {
      fs.writeFileSync(testDbPath, '');
    }

    process.env.DATABASE_URL = `file:${testDbPath}`;

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.setGlobalPrefix('api');

    prisma = app.get(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    if (testDbPath && fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  it('GET /api/todos should return empty list initially', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/todos')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('POST /api/todos should validate body', async () => {
    await request(app.getHttpServer()).post('/api/todos').send({}).expect(400);
  });

  it('CRUD flow works', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/api/todos')
      .send({ title: 'Test todo', comment: 'note' })
      .expect(201);
    expect(createRes.body).toMatchObject({
      title: 'Test todo',
      comment: 'note',
      isDone: false,
    });
    const id = createRes.body.id;

    const listRes = await request(app.getHttpServer())
      .get('/api/todos')
      .expect(200);
    expect(listRes.body.length).toBe(1);

    const getRes = await request(app.getHttpServer())
      .get(`/api/todos/${id}`)
      .expect(200);
    expect(getRes.body.id).toBe(id);

    const updateRes = await request(app.getHttpServer())
      .put(`/api/todos/${id}`)
      .send({ title: 'Updated', isDone: true })
      .expect(200);
    expect(updateRes.body).toMatchObject({
      id,
      title: 'Updated',
      isDone: true,
    });

    await request(app.getHttpServer()).delete(`/api/todos/${id}`).expect(200);

    const afterDelete = await request(app.getHttpServer())
      .get('/api/todos')
      .expect(200);
    expect(afterDelete.body.length).toBe(0);
  });
});
