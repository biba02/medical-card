import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api.js';

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const result = await apiRequest(`/auth/${isRegister ? 'register' : 'login'}`, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      if (isRegister) {
        navigate('/login', { replace: true, state: { notice: 'Акаунт створено. Тепер увійдіть у систему.' } });
      } else {
        sessionStorage.setItem('medcard_token', result.accessToken);
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Не вдалося виконати запит.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-visual">
        <div className="brand"><span className="brand-mark">✚</span><span>MedCard</span></div>
        <div className="visual-copy">
          <p className="eyebrow">ВАША МЕДИЧНА ІСТОРІЯ — ПОРУЧ</p>
          <h1>Здоров’я починається з турботи.</h1>
          <p>Зручний простір для вашої медичної картки, візитів та призначень.</p>
          <div className="visual-art" aria-hidden="true">
            <div className="art-card card-one"><span>♥</span><b>Турбота щодня</b><small>Усе важливе в одному місці</small></div>
            <div className="art-cross">+</div>
            <div className="art-card card-two"><span className="pulse">⌁</span><b>MedCard</b><small>Ваша історія здоров’я</small></div>
          </div>
        </div>
        <p className="visual-footer">MedCard · Електронна медична картка</p>
      </section>
      <section className="auth-panel">
        <div className="mobile-brand brand"><span className="brand-mark">✚</span><span>MedCard</span></div>
        <div className="auth-card">
          <span className="pill"><span className="status-dot"></span> БЕЗПЕЧНИЙ ДОСТУП</span>
          <h2>{isRegister ? 'Створіть акаунт' : 'Раді вас бачити!'}</h2>
          <p className="muted">{isRegister ? 'Зареєструйтеся, щоб зберігати важливу медичну інформацію.' : 'Увійдіть, щоб перейти до вашої медичної картки.'}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <label htmlFor="password">Пароль</label>
            <input id="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder="Щонайменше 8 символів" value={password} onChange={e => setPassword(e.target.value)} minLength={isRegister ? 8 : 1} required />
            {error && <p className="error-message" role="alert">{error}</p>}
            <button className="primary-button" type="submit" disabled={busy}>{busy ? 'Зачекайте…' : isRegister ? 'Створити акаунт' : 'Увійти'} <span>→</span></button>
          </form>
          <p className="auth-switch">{isRegister ? 'Уже маєте акаунт?' : 'Ще не маєте акаунта?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Увійти' : 'Зареєструватися'}</Link></p>
          <p className="privacy-note"><span>▣</span> Ваші дані захищені. Паролі не зберігаються у відкритому вигляді.</p>
        </div>
      </section>
    </main>
  );
}
