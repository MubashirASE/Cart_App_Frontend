const SortDropdown = ({ sortOrder, sortByOrder }) => {
  return (
    <select
      value={sortOrder}
      onChange={(e) => sortByOrder(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2"
    >
      <option value="">Select by price</option>
      <option value="LowToHigh">Low to High</option>
      <option value="highToLow">High to Low</option>
    </select>
  );
};

export default SortDropdown;
