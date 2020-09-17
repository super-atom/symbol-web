import next from 'next';
import express from 'express';
import spdy from 'spdy';
import compression from 'compression';
import path from 'path';
import fs from 'fs';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const certPath = path.resolve(path.join('/etc/ssl/certs/super-atom.com.pem'));
const keyPath = path.resolve(path.join('/etc/ssl/private/super-atom.com.key'));
const options: spdy.ServerOptions = {
    cert: fs.readFileSync(certPath, 'utf8'),
    key: fs.readFileSync(keyPath, 'utf8'),
};

const shouldCompress = (req, res) => {
    // don't compress responses asking explicitly not
    if (req.headers['x-no-compression']) {
        return false
    }

    // use compression filter function
    return compression.filter(req, res)
}

app.prepare().then(() => {
    // create the express app
    const expressApp = express();

    // set up compression in express
    expressApp.use(compression({ filter: shouldCompress }));

    // declaring routes for our pages
    expressApp.get('/', (req: express.Request, res: express.Response) => {
        return app.render(req, res, '/',)
    });

    // fallback all request to next request handler
    expressApp.all('*', (req, res) => {
        return handle(req, res)
    });

    // start the HTTP/2 server with express
    spdy.createServer(options, expressApp).listen(port);
})
