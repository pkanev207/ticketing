const OrderIndex = ({ orders }) => {
  let returnDiv;
  if (typeof orders == "string") {
    returnDiv = <div>No orders</div>;
  } else {
    // console.log(typeof orders);
    returnDiv = (
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>
          );
        })}
      </ul>
    );
  }

  return returnDiv;
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
