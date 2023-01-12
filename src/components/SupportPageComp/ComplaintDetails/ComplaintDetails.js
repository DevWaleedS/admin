import React, { useState, useEffect } from "react";
import { Currency } from "../../../assets/Icons/index";
import Button from "../../../UI/Button/Button";
import styles from "./ComplaintDetails.module.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TagsInput } from "react-tag-input-component";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import { AiFillStar } from "react-icons/ai";
import { GoArrowRight } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { ReactComponent as StoreIcon } from "../../../assets/Icons/icon-24-store.svg";
import { ReactComponent as Category } from "../../../assets/Icons/icon-24-Category.svg";
import { ReactComponent as CallIcon } from "../../../assets/Icons/icon-24- call.svg";
import { ReactComponent as SupportIcon } from "../../../assets/Icons/icon-support.svg";
import { ReactComponent as StatusIcon } from "../../../assets/Icons/status.svg";
import { ReactComponent as TypeSupportIcon } from "../../../assets/Icons/type support.svg";
import { IoCalendar } from "react-icons/io5";
import Box from "@mui/material/Box";

const BackDrop = ({ onClick, complaintDetails }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 opacity-50  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};

const stateChanges = [
  { value: "منتهية", color: "#3AE374" },
  {
    value: "غير منتهية",
    color: "#D3D3D3",
  },
  {
    value: "قيد المعالجة",
    color: "#FF9F1A",
  },
];

const AddCountry = ({ cancel, complaintDetails }) => {
  const [countryNumber, setCountryNumber] = useState("");

  const [cityNumber, setCityNumber] = useState("");
  const [arabicCountryName, setArabicCountryName] = useState("");
  const [englishCountryName, setEnglishCountryName] = useState("");

  const handleCountryName = (event) => {
    setCountryNumber(event.target.value);
  };

  const findStateChanges = stateChanges.find(
    (i) => complaintDetails.state == i.value
  );

  // useEffect(() => {
  //   if (data) {
  //     setCountryNumber(data.CountryNumber);
  //     setCityNumber(data.cityNumber);
  //     setArabicCountryName(data.name);
  //     setEnglishCountryName(data.nameEn);
  //   }
  // }, [data]);

  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-slate-50 z-20 ${styles.container}`}
        style={{ width: "1104px", height: "calc(100% - 5rem)" }}
      >
        <div className="flex h-full flex-col justify-between">
          <div
            className="p-8"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <h2 className="font-semibold text-2xl  mb-3">تفاصيل الشكوى</h2>
            <div className="flex">
              <div className={`flex items-center gap-2 `}>
                <div
                  onClick={cancel}
                  className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}
                >
                  <GoArrowRight
                    style={{ color: "#02466A", fontSize: "1.2rem" }}
                  />
                </div>

                <h2 className="font-semibold ml-4"> الدعم الفني </h2>
              </div>

              <h2 className="font-semibold ml-4"> / جدول الشكاوى </h2>

              <h3 className="font-medium" style={{ color: "#67747B" }}>
                / تفاصيل الشكوى
              </h3>
            </div>
          </div>
          <div
            className={`flex-1 overflow-y-scroll py-12 pr-16 ${styles.content}`}
            style={{ backgroundColor: "#F6F6F6" }}
          >
            <h2 className={"font-medium"} style={{ color: "#4D4F5C" }}>
              رقم الشكوى
            </h2>
            <div
              className="mt-2 flex items-center rounded-lg justify-center  h-16 w-44"
              style={{ backgroundColor: "#237EAE" }}
            >
              <h2 className="text-slate-50 text-2xl font-medium">
                {complaintDetails.stateNumber}{" "}
              </h2>
            </div>
            <Box
              sx={{
                "& path, & g": {
                  fill: "#1DBBBE",
                },
              }}
            >
              <div
                className={"mt-8 gap-12 p-6 flex justify-between"}
                style={{ width: "752px", backgroundColor: "#fff" }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex gap-2" style={{ width: "136px" }}>
                      <StoreIcon></StoreIcon>
                      <h2>اسم المتجر</h2>
                    </div>
                    <div
                      className={"flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        height: "70px",
                        width: "180px",
                      }}
                    >
                      <h2 className="font-medium" style={{ color: "#0077FF" }}>
                        {complaintDetails.marketName}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex gap-2" style={{ width: "136px" }}>
                      <Category></Category>
                      <h2>التصنيف</h2>
                    </div>
                    <div
                      className={"flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        height: "70px",
                        width: "180px",
                      }}
                    >
                      <h2 className="font-medium" style={{ color: "#0077FF" }}>
                        {complaintDetails.variety}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex gap-2" style={{ width: "136px" }}>
                      <CallIcon></CallIcon>
                      <h2>الهاتف</h2>
                    </div>
                    <div
                      className={"flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        height: "70px",
                        width: "180px",
                      }}
                    >
                      <h2 className="font-medium" style={{ color: "#0077FF" }}>
                        {complaintDetails.phoneNumber}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex gap-2" style={{ width: "136px" }}>
                      <StatusIcon></StatusIcon>
                      <h2>الحالة</h2>
                    </div>
                    <div
                      className={"flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: findStateChanges.color,
                        height: "70px",
                        width: "180px",
                      }}
                    >
                      <h2 className="font-medium" style={{ color: "#fff" }}>
                        {complaintDetails.state}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="flex gap-2 items-center"
                      style={{ width: "136px" }}
                    >
                      <IoCalendar></IoCalendar>
                      <h2>تاريخ الشكوى</h2>
                    </div>
                    <div
                      className={"flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        height: "70px",
                        width: "180px",
                      }}
                    >
                      <h2 className="font-medium" style={{ color: "#0077FF" }}>
                        {complaintDetails.complaintDate}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex gap-2" style={{ width: "136px" }}>
                      <TypeSupportIcon></TypeSupportIcon>
                      <h2>نوع الاتصال</h2>
                    </div>
                    <div
                      className={"flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        height: "70px",
                        width: "180px",
                      }}
                    >
                      <h2 className="font-medium" style={{ color: "#0077FF" }}>
                        {complaintDetails.connectionType}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex gap-2" style={{ width: "136px" }}>
                      <SupportIcon></SupportIcon>
                      <h2>عنوان الشكوى</h2>
                    </div>
                    <div
                      className={"flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        height: "70px",
                        width: "180px",
                      }}
                    >
                      <h2 className="font-medium" style={{ color: "#0077FF" }}>
                        {complaintDetails.complaintAddress}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </Box>

            <div className="mt-10">
              <h2 className="mb-3">محتوى الشكوى</h2>
              <div
                className="p-5 font-medium"
                style={{
                  minHeight: "220px",
                  width: "752px",
                  backgroundColor: "#fff",
                }}
              >
                {complaintDetails.complaintContent}
              </div>
            </div>
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
              onClick={cancel}
            >
              إغلاق
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCountry;
