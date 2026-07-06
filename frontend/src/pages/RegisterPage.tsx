import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t.register.passwordMismatch);
      return;
    }

    if (password.length < 8) {
      setError(t.register.passwordTooShort);
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setError(t.register.usernameLengthError);
      return;
    }

    setLoading(true);

    try {
      await register(email, username, password);
      navigate('/');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      if (msg === 'Email already in use') {
        setError(t.register.emailAlreadyInUse);
      } else if (msg === 'Username already taken') {
        setError(t.register.usernameAlreadyTaken);
      } else {
        setError(msg || t.register.registrationFailed);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">{t.register.title}</h2>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-1">{t.register.email}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                placeholder={t.register.emailPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm text-gray-400 mb-1">{t.register.username}</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={20}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                placeholder={t.register.usernamePlaceholder}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-400 mb-1">{t.register.password}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                placeholder={t.register.passwordPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm text-gray-400 mb-1">{t.register.confirmPassword}</label>
              <input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                placeholder={t.register.confirmPlaceholder}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded transition-colors"
            >
              {loading ? t.register.creatingAccount : t.register.registerBtn}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            {t.register.alreadyHaveAccount}{' '}
            <Link to="/login" className="text-yellow-400 hover:text-yellow-300">{t.register.loginLink}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
