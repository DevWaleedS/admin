import React, { useState } from "react";

import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import ProductsTableSec from "../../../components/MarketsPagesComp/ProductsTable/ProductsTableSec/ProductsTableSec";
import TraderAlert from "../../../components/MarketsPagesComp/ProductsTable/TraderAlert/TraderAlert";


const ProductsTable = () => {
  const [traderAlert, setTraderAlert] = useState(false);
  const [traderPackageDetails, setTraderPackageDetails] = useState([]);

  return (
    <div className={`pr-4 pt-8 pl-4`} style={{ backgroundColor: "#fafafa" }}>
      <div className="flex items-center justify-between">
        <PageNavigate currentPage={"المنتجات"} parentPage={"المتاجر"} />
      </div>
        {traderAlert && (
              <TraderAlert
                cancel={() => {
                setTraderAlert(false);
              }}
              traderPackageDetails={traderPackageDetails}
              />
        )}
      <div className="mt-8" dir="ltr">
        <ProductsTableSec 
          openTraderAlert={(row) => {
            setTraderAlert(true);
            setTraderPackageDetails(row);
          }}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
