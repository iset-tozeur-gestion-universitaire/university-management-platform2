const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Auth service proxy
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    logLevel: 'info',
    pathRewrite: { '^/api/auth': '/api/auth' },
  }),
);

// Admin service proxy
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    logLevel: 'info',
    pathRewrite: { '^/api': '/api' },
  }),
);

app.get('/', (req, res) => {
  res.send(`✅ API Gateway is running:
- /api/auth → http://localhost:3001/api/auth
- /api → http://localhost:3000/api`);
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway listening on http://localhost:${PORT}`);
});
