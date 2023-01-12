import React, { useState, useContext } from "react";
import { Currency } from "../../../assets/Icons/index";
import Button from "../../../UI/Button/Button";
import Context from "../../../store/context";

import styles from "./NewService.module.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TagsInput } from "react-tag-input-component";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import { ReactComponent as AddIcon } from "../../../assets/Icons/icon-34-add.svg";
import Box from "@mui/material/Box";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};
const category = ["الكترونيات", "ألعاب وهدايا", "مستلزمات طبية", "مواد غذائية"];

const formTitleClasses = "font-semibold text-lg";
const formTitleStyle = { width: "315px" };
//
const formInputClasses = "p-4 outline-0 rounded-md";
const formInputStyle = {
  width: "555px",
  border: "1px solid rgba(167, 167, 167, 0.5)",
};

const NewService = ({ cancel }) => {
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [age, setAge] = useState("");
  const [tagsSelected, setTagsSelected] = useState([]);
  const [images, setImages] = useState([]);
  const [multiImages, setMultiImages] = useState([]);
  console.log(multiImages);

  const emptyMultiImages = [];
  for (let index = 0; index < 5 - multiImages.length; index++) {
    emptyMultiImages.push(index);
  }
  console.log(images);
  const maxNumber = 2;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };
  const onChangeMultiImages = (imageList, addUpdateIndex) => {
    // data for submit
    setMultiImages(imageList);
  };
  const handleCategory = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-slate-50 z-20 ${styles.container}`}
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
            <h2 className="font-semibold text-2xl  mb-3">اضافة خدمة </h2>
            <h2>أضف فئة المنتج الخاص بك والمعلومات الضرورية من هنا</h2>
          </div>
          <div
            className={`flex-1 overflow-y-scroll py-12 pr-8 ${styles.content}`}
          >
            <form action="">
              <div className="flex mb-8">
                <h2 className={formTitleClasses} style={formTitleStyle}>
                  اسم الخدمة
                </h2>
                <label>
                  <input
                    className={formInputClasses}
                    style={formInputStyle}
                    placeholder="ادخل اسم الخدمة"
                    type="text"
                    name="name"
                  />
                </label>
              </div>
              <div className="flex mb-8 ">
                <h2 className={formTitleClasses} style={formTitleStyle}>
                  تفاصيل الخدمة
                </h2>
                {/* <textarea
                  className={formInputClasses}
                  style={{ ...formInputStyle, resize: "none" }}
                  resize={false}
                  name=""
                  placeholder="وصف تفاصيل المنتج"
                  id=""
                  cols="30"
                  rows="4"
                ></textarea> */}
                <div
                  className={`${formInputClasses} px-6`}
                  style={{ ...formInputStyle }}
                >
                  <ol className="list-decimal">
                    <li>
                      <input className="w-full outline-none" type="text" />
                    </li>
                    <li>
                      <input className="w-full outline-none" type="text" />
                    </li>
                    <li>
                      <input className="w-full outline-none" type="text" />
                    </li>
                  </ol>
                </div>
              </div>

              <div className="flex mb-8">
                <h2 className={formTitleClasses} style={formTitleStyle}>
                  اضافة صورة / فيديو
                </h2>
                <div
                  className="fcc p-3 gap-4 border-dashed cursor-pointer"
                  style={formInputStyle}
                  // onClick={() => {
                  //   setShowAddProductOptions(true);
                  // }}
                >
                  <Box sx={{ "& circle": { fill: "rgba(36, 36, 36, 1)" } }}>
                    <AddIcon width={"1.5rem"}></AddIcon>
                  </Box>
                </div>
              </div>
              <div className="flex mb-8 ">
                <h2 className={formTitleClasses} style={formTitleStyle}>
                  سعر الخدمة
                </h2>
                <label
                  className="flex rounded-md overflow-hidden"
                  style={formInputStyle}
                >
                  <div className="p-4 flex flex-1">
                    <input
                      className="flex-1 border-none outline-none"
                      placeholder="0"
                      type="text"
                      name="name"
                    />
                  </div>
                  <div
                    className="h-full w-16 flex justify-center items-center text-lg"
                    style={{
                      borderRight: "1px solid #ccc",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    ر.س
                  </div>
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
              onClick={() => {
                setEndActionTitle("تم اضافة خدمة جديدة بنجاح");
                cancel();
              }}
            >
              حفظ
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

export default NewService;
