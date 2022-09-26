import React, { useState } from 'react';

const dataId = 'customer_checkout__';

export default function CheckoutForm() {
  const [dropdown, setDropdown] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const handleAddress = (value) => {
    setAddress(value);
  };

  const handleNumber = (value) => {
    setNumber(value);
  };

  return (
    <form>
      <label htmlFor="seller_dropdown">
        P. Vendedora Responsável
        <select
          id="seller_dropdown"
          data-testid={ `${dataId}select-seller` }
          value={ dropdown }
          onChange={ (e) => handleDropdown(e.target.value) }
        >
          <option value="" selected disabled hidden> </option>
          <option value="batata">batata</option>
          <option value="fdasfdas">fdasfdas</option>
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          type="text"
          id="address"
          value={ address }
          onChange={ (e) => handleAddress(e.target.value) }
          data-testid={ `${dataId}input_address` }
        />
      </label>
      <label htmlFor="address_number">
        Número
        <input
          type="number"
          id="address_number"
          data-testid={ `${dataId}input_address-number` }
          value={ number }
          onChange={ (e) => handleNumber(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid={ `${dataId}button-submit-order` }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}
