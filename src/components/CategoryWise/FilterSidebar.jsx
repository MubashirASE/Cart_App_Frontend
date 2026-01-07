

const FilterSidebar = ({
  isOpen,
  onClose,
  flatCategories,
  selectedCategories,
  handleCategorySelect,
  refetch

}) => {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 "
        onClick={onClose}
      />

      <div className="fixed top-0 left-0 h-full w-[320px] bg-white z-50 shadow-xl">
        <div className="p-5 space-y-6 ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button onClick={onClose}>✕</button>
          </div>

          <div>
            <h3 className="font-medium mb-2">Category</h3>

            {flatCategories.map(category => (
              <div
                key={category._id}
                style={{ marginLeft: `${category.level * 20}px` }}
                className="flex items-center gap-2 py-1"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleCategorySelect(category._id)}
                />
                <span>{category.name}</span>
              </div>
            ))}
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
            onClick={() => {
              refetch();
              onClose();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
