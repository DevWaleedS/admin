import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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

    const Logout = ()=> {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
            <div className="relative h-full order-last md:order-first">
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
                            <MdKeyboardArrowDown className="hidden md:flex text-2xl"/>
                            <h2 className="hidden md:flex" style={{ color: "#fff" }}>محمد عبد الرحمن</h2>
                    </div>
                    <div className={`${open ? 'flex':'hidden'}`}>
                        <BackDrop 
                            closeMenu={() => {
                            setOpen(false);}}>
                        </BackDrop>
                        <div className="md:bg-[#A4A1FB] bg-[#C0E9FF] flex flex-col gap-4 md:text-[#F7FCFF] text-[#02466A] w-full py-3 md:absolute fixed md:top-14 top-[4.7rem] left-0 z-20">
                            <div className="flex flex-row gap-4 px-6">
                                <img src={MyAccountIcon} alt='my-account-icon' />
                                <span className="md:text[16px] text-[18px] md:text-[#F7FCFF] text-[#02466A] whitespace-nowrap cursor-pointer" onClick={()=>setShowMyProfile(true)}>حسابي</span>
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
                            <div className="flex flex-row gap-4 px-6 cursor-pointer" onClick={Logout}>
                                <img src={SignOut} alt='sign-out-icon' />
                                <span className="whitespace-nowrap">تسجيل الخروج</span>
                            </div>
                        </div>
                    </div>
            </div>
    );
};
export default ProfileMenu;
