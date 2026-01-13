import { useRef } from "react";
import ScrollButtons from "../common/ScrollButtons";
import SectionHeader from "../common/SectionHeader";

const CategoriesSection = ({
  categories,
  handleCategoryClick,
}) => {
  const categoriesScrollRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoriesScrollRef.current) {
      categoriesScrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="Categories" />

      <div className="flex justify-between items-center px-2">
        <h2 className="text-xl sm:text-3xl font-semibold">Browse By Category</h2>
        <ScrollButtons
          onLeftClick={() => scrollCategories("left")}
          onRightClick={() => scrollCategories("right")}
        />
      </div>

      <div ref={categoriesScrollRef} className="flex overflow-x-auto  scrollbar-hide gap-6">
        {categories
          ?.filter((ele) => ele.parent === null)
          .map((ele) => (
            <div key={ele._id} className="min-w-[220px] bg-white rounded-xl cursor-pointer hover:bg-blue-500 p-7">
              <div
                className="p-7"
                onClick={() => handleCategoryClick(ele)}
              >
                <img
                  src={ele.image}
                  alt={ele.name}
                  className="w-35 p-6"
                  sizes=""
                />
              </div>
              <p className="text-center">{ele.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
