import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const api = axios.create({
      baseURL: 'http://localhost:3001/',
    });
    const { data } = await api
      .get('customer/products');
    setProducts(data);
  };

  const handleClick = () => {
    localStorage.setItem('cartItens', JSON.stringify(cartItem));
    navigate('/customer/checkout');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main style={ { display: 'flex', 'flex-wrap': 'wrap' } }>
      { products.map((product) => (
        <ProductCard
          key={ product.id }
          product={ product }
          setTotal={ setTotal }
          setCartItem={ setCartItem }
          cartItem={ cartItem }
          total={ total }
        />
      )) }
      <button
        type="button"
        onClick={ handleClick }
        data-testid="customer_products__button-cart"
        disabled={ total < 1 }
        style={ { position: 'fixed' } }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          { total.toFixed(2).replace('.', ',') }
        </p>
      </button>
    </main>
  );
}
