import Service from "../services/Service.js";
import {validationResult} from "express-validator";
import e from "express";

class Controller {
  async registration(req, res) { // обработчик регистрации
    try {
      const errors = validationResult(req); // проверка ошибок

      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'ошибка при регистрации', errors}) // если есть ошибки
      }

      const {email, password} = req.body; // данные из тела запроса
      const user = await Service.registration(email, password); // запрос в бд
      res.status(200).json(user); // возвращает пользователя
    } catch (err) {
      res.status(500).json({message: err}); // возвращает ошибку
    }
  }

  async login(req, res) { // обработчик авторизации
    try {
      const {email, password} = req.body; // данные из тела запроса
      const token = await Service.login(email, password); // запрос в бд
      res.status(200).json({token: token}); // возвращает токен
    } catch (err) {
      res.status(404).json({message: err}); // возвращает ошибку
    }
  }

  async addCourse(req, res) { // обработчик добавления курсов
    try {
      const {id: courseId} = req.body; // получение данных из тела запроса
      const {id: userId} = req.user; // получение id пользователя
      const user = await Service.addCourse(userId, courseId); // запрос в бд
      res.status(200).json(user); // возращает пользователя
    } catch (err) {
      res.status(500).json({message: err}); // возращает ошибку
    }
  }

  async getUser(req, res) { // обработчик получения пользователя
    try {
      const {id: userId} = req.user; // получение id пользователя
      const user = await Service.getUser(userId); // запрос в бд
      res.status(200).json(user); // возращает пользователя
    } catch (err) {
      res.status(500).json({message: err}); // возращает ошибку
    }
  }
}

export default new Controller();
