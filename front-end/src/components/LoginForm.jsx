import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    const regex = /\S+@\S+\.\S+/;
    const emailValidation = regex.test(email);
    const MIN_LENGTH = 5;
    const passwordValidation = password.length > MIN_LENGTH;
    const validate = emailValidation && passwordValidation;
    setDisabled(!validate);
  }, [email, password]);

  const handleClick = async () => {
    const api = axios.create({
      baseURL: 'http://localhost:3001/',
    });
    const { data } = await api.post('login', { email, password })
      .catch(() => setError(true));
    console.log(data);
    navigate('/customer/products');
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_login__input-email"
            id="email"
            type="email"
            placeholder="email@trybeer.com"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="common_login__input-password"
            id="password"
            type="password"
            placeholder="**********"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ disabled }
          onClick={ handleClick }
        >
          Login
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
        >
          Ainda não tenho conta
        </button>
        { error
        && <p data-testid="common_login__element-invalid-email">Dados Incorretos</p> }
      </form>
    </div>
  );
}
