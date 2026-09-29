export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <p><strong>Virhe:</strong> {message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary">
          Yritä uudelleen
        </button>
      )}
    </div>
  );
}