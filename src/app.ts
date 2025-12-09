import express from 'express';
import path from 'path';
import messageRouter from './routes/messageRouter';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const viewsPath = path.join(__dirname, "../views");
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(express.static(publicPath));
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));

app.use("/", messageRouter);

export default app;