import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const dataId = 'customer_checkout__';

export default function CheckoutForm() {
  const [dropdown, setDropdown] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [sellers, setSellers] = useState([]);

  // const navigate = useNavigate();

  // const handleOrder = () => {
  //   navigate('/customer');
  // };

  const getSellers = async () => {
    const api = axios.create({
      baseURL: 'http://localhost:3001/',
    });
    const { data } = await api.get('customer/checkout');
    setSellers(data);
  };

  useEffect(() => {
    getSellers();
  }, []);

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
          <option value="" disabled hidden> </option>
          { sellers.map((seller) => (
            <option value={ seller.name } key={ seller.id }>
              { seller.name }
            </option>
          )) }
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          type="text"
          id="address"
          value={ address }
          onChange={ (e) => handleAddress(e.target.value) }
          data-testid={ `${dataId}input-address` }
        />
      </label>
      <label htmlFor="address_number">
        Número
        <input
          type="number"
          id="address_number"
          data-testid={ `${dataId}input-address-number` }
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
