import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../../../../UI/Button/Button";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10"
    ></div>
  );
};

const ProductDetails = ({ items: { title, img, sellPrice }, closeDetails }) => {
  return (
    <>
      <BackDrop onClick={closeDetails} />
      <div
        className="fixed flex flex-col top-24 translate-x-2/4 right-2/4 z-20 rounded-md overflow-hidden"
        style={{ height: "36rem", width: "51.25rem" }}
      >
        <div
          className="h-16 w-full flex items-center justify-between px-4"
          style={{ backgroundColor: "#1DBBBE" }}
        >
          <h2 className="text-slate-50">احصائيات المنتج - {title}</h2>
          <IoMdCloseCircleOutline
            color={"#fff"}
            className={"cursor-pointer"}
            onClick={closeDetails}
          ></IoMdCloseCircleOutline>
        </div>
        <div
          className="flex-1 px-44 pt-10"
          style={{ backgroundColor: "rgb(246,246,246)" }}
        >
          <div className="flex gap-12">
            <div className=" ">
              <img
                className="h-28 rounded-sm w-28 object-cover"
                src={img}
                alt=""
              />
            </div>
            <div>
              <h2 className="mb-8 font-semibold text-xl">{title}</h2>
              <h2 className="">
                <span className="font-semibold ml-4">{sellPrice}</span> سعر
                البيع
              </h2>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex gap-24 items-center h-12 mb-4">
              <div
                className="w-16 h-full flex items-center justify-center bg-slate-50 rounded-sm font-semibold"
                style={{ border: "1px solid #ccc" }}
              >
                125
              </div>
              <div className="flex-1 ">
                <h2 className="font-semibold">مرات تنزيل المنتج</h2>
              </div>
            </div>
            <div className="flex gap-24 items-center h-12 mb-4">
              <div
                className="w-16 h-full flex items-center justify-center bg-slate-50 rounded-sm font-semibold"
                style={{ border: "1px solid #ccc" }}
              >
                125
              </div>
              <div className="flex-1 ">
                <h2 className="font-semibold">مرات بيع المنتج</h2>
              </div>
            </div>
            <div className="flex gap-24 items-center h-12 mb-4">
              <div
                className="w-16 h-full flex items-center justify-center bg-slate-50 rounded-sm font-semibold"
                style={{ border: "1px solid #ccc" }}
              >
                125
              </div>
              <div className="flex-1 ">
                <h2 className="font-semibold">اجمالي مبيعات المنتج</h2>
              </div>
            </div>
          </div>
          <Button
            onClick={closeDetails}
            type={"normal"}
            className={"text-center w-full mt-12"}
          >
            اغلاق
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
