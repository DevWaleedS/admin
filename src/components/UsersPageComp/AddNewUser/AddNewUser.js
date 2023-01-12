import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AiFillStar } from "react-icons/ai";
import Select from "@mui/material/Select";
import Button from "../../../UI/Button/Button";
import styles from "./AddNewUser.module.css";
import MenuItem from "@mui/material/MenuItem";
import { GoArrowRight } from "react-icons/go";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";
import { BiLinkAlt } from "react-icons/bi";
import { width } from "@mui/system";

const packagesOptions = [
  "إدارة المنصة",
  "المشرف العام",
  "مسئول المتاجر والباقات",
  "مسئول السوق والصفحات",
];

const AddNewUser = ({ cancel }) => {
  const [images, setImages] = useState([]);
  const [packageOption, setPackageOption] = useState("");
  const handleCategory = (event) => {
    setPackageOption(event.target.value);
  };
  const onChangeImage = (imageList, addUpdateIndex) => {
    console.log(imageList[0].file.name);
    // data for submit
    setImages(imageList);
  };
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
          <h2>إضافة مستخدم جديد</h2>
        </div>
      </div>
      <div className={"bg-slate-50 mt-12 px-5 mx-1"}>
        <h2 className="font-medium text-2xl" style={{ color: "#0077FF" }}>
          <AiFillStar
            style={{
              display: "inline-block",
              marginLeft: "1rem",
              color: "red",
            }}
          ></AiFillStar>
          بيانات المستخدم
        </h2>
        <div className="flex">
          <div className="flex-1 p-8">
            <div className="mt-6  ">
              <h2 className="font-medium mb-2">الدور الوظيفى</h2>
              <Select
                value={packageOption}
                onChange={handleCategory}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                renderValue={(selected) => {
                  if (packageOption === "") {
                    return <h2>الكل</h2>;
                  }
                  return selected;
                }}
                sx={{
                  height: "3.5rem",
                  width: "100%",
                  border: "1px solid rgba(29, 187, 190, 1)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                {packagesOptions.map((item) => {
                  return (
                    <MenuItem
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
            </div>
            <div className="mt-6  ">
              <h2 className="font-medium mb-2">اسم المتسخدم</h2>
              <label className="w-full" htmlFor="">
                <input
                  className="w-full outline-none p-4"
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "#EFF9FF",
                  }}
                  type="text"
                  placeholder="ادخل حروف فقط"
                />
              </label>
            </div>
            <div className="mt-6  ">
              <h2 className="font-medium mb-2">البريد الالكترونى</h2>
              <label className="w-full" htmlFor="">
                <input
                  className="w-full outline-none p-4"
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "#EFF9FF",
                  }}
                  type="email"
                  placeholder="sample@sa.com"
                />
              </label>
            </div>
            <div className="mt-6  ">
              <h2 className="font-medium mb-2">الصورة الشخصية</h2>
              <ImageUploading
                value={images}
                onChange={onChangeImage}
                maxNumber={2}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "jpeg"]}
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
                    className="upload__image-wrapper relative h-14 flex items-center overflow-hidden"
                    style={{ border: "1px solid #ccc" }}
                    // onClick={() => {
                    //   onImageUpload();
                    // }}
                    {...dragProps}
                  >
                    <h2
                      className="w-full outline-none p-4 cursor-pointer"
                      style={{
                        backgroundColor: "#EFF9FF",
                        color: "#aaa",
                      }}
                      onClick={() => {
                        onImageUpload();
                      }}
                    >
                      {images[0]?.file?.name || "أدخل الصورة الشخصية"}
                    </h2>
                    <div
                      className="flex h-full items-center justify-center"
                      style={{
                        width: "3.5rem",
                        backgroundColor: "#02466A",
                      }}
                    >
                      <BiLinkAlt color="#fff"></BiLinkAlt>
                    </div>
                    {/* <div className="image-item h-full w-full cursor-pointer"> */}
                    {/* <button
                          style={isDragging ? { color: "red" } : null}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Click or Drop here
                        </button> */}
                    {/* {!images[0] && (
                        <div className="flex flex-col justify-center items-center gap-6 h-full w-full">
                          <IoMdCloudUpload size={"2em"}></IoMdCloudUpload>
                          <h2 className="font-semibold">اسحب الصورة هنا</h2>
                          <h2>(سيتم قبول الصور png & jpg)</h2>
                        </div>
                      )}
                      {images[0] && (
                        <img
                          src={images[0]?.data_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )} */}
                    {/* </div> */}
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>
          <div className="flex-1 pt-8">
            <div className="mt-6  ">
              <h2 className="font-medium mb-2">كلمة المرور</h2>
              <label className="w-full" htmlFor="">
                <input
                  className="w-full outline-none p-4"
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "#EFF9FF",
                  }}
                  type="password"
                  placeholder="*******************"
                />
              </label>
            </div>
            <div className="mt-6  ">
              <h2 className="font-medium mb-2">تأكيد كلمة المرور</h2>
              <label className="w-full" htmlFor="">
                <input
                  className="w-full outline-none p-4"
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "#EFF9FF",
                  }}
                  type="password"
                  placeholder="*******************"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="mt-28">
          <Button
            style={{ backgroundColor: "#02466A", margin: "0 auto" }}
            type={"normal"}
            fontSize={"text-xl"}
          >
            حفظ واعتماد
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
