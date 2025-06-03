import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, '..', 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = createServer(async (req, res) => {
  try {
    const url = req.url === '/' ? '/index.html' : req.url;
    const filePath = join(PUBLIC_DIR, url);
    const ext = url.split('.').pop();
    const contentType = MIME_TYPES['.' + ext] || 'text/plain';
    
    const content = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      const notFoundPage = await readFile(join(PUBLIC_DIR, '404.html'));
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(notFoundPage);
    } else {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
