
import { loginUser, registerUser } from '../services/auth.service.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function register(req, res, next) {
  try {
    const { email, password } = req.body ?? {};

    const normalizedEmail =
      typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        message: 'Вкажіть коректну адресу електронної пошти.'
      });
    }

    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({
        message: 'Пароль повинен містити щонайменше 8 символів.'
      });
    }

    const user = await registerUser(normalizedEmail, password);

    return res.status(201).json({
      message: 'Реєстрація успішна.',
      user
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body ?? {};

    const normalizedEmail =
      typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!isValidEmail(normalizedEmail) ||
        typeof password !== 'string' ||
        !password) {
      return res.status(400).json({
        message: 'Вкажіть коректний email і пароль.'
      });
    }

    const result = await loginUser(normalizedEmail, password);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}
