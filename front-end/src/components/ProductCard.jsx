import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ product, setTotal, total }) {
  const [inputValue, setInputValue] = useState(0);
  const { id, name, price, urlImage } = product;

  const handleAdd = () => {
    const sum = Number(total) + Number(price);
    const value = Number(sum.toFixed(2));
    setInputValue(inputValue + 1);
    setTotal(value);
  };

  const handleSub = () => {
    if (inputValue > 0) {
      const sub = Number(total) - Number(price);
      const value = Number(sub.toFixed(2));
      setInputValue(inputValue - 1);
      setTotal(value);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value >= 0) {
      setInputValue(value);
      const newTotal = Number((value * price).toFixed(2));
      setTotal(newTotal);
    }
  };

  return (
    <div>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace('.', ',')}
      </p>
      <img
        width="10%"
        src={ urlImage }
        alt={ `Imagem do produto ${name}` }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <button
        type="button"
        onClick={ handleSub }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -
      </button>
      <input
        type="number"
        value={ inputValue }
        onChange={ handleChange }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        type="button"
        onClick={ handleAdd }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
  setTotal: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};
