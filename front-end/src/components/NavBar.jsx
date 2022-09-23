import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [name, setName] = useState('');

  const handleLogout = () => localStorage.clear();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const parse = JSON.parse(user);
    const userName = parse.name;
    setName(userName);
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
        </li>
        <li>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        </li>
      </ul>
      <ul>
        <li data-testid="customer_products__element-navbar-user-full-name">{ name }</li>
        <li>
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ handleLogout }
          >
            Sair
          </Link>
        </li>
      </ul>
    </nav>
  );
}
