import React, { useState } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ReactComponent as WriteIcon } from "../../../../assets/Icons/icon-24-write.svg";
import styles from "./AddNewLink.module.css";
import { Editor } from "react-draft-wysiwyg";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ImageUploading from "react-images-uploading";
import Logo from "../../../../assets/images/logo.png";

import { MdFileUpload } from "react-icons/md";
import { BsImageAlt } from "react-icons/bs";

import Button from "../../../../UI/Button/Button";
const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10"
    ></div>
  );
};

const AddNewLink = ({ cancel }) => {
  const [images, setImages] = useState([]);
  const onChangeLogoImage = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList);
    setImages(imageList);
  };
  // const [marketTitle, setMarketTitle] = useState("");
  const [description, setDescription] = useState({
    htmlValue: "<h1></h1>\n",
    editorState: EditorState.createEmpty(),
  });
  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(
      convertToRaw(editorValue.getCurrentContent())
    );
    console.log(editorStateInHtml);

    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue,
    });
  };

  return (
    <>
      <BackDrop onClick={cancel} />
      <div
        className="absolute  flex flex-col top-28 translate-x-2/4 add_new_page_popup  right-2/4 z-20 rounded-lg overflow-hidden"
        style={{ width: "1062px",maxWidth:'90%' }}
      >
        <div
          className="h-16 w-full flex items-center justify-between py-4 px-4 trader_alert"
          style={{ backgroundColor: "#F7FCFF" }}
        >
          <h2 className="md:text-[20px] text-[18px] text-center">اضافة رابط سوشيال ميديا </h2>
          <IoMdCloseCircleOutline
            size={"1.25rem"}
            color={"#fff"}
            className={"cursor-pointer"}
            onClick={cancel}
          ></IoMdCloseCircleOutline>
        </div>

        <div
          className="md:p-6 p-4 rounded-b-lg"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="py-7 flex flex-col items-center">
            <ImageUploading
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
                  className="md:w-[572px] w-full upload__image-wrapper relative "
                  style={{
                    // border: images[0] ? "none" : "1px dashed #ccc",
                    // borderRadius: "10px",
                  }}
                >
                  <div className="image-item w-full ">
                    <div
                      style={{
                        height: "137px",
                        width: "180px",
                        backgroundColor: "#D3D3D3",
                      }}
                      className="flex p-4 flex-col rounded-lg justify-center items-center gap-6 mx-auto"
                    >
                      {!images[0] && <BsImageAlt size={"1.5rem"}></BsImageAlt>}
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
                      className="flex cursor-pointer justify-between items-center p-4 mt-6"
                      style={{
                        backgroundColor: "#FAFAFA",
                        border: "1px dashed #E0E0E0",
                      }}
                    >
                      <h2 className="text-base font-medium">
                        شعار منصة السوشيال ميديا
                      </h2>
                      <MdFileUpload
                        color="#02466A"
                        size={"1.25rem"}
                      ></MdFileUpload>
                    </div>
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
          <div className="md:w-[572px] w-full mt-10 mx-auto">
            <div className="mt-5">
              <h2 className="md:text-[18px] text-[16px] font-medium">
                اسم منصة التواصل الاجتماعي
              </h2>
              <div
                className="md:h-14 h-[45px] flex gap-4 mt-3 p-5 items-center"
                style={{
                  backgroundColor: "#EBEBEB",
                  border: "1px solid #D3D3D3",
                }}
              >
                <input
                  style={{ backgroundColor: "transparent" }}
                  className="flex-1 outline-none"
                  placeholder={"ادخل اسم المنصة"}
                  type="text"
                  name="name"
                />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="md:text-[18px] text-[16px] font-medium">ادخل اسم المنصة</h2>
              <div
                className="md:h-14 h-[45px] flex gap-4 mt-3 p-5 items-center"
                style={{
                  backgroundColor: "#EBEBEB",
                  border: "1px solid #D3D3D3",
                }}
              >
                <input
                  style={{ backgroundColor: "#EBEBEB" }}
                  className=" flex-1   outline-none"
                  placeholder={"https://www.sample.com"}
                  type="text"
                  name="name"
                />
              </div>
            </div>
          </div>
          <div className="md:w-[572px] w-full mt-10 mx-auto">
            <div className="flex gap-5">
              <FormGroup>
                <FormControlLabel
                  sx={{
                    mr: 0,
                    pr: 0,
                    "& .MuiButtonBase-root": {
                      padding: "0",
                    },
                  }}
                  control={<Checkbox sx={{ "& path": { fill: "#000000" } }} />}
                />
              </FormGroup>
              <div>
                <h2 className="md:text-[18px] text-[16px] font-medium">اظهار في المكان المخصص في الموقع</h2>
                <p className="md:text-[16px] text-[14px]" style={{ color: "#67747B" }}>
                  عند تعطيل هذا الخيار لن تظهر ايقونة صفحة التواصل الاجتماعي هذه
                  في الفوتر
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:my-20 my-10 items-center justify-center gap-8">
            <Button
              onClick={cancel}
              className="md:h-14 h-[45px] md:w-[286px] w-full md:text-xl md:text-[18px] font-medium"
              style={{ minWidth: "fit-content", backgroundColor: "#02466A" }}
              type={"normal"}
            >
              نشر
            </Button>
          </div>
        </div>
        <div className="my-20"></div>
      </div>
    </>
  );
};

export default AddNewLink;
