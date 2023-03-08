import React, { useContext } from "react";
import useFetch from '../../../hooks/useFetch';
import Context from "../../../store/context";
import Button from "../../../UI/Button/Button";
import styles from "./ServiceOrder.module.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { GoArrowRight } from "react-icons/go";
import { ReactComponent as Category } from "../../../assets/Icons/icon-24-Category.svg";
import { ReactComponent as CallIcon } from "../../../assets/Icons/icon-24- call.svg";
import { ReactComponent as StoreIcon } from "../../../assets/Icons/icon-24-store.svg";
import { ReactComponent as CheckedSquare } from "../../../assets/Icons/icon-24-square checkmark.svg";
import { IoCalendar } from "react-icons/io5";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import moment from "moment/moment";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 opacity-50  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};


const AddCountry = ({ cancel, complaintDetails }) => {
  const token = localStorage.getItem('token');
  const { fetchedData, loading, reload, setReload } = useFetch(`https://backend.atlbha.com/api/Admin/websiteorder/${complaintDetails}`);
  const { fetchedData: ServiceList } = useFetch('https://backend.atlbha.com/api/Admin/service');
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [value, setValue] = React.useState("1");

  const acceptService = () => {
    axios
      .post(`http://127.0.0.1:8000/api/Admin/acceptService/${complaintDetails}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setReload(!reload);
        } else {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setReload(!reload);
        }
      });
  }

  const rejectService = () => {
    axios
      .post(`http://127.0.0.1:8000/api/Admin/rejectService/${complaintDetails}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setReload(!reload);
        } else {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setReload(!reload);
        }
      });
  }

  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-slate-50 z-30  ${styles.container}`}
        style={{
          width: "1104px",
          maxWidth: '100%',
          height: "calc(100% - 5rem)",
          backgroundColor: "rgba(235, 235, 235, 1)",
        }}
      >
        <div className="flex h-full flex-col justify-between ">
          <div
            className="md:p-4 flex justify-between items-center md:pl-36 md:pr-16 p-4 pt-0"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <div>
              <h2 className="font-semibold md:text-2xl text-[20px] mb-3">تفاصيل الطلب</h2>
              <div className="flex">
                <div className={`flex items-center gap-2 `}>
                  <div
                    onClick={cancel}
                    className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}
                  >
                    <GoArrowRight
                      style={{ color: "#02466A", fontSize: "1.2rem" }}
                    />
                  </div>

                  <h2 className="font-semibold md:text-[18px] text-[16px] md:ml-4 ml-2"> الطلبات </h2>
                </div>

                <h2 className="font-semibold md:text-[18px] text-[16px] md:ml-4 ml-2"> / جدول الطلبات </h2>

                <h3 className="font-medium md:text-[18px] text-[16px]" style={{ color: "#67747B" }}>
                  / تفاصيل طلب خدمة
                </h3>
              </div>
            </div>
            <div>
              <h2 className={"font-medium md:text-[18px] text-[16px]"} style={{ color: "#4D4F5C" }}>
                رقم الخدمة
              </h2>
              <div
                className="mt-1 flex items-center shadow-lg rounded-lg justify-center  h-16 w-44"
                style={{ backgroundColor: "#B6BE34" }}
              >
                <h2 className="text-slate-50 text-2xl font-medium">
                  {loading ? <CircularProgress color='inherit' size='16px' /> : fetchedData?.data?.websiteorders?.order_number}
                </h2>
              </div>
            </div>
          </div>
          <div
            className={`flex-1 overflow-y-scroll pl-36  ${styles.content}`}
            style={{ backgroundColor: "rgb(235, 235, 235)" }}
          >
            <Box className=" pt-4 pr-16" style={{ backgroundColor: "#F6F6F6" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    "& path, & g": {
                      fill: "#1DBBBE",
                    },
                  }}
                >
                  <div
                    className={"mt-8 gap-12 p-6 flex justify-between"}
                    style={{ width: "752px", backgroundColor: "#fff" }}
                  >
                    {
                      loading
                        ?
                        (
                          <div className="w-full flex flex-row items-center justify-center gap-4">
                            <CircularProgress size='24px' /> <span>جاري التحميل</span>
                          </div>
                        )
                        :
                        (
                          <>
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-5">
                                <div className="flex gap-2" style={{ width: "136px" }}>
                                  <StoreIcon></StoreIcon>
                                  <h2>اسم المتجر</h2>
                                </div>
                                <div
                                  className={
                                    "flex items-center justify-center rounded-lg"
                                  }
                                  style={{
                                    backgroundColor: "#EFF9FF",
                                    height: "70px",
                                    width: "180px",
                                  }}
                                >
                                  <h2
                                    className="font-medium"
                                    style={{ color: "#0077FF" }}
                                  >
                                    {fetchedData?.data?.websiteorders?.store?.store_name}
                                  </h2>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 mb-5">
                                <div className="flex gap-2" style={{ width: "136px" }}>
                                  <Category></Category>
                                  <h2>التصنيف</h2>
                                </div>
                                <div
                                  className={
                                    "flex items-center justify-center rounded-lg"
                                  }
                                  style={{
                                    backgroundColor: "#EFF9FF",
                                    height: "70px",
                                    width: "180px",
                                  }}
                                >
                                  <h2
                                    className="font-medium"
                                    style={{ color: "#0077FF" }}
                                  >
                                    {fetchedData?.data?.websiteorders?.store?.activity[0]?.name}
                                  </h2>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 mb-5">
                                <div className="flex gap-2" style={{ width: "136px" }}>
                                  <CallIcon></CallIcon>
                                  <h2>الهاتف</h2>
                                </div>
                                <div
                                  className={
                                    "flex items-center justify-center rounded-lg"
                                  }
                                  style={{
                                    backgroundColor: "#EFF9FF",
                                    height: "70px",
                                    width: "180px",
                                  }}
                                >
                                  <h2
                                    className="font-medium"
                                    style={{ color: "#0077FF" }}
                                  >
                                    {fetchedData?.data?.websiteorders?.store?.phonenumber}
                                  </h2>
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-5">
                                <div
                                  className="flex gap-2 items-center"
                                  style={{ width: "136px" }}
                                >
                                  <IoCalendar></IoCalendar>
                                  <h2>تاريخ الطلب</h2>
                                </div>
                                <div
                                  className={
                                    "flex items-center justify-center rounded-lg"
                                  }
                                  style={{
                                    backgroundColor: "#EFF9FF",
                                    height: "70px",
                                    width: "180px",
                                  }}
                                >
                                  <h2
                                    className="font-medium"
                                    style={{ color: "#0077FF" }}
                                  >
                                    {moment(fetchedData?.data?.websiteorders?.created_at).format('DD/MM/YYYY')}
                                  </h2>
                                </div>
                              </div>
                              <div className="flex gap-4 mb-5">
                                <div className="flex gap-2">
                                  <CallIcon></CallIcon>
                                </div>
                                <div>
                                  <h2 className="whitespace-nowrap">
                                    نوع الخدمة المطلوبة
                                  </h2>
                                  <FormGroup
                                    sx={{
                                      "& .MuiFormControlLabel-root": {
                                        gap: "0.5rem",
                                      },
                                      "& .MuiCheckbox-root": {
                                        p: 0,
                                      },
                                      "& .MuiButtonBase-root svg path": {
                                        fill: "#A7A7A7",
                                      },
                                      "& .MuiButtonBase-root.Mui-checked svg path": {
                                        fill: "#7C7C7C",
                                      },

                                      "& .MuiTypography-root": {
                                        fontSize: "18px",
                                        color: "#A7A7A7",
                                      },
                                      "& .MuiFormControlLabel-root:has(.Mui-checked) .MuiTypography-root":
                                      {
                                        fontSize: "18px",
                                        color: "#7C7C7C",
                                      },
                                    }}
                                  >
                                    {ServiceList?.data?.Services?.map((item, index) => (
                                      <FormControlLabel
                                        key={index}
                                        sx={{
                                          py: 1,
                                          mr: 0,
                                          pr: 0,
                                          "& .MuiTypography-root": {
                                            fontSize: "18px",
                                            fontWeight: "500",
                                          },
                                        }}
                                        control={
                                          <Checkbox defaultChecked={ServiceList?.data?.Services?.map(service => service?.id === item?.id )} checkedIcon={<CheckedSquare />} />
                                        }
                                        label={item?.name}
                                      />
                                    ))}
                                  </FormGroup>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                    }
                  </div>
                </Box>
              </TabContext>
            </Box>
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
              style={{ backgroundColor: `#3AE374` }}
              type={"normal"}
              onClick={() => { acceptService() }}
            >
              قبول الخدمة
            </Button>
            <Button
              className={"h-14 w-44"}
              style={{ borderColor: `#FF3838` }}
              textStyle={{ color: "#FF3838" }}
              type={"outline"}
              onClick={() => { rejectService() }}
            >
              رفض الخدمة
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCountry;
