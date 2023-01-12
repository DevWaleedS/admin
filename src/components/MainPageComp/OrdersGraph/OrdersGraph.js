import React from "react";
import DatePicker from "./DatePicker/DatePicker";
import GraphSec from "./GraphSec/GraphSec";

const OrdersGraph = () => {
  return (
    <div
      className="shadow-xl h-96 mt-16 py-6 pl-12 pr-4 "
      style={{ backgroundColor: "#fff" }}
    >
      <div className="flex justify-between">
        <div className="pr-16">
          <h2 className="font-semibold">احصائيات الطلبات</h2>
          <h2 className="font-medium">250</h2>
        </div>
        <DatePicker />
      </div>
      <GraphSec />
    </div>
  );
};

export default OrdersGraph;
