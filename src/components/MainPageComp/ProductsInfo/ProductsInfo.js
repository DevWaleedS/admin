import React from "react";
import MostProducts from "./MostProducts/MostProducts";
import MostMarkets from "./MostMarkets/MostMarkets";

const ProductsInfo = () => {
  return (
    <div className="flex md:mt-8 mt-5 gap-4 flex-wrap">
      <div className="flex-1 md:w-4/12 w-full">
        <MostProducts />
      </div>
      <div className="flex-1 md:w-5/12 w-full">
        <MostMarkets />
      </div>
    </div>
  );
};

export default ProductsInfo;
