import React from "react";
import { GoArrowRight } from "react-icons/go";
import styles from "./EditPackageTemplates.module.css";
import { BsTrash } from "react-icons/bs";

const arr = ["القالب الأول", "القالب الثانى", "القالب الثالث"];

const EditPackageTemplates = ({ cancel }) => {
  return (
    <div
      className="absolute pl-36 top-0 right-0  z-10  w-full h-full pt-12 pr-24"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="flex items-center gap-2 mb-14">
        <div onClick={cancel} className={` ${styles.arrow_con}`}>
          <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
        </div>
        <h2 className="font-medium">الباقات والأسعار</h2>
        <h2 className="" style={{ color: "rgba(103, 116, 123, 1)" }}>
          / كل الباقات
        </h2>
      </div>
      <div class="grid grid-cols-3 gap-x-5 gap-y-8">
        {arr.map((a, i) => {
          return (
            <div
              key={i}
              className={"relative"}
              style={{
                height: "228px",
                width: "278px",
                border: "1px solid rgba(180, 237, 238, 1)",
                backgroundColor: "rgba(236, 254, 255, 1)",
              }}
            >
              <div
                className={"fcc"}
                style={{
                  height: "178px",
                  backgroundColor: "rgba(236, 254, 255, 1)",
                }}
              >
                <h2
                  className="font-medium text-xl"
                  style={{ color: "rgba(1, 23, 35, 1)" }}
                >
                  {a}
                </h2>
              </div>
              <div
                className={"fcc gap-5"}
                style={{
                  height: "50px",
                  backgroundColor: "rgba(255, 56, 56, 0.04)",
                }}
              >
                <BsTrash
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "1rem",
                  }}
                ></BsTrash>
                <h2
                  className="font-medium text-lg"
                  style={{ color: "rgba(255, 56, 56, 1)" }}
                >
                  حذف القالب
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditPackageTemplates;
