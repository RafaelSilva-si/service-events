import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import router from './routes';

class App {
  public express: Express;
  public sequelize: Sequelize | undefined;

  constructor() {
    this.express = express();
    this.middlewares();
    this.setupRoutes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.express.use('/', router);
  }

  public start(port: number): void {
    this.express.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const app = new App();
const port = 3003;
app.start(port);
