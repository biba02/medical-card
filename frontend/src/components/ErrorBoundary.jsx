
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ padding: '40px', textAlign: 'center' }}>
          <h1>Виникла помилка</h1>

          <p>
            Не вдалося відобразити сторінку.
            Спробуйте перезавантажити застосунок.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Перезавантажити сторінку
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
