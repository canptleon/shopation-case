import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface FilterSidebarProps {
  priceRange: { min: number; max: number };
  handlePriceRangeChange: (min: number, max: number) => void;
  maxPrice: number;
  uniqueBrands: string[];
  uniqueModels: string[];
  toggleBrandSelection: (brand: string) => void;
  toggleModelSelection: (model: string) => void;
  selectedBrands: Set<string>;
  selectedModels: Set<string>;
  isMobileFilterOn: boolean;
  setIsMobileFilterOn: (visible: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange,
  handlePriceRangeChange,
  maxPrice,
  uniqueBrands,
  uniqueModels,
  toggleBrandSelection,
  toggleModelSelection,
  selectedBrands,
  selectedModels,
  isMobileFilterOn,
  setIsMobileFilterOn,
}) => {
  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      handlePriceRangeChange(value[0], value[1]);
    }
  };

  return (
    <aside
      className={`w-64 bg-white rounded-[10px] p-4 border-[1px] border-[solid] border-[#ebebeb] [filter:drop-shadow(3px_9px_6px_lightgray)]
    xsfull:fixed xsfull:top-[0] xsfull:left-[0] xsfull:right-[0] xsfull:w-full xsfull:h-full ${isMobileFilterOn ? "xsfull:block" : "xsfull:hidden"} xsfull:z-[5] xsfull:p-[40px]
    `}>
      <div className="sticky top-[10px]">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <button
          className="hidden xsfull:flex absolute top-[0] right-[0] border-[1px] border-[solid] border-[#1abcfa] rounded-[100%] w-[40px] h-[40px] flex-col justify-center items-center text-center text-[#12bafa] font-bold text-[22px] leading-none"
          onClick={() => setIsMobileFilterOn(false)}>
          x
        </button>
        <div className="mb-4">
          <h3 className="text-[14px] font-semibold mb-[5px]">Price Range</h3>
          <div className="flex flex-col items-center mb-4">
            <Slider
              range
              min={0}
              max={maxPrice}
              value={[priceRange.min, priceRange.max]}
              onChange={handleSliderChange}
              trackStyle={[{ backgroundColor: "#13bafa" }]}
              handleStyle={[
                { borderColor: "#13bafa", backgroundColor: "#13bafa" },
                { borderColor: "#13bafa", backgroundColor: "#13bafa" },
              ]}
            />
            <div className="flex justify-between w-full mt-2">
              <span>{priceRange.min}₺</span>
              <span>{priceRange.max}₺</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-[14px] font-semibold mb-[5px]">Brands</h3>
          <div className="custom-scrollbar max-h-60 overflow-y-auto bg-[white] rounded-[10px] border-[1px] border-[solid] border-[#13bafa]">
            <ul>
              {uniqueBrands.map(brand => (
                <li key={brand}>
                  <button
                    onClick={() => toggleBrandSelection(brand)}
                    className={`block w-full text-left px-4 py-2 ${
                      selectedBrands.has(brand) ? "bg-blue-500 text-white" : "text-gray-700"
                    } hover:bg-gray-200`}>
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-[14px] font-semibold mb-[5px]">Models</h3>
          <div className="custom-scrollbar max-h-60 overflow-y-auto bg-[white] rounded-[10px] border-[1px] border-[solid] border-[#13bafa]">
            <ul>
              {uniqueModels.map(model => (
                <li key={model}>
                  <button
                    onClick={() => toggleModelSelection(model)}
                    className={`block w-full text-left px-4 py-2 ${
                      selectedModels.has(model) ? "bg-blue-500 text-white" : "text-gray-700"
                    } hover:bg-gray-200`}>
                    {model}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setIsMobileFilterOn(false)}>
          Apply
        </button>
      </div>
    </aside>
  );
};

export default React.memo(FilterSidebar);
