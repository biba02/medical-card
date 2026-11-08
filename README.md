# MedCard — Електронна медична картка

> MVP командного проєкту з дисципліни «Проєктний практикум». Вебзастосунок для зручного зберігання та перегляду особистої медичної інформації.

**Deployment Status:** [Live Demo](https://medical-card-1.onrender.com)

**Repository:** [GitHub](https://github.com/biba02/medical-card)

---

## Про проєкт

**MedCard** — вебзастосунок для ведення електронної медичної картки. Система дозволяє користувачам реєструватися, авторизуватися, додавати та переглядати історію відвідувань лікарів, зберігати діагнози й рекомендації.

**Демо-версія (Live URL):** https://medical-card-1.onrender.com

**Технологічний стек:** Node.js, Express, PostgreSQL, Prisma ORM, React.js, Vite, JWT, Render.

---

## Інструкція з локального розгортання (Deployment Instructions)

### 1. Системні вимоги

- Node.js 18 або вище (сумісна версія).
- PostgreSQL.
- npm.
- Git.

### 2. Клонування репозиторію

```bash
git clone https://github.com/biba02/medical-card.git
cd medical-card
git switch release/v1.0.0
```

### 3. Налаштування змінних середовища (.env)

У папці `backend` створіть файл `.env` за зразком `.env.example`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/medcard?schema=public"
JWT_SECRET="your_long_random_secret"
JWT_EXPIRES_IN="1h"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

У папці `frontend` створіть файл `.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Паролі та секретні ключі необхідно замінити власними значеннями. Файли `.env` не повинні потрапляти до GitHub.

### 4. Встановлення залежностей та запуск

**Backend:**

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Перед запуском необхідно створити базу даних PostgreSQL `medcard`.

**Frontend (в окремому терміналі, з кореня проєкту):**

```bash
cd frontend
npm install
npm run dev -- --port 3000
```

Після запуску застосунок буде доступний за адресою:

http://localhost:3000

---

## Посібник користувача (User Guide)

1. **Реєстрація:** перейдіть на сторінку реєстрації, введіть електронну адресу та пароль, натисніть «Створити акаунт».
2. **Авторизація:** введіть email і пароль на сторінці входу та натисніть «Увійти».
3. **Особистий кабінет:** переглядайте інформацію про свій обліковий запис.
4. **Медична картка:** відкрийте розділ «Медична картка», заповніть форму візиту до лікаря та натисніть «Додати візит».
5. **Історія візитів:** переглядайте збережені записи, оновлюйте список або видаляйте непотрібні візити.
6. **Вихід:** натисніть кнопку «Вийти» для завершення сеансу.

---

## Склад команди розробників

- **Захаревич Вікторія** — Product Owner
- **Зіньків Софія** — Scrum Master
- **Кіт Аліна** — Frontend Developer
- **Яворська Марія** — Backend Developer
- **Рибіцька Анастасія** — Full-Stack Developer
- **Пападічєв Руслан** — QA Engineer

---

**Версія проєкту:** 1.0.0

**Статус:** MVP розгорнуто на Render.