import express from 'express';
import path from 'path';

interface ServerOptions {
  port: number;
  publicPath?: string;
}

export class Server {
  public readonly app = express();

  private readonly port: number;
  private readonly publicPath: string;
  private serverListener?: any;

  constructor(options: ServerOptions) {
    const { port, publicPath = 'public' } = options;
    this.port = port;
    this.publicPath = publicPath;
  }

  public async startServer() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.static(this.publicPath));

    this.app.get('/', (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`,
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
