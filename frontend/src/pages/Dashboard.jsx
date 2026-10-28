import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api.js';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    apiRequest('/users/me')
      .then(data => { if (active) setUser(data.user); })
      .catch(err => {
        if (!active) return;
        setError(err.message);
        if (err.message.toLowerCase().includes('токен') || err.message.toLowerCase().includes('авторизац')) {
          sessionStorage.removeItem('medcard_token');
          navigate('/login', { replace: true });
        }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [navigate]);

  function logout() {
    sessionStorage.removeItem('medcard_token');
    navigate('/login', { replace: true });
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">✚</span><span>MedCard</span></div>
        <p className="nav-label">МЕНЮ</p>
        <div className="nav-item active"><span>▦</span> Огляд</div>
        <div className="nav-item muted-nav"><span>▤</span> Медична картка <small>скоро</small></div>
        <div className="nav-item muted-nav"><span>♡</span> Призначення <small>скоро</small></div>
        <div className="sidebar-bottom"><div className="support-icon">?</div><div><b>Потрібна допомога?</b><small>MedCard · MVP</small></div></div>
      </aside>
      <main className="dashboard-main">
        <header className="topbar"><div><span className="breadcrumb">MedCard /</span> Огляд</div><button className="logout-button" onClick={logout}>Вийти <span>↗</span></button></header>
        <section className="welcome-row"><div><p className="eyebrow">ОСОБИСТИЙ ПРОСТІР</p><h1>Вітаємо у MedCard<span className="wave"> 👋</span></h1><p className="muted">Ваше здоров’я — важливе. Почнімо з головного.</p></div><div className="date-chip"><span>◷</span> Особистий кабінет</div></section>
        <section className="status-banner"><div className="banner-icon">✚</div><div><b>Ваш простір здоров’я</b><p>Тут зберігатиметься історія візитів, рецепти та графік прийому ліків.</p></div><div className="banner-decoration">✧</div></section>
        <div className="section-heading"><div><h2>Стан облікового запису</h2><p className="muted">Дані отримані з Core API</p></div><span className="live-status"><i></i> API підключено</span></div>
        <section className="info-grid">
          <article className="info-card profile-card"><div className="card-top"><span className="card-icon lavender">♙</span><span className="card-kicker">ПРОФІЛЬ</span></div><h3>Поточний користувач</h3>{loading ? <p className="muted">Завантаження профілю…</p> : user ? <><p className="user-email">{user.email}</p><div className="detail-row"><span>ID користувача</span><code>{user.id}</code></div><div className="detail-row"><span>Роль</span><b>{user.role === 'PATIENT' ? 'Пацієнт' : user.role}</b></div><div className="detail-row"><span>Створено</span><b>{new Date(user.createdAt).toLocaleDateString('uk-UA')}</b></div></> : <p className="error-message">{error || 'Не вдалося завантажити профіль.'}</p>}</article>
          <article className="info-card"><div className="card-top"><span className="card-icon mint">✓</span><span className="card-kicker">БЕЗПЕКА</span></div><h3>Авторизація</h3><p className="muted">Запит до приватного маршруту виконується з JWT у заголовку Authorization.</p><div className="security-state"><span className="security-check">✓</span><div><b>{user ? 'Сесію підтверджено' : loading ? 'Перевіряємо сесію' : 'Потрібна перевірка'}</b><small>GET /api/v1/users/me</small></div></div></article>
          <article className="info-card"><div className="card-top"><span className="card-icon peach">♡</span><span className="card-kicker">НАСТУПНІ КРОКИ</span></div><h3>Медична картка</h3><p className="muted">Базовий каркас готовий до підключення модулів візитів, рецептів і нагадувань.</p><div className="progress-line"><span></span></div><small className="progress-label">Етап 1 · Базова авторизація</small></article>
        </section>
        <footer className="dashboard-footer"><span>© MedCard · Навчальний MVP</span><span><i></i> Захищене з’єднання API</span></footer>
      </main>
    </div>
  );
}
