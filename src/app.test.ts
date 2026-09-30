import { AddressInfo } from 'net';
import { Server } from 'http';
import { createApp } from './app';

async function withServer(
  run: (baseUrl: string) => Promise<void>
): Promise<void> {
  const server: Server = createApp().listen(0);
  const { port } = server.address() as AddressInfo;

  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

describe('GET /health', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = originalEnv;
    }
  });

  it('reports the development environment', async () => {
    process.env.NODE_ENV = 'development';

    await withServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/health`);

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({
        status: 'ok',
        environment: 'development',
        message: 'Server is running',
      });
    });
  });

  it('reports the production environment', async () => {
    process.env.NODE_ENV = 'production';

    await withServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/health`);
      const body = await response.json();

      expect(body.environment).toBe('production');
    });
  });
});
