const express = require('express');
const path = require('path');
const { createBareServer } = require('@tomphttp/bare-server-node');
const { UVRequestHandler } = require('@titaniumnetwork-dev/ultraviolet');

const app = express();
const http = require('http');
const bare = createBareServer('/bare/');

const server = http.createServer((req, res) => {
    if (bare.shouldRoute(req)) return bare.routeRequest(req, res);
    app(req, res);
});

const uvHandler = new UVRequestHandler();

app.use('/uv/', uvHandler.middleware);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});