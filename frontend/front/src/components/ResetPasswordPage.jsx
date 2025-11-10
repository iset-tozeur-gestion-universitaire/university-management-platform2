import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../services/authService';
import './LoginPage.css';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyParams = () => {
      // Get email and token from URL parameters
      const emailParam = searchParams.get('email');
      const tokenParam = searchParams.get('token');
      
      if (emailParam && tokenParam) {
        // Valid reset password link from our backend
        setEmail(emailParam);
        setToken(tokenParam);
        setVerifying(false);
      } else {
        // Invalid link - missing params
        setError('Lien invalide. Veuillez demander un nouveau lien de réinitialisation.');
        setVerifying(false);
      }
    };

    verifyParams();
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setLoading(true);

    try {
      // Use our backend API to reset the password
      await authService.resetPassword(email, token, newPassword);

      setMessage('Mot de passe réinitialisé avec succès !');
      setLoading(false);
      
      // Show success message and redirect button
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Une erreur est survenue. Le lien est peut-être expiré.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Réinitialiser le mot de passe</h1>
        
        {verifying ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Vérification du lien en cours...</p>
          </div>
        ) : (
          <>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Entrez votre nouveau mot de passe
            </p>

            {message && (
          <div style={{
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '4px',
            border: '1px solid #c3e6cb',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{message}</p>
            <p style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
              Redirection automatique dans 3 secondes...
            </p>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Continuer vers la connexion →
            </button>
          </div>
        )}

        {error && (
          <div style={{
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </div>

            <div className="form-group">
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 caractères"
              required
              disabled={loading}
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
              disabled={loading}
              minLength={8}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
          </button>
        </form>
        )}

        {!message && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Retour à la connexion
            </button>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
