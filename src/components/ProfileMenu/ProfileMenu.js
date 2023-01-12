import React,{useState} from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./ProfileMenu.module.css";
import {
    MyAccountIcon,
    SignOut
  } from "../../assets/Icons/index";
import MyAccount from '../MyAccount/MyAccount';
import ProfileImage from '../../assets/images/profile.png'

const BackDrop = ({ closeMenu }) => {
    return (
      <div
        onClick={closeMenu}
        className="fixed back_drop bottom-0 left-0 h-full w-full z-10"
      ></div>
    );
};

const ProfileMenu = () => {
    const [open,setOpen] = useState(false);
    const [user,setUser] = useState({
        name: 'خالد عبد الرحمن محمد',
        email:'Ka20@hotmail.com',
        phone:'9968461081',
        role:'آدمن',
        password:12345678,
        confirmPassword:12345678
    })
    const [showMyProfile , setShowMyProfile] = useState(false);
    const [editUser, setEditUser] = useState(false);

    return (
            <div className="relative h-full">
                    <div
                        className={`flex items-center gap-2 cursor-pointer ${styles.user}`}
                        style={{ color: "#1DBBBE" }}
                        onClick={()=>setOpen(!open)}
                        >   
                            <div className="relative">
                                <img src={ProfileImage} alt='profile-icon' style={{ width:'35px',height:'35px',borderRadius:'50%' }}/>
                                <span
                                    className="absolute right-0 top-7"
                                    style={{ 
                                        width:'10px',
                                        height: '10px',
                                        borderRadius:'50%',
                                        backgroundColor:'#3AE374'
                                    }}
                                    ></span>
                            </div>
                            <MdKeyboardArrowDown className="text-2xl"/>
                            <h2 style={{ color: "#fff" }}>محمد عبد الرحمن</h2>
                    </div>
                    <div className={`${open ? 'flex':'hidden'}`}>
                        <BackDrop 
                            closeMenu={() => {
                            setOpen(false);}}>
                        </BackDrop>
                        <div style={{ backgroundColor:'#A4A1FB' }} className="flex flex-col gap-4 text-white w-full py-3 absolute top-14 left-0 z-20">
                            <div className="flex flex-row gap-4 px-6">
                                <img src={MyAccountIcon} alt='my-account-icon' />
                                <span className="whitespace-nowrap cursor-pointer" onClick={()=>setShowMyProfile(true)}>حسابي</span>
                                {showMyProfile &&
                                (
                                    <MyAccount 
                                    user={user}
                                    edit={editUser}
                                    setUser={setUser}
                                    setEditUser = {setEditUser}
                                    cancel={() => {
                                        setShowMyProfile(false);
                                    }}/>
                                )}
                            </div>
                            <div className="flex flex-row gap-4 px-6">
                                <img src={SignOut} alt='sign-out-icon' />
                                <span className="whitespace-nowrap">تسجيل الخروج</span>
                            </div>
                        </div>
                    </div>
            </div>
    );
};
export default ProfileMenu;
