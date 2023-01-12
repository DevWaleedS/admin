import React from "react";
import styles from "./Navbar.module.css";
import {
  HomeIcon,
  Notifications,
  Email,
  SearchIcon,
  
} from "../../assets/Icons/index";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className="flex">
        <Link to="/" className={`flex items-center gap-2 ${styles.logo}`}>
          <img className="h-6" src={HomeIcon} alt="" />
          <h1 className="text-slate-50 font-medium text-base">الموقع</h1>
        </Link>
        <div className={`flex items-center gap-10 px-8 `}>
          <div
            className={`flex items-center gap-2 cursor-pointer ${styles.user}`}
            style={{ color: "#1DBBBE" }}
          >
            <MdKeyboardArrowDown className="text-2xl" />
            <h2 style={{ color: "#fff" }}>محمد عبد الرحمن</h2>
          </div>
          <div className="flex gap-4">
            <img className="h-6 cursor-pointer" src={Notifications} alt="" />
            <img className="h-6 cursor-pointer" src={Email} alt="" />
          </div>
        </div>
      </div>
      <div className="flex relative h-12">
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
