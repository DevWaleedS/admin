import React, { useState } from "react";
import ChartsComp from "../../components/SupportPageComp/ChartsComp/ChartsComp";
import TableComp from "../../components/SupportPageComp/TableComp/TableComp";
import ComplaintDetails from "../../components/SupportPageComp/ComplaintDetails/ComplaintDetails";

import FormControl from "@mui/material/FormControl";
import { AiOutlineSearch } from "react-icons/ai";

const SupportPage = () => {
  const [showComplaintDetails, setShowComplaintDetails] = useState(false);
  const [complaintDetails, setComplaintDetails] = useState(null);
  return (
    <div
      className="relative pt-10 pl-36 pr-8"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <ChartsComp></ChartsComp>
      <div className={"mt-8"} style={{ backgroundColor: "#FFF" }}>
        <div className="p-4">
          <h2
            className={"font-semibold text-2xl mb-5"}
            style={{ color: "#011723" }}
          >
            جدول الشكاوى والاستفسارات
          </h2>
          <h3 className={" text-md mb-2"} style={{ color: "#4D4F5C" }}>
            البحث برقم الشكوى
          </h3>
          <div className="mb-4">
            <FormControl
              className="flex flex-row gap-4"
              sx={{ minWidth: 120, flex: "1" }}
            >
              <label className={`flex-1  h-14 relative `}>
                <input
                  className=" h-full outline-0 pr-12 rounded-lg "
                  placeholder=" ادخل رقم الشكوى"
                  type="text"
                  name="name"
                  onChange={() => {
                    console.log("zed");
                  }}
                  style={{
                    width: "376px",
                    border: "1px solid #7FFCFF",
                    backgroundColor: "#ECFEFF",
                  }}
                />
                <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
                  <AiOutlineSearch
                    color="#7FFCFF"
                    size={"18px"}
                  ></AiOutlineSearch>
                </div>
              </label>
            </FormControl>
          </div>
          {showComplaintDetails && (
            <ComplaintDetails
              complaintDetails={complaintDetails}
              cancel={() => {
                setShowComplaintDetails(false);
              }}
            ></ComplaintDetails>
          )}
          <div dir={"ltr"}>
            <TableComp
              setUser={(row) => {
                setComplaintDetails(row);
                setShowComplaintDetails(true);
              }}
            ></TableComp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
