import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const dataId = 'customer_checkout__';

export default function CheckoutForm() {
  const [dropdown, setDropdown] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleTotal = () => {
    let totalPrice = 0;
    cart.forEach((item) => { totalPrice += (+item.price * +item.quantity); });
    return totalPrice;
  };

  const handleData = () => {
    const total = handleTotal();
    const obj = {
      products: cart,
      userId: user.id,
      sellerId: dropdown,
      totalPrice: +total.toFixed(2),
      deliveryAddress: address,
      deliveryNumber: number,
      authorization: user.token,
    };
    return obj;
  };

  const handleButton = async () => {
    const obj = handleData();
    console.log(obj);
    const { authorization, ...info } = obj;
    const headers = {
      Authorization: authorization,
    };
    const api = axios.create({
      baseURL: 'http://localhost:3001/',
    });
    const { data } = await api
      .post('customer/checkout', info, { headers });
    navigate(`/customer/orders/${data.id}`);
  };

  const getSellers = async () => {
    const api = axios.create({
      baseURL: 'http://localhost:3001/',
    });
    const { data } = await api.get('customer/checkout');
    setSellers(data);
  };

  useEffect(() => {
    const cartItens = JSON.parse(localStorage.getItem('cartItens'));
    const userInfos = JSON.parse(localStorage.getItem('user'));
    setCart(cartItens);
    setUser(userInfos);
  }, []);

  useEffect(() => {
    getSellers();
  }, []);

  useEffect(() => {
    if (sellers.length > 0)setDropdown(sellers[0].id);
  }, [sellers]);

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
          { sellers.map((seller) => (
            <option value={ seller.id } key={ seller.id }>
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
        onClick={ handleButton }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}
