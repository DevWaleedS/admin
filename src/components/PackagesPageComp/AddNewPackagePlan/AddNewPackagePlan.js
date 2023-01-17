import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AiFillStar } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import Select from "@mui/material/Select";
import Button from "../../../UI/Button/Button";
import Context from "../../../store/context";
import { ReactComponent as Arrow } from "../../../assets/Icons/icon-24-chevron_down.svg";
import styles from "./AddNewPackagePlan.module.css";
import MenuItem from "@mui/material/MenuItem";
import { GoArrowRight } from "react-icons/go";
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
      className="absolute py-[40px] pl-[102px] pr-4 top-0 right-0  z-10  w-full h-full"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div onClick={cancel} className={` ${styles.arrow_con}`}>
            <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
          </div>
          <h2 style={{ fontSize:'18px',color: '#011723' }}>الباقات والأسعار</h2>
        </div>
        <Button
          style={{ width:'180px',height:'56px', fontSize:'22px',color: '#011723',whiteSpace:'nowrap', }}
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
          {editPackageDetails ? "حفظ التعديلات" : "اعتماد الباقة"}
        </Button>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h2 style={{ fontSize:'16px',color: '#1DBBBE' }}>
          رقم الباقة
        </h2>
          <input
            className="font-medium text-center py-[12px] px-2 outline-none rounded-lg placeholder:text-[#02466A]"
            style={{ width:'180px',height:'56px', backgroundColor: "#D3D3D3", color: '#02466A',fontSize:'24px' }}
            placeholder="0212"
            type="text"
          />
        {editPackageDetails && (
          <div className="mt-[20px] p-4 rounded-lg" style={{ backgroundColor: "#EBEBEB" }}>
            <h3 className="mb-3 font-medium" style={{ color: "#67747B", fontSize: "20px" }}>
              الخطة الحالية
            </h3>
              {editPackageDetails.map((bool, idx) => {
                if (bool) {
                  return (
                    <div
                      style={{
                        backgroundColor: "#0BF1D1",
                        marginLeft: "14px",
                        display: "inline-flex",
                      }}
                      className="gap-4 items-center py-1 px-3 mb-4 rounded-lg"
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
            <div className="flex flex-col gap-[28px] bg-white mt-[28px] pr-[10px] pl-[30px] pt-[20px] pb-20 rounded-lg" style={{ boxShadow: '0px 3px 6px #1DBBBE0F' }}>
            <h2 style={{ color: "#0099FB",fontSize:'20px' }} className="font-medium">
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
                className={styles.select}
                multiple
                displayEmpty
                value={optionName}
                onChange={handleChange}
                IconComponent={(props) => (<Arrow fill="#242424" {...props} />)}
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
                  <MenuItem className="souq_storge_category_filter_items" 
                  key={option} 
                  value={option}
                  sx={{
                    backgroundColor: "#FAFAFA",
                    height: "3rem",
                    "&:hover": {
                      backgroundColor:'#92D9FF'
                    },
                  }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          )
        }
        <div className="flex flex-col gap-[28px] bg-white mt-6 p-8 rounded-lg" style={{ boxShadow: '0px 3px 6px #1DBBBE0F' }}>
          <h2 style={{ color: "#0099FB",fontSize:'20px' }} className="font-medium">
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
                    <label style={{ color: '#011723',fontSize:'18px' }} className="w-60 whitespace-nowrap" htmlFor="name">اسم الباقة</label>
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
                    <label style={{ color: '#011723',fontSize:'18px' }} className="w-60 whitespace-nowrap" htmlFor="month">المبلغ الشهري</label>
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
                    <label style={{ color: '#011723',fontSize:'18px' }} className="w-60 whitespace-nowrap" htmlFor="month">الخصم</label>
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
                    <label style={{ color: '#011723',fontSize:'18px' }} className="w-60 whitespace-nowrap" htmlFor="name">المبلغ السنوي</label>
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
            style={{ width:'960px',height:'56px',backgroundColor: "#FFFFFF",border: '1px solid #02466A' }}
            svg={<img src={Template} alt="template-icon" />}
            type={"outline"}
            onClick={() => {
              setChooseTemplate(true);
            }}
          >
              <h2 style={{ color:'#02466A',fontSize:'20px' }} className="font-medium">اختر قوالب الباقة</h2>
          </Button>
      </div>
    </div>
  );
};

export default AddNewPackagePlan;