import React, { useState, useContext } from "react";
import styles from "./CreateRole.module.css";
import Button from "../../../UI/Button/Button";
import Context from "../../../store/context";

import { GoArrowRight } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const dataTitle = [
  {
    title: "عرض بيانات المستخدمين",
    children: ["عدد المستخدمين", "رقم الجوال", "البريد الالكتروني"],
  },
  {
    title: "الرئيسية",
    children: ["ملخص الشهر", "ملخص طلبات الاشتركات", "التنبيهات"],
  },
  {
    title: "المستخدمين",
    children: ["مستهدمى المنصة"],
  },
  {
    title: "الاشتركات",
    children: [
      "اشتركات المنصة",
      "اشعارات الاشتراكات",
      "تمديد الاشتراكات",
      "تفعيل اشتراكات جديدة",
    ],
  },
];

const permissionsTitle = ["عرض", "تعديل", "إضافة", "حذف"];

const CreateRole = ({ cancel }) => {
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;

  const [yearlyPlan, setYearlyPlan] = useState(false);

  return (
    <div
      className={`fixed bottom-0 left-0 bg-slate-50 z-50  full_screen_page flex h-full flex-col justify-between ${styles.container}`}
      style={{ width: "100%", height: "100vh" }}
    >
      <div
        className="p-8"
        style={{
          height: "135px",
          backgroundColor: "rgba(235, 235, 235, 1)",
        }}
      >
        <h2 className="font-semibold text-2xl  mb-3">انشاء دور جديد</h2>
        <div className="flex">
          <div
            onClick={cancel}
            className={`flex cursor-pointer items-center gap-2 `}
          >
            <div className={`flex items-center gap-2  ${styles.arrow_con}`}>
              <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
            </div>

            <h2 className="font-semibold ml-4"> الأدوار الوظيفية </h2>
          </div>

          <h3 className="font-medium" style={{ color: "#67747B" }}>
            / انشاء دور جديد
          </h3>
        </div>
      </div>
      <div
        className={`flex-1 overflow-y-scroll pl-48 py-8 pr-36 ${styles.content}`}
        style={{ backgroundColor: "#F6F6F6" }}
      >
        <div className="mt-6  ">
          <h2 className="font-medium mb-2" style={{ color: "#011723" }}>
            <AiFillStar
              style={{
                display: "inline-block",
                marginLeft: "0.5rem",
                color: "red",
              }}
            ></AiFillStar>
            اسم الدور الوظيفي
          </h2>
          <label className="w-full" htmlFor="">
            <input
              className="outline-none p-4 rounded-lg"
              style={{
                border: "1px solid #A7A7A7",
                backgroundColor: "#FFFFFF",
                width: "376px",
                color: "#0099FB",
              }}
              type="text"
              placeholder="ادخل اسم الدور بالحروف فقط"
            />
          </label>
        </div>
        <div className="mt-5">
          <h2 className="font-medium mb-2" style={{ color: "#011723" }}>
            <AiFillStar
              style={{
                display: "inline-block",
                marginLeft: "0.5rem",
                color: "red",
              }}
            ></AiFillStar>
            حدد الصلاحيات
          </h2>
        </div>
        <div
          className="p-4 overflow-scroll hide_scrollbar mr-24"
          style={{ backgroundColor: "#FAFAFA", height: "525px" }}
        >
          {dataTitle.map((item, index) => {
            return (
              <div className="mb-1">
                <div
                  className="flex items-center gap-4 p-4"
                  style={{ backgroundColor: "#fff" }}
                >
                  <div
                    className={`w-8 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${""}`}
                    style={{
                      backgroundColor: yearlyPlan ? "#3AE374" : "#A7A7A7",
                    }}
                    onClick={() => {
                      setYearlyPlan(!yearlyPlan);
                    }}
                  >
                    <div
                      className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${
                        yearlyPlan ? "left-4" : "left-1"
                      }`}
                    ></div>
                  </div>
                  <h2 className="font-semibold" style={{ color: "#011723" }}>
                    {item.title}{" "}
                  </h2>
                </div>
                <div className="fbc p-4" style={{ backgroundColor: "#EFF9FF" }}>
                  <h2 className="font-semibold" style={{ width: "578px" }}>
                    اسم الصلاحيات
                  </h2>
                  <div className="flex ">
                    {permissionsTitle.map((item, idx) => {
                      return (
                        <h2
                          className="text-center font-medium"
                          style={{ width: "82px", color: "#011723" }}
                        >
                          {item}
                        </h2>
                      );
                    })}
                  </div>
                </div>
                {item.children.map((child, i) => {
                  return (
                    <div
                      className="fbc p-4"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <h2 className="font-medium" style={{ width: "578px" }}>
                        {child}
                      </h2>
                      <div className="flex gap-2">
                        <FormGroup className="flex-row" sx={{}}>
                          {permissionsTitle.map((item, idx) => {
                            return (
                              // <h2
                              //   className="text-center font-medium"
                              //   style={{ width: "82px", color: "#011723" }}
                              // >
                              //   {item}
                              // </h2>
                              <FormControlLabel
                                sx={{
                                  width: "82px",
                                  margin: "0 auto",
                                  "& .MuiButtonBase-root": {
                                    margin: "0 auto",
                                  },
                                }}
                                control={<Checkbox />}
                              />
                            );
                          })}
                        </FormGroup>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
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
          style={{ borderColor: `rgba(2, 70, 106, 1)` }}
          type={"outline"}
          textStyle={{ color: "#02466A" }}
          onClick={() => {
            setEndActionTitle("تم انشاء دور جديد بنجاح");
            cancel();
          }}
        >
          حفظ واعتماد
        </Button>
      </div>
    </div>
  );
};

export default CreateRole;
