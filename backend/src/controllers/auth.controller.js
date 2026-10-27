import { loginUser, registerUser } from '../services/auth.service.js';

export async function register(req, res, next) {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ message: 'Вкажіть коректний email і пароль довжиною щонайменше 8 символів.' });
    }
    const user = await registerUser(email, password);
    return res.status(201).json({ message: 'Реєстрація успішна.', user });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
      return res.status(400).json({ message: 'Email і пароль обов’язкові.' });
    }
    const result = await loginUser(email, password);
    return res.json(result);
  } catch (error) {
    next(error);
  }
}
