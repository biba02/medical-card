
import { loginUser, registerUser } from '../services/auth.service.js';

const MAX_EMAIL_LENGTH = 254;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

function isValidEmail(email) {
  return (
    email.length <= MAX_EMAIL_LENGTH &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

export async function register(req, res, next) {
  try {
    const { email, password } = req.body ?? {};

    const normalizedEmail =
      typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        message: 'Вкажіть коректну адресу електронної пошти (до 254 символів).'
      });
    }

    if (
      typeof password !== 'string' ||
      password.length === 0 ||
      password.length > 128
    ) {
      return res.status(400).json({
        message: 'Пароль повинен містити від 8 до 128 символів.'
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

    if (
      !isValidEmail(normalizedEmail) ||
      typeof password !== 'string' ||
      !password
    ) {
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
