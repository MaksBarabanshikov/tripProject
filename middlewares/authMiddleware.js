import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export default function (req, res, next) { // проверка токена польвателя
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'пользователь не аторизован' });
    }
    const decodedData = jwt.verify(token, SECRET_KEY);
    req.user = decodedData;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'пользователь не аторизован' });
  }
}