import AutoCarousel from "../../AutoCarousel";

const HeroSection = ({ categories, images, handleCategoryClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="col-span-1 p-8 space-y-5">
        {categories
          ?.filter(ele => ele.parent === null)
          .map(ele => (
            <div
              key={ele._id}
              className="p-4 rounded-lg cursor-pointer hover:bg-blue-50"
              onClick={() => handleCategoryClick(ele)}
            >
              {ele.name}
            </div>
          ))}
      </div>

      <div className="col-span-3 p-10 md:border-l">
        <AutoCarousel images={images} interval={5000} />
      </div>
    </div>
  );
};

export default HeroSection;
