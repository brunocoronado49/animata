import { envs } from './config/envs';
import { Server } from './presentation';

(() => {
  main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
  });

  server.startServer();
}
