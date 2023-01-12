import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";

import { IoIosArrowDown } from "react-icons/io";
import Button from "../../../UI/Button/Button";

const activate = ["مفعل", "غير مفعل"];

const StatusPage = () => {
  const [specialProduct, setSpecialProduct] = useState("");

  const handleSpecialProductChange = (event) => {
    setSpecialProduct(event.target.value);
  };
  return (
    <div
      className={`mt-5 px-4 pt-4 pl-36`}
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="mt-6 ">
        <PageNavigate
          nestedPage={true}
          parentPage={"المندوبين"}
          currentPage={"حالة التسجيل"}
        />
      </div>
      <div className="mt-16 px-6">
        <div className="mb-5 ">
          <h2 className="mb-2" style={{ color: "#011723" }}>
            التسجيل{" "}
          </h2>
          <Select
            value={specialProduct}
            IconComponent={() => {
              return <IoIosArrowDown size={"1rem"} />;
            }}
            onChange={handleSpecialProductChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            renderValue={(selected) => {
              if (specialProduct === "") {
                return <h2>تفعيل</h2>;
              }
              return selected;
            }}
            className={"rounded-lg"}
            sx={{
              height: "3.5rem",
              backgroundColor: "#fff",
              width: "100%",
              pl: "1rem",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #E9E9E9",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #E9E9E9",
              },
            }}
          >
            {activate.map((item) => {
              return (
                <MenuItem
                  className=""
                  sx={{
                    backgroundColor: "#fff",
                    height: "3rem",

                    "&:hover": {},
                    "ul:has(&)": {
                      padding: "0",
                    },
                  }}
                  value={`${item}`}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="mb-5 ">
          <h2 className="mb-2" style={{ color: "#011723" }}>
            التفعيل التلقائي{" "}
          </h2>
          <Select
            value={specialProduct}
            IconComponent={() => {
              return <IoIosArrowDown size={"1rem"} />;
            }}
            onChange={handleSpecialProductChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            renderValue={(selected) => {
              if (specialProduct === "") {
                return <h2>تفعيل</h2>;
              }
              return selected;
            }}
            className={"rounded-lg"}
            sx={{
              height: "3.5rem",
              backgroundColor: "#fff",
              width: "100%",
              pl: "1rem",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #E9E9E9",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #E9E9E9",
              },
            }}
          >
            {activate.map((item) => {
              return (
                <MenuItem
                  className=""
                  sx={{
                    backgroundColor: "#fff",
                    height: "3rem",

                    "&:hover": {},
                    "ul:has(&)": {
                      padding: "0",
                    },
                  }}
                  value={`${item}`}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>

      <Button type={"normal"} className={"w-full mt-14 py-4"} style={{}}>
        حفظ
      </Button>
    </div>
  );
};

export default StatusPage;
