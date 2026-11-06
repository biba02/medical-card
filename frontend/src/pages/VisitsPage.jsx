
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../lib/api.js';
import './VisitsPage.css';

const initialForm = {
  visitDate: '',
  doctorName: '',
  specialization: '',
  diagnosis: '',
  recommendations: ''
};

export default function VisitsPage() {
  const [visits, setVisits] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formError, setFormError] = useState('');
  const [listError, setListError] = useState('');
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState('');

  async function loadVisits() {
    setLoading(true);
    setListError('');

    try {
      const data = await apiRequest('/visits');
      setVisits(data.visits ?? []);
    } catch (err) {
      setListError(
        err.message || 'Не вдалося завантажити візити.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVisits();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value
    }));
  }

  async function addVisit(event) {
    event.preventDefault();

    setSaving(true);
    setFormError('');
    setActionError('');
    setNotice('');

    try {
      const payload = {
        ...form,
        visitDate: new Date(form.visitDate).toISOString()
      };

      await apiRequest('/visits', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      setForm(initialForm);
      setNotice('Візит успішно додано!');
      await loadVisits();
    } catch (err) {
      setFormError(
        err.message || 'Помилка збереження візиту.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function removeVisit(id) {
    const confirmed = window.confirm(
      'Ви впевнені, що хочете видалити цей візит?'
    );

    if (!confirmed) return;

    setDeletingId(id);
    setActionError('');
    setNotice('');

    try {
      await apiRequest(`/visits/${id}`, {
        method: 'DELETE'
      });

      setVisits(previous =>
        previous.filter(visit => visit.id !== id)
      );

      setNotice('Візит успішно видалено!');
    } catch (err) {
      setActionError(
        err.message || 'Не вдалося видалити візит.'
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="visits-page">
      <header className="visits-header">
        <div>
          <p className="visits-eyebrow">
            MedCard / Медична картка
          </p>

          <h1>Історія візитів до лікарів</h1>

          <p>
            Переглядайте та зберігайте інформацію
            про відвідування лікарів.
          </p>
        </div>

        <Link to="/dashboard" className="visits-back">
          ← На головну
        </Link>
      </header>

      <section className="visits-panel">
        <h2>Додати новий візит</h2>

        <form onSubmit={addVisit} className="visits-form">
          <label>
            Дата візиту
            <input
              type="datetime-local"
              name="visitDate"
              value={form.visitDate}
              onChange={updateField}
              required
            />
          </label>

          <label>
            ПІБ лікаря
            <input
              name="doctorName"
              value={form.doctorName}
              onChange={updateField}
              placeholder="Олена Коваль"
              maxLength={150}
              required
            />
          </label>

          <label>
            Спеціалізація
            <input
              name="specialization"
              value={form.specialization}
              onChange={updateField}
              placeholder="Терапевт"
              maxLength={100}
              required
            />
          </label>

          <label>
            Діагноз
            <input
              name="diagnosis"
              value={form.diagnosis}
              onChange={updateField}
            />
          </label>

          <label className="visits-wide">
            Рекомендації
            <textarea
              name="recommendations"
              value={form.recommendations}
              onChange={updateField}
              rows={3}
            />
          </label>

          <button type="submit" disabled={saving}>
            {saving
              ? 'Збереження...'
              : '+ Додати візит'}
          </button>
        </form>
      </section>

      {formError && (
        <p className="visits-error" role="alert">
          {formError}
        </p>
      )}

      {actionError && (
        <p className="visits-error" role="alert">
          {actionError}
        </p>
      )}

      {notice && (
        <p className="visits-success" role="status">
          {notice}
        </p>
      )}

      <section className="visits-panel">
        <div className="visits-list-heading">
          <h2>Мої візити</h2>

          <button
            type="button"
            onClick={loadVisits}
            disabled={loading}
          >
            Оновити
          </button>
        </div>

        {loading ? (
          <div
            className="visits-loading"
            role="status"
          >
            <span className="visits-spinner" />
            Завантаження візитів...
          </div>
        ) : listError ? (
          <p className="visits-error" role="alert">
            Не вдалося завантажити або оновити дані.
            Спробуйте ще раз.
          </p>
        ) : visits.length === 0 ? (
          <p className="visits-empty">
            Історія візитів поки порожня.
          </p>
        ) : (
          <div className="visits-list">
            {visits.map(visit => (
              <article
                className="visit-card"
                key={visit.id}
              >
                <div className="visit-card-top">
                  <h3>{visit.doctorName}</h3>

                  <span>
                    {new Date(visit.visitDate)
                      .toLocaleString('uk-UA')}
                  </span>
                </div>

                <p>
                  <strong>Спеціалізація:</strong>{' '}
                  {visit.specialization}
                </p>

                <p>
                  <strong>Діагноз:</strong>{' '}
                  {visit.diagnosis || 'Не вказано'}
                </p>

                <p>
                  <strong>Рекомендації:</strong>{' '}
                  {visit.recommendations || 'Не вказано'}
                </p>

                <button
                  type="button"
                  className="visit-delete-button"
                  onClick={() => removeVisit(visit.id)}
                  disabled={deletingId === visit.id}
                >
                  {deletingId === visit.id
                    ? 'Видалення...'
                    : 'Видалити візит'}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
