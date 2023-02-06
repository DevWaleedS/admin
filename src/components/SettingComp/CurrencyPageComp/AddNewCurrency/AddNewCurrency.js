import React, { useState, useEffect, useContext } from "react";
import { Currency } from "../../../../assets/Icons/index";
import Button from "../../../../UI/Button/Button";
import Context from "../../../../store/context";
import styles from "./AddNewCurrency.module.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TagsInput } from "react-tag-input-component";
import ImageUploading from "react-images-uploading";
import { GrUploadOption } from "react-icons/gr";
import { GrAddCircle } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import { AiFillStar } from "react-icons/ai";
import { GoArrowRight } from "react-icons/go";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 opacity-50  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};
const category = ["الكترونيات", "ألعاب وهدايا", "مستلزمات طبية", "مواد غذائية"];

const formTitleClasses = 'md:w-[315px] w-full font-normal md:text-[18px] text-[16px] md:mb-0 mb-2';
//
const formInputClasses = "md:w-[555px] w-full md:h-14 h-[45px] p-4 outline-0 rounded-md";
const formInputStyle = {
  border: "1px solid #A7A7A7",
  backgroundColor: '#fffff',
};

const AddNewCurrency = ({ cancel, data }) => {
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [images, setImages] = useState([]);

  const [countryNumber, setCountryNumber] = useState("");
  const [arabicCountryName, setArabicCountryName] = useState("");
  const [englishCountryName, setEnglishCountryName] = useState("");
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  useEffect(() => {
    if (data) {
      setCountryNumber(data.number);
      setArabicCountryName(data.name);
      setEnglishCountryName(data.nameEn);
    }
  }, [data]);

  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-[#F6F6F6] z-30 ${styles.container}`}
        style={{ width: '1104px',maxWidth:'100%', height: 'calc(100% - 5rem)' }}
      >
        <div className="flex h-full flex-col justify-between">
          <div
            className="md:h-[135px] h-[100px] md:p-8 p-4"
            style={{
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <h2 className="font-bold md:text-2xl text-[20px] mb-3">اضافة عملة جديدة</h2>
          </div>
          <div
            className={`flex-1 overflow-y-scroll md:py-12 md:pr-8 p-4 ${styles.content}`}
          >
            <form action="">
              <div className="flex md:flex-row flex-col md:mb-8 mb-4 md:items-center items-start">
                <h2 className={formTitleClasses}>
                  <AiFillStar
                    style={{
                      display: "inline-block",
                      marginLeft: "0.5rem",
                      color: "red",
                    }}
                  ></AiFillStar>
                  رمز العملة
                </h2>
                <ImageUploading
                  value={images}
                  onChange={onChange}
                  maxNumber={2}
                  dataURLKey="data_url"
                  acceptType={["jpg", "png", "jpeg", "svg"]}
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
                      className="md:w-[555px] w-full md:h-[56px] h-[45px] upload__image-wrapper relative overflow-hidden"
                      style={{
                        border: "1px solid #A7A7A7",
                        borderRadius: "8px",
                        backgroundColor: "#fff"
                      }}
                      onClick={() => {
                        onImageUpload();
                      }}
                      {...dragProps}
                    >
                      <div className="image-item h-full w-full cursor-pointer">
                        {!images[0] && (
                          <div className="flex flex-col justify-center items-center gap-6 h-full w-full">
                            <GrUploadOption size={"1.25rem"}></GrUploadOption>
                          </div>
                        )}
                        {images[0] && (
                          <div className="flex flex-col justify-center items-center gap-6 h-full w-full">
                            <img
                              src={images[0]?.data_url}
                              alt=""
                              className="w-8 h-8 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </ImageUploading>
              </div>
              <div className="flex md:flex-row flex-col md:mb-8 mb-4 md:items-center items-start">
                <h2 className={formTitleClasses}>
                  <AiFillStar
                    style={{
                      display: "inline-block",
                      marginLeft: "0.5rem",
                      color: "red",
                    }}
                  ></AiFillStar>
                  اسم العملة (AR)
                </h2>
                  <input
                    value={arabicCountryName}
                    onChange={(e) => {
                      setArabicCountryName(e.target.value);
                    }}
                    className={formInputClasses}
                    style={formInputStyle}
                    placeholder="ادخل حروف عربي فقط"
                    type="text"
                    name="name"
                  />
              </div>
              <div className="flex md:flex-row flex-col md:mb-8 mb-4 md:items-center items-start">
                <h2 className={formTitleClasses}>
                  <AiFillStar
                    style={{
                      display: "inline-block",
                      marginLeft: "0.5rem",
                      color: "red",
                    }}
                  ></AiFillStar>
                  اسم العملة (EN)
                </h2>
                  <input
                    value={englishCountryName}
                    onChange={(e) => {
                      setEnglishCountryName(e.target.value);
                    }}
                    className={formInputClasses}
                    style={formInputStyle}
                    placeholder="ادخل حروف انجليزية فقط"
                    type="text"
                    name="name"
                  />
              </div>
            </form>
          </div>
          <div
            className="md:h-[135px] h-[100px] md:p-8 p-4 flex items-center justify-center gap-4"
            style={{
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <Button
              className={"md:h-14 h-[45px] md:w-44 w-full md:text-xl md:text-[18px]"}
              style={{ backgroundColor: `rgba(2, 70, 106, 1)` }}
              type={"normal"}
              onClick={() => {
                setEndActionTitle("تم اضافة عملة جديدة بنجاح");
                cancel();
              }}
            >
              حفظ
            </Button>
            <Button
              className={"md:h-14 h-[45px] md:w-44 w-full md:text-xl md:text-[18px]"}
              style={{ backgroundColor: `rgba(2, 70, 106, 1)` }}
              type={"normal"}
              onClick={cancel}
            >
              الغاء
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewCurrency;
