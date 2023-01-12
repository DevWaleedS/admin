import React, { useState } from "react";

import Button from "../../../../UI/Button/Button";
import styles from "./AddVariety.module.css";
import { AiFillStar } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};

const formTitleClasses = "font-semibold text-lg";
const formTitleStyle = { width: "315px" };
//
const formInputClasses = "p-4 outline-0 rounded-md";
const formInputStyle = {
  width: "555px",
  border: "1px solid rgba(167, 167, 167, 0.5)",
};
const NewProduct = ({ cancel }) => {
  const [images, setImages] = useState([]);
  const [multiImages, setMultiImages] = useState([]);
  console.log(multiImages);

  const maxNumber = 2;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
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
              اضافة تصنيف - المتاجر
            </h2>
            <h2>أضف فئة المنتج الخاص بك والمعلومات الضرورية من هنا</h2>
          </div>
          <div
            className={`flex-1 overflow-y-scroll py-12 pr-8 ${styles.content}`}
          >
            <form action="">
              <div className="flex mb-8">
                <h2 className={formTitleClasses} style={formTitleStyle}>
                  صور المنتج الرئيسية
                </h2>
                <ImageUploading
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
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
                      className="upload__image-wrapper relative overflow-hidden"
                      style={{
                        width: "555px",
                        height: "170px",
                        border: images[0] ? "none" : "3px dashed #ccc",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        onImageUpload();
                      }}
                      {...dragProps}
                    >
                      <div className="image-item h-full w-full cursor-pointer">
                        {/* <button
                          style={isDragging ? { color: "red" } : null}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Click or Drop here
                        </button> */}
                        {!images[0] && (
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
                        )}
                      </div>
                    </div>
                  )}
                </ImageUploading>
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
                  رقم التصنيف
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
                  اسم التصنيف
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
              <div className="flex mb-8 items-center">
                <h2 className={formTitleClasses} style={formTitleStyle}>
                  <AiFillStar
                    style={{
                      display: "inline-block",
                      marginLeft: "0.5rem",
                      color: "red",
                    }}
                  ></AiFillStar>
                  ربط التصنيف
                </h2>
                <label>
                  <input
                    className={formInputClasses}
                    style={formInputStyle}
                    placeholder="اكتب ثم اضغط على'Enter' لإضافة قسم جديد"
                    type="text"
                    name="name"
                  />
                </label>
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
