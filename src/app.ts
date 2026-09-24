import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AppRoutes, Server } from './presentation';

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUri: envs.MONGO_URL,
    dbName: envs.MONGODB_NAME,
  });

  const server = new Server({
    port: envs.PORT,
    router: AppRoutes.routes,
  });

  await server.startServer();
}
