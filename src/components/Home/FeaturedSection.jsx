import SectionHeader from "../common/SectionHeader";

const FeaturedSection = () => {
  return (
    <div className="space-y-5 sm:px-5">
      <SectionHeader title="Featured" />

      <div className="flex justify-between items-center w-full p-5">
        <h2 className="text-3xl font-semibold">New Arrival</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black rounded-lg overflow-hidden flex justify-center ">
          <img src="bg3.png" alt="Featured 1" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-black rounded-lg overflow-hidden flex justify-center">
            <img src="home1.png" alt="Featured 2" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-black rounded-lg overflow-hidden flex justify-center">
              <img src="bg.png" alt="Featured 3" />
            </div>
            <div className="bg-black rounded-lg overflow-hidden flex justify-center">
              <img src="bg1.png" alt="Featured 4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
