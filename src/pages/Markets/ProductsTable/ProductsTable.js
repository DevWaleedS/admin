import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import ProductsTableSec from "../../../components/MarketsPagesComp/ProductsTable/ProductsTableSec/ProductsTableSec";
import ProductDetails from "../../../components/MarketsPagesComp/ProductsTable/ProductDetails/ProductDetails";
import TraderAlert from "../../../components/MarketsPagesComp/ProductsTable/TraderAlert/TraderAlert";
import useFetch from '../../../hooks/useFetch';

const ProductsTable = () => {
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [traderAlert, setTraderAlert] = useState(false);
  const [traderPackageDetails, setTraderPackageDetails] = useState({});
  const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/product');
  return (
    <div className="pr-4 md:pt-8 pl-4 pt-0 md:bg-[#fafafa] bg-[#ffffff]">
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
          reload={reload}
          setReload={setReload}
        />
      )}
      <div className="md:mt-8 mt-4" dir="ltr">
        <ProductsTableSec
          fetchedData={fetchedData}
          loading={loading}
          reload={reload}
          setReload={setReload}
          openProductDetails={(id) => {
            setOpenProductDetails(true);
            setDetails(id);
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
