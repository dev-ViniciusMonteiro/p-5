import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, checkAuth, forgotPassword } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../services/routes';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TopBar from '../../components/TopBar';
import './styles.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    const verifyAuthentication = async () => {
      if (localStorage.getItem('token')) {
        try {
          const isValid = await checkAuth();
          if (isValid) {
            navigate(ROUTES.DASHBOARD);
          }
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
    };

    verifyAuthentication();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await login({ identifier, password });
      localStorage.setItem('token', response.token);
      setAuthenticated(true);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      if (err.response?.status === 429) {
        setError('Sua conta foi temporariamente bloqueada devido a múltiplas tentativas de login inválidas. Por segurança, tente novamente em 15 minutos ou redefina sua senha agora utilizando o link abaixo.');
      } else {
        setError('Credenciais inválidas. Verifique seus dados e tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await forgotPassword(forgotEmail);
      setForgotSuccess(true);
    } catch (error) {
      setError('Erro ao solicitar recuperação de senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(TopBar, { logoSrc: "/logo.png" }),
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement('h1', null, 'Recuperação de Senha'),
        forgotSuccess 
          ? React.createElement(
              'div',
              { className: 'success-message' },
              React.createElement('p', null, 'Enviamos um e-mail com instruções para redefinir sua senha.'),
              React.createElement(Button, { onClick: () => setShowForgotPassword(false) }, 'Voltar ao login')
            )
          : React.createElement(
              'form',
              { onSubmit: handleForgotPassword },
              React.createElement('p', null, 'Informe seu e-mail para receber instruções de recuperação de senha.'),
              React.createElement(Input, {
                type: 'email',
                placeholder: 'Seu e-mail',
                value: forgotEmail,
                onChange: (e) => setForgotEmail(e.target.value),
                required: true
              }),
              error && React.createElement('div', { className: 'error' }, error),
              React.createElement(Button, { type: 'submit', disabled: isLoading, isLoading: isLoading }, 'Enviar'),
              React.createElement(
                'div',
                { className: 'forgot', onClick: () => setShowForgotPassword(false) },
                'Voltar ao login'
              )
            )
      ),
      React.createElement('div', { className: 'footer' }, 'SabiaMente — Cuidando do desenvolvimento, passo a passo.')
    );
  }

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(TopBar, { logoSrc: "/logo.png" }),
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'h1',
        null,
        'Bem-vindo(a) de volta.',
        React.createElement('br'),
        'Cuidar de cada mente começa aqui.'
      ),
      React.createElement(
        'form',
        { onSubmit: handleSubmit },
        React.createElement(Input, {
          type: 'text',
          label: 'Usuário/E-mail/CPF',
          placeholder: 'Insira seu usuário, e-mail ou CPF',
          value: identifier,
          onChange: (e) => setIdentifier(e.target.value),
          required: true
        }),
        React.createElement(Input, {
          type: 'password',
          label: 'Senha',
          placeholder: 'Insira sua senha',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true
        }),
        error && React.createElement('div', { className: 'error' }, error),
        React.createElement(
          'div',
          { className: 'forgot', onClick: () => setShowForgotPassword(true) },
          'Esqueceu sua senha?'
        ),
        React.createElement(
          Button,
          { type: 'submit', disabled: isLoading || !identifier || !password, isLoading: isLoading },
          'Entrar'
        )
      )
    ),
    React.createElement('div', { className: 'footer' }, 'SabiaMente — Cuidando do desenvolvimento, passo a passo.')
  );
};

export default Login;