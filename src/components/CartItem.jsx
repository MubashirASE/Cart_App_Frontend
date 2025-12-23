export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex justify-between items-center border p-4 rounded shadow mb-3">
      <div>
        <h3 className="text-lg font-bold">{item.productId.name}</h3>
        <p>Rs {item.productId.price}</p>
      </div>

      <button
        onClick={() => onRemove(item._id)}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Remove
      </button>
    </div>
  );
}
