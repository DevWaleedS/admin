import React, { useState } from "react";
import ChartsComp from "../../components/OrderPageComp/ChartsComp/ChartsComp";
import TableComp from "../../components/OrderPageComp/TableComp/TableComp";
import NewMarket from "../../components/OrderPageComp/NewMarket/NewMarket";
import ServiceOrder from "../../components/OrderPageComp/ServiceOrder/ServiceOrder";

import FormControl from "@mui/material/FormControl";
import { AiOutlineSearch } from "react-icons/ai";

const OrdersPage = () => {
  const [showNewMarketDetails, setShowNewMarketDetails] = useState(false);
  const [showServiceOrderDetails, setShowServiceOrderDetails] = useState(false);
  const [complaintDetails, setComplaintDetails] = useState(null);
  return (
    <div
      className="relative pt-10 pl-36 pr-8"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <ChartsComp></ChartsComp>
      <div className={"mt-8"} style={{ backgroundColor: "#FFF" }}>
        <div className="p-4">
          <div className="fbc">
            <h2
              className={"font-semibold text-2xl "}
              style={{ color: "#011723" }}
            >
              جدول الطلبات
            </h2>

            <div className="mb-4">
              <FormControl
                className="flex flex-row gap-4"
                sx={{ minWidth: 120, flex: "1" }}
              >
                <label className={`flex-1  h-14 relative `}>
                  <input
                    className=" h-full outline-0 pr-12 rounded-lg "
                    placeholder=" ادخل رقم الطلب"
                    type="text"
                    name="name"
                    onChange={() => {
                      console.log("zed");
                    }}
                    style={{
                      width: "376px",
                      border: "1px solid #A7A7A7",
                      backgroundColor: "#FFFFFF00",
                    }}
                  />
                  <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
                    <AiOutlineSearch
                      color="#B6BE34"
                      size={"18px"}
                    ></AiOutlineSearch>
                  </div>
                </label>
              </FormControl>
            </div>
          </div>

          {showNewMarketDetails && (
            <NewMarket
              complaintDetails={complaintDetails}
              cancel={() => {
                setShowNewMarketDetails(false);
              }}
            ></NewMarket>
          )}
          {showServiceOrderDetails && (
            <ServiceOrder
              complaintDetails={complaintDetails}
              cancel={() => {
                setShowServiceOrderDetails(false);
              }}
            ></ServiceOrder>
          )}
          <div dir={"ltr"}>
            <TableComp
              setUser={(row, newMarket) => {
                setComplaintDetails(row);

                if (newMarket) {
                  setShowNewMarketDetails(true);
                  return;
                }
                setShowServiceOrderDetails(true);
              }}
            ></TableComp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
