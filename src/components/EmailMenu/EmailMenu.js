import React from "react";
import {
    Email,
  } from "../../assets/Icons/index";
import styles from "./EmailMenu.module.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from "react-router-dom";

const BackDrop = ({ closeMenu }) => {
    return (
      <div
        onClick={closeMenu}
        className="fixed back_drop bottom-0 left-0 h-full w-full z-10"
      ></div>
    );
};

const EmailMenu = () => {
    const [open,setOpen] = React.useState(false);
    return (
        <div className="relative">
            <img onClick={()=>setOpen(!open)} className="h-6 cursor-pointer" src={Email} alt="email-icon" />
            <div className={`${open ? 'flex':'hidden'}`}>
                    <BackDrop 
                        closeMenu={() => {
                        setOpen(false);}}>
                    </BackDrop>
                    <div className={`${styles.EmailMenu} z-20`}>
                    {[1,2,3,4].map((_item,index)=>(
                    <div key={index} className={`${styles.email_box} w-full flex flex-row items-center justify-between gap-4`}>
                        <div className="flex flex-row items-center justify-between gap-4">
                            <div 
                                style={{ 
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%'
                                }} 
                                className="flex flex-col items-center justify-center bg-purple-500 text-white font-medium">
                                A
                            </div>
                            <Link to="/البريد" onClick={()=>setOpen(!open)}>
                                <div className="flex flex-col">
                                    <h6 className="text-lg font-medium text-black">Ahmed Abdulaziz</h6>
                                    <p className="font-normal text-black">تحديث اشتراك الباقة</p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-4">
                            <div className="flex-1 flex flex-col">
                                <h6 className="font-light text-gray-400">اليوم</h6>
                                <span className=" font-light text-gray-400">08:20 ص</span>
                            </div>
                            <StarBorderIcon className="cursor-pointer text-gray-500"/>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default EmailMenu;
