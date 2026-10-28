
import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (typeof header !== 'string') {
    return res.status(401).json({
      message: 'Потрібна авторизація: відсутній Bearer-токен.'
    });
  }

  const match = header.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    return res.status(401).json({
      message: 'Некоректний формат заголовка авторизації.'
    });
  }

  const token = match[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof payload !== 'object' ||
      payload === null ||
      typeof payload.sub !== 'string' ||
      !payload.sub ||
      typeof payload.email !== 'string' ||
      !payload.email
    ) {
      return res.status(401).json({
        message: 'Токен не містить необхідних даних користувача.'
      });
    }

    req.user = {
      id: payload.sub,
      email: payload.email
    };

    return next();
  } catch {
    return res.status(401).json({
      message: 'Недійсний або прострочений токен.'
    });
  }
}
