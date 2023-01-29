import React from "react";
import styles from "./Navbar.module.css";
import {
  HomeIcon,
  SearchIcon,
} from "../../assets/Icons/index";
import { Link } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import NotificationsMenu from "../NotificationsMenu/NotificationsMenu";
import EmailMenu from "../EmailMenu/EmailMenu";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({openSidebar}) => {
  return (
    <nav className={styles.navbar}>
      <div className="w-full flex flex-row items-center md:justify-start justify-between">
        <Link to="/" className={`hidden md:flex items-center gap-2 ${styles.logo}`}>
          <img className="h-6" src={HomeIcon} alt="" />
          <h1 className="text-slate-50 font-medium text-base">الموقع</h1>
        </Link>
        <div className="md:hidden flex flex-col items-center justify-center" onClick={() => {openSidebar();}}>
          <MenuIcon className={styles.menuIcon}/>
        </div>
        <div className={`flex items-center gap-10 md:px-8 px-0`}>
          <ProfileMenu />
          <div className="flex gap-4">
            <NotificationsMenu/>
            <EmailMenu />
          </div>
        </div>
      </div>
      <div className="hidden md:flex relative h-12 ">
        <label className={`h-full relative ${styles.search_input}`}>
          <input
            placeholder=" هنا ستجد ما تبحث عنه"
            type="text"
            name="name"
            style={{ backgroundColor: "rgba(29, 187, 190, 0.2)" }}
          />
        </label>
        <div className={`absolute top-0 right-0 ${styles.search_container}`}>
          <img src={SearchIcon} alt="" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;