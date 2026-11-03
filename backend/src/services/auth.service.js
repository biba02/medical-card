
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';

function createHttpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function registerUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (existing) {
    throw createHttpError(
      'Користувач із таким email уже існує.',
      409
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    return await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw createHttpError(
        'Користувач із таким email уже існує.',
        409
      );
    }

    throw error;
  }
}

export async function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw createHttpError(
      'Неправильний email або пароль.',
      401
    );
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

  const accessToken = jwt.sign(
    {
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn
    }
  );

  return {
    accessToken,
    tokenType: 'Bearer',
    expiresIn,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
}
