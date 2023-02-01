import { createServer } from 'http'
import { EventEmitter } from 'events'

export class App {
    constructor() {
        this.eventEmitter = new EventEmitter();
        this.server = this.#createServer()
        this.middlewares = [];
    }

    listen(port = 8080, callback) {
        this.server.listen(port, callback);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    addRouter(router) {
        Object.keys(router.routes).forEach((path) => {
            const endpoint = router.routes[path];

            Object.keys(endpoint).forEach((method) => {
                const handler = endpoint[method];
                const eventName = this.#getRouteMask(path, method);

                this.eventEmitter.on(eventName, (req, res) => {
                    this.middlewares.forEach((middleware) => middleware(req, res));
                    handler(req, res);
                });
            });
        })
    }

    #createServer() {
        return createServer((req, res) => {
            const emitterd = this.eventEmitter.emit(this.#getRouteMask(req.url, req.method), req, res);

            if (!emitterd) {
                res.end();
            }
        })
    }

    #getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }

}