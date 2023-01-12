import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AiFillStar } from "react-icons/ai";
import Select from "@mui/material/Select";
import Button from "../../../../UI/Button/Button";
import Context from "../../../../store/context";
import styles from "./AddNewCoupon.module.css";
import MenuItem from "@mui/material/MenuItem";
import { GoArrowRight } from "react-icons/go";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";
import { BiLinkAlt, BiRadioCircleMarked, BiRadioCircle } from "react-icons/bi";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { width } from "@mui/system";
import dayjs from "dayjs";

const packagesOptions = [
  "إدارة المنصة",
  "المشرف العام",
  "مسئول المتاجر والباقات",
  "مسئول السوق والصفحات",
];

const AddNewUser = ({ cancel, couponDetails }) => {
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [couponTypePercent, setCouponTypePercent] = useState(true);
  const [value, setValue] = useState(dayjs("0"));
  const [couponCode, setCouponCode] = useState("");

  const [discountPercent, setDiscountPercent] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [useForEveryone, setUseForEveryone] = useState("");
  const [useForOne, setUseForOne] = useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (couponDetails) {
      if (couponDetails.discountType !== "نسبة مئوية") {
        setCouponTypePercent(false);
      }
      setCouponCode(couponDetails.couponCode);
      setDiscountPercent(couponDetails.discountPercent);
      setDiscountValue(couponDetails.discountValue);
      setValue(dayjs(couponDetails.expireDate));
      setUseForEveryone(couponDetails.useForEveryone);
      setUseForOne(couponDetails.useForOne);
    }
  }, [couponDetails]);

  return (
    <div
      className="absolute pl-36 top-0 right-0  z-10 pt-9 pr-2  w-full "
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div onClick={cancel} className={` ${styles.arrow_con}`}>
            <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
          </div>
          <h2>جدول الكوبونات</h2>
        </div>
        <Button
          type={"normal"}
          style={{ backgroundColor: couponDetails ? "#67747B" : "#B6BE34" }}
          onClick={() => {
            setEndActionTitle(
              couponDetails
                ? "تم تعديل كوبون  بنجاح"
                : "تم اضافة كوبون جديد بنجاح"
            );
            cancel();
          }}
        >
          {" "}
          {couponDetails ? "تعديل الكوبون" : "اعتماد الكوبون"}
        </Button>
      </div>

      <div className={"bg-slate-50 mt-12 px-5 mx-1"}>
        <div className="mt-6  ">
          <h2 className="font-medium mb-2" style={{ color: "#011723" }}>
            <AiFillStar
              style={{
                display: "inline-block",
                marginLeft: "0.5rem",
                color: "red",
              }}
            ></AiFillStar>
            كود التخفيض
          </h2>
          <label className="w-full" htmlFor="">
            <input
              value={couponCode}
              className="outline-none p-4 rounded-lg"
              style={{
                border: "1px solid #ccc",
                backgroundColor: "#EFF9FF",
                width: "376px",
                color: "#0099FB",
              }}
              type="text"
              placeholder="أدخل حروف انجليزية وأرقام بدون مسافة"
            />
          </label>
        </div>
        <h2 className="my-5">اختر نوع الخصم</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex gap-2">
            <div className="flex-1 shadow-lg rounded-lg">
              <div
                className="w-full cursor-pointer gap-2 flex items-center px-4 rounded-lg"
                style={{
                  backgroundColor: couponTypePercent ? "#1DBBBE" : "#EFF9FF",
                  height: "75px",
                }}
                onClick={() => {
                  setCouponTypePercent(true);
                }}
              >
                <div>
                  {couponTypePercent ? (
                    <BiRadioCircleMarked fill="#FFFFFF" size={"1.5rem"} />
                  ) : (
                    <BiRadioCircle fill="#BDBDBD" size={"1.5rem"} />
                  )}
                </div>
                <h3
                  className=""
                  style={{ color: couponTypePercent ? "#fff" : "#011723" }}
                >
                  نسبة من مشتريات الباقة
                </h3>
              </div>
              <div className="py-6 px-5">
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{ color: couponTypePercent ? "#011723" : "#A7A7A7" }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    نسبة التخفيض %
                  </h2>
                  <label className="w-full" htmlFor="">
                    <input
                      value={couponTypePercent ? discountPercent : ""}
                      onChange={(e) => {
                        setDiscountPercent(e.target.value);
                      }}
                      className="outline-none p-4 rounded-lg"
                      disabled={!couponTypePercent}
                      style={{
                        border: couponTypePercent
                          ? "1px solid #242424"
                          : "1px solid #D3D3D3",
                        width: "376px",
                        color: "#0099FB",
                        fontWeight: "600",
                      }}
                      type="text"
                      placeholder="أدخل رقم"
                    />
                  </label>
                </div>
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{ color: couponTypePercent ? "#011723" : "#A7A7A7" }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    مبلغ التخفيض ر.س
                  </h2>
                  <label className="w-full" htmlFor="">
                    <input
                      value={couponTypePercent ? discountValue : ""}
                      onChange={(e) => {
                        setDiscountValue(e.target.value);
                      }}
                      className="outline-none p-4 rounded-lg"
                      disabled={!couponTypePercent}
                      style={{
                        border: couponTypePercent
                          ? "1px solid #242424"
                          : "1px solid #D3D3D3",
                        width: "376px",
                        color: "#0099FB",
                        fontWeight: "600",
                      }}
                      type="text"
                      placeholder="أدخل رقم"
                    />
                  </label>
                </div>
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{ color: couponTypePercent ? "#011723" : "#A7A7A7" }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    تاريخ الانتهاء
                  </h2>
                  <MobileDatePicker
                    label=""
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    disabled={!couponTypePercent}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          width: "376px",
                          "& .MuiInputBase-input": {
                            border: couponTypePercent
                              ? "1px solid #242424"
                              : "1px solid #D3D3D3",
                            borderRadius: "8px",
                            color: "#0099FB",
                            fontWeight: "600",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                        {...params}
                      />
                    )}
                  />
                </div>
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{ color: couponTypePercent ? "#011723" : "#A7A7A7" }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    عدد مرات الاستخدام للجميع
                  </h2>
                  <label className="w-full" htmlFor="">
                    <input
                      value={couponTypePercent ? useForEveryone : ""}
                      onChange={(e) => {
                        setUseForEveryone(e.target.value);
                      }}
                      className="outline-none p-4 rounded-lg"
                      disabled={!couponTypePercent}
                      style={{
                        border: couponTypePercent
                          ? "1px solid #242424"
                          : "1px solid #D3D3D3",
                        width: "376px",
                        color: "#0099FB",
                        fontWeight: "600",
                      }}
                      type="number"
                      placeholder="أدخل رقم"
                    />
                  </label>
                </div>
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{ color: couponTypePercent ? "#011723" : "#A7A7A7" }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    عدد مرات الاستخدام للشريك الواحد
                  </h2>
                  <label className="w-full" htmlFor="">
                    <input
                      value={couponTypePercent ? useForOne : ""}
                      onChange={(e) => {
                        setUseForOne(e.target.value);
                      }}
                      className="outline-none p-4 rounded-lg"
                      disabled={!couponTypePercent}
                      style={{
                        border: couponTypePercent
                          ? "1px solid #242424"
                          : "1px solid #D3D3D3",
                        width: "376px",
                        color: "#0099FB",
                        fontWeight: "600",
                      }}
                      type="number"
                      placeholder="أدخل رقم"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-1 shadow-lg rounded-lg">
              <div
                className="w-full cursor-pointer gap-2 flex items-center px-4 rounded-lg"
                style={{
                  backgroundColor: !couponTypePercent ? "#1DBBBE" : "#EFF9FF",
                  height: "75px",
                }}
                onClick={() => {
                  setCouponTypePercent(false);
                }}
              >
                <div>
                  {!couponTypePercent ? (
                    <BiRadioCircleMarked fill="#FFFFFF" size={"1.5rem"} />
                  ) : (
                    <BiRadioCircle fill="#BDBDBD" size={"1.5rem"} />
                  )}
                </div>
                <h3
                  className=""
                  style={{ color: !couponTypePercent ? "#fff" : "#011723" }}
                >
                  مبلغ ثابت من مشتريات الباقة
                </h3>
              </div>
              <div className="py-6 px-5">
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{
                      color: !couponTypePercent ? "#011723" : "#A7A7A7",
                    }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: !couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    ادخال مبلغ المشتريات
                  </h2>
                  <label className="w-full" htmlFor="">
                    <input
                      className="outline-none p-4 rounded-lg"
                      disabled={couponTypePercent}
                      style={{
                        border: !couponTypePercent
                          ? "1px solid #242424"
                          : "1px solid #D3D3D3",
                        width: "376px",
                      }}
                      type="text"
                      placeholder="أدخل رقم"
                    />
                  </label>
                </div>
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{
                      color: !couponTypePercent ? "#011723" : "#A7A7A7",
                    }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: !couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    مبلغ التخفيض ر.س
                  </h2>
                  <label className="w-full" htmlFor="">
                    <input
                      className="outline-none p-4 rounded-lg"
                      disabled={couponTypePercent}
                      style={{
                        border: !couponTypePercent
                          ? "1px solid #242424"
                          : "1px solid #D3D3D3",
                        width: "376px",
                      }}
                      type="text"
                      placeholder="أدخل رقم"
                    />
                  </label>
                </div>
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{
                      color: !couponTypePercent ? "#011723" : "#A7A7A7",
                    }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: !couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    تاريخ الانتهاء
                  </h2>
                  <MobileDatePicker
                    label=""
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    disabled={couponTypePercent}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          width: "376px",
                          "& .MuiInputBase-input": {
                            border: !couponTypePercent
                              ? "1px solid #242424"
                              : "1px solid #D3D3D3",
                            borderRadius: "8px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                        {...params}
                      />
                    )}
                  />
                </div>
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{
                      color: !couponTypePercent ? "#011723" : "#A7A7A7",
                    }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: !couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    عدد مرات الاستخدام للجميع
                  </h2>
                  <label className="w-full" htmlFor="">
                    <input
                      className="outline-none p-4 rounded-lg"
                      disabled={couponTypePercent}
                      style={{
                        border: !couponTypePercent
                          ? "1px solid #242424"
                          : "1px solid #D3D3D3",
                        width: "376px",
                      }}
                      type="number"
                      placeholder="أدخل رقم"
                    />
                  </label>
                </div>
                <div className="mb-5 ">
                  <h2
                    className="font-medium mb-2"
                    style={{
                      color: !couponTypePercent ? "#011723" : "#A7A7A7",
                    }}
                  >
                    <AiFillStar
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        color: !couponTypePercent ? "#FF3838" : "#A7A7A7",
                      }}
                    ></AiFillStar>
                    عدد مرات الاستخدام للشريك الواحد
                  </h2>
                  <label className="w-full" htmlFor="">
                    <input
                      className="outline-none p-4 rounded-lg"
                      disabled={couponTypePercent}
                      style={{
                        border: !couponTypePercent
                          ? "1px solid #242424"
                          : "1px solid #D3D3D3",
                        width: "376px",
                      }}
                      type="number"
                      placeholder="أدخل رقم"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </LocalizationProvider>
      </div>
      <div className="pb-20"></div>
    </div>
  );
};

export default AddNewUser;
