import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AiFillStar } from "react-icons/ai";
import { MdClear } from "react-icons/md";

import Select from "@mui/material/Select";
import Button from "../../../UI/Button/Button";
import Context from "../../../store/context";

import styles from "./AddNewPackagePlan.module.css";
import MenuItem from "@mui/material/MenuItem";
import { GoArrowRight } from "react-icons/go";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

const packagesOptions = [
  "100 منتج",
  "10 تصنيفات",
  "دعم فني 24",
  "تجربة مجانية",
  "توفير مخازن",
  "تخصيص القالب",
  "خدمات الاستشارة",
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddNewPackagePlan = ({ cancel, editPackageDetails }) => {
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [packageOption, setPackageOption] = useState("");
  const [optionName, setOptionName] = React.useState([]);
  console.log(editPackageDetails);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setOptionName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleCategory = (event) => {
    setPackageOption(event.target.value);
  };
  return (
    <div
      className="absolute pl-36 top-0 right-0  z-10  w-full h-full"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div onClick={cancel} className={` ${styles.arrow_con}`}>
            <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
          </div>
          <h2 className="font-medium">الباقات والأسعار</h2>
        </div>
        <Button
          onClick={() => {
            setEndActionTitle(
              editPackageDetails
                ? "تم تعديل الباقة بنجاح"
                : "تم اضافة باقة جديدة بنجاح"
            );
            cancel();
          }}
          type={"normal"}
        >
          {editPackageDetails ? "حفظ التعديلات" : "اعتماد الباقة"}{" "}
        </Button>
      </div>
      <div>
        <h2 className="mb-2 font-medium" style={{ color: "#1DBBBE" }}>
          رقم الباقة
        </h2>
        <label htmlFor="">
          <input
            className="text-center p-2 outline-none rounded-lg placeholder:text-gray-800"
            style={{ backgroundColor: "#D3D3D3" }}
            placeholder="0212"
            type="text"
          />
        </label>
        <div className="mt-6 p-8 shadow-lg" style={{ backgroundColor: "#fff" }}>
          <h2 style={{ color: "#0099FB" }} className="font-medium mb-3">
            <AiFillStar
              style={{
                display: "inline-block",
                marginLeft: "1rem",
                color: "red",
              }}
            ></AiFillStar>
            البيانات الأساسية
          </h2>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={10}>
              <Grid item xs={6}>
                <Paper className="flex items-center shadow-none">
                  <h2 className="w-40">اسم الباقة</h2>
                  <label className="flex-1" htmlFor="">
                    <input
                      className=" w-full p-2 outline-none rounded-lg placeholder:text-gray-800"
                      style={{ backgroundColor: "#EFF9FF" }}
                      placeholder="أدخل حروف انجليزية وأرقام"
                      type="text"
                    />
                  </label>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className="flex items-center shadow-none">
                  <h2 className="w-40">الخصم</h2>
                  <label className="flex-1" htmlFor="">
                    <input
                      className=" w-full p-2 outline-none rounded-lg placeholder:text-gray-800"
                      style={{ backgroundColor: "#EFF9FF" }}
                      placeholder="أدخل مبلغ الخصم"
                      type="number"
                    />
                  </label>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className="flex items-center shadow-none">
                  <h2 className="w-40">المبلغ الشهري</h2>
                  <label className="flex-1" htmlFor="">
                    <input
                      className=" w-full p-2 outline-none rounded-lg placeholder:text-gray-800"
                      style={{ backgroundColor: "#EFF9FF" }}
                      placeholder="50 ر.س"
                      type="number"
                    />
                  </label>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className="flex items-center shadow-none">
                  <h2 className="w-40">المبلغ السنوي</h2>
                  <label className="flex-1" htmlFor="">
                    <input
                      className=" w-full p-2 outline-none rounded-lg placeholder:text-gray-800"
                      style={{ backgroundColor: "#EFF9FF" }}
                      placeholder="500 ر.س"
                      type="number"
                    />
                  </label>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
        {editPackageDetails && (
          <div className="my-3 p-5" style={{ backgroundColor: "#EBEBEB" }}>
            <h3 className="mb-3" style={{ color: "#67747B", fontSize: "20px" }}>
              الخطة الحالية
            </h3>
            <div className="">
              {editPackageDetails.map((bool, idx) => {
                if (bool) {
                  return (
                    <div
                      style={{
                        backgroundColor: "#0BF1D1",
                        marginRight: "5px",
                        display: "inline-flex",
                      }}
                      className=" gap-4 items-center py-1 px-3 mb-4 rounded-lg"
                    >
                      <h2
                        className=" "
                        style={{
                          color: "#011723",
                        }}
                      >
                        {packagesOptions[idx]}
                      </h2>
                      <MdClear
                        className="cursor-pointer"
                        fill="#011723"
                      ></MdClear>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        <div className="mt-6 p-8 shadow-lg" style={{ backgroundColor: "#fff" }}>
          <h2 style={{ color: "#0099FB" }} className="font-medium mb-3">
            <AiFillStar
              style={{
                display: "inline-block",
                marginLeft: "1rem",
                color: "red",
              }}
            ></AiFillStar>
            خطة الباقة
          </h2>
          <FormControl sx={{ width: "100%" }}>
            <Select
              multiple
              displayEmpty
              value={optionName}
              onChange={handleChange}
              input={<OutlinedInput />}
              sx={{
                backgroundColor: "#EFF9FF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#92D9FF !important",
                },
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return "اختر وصف الباقة";
                }

                return selected.map((item) => {
                  return (
                    <div
                      className="py-1 px-3 text-slate-50 rounded-lg font-light"
                      style={{
                        backgroundColor: "#0099FB",
                        marginRight: "5px",
                        display: "inline",
                      }}
                    >
                      {item}
                    </div>
                  );
                });
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {packagesOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default AddNewPackagePlan;
