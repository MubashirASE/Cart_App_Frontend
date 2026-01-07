export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border p-4 rounded shadow">
      <img src={product.image} className="h-40 w-full object-cover" />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p>Rs {product.price}</p>

      <button
        onClick={() => onAdd(product._id)}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
      >
        Add to Cart
      </button>
    </div>
  );
}
