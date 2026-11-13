import { useState } from 'react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// en az 8 karakter, 1 küçük harf, 1 büyük harf, 1 rakam, 1 özel karakter
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/

export const errorMessages = {
  email: 'Geçerli bir email adresi giriniz.',
  password:
    'Şifre en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter içermelidir.',
  terms: 'Devam etmek için şartları kabul etmelisiniz.',
}

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '', terms: false })
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    terms: false,
  })

  const errors = {
    email: !emailRegex.test(form.email),
    password: !passwordRegex.test(form.password),
    terms: !form.terms,
  }

  const isValid = !errors.email && !errors.password && !errors.terms

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) onSuccess()
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <h1>Giriş Yap</h1>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        data-cy="email-input"
        value={form.email}
        onChange={handleChange}
      />
      {touched.email && errors.email && (
        <p className="error-message" data-cy="email-error">
          {errorMessages.email}
        </p>
      )}

      <label htmlFor="password">Şifre</label>
      <input
        id="password"
        name="password"
        type="password"
        data-cy="password-input"
        value={form.password}
        onChange={handleChange}
      />
      {touched.password && errors.password && (
        <p className="error-message" data-cy="password-error">
          {errorMessages.password}
        </p>
      )}

      <label className="terms" htmlFor="terms">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          data-cy="terms-checkbox"
          checked={form.terms}
          onChange={handleChange}
        />
        Şartları kabul ediyorum
      </label>
      {touched.terms && errors.terms && (
        <p className="error-message" data-cy="terms-error">
          {errorMessages.terms}
        </p>
      )}

      <button type="submit" data-cy="submit-button" disabled={!isValid}>
        Login
      </button>
    </form>
  )
}
