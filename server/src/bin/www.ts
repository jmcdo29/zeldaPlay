import * as http from 'http';
import { app } from '../server';

const port = process.env.PORT;

const httpServer = http.createServer(app);
httpServer.listen(port);
