const orderTable=document.getElementById('order-table-body');
let orders= JSON.parse(localStorage.getItem('orders'));

if(orders==null){
    orders=[];
}

for (let i = 0; i < orders.length; i++) {
    let total = 0;
    let order = orders[i];
    let orderDetails = '';
  
    for (let j = 0; j < order.length; j++) {
      let item = order[j];
      orderDetails += `
        <div class="order-details-item">
          <span>${item.title}</span>
          <span>x${item.quantity}</span>
        </div>
      `;
      total += parseFloat(item.price) * item.quantity;
    }
  
    orderTable.innerHTML += `
      <tr>
        <td>
          <div class="order-header">
            <span class="order-number">Order #${i + 1}</span>
          </div>
        </td>
        <td>
          <div class="order-details">
            ${orderDetails}
          </div>
        </td>
        <td>
          <div class="order-total">Total: ₹${total}</div>
        </td>
        <td>
          <span class="order-status status-delivered">
            Delivered
          </span>
        </td>
      </tr>
    `;
  }