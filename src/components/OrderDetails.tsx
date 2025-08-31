
export type Order = {
  orderNumber: string;
  name: string;
  status: string;
  deliveryDate: string;
  address: string;
};

export function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-2 text-sm">
      <div><strong>Order Number:</strong> {order.orderNumber}</div>
      <div><strong>Product:</strong> {order.name}</div>
      <div><strong>Status:</strong> {order.status}</div>
      <div><strong>Delivery Date:</strong> {order.deliveryDate}</div>
      <div><strong>Address:</strong> {order.address}</div>
    </div>
  );
}