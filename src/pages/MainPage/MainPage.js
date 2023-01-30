import React from "react";
import styles from "./MainPage.module.css";
import QuickDetails from "../../components/MainPageComp/QuickDetails/QuickDetails";
import StoreGraph from "../../components/MainPageComp/StoreGraph/StoreGraph";
import OrdersGraph from "../../components/MainPageComp/OrdersGraph/OrdersGraph";
import SystemAreaSec from "../../components/MainPageComp/SystemAreaSec/SystemAreaSec";
import ProductsInfo from "../../components/MainPageComp/ProductsInfo/ProductsInfo";

const MainPage = () => {
  return (
    <div className={`${styles.main_page} md:p-4 py-2 px-4`}>
      <QuickDetails />
      <StoreGraph />
      <OrdersGraph />
      <SystemAreaSec />
      <ProductsInfo />
    </div>
  );
};

export default MainPage;
