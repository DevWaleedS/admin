import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableComp from "./TableComp/TableComp";
import UserInfo from "./UserInfo/UserInfo";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

const category = ["أدمن", "محرر", "إدارة", "دعم فنى"];

const UsersTable = () => {
  const [age, setAge] = React.useState("");
  const [user, setUser] = useState([]);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const handleCategory = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="md:mt-10 mt-4">
      <div className="flex md:flex-row flex-col-reverse items-end md:gap-8 gap-4 md:bg-[#FFFFFF] bg-[#F2F8FA] rounded-lg py-4 px-2">
        <div className="w-full flex-1 flex flex-col gap-2">
          <h2 className="md:text-[18px] text-[16px]">فرز حسب</h2>
          <FormControl
            className="flex flex-row gap-4"
            sx={{ width:"100%",maxWidth: "100%", flex: "1" }}
          >
            <Select
              value={age}
              onChange={handleCategory}
              displayEmpty
              IconComponent={() => {
                return <IoIosArrowDown size={"1rem"} />;
              }}
              inputProps={{ "aria-label": "Without label" }}
              renderValue={(selected) => {
                if (age === "") {
                  return <h2>الكل</h2>;
                }
                return selected;
              }}
              className={"flex-1"}
              sx={{
                height: "3.5rem",
                pl: "1rem",
                border: "1px solid #A7A7A7",
                borderRadius: '8px',
                backgroundColor:'transparent',
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              {category.map((item) => {
                return (
                  <MenuItem
                    className="souq_storge_category_filter_items"
                    sx={{
                      backgroundColor: "#EBEBEB",
                      height: "3rem",
                      "&:hover": {},
                      "ul:has(&) li:hover": {
                        backgroundColor: "rgba(29, 187, 190, 1)",
                        color: "#fff",
                      },
                    }}
                    value={`${item}`}
                  >
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <FormControl
          className="flex flex-row gap-4"
          sx={{ width:"474px",maxWidth: "100%", flex: "1" }}
        >
          <label className={`flex-1 h-14 relative `}>
            <input
              className="w-full h-full outline-0 pr-16 rounded-lg bg-transparent"
              placeholder=" ابحث عن مستخدم"
              type="text"
              name="name"
              onChange={() => {

              }}
              style={{ border: "1px solid #A7A7A7" }}
            />
            <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
              <AiOutlineSearch color="#1DBBBE" size={"18px"}></AiOutlineSearch>
            </div>
          </label>
        </FormControl>
      </div>
      {showUserInfo && (
        <UserInfo
          user={user}
          edit={editUser}
          cancel={() => {
            setShowUserInfo(false);
          }}
        ></UserInfo>
      )}
      <div dir={"ltr"}>
        <TableComp
          setUser={(userDetected, edit) => {
            setUser(userDetected);
            setShowUserInfo(true);
            setEditUser(edit);
          }}
        ></TableComp>
      </div>
    </div>
  );
};

export default UsersTable;
