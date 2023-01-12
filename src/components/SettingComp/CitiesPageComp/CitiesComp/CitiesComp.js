import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as Search } from "../../../../assets/Icons/icon_24_search.svg";
import TableComp from "./TableComp/TableComp";
import { AiOutlineSearch } from "react-icons/ai";

const category = ["أدمن", "محرر", "إدارة", "دعم فنى"];

const UsersTable = ({ setData }) => {
  return (
    <div className="mt-3">
      <div className="mb-4">
        <FormControl
          className="flex flex-row gap-4"
          sx={{ minWidth: 120, flex: "1" }}
        >
          <label className={`flex-1  h-14 relative `}>
            <input
              className=" h-full outline-0 pr-12 rounded-lg "
              placeholder=" ابحث عن مدينة"
              type="text"
              name="name"
              onChange={() => {
                console.log("zed");
              }}
              style={{ width: "376px", border: "1px solid #A7A7A7" }}
            />
            <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
              <AiOutlineSearch color="#1DBBBE" size={"18px"}></AiOutlineSearch>
            </div>
          </label>
        </FormControl>
      </div>

      <div dir={"ltr"} className={"mt-12"}>
        <TableComp
          setDataRow={(data) => {
            setData(data);
          }}
        ></TableComp>
      </div>
    </div>
  );
};

export default UsersTable;
