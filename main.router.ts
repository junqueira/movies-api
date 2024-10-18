import * as restify from 'restify';
import { Router   } from './common/router';

class MainRouter extends Router {
    applyRoutes(application: restify.Server) {
        application.get('/', (request, response, next) => {
            let result   = {
                app     : 'Golden Raspberry Awards API',
                version : '1.0.0'
            }

            response.json(result);
        });
    }
}

export const mainRouter = new MainRouter();
