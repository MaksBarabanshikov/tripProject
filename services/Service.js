import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, SECRET_KEY, {expiresIn: '24h'});
}; // генерация токена авторизации

class Service {
  async registration(email, password) { // запрос в бд при регистации
    const candidate = await User.findOne({email}); // поиск пользовтеля по email
    if (candidate) {
      throw 'Пользователь уже существует';
    }
    const hashPassword = bcryptjs.hashSync(password, 3) // хеширование пароля
    const user = await User.create({
      email,
      password: hashPassword,
    }); // создание пользователя
    return user;
  }

  async login(email, password) { // запрос в бд при авторизации
    const user = await User.findOne({email}); // поиск пользовтеля по email
    if (!user) {
      throw `Пользователь ${email} не найден`;
    }

    const validPassword = bcryptjs.compareSync(password, user.password); // проверка пароля
    if (!validPassword) {
      throw 'Не верный пароль';
    }

    const token = generateAccessToken(user._id); // генерация токена
    return token;
  }

  async addCourse(userId, courseId) { // запрос в бд для добавления курсов
    const user = await User.findOne({_id: userId}); // поиск пользователя по id
    const [...courses] = new Set([...user.courses, ...courseId]); // добавление курсов
    user.courses = courses;
    await user.save(); // сохранание данных
    return user
  }

  async getUser(userId) { // получение пользователя по id
    const user = await User.findOne({_id: userId});
    return user
  }
}

export default new Service();