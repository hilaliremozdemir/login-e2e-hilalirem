export default function Success({ onBack }) {
  return (
    <div className="success" data-cy="success-page">
      <h1>Giriş Başarılı! 🎉</h1>
      <p>Hoş geldiniz.</p>
      <button onClick={onBack}>Geri Dön</button>
    </div>
  )
}
