import React, { useState, useEffect } from 'react';

const dataId = 'customer_checkout__element-order-table-';

export default function CheckoutTable() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const handleTotal = () => {
    let totalPrice = 0;
    cart.forEach((item) => { totalPrice += (+item.price * +item.quantidade); });
    setTotal(+totalPrice);
  };

  const handleRemove = (id) => {
    const remove = cart.filter((item) => +item.id !== +id);
    setCart(remove);
  };

  useEffect(() => {
    const cartItens = JSON.parse(localStorage.getItem('cartItens'));
    setCart(cartItens);
  }, []);

  useEffect(() => {
    handleTotal();
  }, [cart]);

  return (
    <main>
      <h1>Finalizar Pedido</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { cart.map((item, index) => (
            <tr key={ item.id }>
              <td data-testid={ `${dataId}item-number-${index}` }>{ index + 1 }</td>
              <td data-testid={ `${dataId}name-${index}` }>{ item.name }</td>
              <td data-testid={ `${dataId}quantity-${index}` }>{ item.quantidade }</td>
              <td data-testid={ `${dataId}unit-price-${index}` }>
                { (+item.price).toFixed(2).replace('.', ',') }
              </td>
              <td data-testid={ `${dataId}sub-total-${index}` }>
                { (+item.price * item.quantidade).toFixed(2).replace('.', ',') }
              </td>
              <td data-testid={ `${dataId}remove-${index}` }>
                <button
                  name={ item.id }
                  type="button"
                  onClick={ (e) => handleRemove(e.target.name) }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td data-testid="customer_checkout__element-order-total-price">
              { total.toFixed(2).replace('.', ',') }
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
}
