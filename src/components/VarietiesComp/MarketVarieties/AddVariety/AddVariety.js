import React, { useState } from "react";
import Button from "../../../../UI/Button/Button";
import styles from "./AddVariety.module.css";
import { AiFillStar } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";
import { ReactComponent as ActionAdd } from "../../../../assets/Icons/icon-24-action-add.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/Icons/icon-24-delete.svg";
import { ReactComponent as DeleteIconCircle } from "../../../../assets/Icons/icon-24-actions-delete.svg";
import Mcdo from '../../../../assets/images/mcdo-logo.png'

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};

const NewProduct = ({ cancel, data, setShowAddSubVariety }) => {
  const [images, setImages] = useState([]);
  console.log(data);

  console.log(images);
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
          {
            data ?
              (
                  <div
                    className="p-8 gap-3"
                    style={{
                      height: "135px",
                      backgroundColor: "rgba(235, 235, 235, 1)",
                    }}
                  >
                  <h2 style={{ fontSize: '24px', color: '#011723' }} className="font-bold">
                    تعديل التصنيف - المتاجر
                  </h2>
                  <p style={{ fontSize: '20px', color: '#011723' }} className="font-normal">قم بتعديل بيانات التصنيف</p>
                </div>
              ) :
              (
                <div
                  className="p-8 gap-3"
                  style={{
                    height: "135px",
                    backgroundColor: "rgba(235, 235, 235, 1)",
                  }}
                >
                  <h2 style={{ fontSize: '24px', color: '#011723' }} className="font-bold">
                    اضافة تصنيف - المتاجر
                  </h2>
                  <p style={{ fontSize: '20px', color: '#011723' }} className="font-normal">أضف تصنيف جديد للتصنيفات الرئيسية</p>
                </div>
              )
          }
          <div
            className={`flex-1 flex flex-col gap-8 overflow-y-scroll py-12 pr-8 pl-40 ${styles.content}`}
          >
            <div className="flex flex-row items-start">
              <h2 style={{ fontSize: '20px', color: '#011723' }} className="w-96 font-medium whitespace-nowrap">
                رمز التصنيف
              </h2>
              <div className="flex flex-col gap-2">
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
                          <div className="flex flex-col justify-center items-center gap-4 h-full w-full">
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
                {
                  data && 
                  (
                    <div className="flex flex-col relative"
                         style={{ width:'85px',height:'80' }}
                    >
                        <img
                          className="w-full h-full"
                          src={Mcdo} 
                          alt="img" 
                        />
                        <DeleteIconCircle className="absolute top-1 left-1 cursor-pointer" />
                    </div>
                    
                  )
                }
              </div>

            </div>
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center gap-3">
                <AiFillStar
                  style={{
                    display: "inline-block",
                    marginLeft: "0.5rem",
                    color: "red",
                  }}
                ></AiFillStar>
                <label style={{ color: '#011723', fontSize: '20px' }} className="w-80 font-medium whitespace-nowrap">
                  رقم التصنيف
                </label>
              </div>
              <input
                className={`${styles.variety_number} w-full rounded-md px-5 py-4 outline-none`}
                style={{ color: '#7C7C7C', backgroundColor: '#02466A00', border: '1px solid #A7A7A7' }}
                placeholder="تلقائي"
                type="text"
                name="name"
              />
            </div>
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center gap-3">
                <AiFillStar
                  style={{
                    display: "inline-block",
                    marginLeft: "0.5rem",
                    color: "red",
                  }}
                ></AiFillStar>
                <label style={{ color: '#011723', fontSize: '20px' }} className="w-80 font-medium whitespace-nowrap">
                  التصنيف الرئيسي
                </label>
              </div>
              <input
                className="w-full rounded-md px-5 py-4 outline-none"
                style={{ color: '#7C7C7C', backgroundColor: '#02466A00', border: '1px solid #A7A7A7' }}
                placeholder="ادخل اسم التصنيف الرئيسي"
                type="text"
                name="name"
              />
            </div>
            {
              data &&
              (
                <div className="flex flex-row items-center">
                  <div className="flex flex-row items-center mr-10">
                    <label style={{ color: '#1DBBBE', fontSize: '20px' }} className="w-80 font-medium whitespace-nowrap">
                       فرعي رقم 1
                    </label>
                  </div>
                  <div className="w-full flex flex-row items-center gap-4">
                      <input
                          className="w-full rounded-md px-5 py-4 outline-none"
                          style={{ color: '#1DBBBE', backgroundColor: '#02466A00', border: '1px solid #1DBBBE' }}
                          value="سماعات هيدفون"
                          type="text"
                      />
                      <DeleteIcon fill="#FF3838" />
                  </div>
                </div>
              )
            }
            <div className="flex flex-row items-center justify-end">
              <div
                className="rounded-md px-5 py-4 outline-none flex flex-row items-center justify-center gap-4 cursor-pointer"
                style={{ width: '555px', backgroundColor: '#FFFFFF00', border: '1px dashed #A7A7A7' }}
                onClick={() => setShowAddSubVariety(true)}
              >
                <ActionAdd fill="#67747B" />
                <span style={{ color: '#67747B', fontSize: '16px' }}>اضافة تصنيف فرعي جديد</span>
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
