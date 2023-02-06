import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import { ReactComponent as InstaIcon } from "../../../../assets/Icons/icon-32-instagram.svg";
import { ReactComponent as FaceBIcon } from "../../../../assets/Icons/icon-24-facebook.svg";
import { ReactComponent as TwitterIcon } from "../../../../assets/Icons/icon-24-twitter.svg";
import { ReactComponent as TiktokIcon } from "../../../../assets/Icons/icon-32-tiktok.svg";

import { MdFileUpload } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineAddCircle } from "react-icons/md";

import Button from "../../../../UI/Button/Button";

const SocialMediaActivity = ({ openAddLink }) => {
  const [images, setImages] = useState([]);
  const [activateBanner, setActivateBanner] = useState([1, 2, 3, 4]);
  const handleActivatedBanners = (id) => {
    const exist = activateBanner.some((e) => e === id);
    if (exist) {
      const arr = activateBanner.filter((e) => e !== id);
      setActivateBanner(arr);
    } else {
      setActivateBanner([...activateBanner, id]);
    }
  };

  return (
    <div
      className="md:mt-8 mt-4 shadow-md rounded-lg"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        className="md:px-3 md:py-5 p-4 rounded-t-lg flex md:flex-row flex-col justify-between items-center"
        style={{ backgroundColor: "#F7FCFF", border: "1px solid #EFEFEF" }}
      >
        <h2 className="md:text-[22px] text-[18px] font-semibold flex items-center whitespace-nowrap">
          التواصل الاجتماعي
          <span className="mr-3 md:text-[16px] text-[14px] font-normal whitespace-pre-line">
            (تستطيع تفعيل وتعطيل وإضافة صفحات منصات التواصل الاجتماعي)
          </span>
        </h2>
      </div>
      <div className="md:py-7 py-0 flex flex-col items-center ">
        <div style={{ width: '572px',maxWidth:'100%' }}>
          <div
            className="w-full p-8 flex justify-between items-center rounded"
            style={{ border: "1px solid #E3E3E3" }}
          >
            <div className="flex gap-6">
              <Box sx={{}}>
                <FaceBIcon></FaceBIcon>
              </Box>

              <h2 className="font-medium md:text-[18px] text-[16px]" style={{ color: "#011723" }}>
                فيسبوك
              </h2>
            </div>
            <div
              className={`w-8 mr-4 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${""}`}
              style={{
                backgroundColor: activateBanner.some((e) => {
                  return e === 1;
                })
                  ? "#3AE374"
                  : "#A7A7A7",
              }}
              onClick={() => {
                handleActivatedBanners(1);
              }}
            >
              <div
                className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${
                  activateBanner.some((e) => {
                    return e === 1;
                  })
                    ? "left-4"
                    : "left-1"
                }`}
              ></div>
            </div>
          </div>
          <div
            className="w-full mt-5 p-8 flex justify-between items-center rounded"
            style={{ border: "1px solid #E3E3E3" }}
          >
            <div className="flex gap-6">
              <Box sx={{}}>
                <InstaIcon width={"25px"}></InstaIcon>
              </Box>

              <h2 className="font-medium md:text-[18px] text-[16px]" style={{ color: "#011723" }}>
                انستجرام
              </h2>
            </div>
            <div
              className={`w-8 mr-4 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${""}`}
              style={{
                backgroundColor: activateBanner.some((e) => {
                  return e === 2;
                })
                  ? "#3AE374"
                  : "#A7A7A7",
              }}
              onClick={() => {
                handleActivatedBanners(2);
              }}
            >
              <div
                className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${
                  activateBanner.some((e) => {
                    return e === 2;
                  })
                    ? "left-4"
                    : "left-1"
                }`}
              ></div>
            </div>
          </div>
          <div
            className="w-full mt-5 p-8 flex justify-between items-center rounded"
            style={{ border: "1px solid #E3E3E3" }}
          >
            <div className="flex gap-6">
              <Box sx={{}}>
                <TwitterIcon width={"25px"}></TwitterIcon>
              </Box>

              <h2 className="font-medium md:text-[18px] text-[16px]" style={{ color: "#011723" }}>
                تويتر
              </h2>
            </div>
            <div
              className={`w-8 mr-4 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${""}`}
              style={{
                backgroundColor: activateBanner.some((e) => {
                  return e === 3;
                })
                  ? "#3AE374"
                  : "#A7A7A7",
              }}
              onClick={() => {
                handleActivatedBanners(3);
              }}
            >
              <div
                className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${
                  activateBanner.some((e) => {
                    return e === 3;
                  })
                    ? "left-4"
                    : "left-1"
                }`}
              ></div>
            </div>
          </div>
          <div
            className="w-full mt-5 p-8 flex justify-between items-center rounded"
            style={{ border: "1px solid #E3E3E3" }}
          >
            <div className="flex gap-6">
              <Box sx={{}}>
                <TiktokIcon width={"25px"}></TiktokIcon>
              </Box>

              <h2 className="font-medium md:text-[18px] text-[16px]" style={{ color: "#011723" }}>
                تيك توك
              </h2>
            </div>
            <div
              className={`w-8 mr-4 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${""}`}
              style={{
                backgroundColor: activateBanner.some((e) => {
                  return e === 4;
                })
                  ? "#3AE374"
                  : "#A7A7A7",
              }}
              onClick={() => {
                handleActivatedBanners(4);
              }}
            >
              <div
                className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${
                  activateBanner.some((e) => {
                    return e === 4;
                  })
                    ? "left-4"
                    : "left-1"
                }`}
              ></div>
            </div>
          </div>
          <div
            className="w-full mt-5 p-8 flex justify-between items-center rounded cursor-pointer"
            style={{ border: "1px solid #E3E3E3" }}
            onClick={openAddLink}
          >
            <div className="flex gap-6 items-center">
              <Box sx={{}}>
                <MdOutlineAddCircle
                  color={"#67747B"}
                  size={"25px"}
                ></MdOutlineAddCircle>
              </Box>

              <h2 className="font-medium md:text-[18px] text-[16px]" style={{ color: "#011723" }}>
                إضافة رابط جديد
              </h2>
            </div>
          </div>
        </div>
        <Button
          className={"mx-auto mt-9"}
          fontSize={"text-2xl font-thin"}
          style={{ backgroundColor: "#02466A" }}
          type={"normal"}
        >
          حفظ
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaActivity;
