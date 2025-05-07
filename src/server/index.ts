import { readFile } from "fs/promises";

Bun.serve({
  port: 3000,
  async fetch(req: Request) {
    const url = new URL(req.url);

    // Статические файлы
    if (url.pathname === '/') {
      return new Response(Bun.file('src/public/index.html'));
    }

    if (url.pathname.startsWith('/public/')) {
      return new Response(Bun.file(`src${url.pathname}`));
    }

    // API эндпоинт для получения данных резюме
    if (url.pathname === '/api/resume') {
      try {
        const data = await readFile('src/data/resume.json', 'utf-8');
        return new Response(data, { headers: { 'Content-Type': 'application/json' } });
      } catch {
        return new Response('Not Found', { status: 404 });
      }
    }

    return new Response('Not Found', { status: 404 });
  },
});

console.log('Сервер запущен на http://localhost:3000');