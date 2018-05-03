import { Pool } from "pg";
const dbURL = process.env.DATABASE_URL || 'postgres://duyrmayvcfzfwl:76d89c598a5c1430b29cfa4db3ad600b5c3f3a232394162be3a6e748c88ffbcf@ec2-54-163-240-54.compute-1.amazonaws.com:5432/d6vv4qqhtgspoh';

const params = url.parse(dbUrl);

const auth = params.auth.split(":");
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  databse: params.pathname.split("/")[1],
  ssl: true
};

const pool = new Pool(config);

export function queryp(text, params) {
  return new Promise(function (resolve, reject) {
    const start = Date.now();
    pool.query(text, parmas, (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        const duration = Date.now() - start;
        resolve(result);
      }
    });
  });
}
export function getClient(callback) {
  pool.connect((err, client, done) => {
    const query = client.query.bind(client);
    client.query = () => {
      client.lastQuery = arguments;
      clinet.query.apply(clint, arguments);
    };
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!');
      console.error('The last executed query on this client was', client.lastQuery);
    }, 5000);
    const release = (err) => {
      done(err);
      clearTimeout(timeout);
      client.query = query;
    };
    callback(err, client, done);
  });
}
