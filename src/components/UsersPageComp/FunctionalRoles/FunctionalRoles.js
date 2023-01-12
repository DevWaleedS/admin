import React from "react";
import styles from "./FunctionalRoles.module.css";
import Button from "../../../UI/Button/Button";
import { ReactComponent as EditIcon } from "../../../assets/Icons/editt 2.svg";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

const roles = ["أدمن", "سوبر أدمن", "دعم فنى", "خدمات عملاء", "تسويق"];

const BackDrop = ({ onClick, openCreateRole }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};

const FunctionalRoles = ({ cancel, openCreateRole, EditRole }) => {
  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-28 bg-slate-50 z-20 otlobha_new_product ${styles.container}`}
        style={{ width: "978px", maxWidth: "70%", height: "calc(100% - 4rem)" }}
      >
        <div className="flex h-full flex-col justify-between">
          <div
            className="p-8 flex justify-between"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <div className=" ">
              <h2 className="font-semibold text-2xl  mb-3">الأدوار الوظيفية</h2>
              <h2>
                <span className="font-semibold">جدول المستخدمين / </span>
                الأدوار الوظيفية
              </h2>
            </div>
            <Button
              type={"normal"}
              className={"h-fit px-10"}
              fontSize={"text-xl"}
              onClick={() => {
                openCreateRole();
              }}
            >
              إنشاء دور
            </Button>
          </div>
          <div className={`flex-1 overflow-y-scroll py-12  ${styles.content}`}>
            <div>
              {roles.map((role, index) => {
                return (
                  <div className="flex justify-between items-center shadow-lg mb-3 py-4 mx-1 px-4">
                    <h2 className="font-semibold">{role}</h2>
                    <div className="flex gap-4 ">
                      <Button
                        textStyle={{ color: "#0099FB" }}
                        style={{ backgroundColor: "rgba(235, 247, 255, 1)" }}
                        svg={<FiEdit color="#0099FB" />}
                        type={"normal"}
                        onClick={() => {
                          EditRole(role);
                        }}
                      >
                        تحرير
                      </Button>
                      <Button
                        textStyle={{ color: "#FF3838" }}
                        style={{ backgroundColor: "#FFF7F7" }}
                        svg={<BsTrash color="#FF3838" />}
                        type={"normal"}
                      >
                        حذف
                      </Button>
                    </div>
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
              style={{
                borderColor: `rgba(2, 70, 106, 1)`,
              }}
              textStyle={{ color: "rgba(2, 70, 106, 1)" }}
              className={"h-14 w-44"}
              type={"outline"}
              onClick={cancel}
            >
              اغلاق
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FunctionalRoles;
