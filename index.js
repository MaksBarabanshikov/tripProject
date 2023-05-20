import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import router from './router/router.js';
import cors from 'cors'
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config(); // Получение доступа к .env файлу
const PORT = process.env.PORT; // Переменная окружения PORT
const DB_CONN = process.env.DB_CONN; // Переменная окружения DB_CONN

const app = express(); // Инициализация Express
app
  .use(express.json())  // Поддержка json
  .use(cors())
  .use(express.static(__dirname + '/client/build/'))
  .use('/api', router); // Поддержка точек входа

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

async function connectMongo() {
  try {
    await mongoose.connect(process.env.DB_MONGO);
    console.log("Connected to Mongo");
  } catch (err) {
    throw err;
  }
}

mongoose.connection.on("disconnect", () => console.log("mongo is disconnect"));
mongoose.connection.on("connected", () => console.log("mongo is connected"));

async function startApp() {
  try {
    await connectMongo(); // Подключение к бд
    app.listen(PORT, () => console.log(`Server run on port: ${PORT}`)); // Запуск сервера
  } catch (err) {
    console.error(err); // Если произойдет ошибка
  }
}

startApp();