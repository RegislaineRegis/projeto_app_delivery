import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    const ELEVEN = 11;
    const nameValidation = name.length > ELEVEN;
    const regex = /\S+@\S+\.\S+/;
    const emailValidation = regex.test(email);
    const MIN_LENGTH = 5;
    const passwordValidation = password.length > MIN_LENGTH;
    const validate = emailValidation && passwordValidation && nameValidation;
    setDisabled(!validate);
  }, [email, password, name]);

  const handleClick = async () => {
    try {
      const api = axios.create({
        baseURL: 'http://localhost:3001/',
      });
      await api.post('register', { name, email, password, role: 'costumer' });
      navigate('/customer/products');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid="common_register__input-name"
            id="name"
            type="text"
            placeholder="João da Silva"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_register__input-email"
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
            data-testid="common_register__input-password"
            id="password"
            type="password"
            placeholder="**********"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
          disabled={ disabled }
          onClick={ handleClick }
        >
          CADASTRAR
        </button>
        { error
        && (
          <p data-testid="common_register__element-invalid_register">
            Usuário ja existente
          </p>
        ) }
      </form>
    </div>
  );
}
