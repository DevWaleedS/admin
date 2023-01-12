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
import {Template} from '../../../assets/Icons/index';

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

const AddNewPackagePlan = ({ cancel, setChooseTemplate ,editPackageDetails }) => {
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
      className="absolute pl-36 pr-4 top-0 right-0  z-10  w-full h-full"
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
            className="font-medium text-center p-2 outline-none rounded-lg placeholder:text-gray-800"
            style={{ backgroundColor: "#D3D3D3", color: '#02466A' }}
            placeholder="0212"
            type="text"
          />
        </label>
        {editPackageDetails && (
          <div className="my-6 p-5 rounded-lg" style={{ backgroundColor: "#EBEBEB" }}>
            <h3 className="mb-3" style={{ color: "#67747B", fontSize: "20px" }}>
              الخطة الحالية
            </h3>
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
        )}
        {
          editPackageDetails ? 
          (
          <div className="bg-white mt-6 p-8 pb-20 rounded-lg" style={{ boxShadow: '0px 3px 6px #1DBBBE0F' }}>
              <h2 style={{ color: "#0099FB" }} className="text-lg font-medium mb-3">
                 اضافة محتوى جديد للخطة
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
          )
          :
          (
            <div className="bg-white mt-6 p-8 pb-20 rounded-lg" style={{ boxShadow: '0px 3px 6px #1DBBBE0F' }}>
            <h2 style={{ color: "#0099FB" }} className="text-lg font-medium mb-3">
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
          )
        }
        <div className="bg-white mt-6 p-8 rounded-lg" style={{ boxShadow: '0px 3px 6px #1DBBBE0F' }}>
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
            <Grid container spacing={4}>
              <Grid item xs={6} container rowSpacing={4}>
                <Grid item xs={12}>
                  <Box className="flex flex-row items-center">
                    <label style={{ color: '#011723' }} className="w-60 font-medium whitespace-nowrap" htmlFor="name">اسم الباقة</label>
                    <input
                      id="name"
                      className=" w-full px-4 py-3 outline-none rounded-lg"
                      style={{ backgroundColor: "#EFF9FF", '&::placeholder': '#A7A7A7' }}
                      placeholder="أدخل اسم الباقة"
                      type="text"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="flex flex-row items-center">
                    <label style={{ color: '#011723' }} className="w-60 font-medium whitespace-nowrap" htmlFor="month">المبلغ الشهري</label>
                    <input
                      id="month"
                      className=" w-full px-4 py-3 outline-none rounded-lg"
                      style={{ backgroundColor: "#EFF9FF", '&::placeholder': '#A7A7A7' }}
                      placeholder="350 ر.س"
                      type="text"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="flex flex-row items-center">
                    <label style={{ color: '#011723' }} className="w-60 font-medium whitespace-nowrap" htmlFor="month">الخصم</label>
                    <input
                      id="month"
                      className=" w-full px-4 py-3 outline-none rounded-lg"
                      style={{ backgroundColor: "#EFF9FF", '&::placeholder': '#A7A7A7' }}
                      placeholder="أدخل مبلغ الخصم"
                      type="text"
                    />
                  </Box>
                  <div className="flex flex-row items-center mt-3">
                    <div className="w-40"></div>
                    <span style={{ color: '#D3D3D3' }} className="text-sm">ادخال نسبة الخصم في حال الشراء سنوياً مثال 30%</span>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={6} container>
                <Grid item xs={12}>
                  <Box className="flex flex-row items-center">
                    <label style={{ color: '#011723' }} className="w-60 font-medium whitespace-nowrap" htmlFor="name">المبلغ السنوي</label>
                    <input
                      id="name"
                      className=" w-full px-4 py-3 outline-none rounded-lg"
                      style={{ backgroundColor: "#EFF9FF", '&::placeholder': '#A7A7A7' }}
                      placeholder="2500 ر.س"
                      type="text"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <div className="w-full mt-5 flex flex-row gap-6 pb-16">
            <AiFillStar
              style={{
                color: "red",
              }}
            ></AiFillStar>
          <Button
            className={"w-full rounded-lg py-4 ml-10"}
            style={{ backgroundColor: "#FFFFFF",border: '1px solid #02466A' }}
            svg={<img src={Template} alt="template-icon" />}
            type={"outline"}
            onClick={() => {
              setChooseTemplate(true);
            }}
          >
              <h2 style={{ color:'#02466A' }} className="font-medium">اختر قوالب الباقة</h2>
          </Button>
      </div>
    </div>
  );
};

export default AddNewPackagePlan;