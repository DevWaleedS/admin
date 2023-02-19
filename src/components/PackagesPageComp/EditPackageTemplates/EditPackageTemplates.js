import React from "react";
import { GoArrowRight } from "react-icons/go";
import styles from "./EditPackageTemplates.module.css";
import { ReactComponent as BsTrash } from "../../../assets/Icons/icon-24-delete.svg";
import useFetch from '../../../hooks/useFetch';
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';

const EditPackageTemplates = ({ cancel }) => {
  const { fetchedData, loading } = useFetch('https://backend.atlbha.com/api/Admin/selector/templates');
  return (
    <div
      className="absolute md:pl-36 top-0 right-0  z-10  w-full h-full md:pt-12 md:pr-24 p-4 pt-0"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="flex items-center gap-2 md:mb-14 mb-[24px]">
        <div onClick={cancel} className={` ${styles.arrow_con}`}>
          <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
        </div>
        <h2 className="font-medium md:text-lg text-[16px]">الباقات والأسعار</h2>
        <h2 className="font-medium md:text-lg text-[16px]" style={{ color: "rgba(103, 116, 123, 1)" }}>
          / كل الباقات
        </h2>
      </div>
      <div class="flex flex-row flex-wrap gap-4">
        {loading ?
          <div className='w-full flex flex-col items-center justify-center'>
            <CircularLoading />
          </div>
          :
          (
            fetchedData?.data?.templates?.map((template, index) => {
              return (
                <div
                  key={index}
                  className="flex-1 relative md:w-[278px] min-w-[162px] md:h-[228px] h-[162px]"
                  style={{
                    border: "1px solid rgba(180, 237, 238, 1)",
                    backgroundColor: "rgba(236, 254, 255, 1)",
                  }}
                >
                  <div
                    className="flex flex-col items-center justify-between"
                    style={{
                      height: "100%",
                      backgroundColor: "rgba(236, 254, 255, 1)",
                    }}
                  >
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h2
                        className="font-medium text-xl"
                        style={{ color: "rgba(1, 23, 35, 1)" }}
                      >
                        {template?.name}
                      </h2>
                    </div>
                    <div
                      className={"fcc gap-5 w-full"}
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
                </div>
              );
            })
          )
        }
      </div>
    </div>
  );
};

export default EditPackageTemplates;
