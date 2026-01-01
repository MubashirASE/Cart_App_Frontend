import { BiSlider } from "react-icons/bi";

const FilterButton = ({ onClick }) => {
  return (
    <div
      className="text-2xl text-gray-500 flex gap-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="pt-1">
        <BiSlider size={20} />
      </div>
      Filter
    </div>
  );
};

export default FilterButton;
