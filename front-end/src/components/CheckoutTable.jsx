import React, { useState, useEffect } from 'react';

const dataId = 'customer_checkout__element-order-table-';

export default function CheckoutTable() {
  const [cart, setCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const cartItens = JSON.parse(localStorage.getItem('cartItens'));
    const cartValue = localStorage.getItem('cartValue');
    setCart(cartItens);
    setTotalValue(cartValue);
  }, []);

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
                <button type="button">Remover</button>
              </td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td data-testid="customer_checkout__element-order-total-price">
              { totalValue }
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
}
