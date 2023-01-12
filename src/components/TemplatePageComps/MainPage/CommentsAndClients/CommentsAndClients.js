import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import { ReactComponent as RatingsIcon } from "../../../../assets/Icons/icon-24-ratings.svg";
import { ReactComponent as Comments } from "../../../../assets/Icons/icon-32-comment.svg";

import { MdFileUpload } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

import Button from "../../../../UI/Button/Button";

const CommentsAndClients = () => {
  const [images, setImages] = useState([]);
  const [activateBanner, setActivateBanner] = useState([1, 2, 3]);
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
      className="mt-8 shadow-md rounded-lg "
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        className="p-3 rounded-t-lg flex justify-between items-center"
        style={{ backgroundColor: "#F7FCFF", border: "1px solid #EFEFEF" }}
      >
        <h2 className="text-xl font-semibold flex items-center">
          التعليقات والعملاء
          <span className="mr-3 text-base font-normal">
            (تستطيع تفعيل وتعطيل العملاء المميزين والتعليقات)
          </span>
        </h2>
        <Link to={"/التعليقات"}>
          <Button
            svg={
              <BiArrowBack
                color="#fff"
                size={"1.25rem"}
                style={{ order: "1" }}
              />
            }
            fontSize={"text-lg"}
            fontWeight={"font-normal"}
            className={"rounded-full"}
            type={"normal"}
            style={{ backgroundColor: "#0077FF" }}
          >
            عرض التفاصيل
          </Button>
        </Link>
      </div>
      <div className="py-7 flex flex-col items-center ">
        <div style={{ width: "572px" }}>
          <div
            className="w-full p-8 flex justify-between items-center rounded"
            style={{ border: "1px solid #E3E3E3" }}
          >
            <div className="flex gap-6">
              <Box
                sx={{
                  "& path": {
                    fill: "#242424",
                  },
                }}
              >
                <RatingsIcon color="#242424"></RatingsIcon>
              </Box>

              <h2 className="font-medium" style={{ color: "#011723" }}>
                العملاء المميزين
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
              <Box
                sx={{
                  "& path": {
                    fill: "#242424",
                  },
                }}
              >
                <Comments width={"25px"}></Comments>
              </Box>

              <h2 className="font-medium" style={{ color: "#011723" }}>
                تعليقات العملاء
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
        </div>
        <Button
          className={"mx-auto mt-9"}
          fontSize={"text-2xl font-thin"}
          style={{ backgroundColor: "#02466A" }}
          type={"normal"}
        >
          حفظ
        </Button>
        {/* <ImageUploading
          value={images}
          onChange={onChangeLogoImage}
          maxNumber={2}
          dataURLKey="data_url"
          acceptType={["jpg", "png", "jpeg"]}
          disabled={true}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div
              className="upload__image-wrapper relative "
              style={{
                width: "572px",

                // border: images[0] ? "none" : "1px dashed #ccc",
                // borderRadius: "10px",
              }}
            >
              <div className="image-item w-full ">
                <div
                  style={{ border: "1px dashed #ccc", height: "137px" }}
                  className="flex p-4 flex-col justify-center items-center gap-6  w-full"
                >
                  {!images[0] && <img src={Logo} alt="" />}
                  {images[0] && (
                    <img
                      src={images[0]?.data_url}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div
                  onClick={() => {
                    onImageUpload();
                  }}
                  className="flex cursor-pointer justify-between items-center p-4 mt-2"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px dashed #E0E0E0",
                  }}
                >
                  <h2 className="text-base font-medium">تحديث الشعار</h2>
                  <MdFileUpload color="#02466A" size={"1.25rem"}></MdFileUpload>
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
          )}
        </ImageUploading> */}
      </div>
    </div>
  );
};

export default CommentsAndClients;
