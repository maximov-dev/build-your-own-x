import { UnexpectedError } from "../error/index.js";
import { HTTP_METHODS } from "./methods.js";

export class Router {
    constructor() {
        this.routes = {};
    };

    request(method = 'GET', path, handler) {
        if (!this.routes[path]) {
            this.routes[path] = {};
        }

        const endpoint = this.routes[path];

        if (endpoint[method]) {
            throw new UnexpectedError(`[${method}] ${path} already exists`);
        }


        endpoint[method] = handler;
    }

    get(path, handler) {
        this.request(HTTP_METHODS.GET, path, handler);
    }

    post(path, handler) {
        this.request(HTTP_METHODS.POST, path, handler);
    }

    put(path, handler) {
        this.request(HTTP_METHODS.PUT, path, handler);
    }

    delete(path, handler) {
        this.request(HTTP_METHODS.DELETE, path, handler);
    }
}