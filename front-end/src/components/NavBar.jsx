import React, { useState, useEffect } from 'react';

export default function NavBar() {
  const [name, setName] = useState('');

  const handleLogout = () => localStorage.clear();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const parse = JSON.parse(user);
    const userName = parse.name;
    setName(userName);
  }, []);

  const baseURL = 'http://localhost:3000/';

  return (
    <nav>
      <ul>
        <li>
          <a
            href={ `${baseURL}customer/products` }
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </a>
        </li>
        <li>
          <a
            href={ `${baseURL}customer/orders` }
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </a>
        </li>
      </ul>
      <ul>
        <li data-testid="customer_products__element-navbar-user-full-name">{ name }</li>
        <li>
          <a
            href={ `${baseURL}login` }
            onClick={ handleLogout }
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </a>
        </li>
      </ul>
    </nav>
  );
}
