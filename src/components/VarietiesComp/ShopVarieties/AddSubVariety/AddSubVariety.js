import React, { useState } from "react";
import Button from "../../../../UI/Button/Button";
import { IoMdCloseCircleOutline } from "react-icons/io";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-40"
    ></div>
  );
};

const AddSubVariety = ({ cancel }) => {
  const [subVariety,setSubVariety] = useState('');
  return (
    <>
      <BackDrop onClick={cancel} />
      <div
        className="absolute flex flex-col top-28 translate-x-2/4  right-2/4 z-50 rounded-lg overflow-hidden"
        style={{ width: "60.25rem" }}
      >
          <div
            className="h-16 w-full flex items-center justify-between py-4 px-4 trader_alert"
            style={{ backgroundColor:'#02466A' }}
          >
              <h2 style={{ color:'#ECFEFF',fontSize:'22px' }} className="text-center flex-1">اضف تصنيف فرعي</h2>
              <IoMdCloseCircleOutline
                size={"1.25rem"}
                color={"#fff"}
                className={"cursor-pointer"}
                onClick={cancel}
              ></IoMdCloseCircleOutline>
          </div>
        <div
          className="flex-1 flex flex-col items-center justify-center px-4 py-28"
          style={{ backgroundColor: "#F6F6F6" }}
        >
          <div className="flex flex-col gap-3">
            <label style={{ color:'#011723',fontSize:'18px' }}>
                 اسم التصنيف الفرعي  
            </label>
            <input
                className="p-4 outline-none rounded-lg"
                style={{ width:'475px', backgroundColor: "#FFFFFF",border:'1px solid #EBEBEB',boxShadow:'0px 3px 6px #00000029' }}
                placeholder="ادخل اسم التصنيف الفرعي"
                type="text"
                name="name"
                value={subVariety}
                onChange={(e) => {
                  setSubVariety(e.target.value);
                }}
              />
            <div className="flex flex-row items-center gap-5 mt-36">
                <Button
                  onClick={() => {
                    cancel();
                  }}
                  type={"normal"}
                  className={"text-center w-full rounded-lg"}
                  style={{ backgroundColor:'#02466A', }}
                >
                  تأكيد 
                </Button>
                <Button
                  onClick={() => {
                    cancel();
                  }}
                  type={"outline"}
                  className={"text-center w-full rounded-lg"}
                  style={{ backgroundColor:'#02466A00',border:'1px solid #02466A', }}
                >
                   الغاء  
                </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubVariety;
