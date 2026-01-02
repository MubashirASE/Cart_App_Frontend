const SelectedCategories = ({
  selectedCategories = [],
  flatCategories = [],
  removeCategory,
  removeAllCategory
}) => {
  const selectedCategoryObjects = flatCategories.filter(cat =>
    selectedCategories.includes(cat._id)
  );

  if (!selectedCategoryObjects.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {selectedCategoryObjects.map(cat => (
        <div
          key={cat._id}
          className="border rounded-full px-3 py-1 flex gap-2 text-gray-500"
        >
          <span>{cat.name}</span>
          <button onClick={() => removeCategory(cat._id)}>✕</button>
        </div>
      ))}

      <button className="hover:underline" onClick={removeAllCategory}>
        Remove All
      </button>
    </div>
  );
};

export default SelectedCategories;
