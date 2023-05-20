import {Router} from "express";
import Controller from "../controllers/Controller.js";
import {check} from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router(); // Инициализация роута

router.post(
  '/registration',
  [
    check('email', 'email не может быть пустым').notEmpty(),
    check('email', 'не верный формат email').isEmail(),
  ], // валидация email
  Controller.registration // обработчик регистрации
); // точка входа регистрации

router.post(
  '/login',
  Controller.login // обработчик авторизации
); // точка входа авторизации

router.post(
  '/addCourse',
  authMiddleware, // проверка на авторизацию
  Controller.addCourse // обработчик добавления курсов
); // точка входа для добавления курсов

router.get(
  '/getUser',
  authMiddleware, // проверка на авторизацию
  Controller.getUser // обработчик получения пользователя
); // точка входа для получения пользователя

export default router;