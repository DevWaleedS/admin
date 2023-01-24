import React, { useState } from "react";

import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import ProductsTableSec from "../../../components/MarketsPagesComp/ProductsTable/ProductsTableSec/ProductsTableSec";
import ProductDetails from "../../../components/MarketsPagesComp/ProductsTable/ProductDetails/ProductDetails";
import TraderAlert from "../../../components/MarketsPagesComp/ProductsTable/TraderAlert/TraderAlert";


const ProductsTable = () => {
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [traderAlert, setTraderAlert] = useState(false);
  const [traderPackageDetails, setTraderPackageDetails] = useState([]);

  return (
    <div className={`pr-4 pt-8 pl-4`} style={{ backgroundColor: "#fafafa" }}>
      <div className="flex items-center justify-between">
        <PageNavigate currentPage={"المنتجات"} parentPage={"المتاجر"} />
      </div>
        {openProductDetails && (
              <ProductDetails
                cancel={() => {
                  setOpenProductDetails(false);
              }}
                details={details}
              />
        )}
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
          openProductDetails={(row) => {
            setOpenProductDetails(true);
            setDetails(row);
          }}
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
