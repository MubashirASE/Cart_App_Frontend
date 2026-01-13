import AutoCarousel from "../AutoCarousel";

const HeroSection = ({ categories, images, handleCategoryClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="col-span-1 md:p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2 md:space-y-2  p-5">
        {categories
          ?.filter(ele => ele.parent === null)
          .map(ele => (
            <div
              key={ele._id}
              className="p-3 md:p-4 rounded-lg cursor-pointer hover:bg-blue-50 text-sm md:text-base border border-gray-100 md:border-none text-center md:text-left"
              onClick={() => handleCategoryClick(ele)}
            >
              {ele.name}
            </div>
          ))}
      </div>


      <div className="col-span-3 md:border-l sm:p-8">
        <AutoCarousel images={images} interval={5000} />
      </div>
    </div>
  );
};

export default HeroSection;
