import React, { useState } from "react";

import Button from "../../../../UI/Button/Button";
import styles from "./AddSection.module.css";
import { AiFillStar } from "react-icons/ai";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { IoIosArrowDown } from "react-icons/io";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};
const category = ["الكترونيات", "ألعاب وهدايا", "مستلزمات طبية", "مواد غذائية"];

const formTitleClasses = "font-semibold text-lg";
const formTitleStyle = { width: "315px" };
//
const formInputClasses = "p-4 outline-0 rounded-md";
const formInputStyle = {
  width: "555px",
  border: "1px solid rgba(167, 167, 167, 0.5)",
};
const NewProduct = ({ cancel }) => {
  const [age, setAge] = useState("");

  const handleCategory = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-slate-50 z-20 otlobha_new_product ${styles.container}`}
        style={{ width: "1104px", height: "calc(100% - 4rem)" }}
      >
        <div className="flex h-full flex-col justify-between">
          <div
            className="p-8"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <h2 className="font-semibold text-2xl  mb-3">
              اضافة قسم - المتاجر
            </h2>
            <h2>أضف قسم جديد لربطه بالتصنيف الأساسي</h2>
          </div>
          <div
            className={`flex-1 overflow-y-scroll py-12 pr-8 ${styles.content}`}
          >
            <form action="">
              <div className="flex mb-8 items-center">
                <h2 className={formTitleClasses} style={formTitleStyle}>
                  <AiFillStar
                    style={{
                      display: "inline-block",
                      marginLeft: "0.5rem",
                      color: "red",
                    }}
                  ></AiFillStar>
                  رقم القسم
                </h2>
                <label>
                  <input
                    className={formInputClasses}
                    style={formInputStyle}
                    placeholder="تلقائي"
                    type="text"
                    name="name"
                  />
                </label>
              </div>
              <div className="flex mb-8 items-center">
                <h2 className={formTitleClasses} style={formTitleStyle}>
                  <AiFillStar
                    style={{
                      display: "inline-block",
                      marginLeft: "0.5rem",
                      color: "red",
                    }}
                  ></AiFillStar>
                  اسم القسم
                </h2>
                <label>
                  <input
                    className={formInputClasses}
                    style={formInputStyle}
                    placeholder="ادخل اسم التصنيف"
                    type="text"
                    name="name"
                  />
                </label>
              </div>
              <div className="flex mb-8">
                <h2 className={formTitleClasses} style={formTitleStyle}>
                  التصنيف
                </h2>
                <FormControl sx={{ width: 555 }}>
                  <Select
                    value={age}
                    IconComponent={() => {
                      return <IoIosArrowDown size={"1rem"} />;
                    }}
                    onChange={handleCategory}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    renderValue={(selected) => {
                      if (age === "") {
                        return (
                          <h2 style={{ color: "#A7A7A7" }}>
                            اختر التصنيف الأساسى
                          </h2>
                        );
                      }
                      return selected;
                    }}
                    sx={{
                      height: "3.5rem",
                      border: "1px solid rgba(167, 167, 167, 0.5)",
                      pl: "1rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  >
                    {category.map((item, idx) => {
                      return (
                        <MenuItem
                          key={idx}
                          className="souq_storge_category_filter_items"
                          sx={{
                            backgroundColor: "rgba(211, 211, 211, 1)",
                            height: "3rem",
                            "&:hover": {},
                          }}
                          value={`${item}`}
                        >
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </form>
          </div>
          <div
            className="p-8 flex justify-center gap-4"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <Button
              className={"h-14 w-44"}
              style={{ backgroundColor: `rgba(2, 70, 106, 1)` }}
              type={"normal"}
            >
              حفظ التصنيف
            </Button>
            <Button
              style={{
                borderColor: `rgba(2, 70, 106, 1)`,
              }}
              textStyle={{ color: "rgba(2, 70, 106, 1)" }}
              className={"h-14 w-44"}
              type={"outline"}
              onClick={cancel}
            >
              إلغاء
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
