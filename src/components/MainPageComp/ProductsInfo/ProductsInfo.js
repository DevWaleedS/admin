import React from "react";
import MostProducts from "./MostProducts/MostProducts";
import MostMarkets from "./MostMarkets/MostMarkets";

const ProductsInfo = () => {
  return (
    <div className="flex mt-8 gap-4">
      <div className="flex-1 w-4/12">
        <MostProducts />
      </div>
      <div className="flex-1 w-5/12">
        <MostMarkets />
      </div>
    </div>
  );
};

export default ProductsInfo;
