import React from "react";
import {
    Notifications,
  } from "../../assets/Icons/index";
  import styles from "./NotificationsMenu.module.css";
  import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/images/amazon.png';
import { Link } from "react-router-dom";

const BackDrop = ({ closeMenu }) => {
    return (
      <div
        onClick={closeMenu}
        className="fixed back_drop bottom-0 left-0 h-full w-full z-10"
      ></div>
    );
};

const NotificationsMenu = () => {
    const [open,setOpen] = React.useState(false);
    return (
        <div className="relative">
            <img onClick={()=>setOpen(!open)} className="h-6 cursor-pointer" src={Notifications} alt="notification-icon" />
                <div className={`${open ? 'flex':'hidden'}`}>
                    <BackDrop 
                        closeMenu={() => {
                        setOpen(false);}}>
                    </BackDrop>
                    <div className={`${styles.notificationMenu} z-20`}>
                        {[1,2,3,4].map((_item,index)=>(
                        <div key={index} className={`${styles.notification_box} w-full flex flex-row items-center gap-4`}>
                            <img src={logo} alt="notification-img"
                                className="md:w-[35px] w-[30px] md:h-[35px] h-[30px]"
                                style={{borderRadius:'50%'}}
                            />
                            <div className="flex-1 flex flex-col">
                                <Link to="/الاشعارات" onClick={()=>setOpen(!open)}>
                                    <h6 className="md:text-[16px] text-[14px] text-blue-400 mb-3">متجر أمازون</h6>
                                </Link>
                                <div className="flex flex-row justify-between">
                                    <p className={`${styles.notification_desc} md:text-[16px] text-[14px]`}>استفسار حول دعم السيرفر للالعاب</p>
                                    <span className="md:text-[14px] text-[12px] text-gray-400">20 Agus 2022</span>
                                </div>
                            </div>
                            <CloseIcon className="md:text-[1.2rem] text-[0.9rem] cursor-pointer"/>
                        </div>
                        ))}
                    </div>
                </div>
        </div>
    );
};
export default NotificationsMenu;
