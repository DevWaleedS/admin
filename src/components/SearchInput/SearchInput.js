import React from "react";
import styles from "./SearchInput.module.css";
import {SearchIcon} from "../../assets/Icons/index";

const SearchInput = () => {
    return (
        <>
            <label className={`w-full h-full relative ${styles.search_input}`}>
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
        </>
    )
}
export default SearchInput;
