import React, { useContext } from "react";
import ReactDom from "react-dom";
import {NotificationContext} from "../../store/NotificationProvider";
import { ReactComponent as Warning } from "../../assets/Icons/icon-32-warning.svg";
import Button from "../../UI/Button/Button";

const BackDrop = () => {
  return (
    <div
      className="fixed back_drop  bottom-0 left-0 w-full  opacity-70 z-50"
      style={{
        height: "100vh",
        backgroundColor: "#242424",
      }}
    ></div>
  );
};
const DeleteModal = ({ cancelEarly }) => {
  const NotificationProvider = useContext(NotificationContext);
  const { notificationTitle, setNotificationTitle,setActionTitle,setConfirm } = NotificationProvider;

  return (
    <>
      <BackDrop />
      <div
        className="fixed shadow-lg p[40px] fcc back_drop -translate-x-1/2 rounded-lg left-1/2 bg-white z-50 md:h-[331px] h-[250px]"
        style={{ width: "572px",maxWidth:'90%', top: "100px", boxShadow: '0px 3px 6px #00000029' }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-4">
            <h6 className="text-[22px] md:text-[38px]" style={{ fontWeight: '500', color: '#FF3838' }}>تنبيه</h6>
            <Warning fill="#FF3838" className="w-[20px] md:w-[38px]" />
          </div>
          <p className="mt-[21px] text-[18px] md:text-[20px]" style={{ fontWeight: '700', color: '#011723' }}>
            هل أنت متأكد !
          </p>
          <h6 style={{ fontSize: '20px', fontWeight: '500', color: '#0077FF',textAlign:'center' }}>{notificationTitle}</h6>
          <div className="flex flex-row items-center gap-4 md:mt-[64px] mt-4">
            <Button
              type={"normal"}
              style={{ backgroundColor: "#02466A" }}
              textStyle={{ color: "#EFF9FF", fontSize: '20px' }}
              className={"md:w-[156px] w-[135px] md:h-[56px] h-[45px] rounded-lg px-4"}
              onClick={()=>{
                setNotificationTitle(null);
                setConfirm(true);
              }}>
              تأكيد
            </Button>
            <Button
              type={"outline"}
              style={{ backgroundColor: "#02466A00",border:'1px solid #02466A' }}
              textStyle={{ color: "#02466A", fontSize: '20px' }}
              className={"md:w-[156px] w-[135px] md:h-[56px] h-[45px] rounded-lg px-4"}
              onClick={() => {
                setNotificationTitle(null);
                setConfirm(false);
                setActionTitle(null);
              }}
            >
              الغاء
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const DeleteModalComp = ({ title, cancelEarly }) => {
  return (
    <>
      {ReactDom.createPortal(
        <DeleteModal title={title} cancelEarly={cancelEarly} />,
        document.getElementById("action_div")
      )}
    </>
  );
};

export default DeleteModalComp;
