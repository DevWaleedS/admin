import React, { useContext } from "react";
import ReactDom from "react-dom";
import {NotificationContext} from "../../store/NotificationProvider";
import { ReactComponent as Warning } from "../../assets/Icons/icon-32-warning.svg";
import Button from "../../UI/Button/Button";
import Context from "../../store/context";

const BackDrop = () => {
  return (
    <div
      className="fixed back_drop  bottom-0 left-0 w-full  opacity-50 z-50"
      style={{
        height: "100vh",
        backgroundColor: "#242424",
        opacity: 0.7,
      }}
    ></div>
  );
};
const DeleteModal = ({ cancelEarly }) => {
  const NotificationProvider = useContext(NotificationContext);
  const { notificationTitle, setNotificationTitle,actionTitle } = NotificationProvider;
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  return (
    <>
      <BackDrop />
      <div
        className="fixed shadow-lg p[40px] fcc back_drop -translate-x-1/2 rounded-lg  left-1/2   bg-white  z-50"
        style={{ height: "331px", width: "572px", top: "100px", boxShadow: '0px 3px 6px #00000029' }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-4">
            <h6 style={{ fontSize: '38px', fontWeight: '500', color: '#FF3838' }}>تنبيه</h6>
            <Warning fill="#FF3838" />
          </div>
          <p className="mt-[21px]" style={{ fontSize: '20px', fontWeight: '700', color: '#011723' }}>
            هل أنت متأكد !
          </p>
          <h6 style={{ fontSize: '20px', fontWeight: '500', color: '#0077FF' }}>{notificationTitle}</h6>
          <div className="flex flex-row items-center gap-4 mt-[64px]">
            <Button
              type={"normal"}
              style={{ width: '156px', height: '56px', backgroundColor: "#02466A" }}
              textStyle={{ color: "#EFF9FF", fontSize: '20px' }}
              className={"rounded-lg px-4"}
              onClick={() => {
                setEndActionTitle(actionTitle);
                setNotificationTitle(null);
              }}
            >
              تأكيد
            </Button>
            <Button
              type={"outline"}
              style={{ width: '156px', height: '56px', backgroundColor: "#02466A00",border:'1px solid #02466A' }}
              textStyle={{ color: "#02466A", fontSize: '20px' }}
              className={"rounded-lg px-4"}
              onClick={() => {
                setNotificationTitle(null);
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
