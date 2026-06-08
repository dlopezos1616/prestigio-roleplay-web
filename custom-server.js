const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev: false });
const handle = app.getRequestHandler();

// Capture ALL possible exit reasons
process.on('exit', (code) => {
  console.error(`[${new Date().toISOString()}] Process exiting with code: ${code}`);
  console.trace('Exit trace');
});

process.on('SIGTERM', (signal) => {
  console.error(`[${new Date().toISOString()}] Received SIGTERM`);
});

process.on('SIGINT', (signal) => {
  console.error(`[${new Date().toISOString()}] Received SIGINT`);
});

process.on('SIGHUP', (signal) => {
  console.error(`[${new Date().toISOString()}] Received SIGHUP`);
});

process.on('uncaughtException', (err) => {
  console.error(`[${new Date().toISOString()}] Uncaught exception:`, err);
});

process.on('unhandledRejection', (err) => {
  console.error(`[${new Date().toISOString()}] Unhandled rejection:`, err);
});

app.prepare().then(() => {
  const server = createServer((req, res) => {
    console.log(`[${new Date().toISOString()}] Request: ${req.method} ${req.url}`);
    try {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl).catch(err => {
        console.error(`[${new Date().toISOString()}] Request handler error:`, err);
        if (!res.headersSent) {
          res.writeHead(500);
          res.end('Internal Server Error');
        }
      });
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Sync error in request:`, err);
      if (!res.headersSent) {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    }
  });

  server.on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Server error:`, err);
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`[${new Date().toISOString()}] Next.js production server running on http://0.0.0.0:${port}`);
  });

  // Keep alive
  setInterval(() => {
    console.log(`[${new Date().toISOString()}] Heartbeat`);
  }, 10000);
}).catch(err => {
  console.error(`[${new Date().toISOString()}] Failed to prepare Next.js:`, err);
  process.exit(1);
});
