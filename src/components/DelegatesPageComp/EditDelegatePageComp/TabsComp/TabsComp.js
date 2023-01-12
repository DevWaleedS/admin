import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../../../../UI/Button/Button";
import Context from "../../../../store/context";

import { ReactComponent as CheckMarkImageIcon } from "../../../../assets/Icons/icon-24-checkmark-image.svg";
import { ReactComponent as BsWhatsapp } from "../../../../assets/Icons/icon-24-whatsapp.svg";
import { ReactComponent as BsFacebook } from "../../../../assets/Icons/icon-24-facebook.svg";
import { ReactComponent as BsTwitter } from "../../../../assets/Icons/icon-24-twitter.svg";
import { ReactComponent as BsInstagram } from "../../../../assets/Icons/icon-32-instagram.svg";

import { BsSnapchat, BsYoutube } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const countries = ["السعودية", "الامارات", "الكويت", "مصر"];
const cities = ["الرباض", "جدة", "دمام", "مكة المكرمة"];
const activate = ["مفعل", "غير مفعل"];

const TabsComp = () => {
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const [category, setCategory] = useState("");
  const [specialProduct, setSpecialProduct] = useState("");
  const [condition, setCondition] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSpecialProductChange = (event) => {
    setSpecialProduct(event.target.value);
  };
  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className=" pt-5 " style={{}}>
      <TabContext value={value}>
        <Box sx={{}}>
          <TabList
            sx={{
              "& .MuiTabs-flexContainer": {
                gap: "1rem",
              },
              "& .MuiButtonBase-root": {
                backgroundColor: "#C0E9FF",
                py: "1.25rem",
                borderRadius: "0.25rem",
                color: "#011723",
                transition: "0.1s",
                fontSize: "1.25rem",
                fontWeight: "500",
              },
              "& .MuiButtonBase-root.Mui-selected": {
                backgroundColor: "#02466A",
                color: "#FFFFFF",
              },
              "& .MuiTabs-indicator": { display: "none" },
            }}
            onChange={handleChange}
            variant="fullWidth"
          >
            <Tab disableRipple={true} label="البيانات الأساسية" value="1" />
            <Tab disableRipple={true} label="الدولة/المدينة" value="2" />
            <Tab disableRipple={true} label="التواصل الاجتماعى" value="3" />
            <Tab disableRipple={true} label="تفعيل / تعطيل" value="4" />
          </TabList>
        </Box>
        <Box
          sx={{
            height: "42.5rem",
            mt: "2.5rem",
            pl: "7.5rem",
            backgroundColor: "#fff",
          }}
        >
          <TabPanel value="1">
            <div className="">
              <div className="py-4 px-5" style={{ backgroundColor: "#fff" }}>
                <div className="mb-5">
                  <h2 className="font-medium" style={{ fontSize: "18px" }}>
                    الاسم كامل
                  </h2>
                  <label htmlFor="">
                    <input
                      className="outline-none w-full p-3 mt-3 rounded"
                      style={{ border: "1px solid #E9E9E9" }}
                      type="text"
                      placeholder="عبد العزيز محمد"
                    />
                  </label>
                </div>
                <div className="mb-5">
                  <h2 className="font-medium" style={{ fontSize: "18px" }}>
                    اسم المستخدم
                  </h2>
                  <label htmlFor="">
                    <input
                      className="outline-none w-full p-3 mt-3 rounded"
                      style={{ border: "1px solid #E9E9E9" }}
                      type="text"
                      placeholder="Abed32"
                    />
                  </label>
                </div>
                <div className={`mb-5 flex gap-3 `}>
                  <div className="mb-5 flex-1">
                    <h2 className="font-medium" style={{ fontSize: "18px" }}>
                      كلمة المرور
                    </h2>
                    <label htmlFor="">
                      <input
                        className="outline-none w-full p-3 mt-3 rounded"
                        style={{ border: "1px solid #E9E9E9" }}
                        type="password"
                        placeholder="•••••••"
                      />
                    </label>
                  </div>
                  <div className="mb-5 flex-1">
                    <h2 className="font-medium" style={{ fontSize: "18px" }}>
                      تأكيد كلمة المرور
                    </h2>
                    <label htmlFor="">
                      <input
                        className="outline-none w-full p-3 mt-3 rounded"
                        style={{ border: "1px solid #E9E9E9" }}
                        type="password"
                        placeholder="•••••••"
                      />
                    </label>
                  </div>
                </div>
                <div className={`mb-5 flex gap-3 `}>
                  <div className="mb-5 flex-1">
                    <h2 className="font-medium" style={{ fontSize: "18px" }}>
                      البريد الالكترونى
                    </h2>
                    <label htmlFor="">
                      <input
                        className="outline-none w-full p-3 mt-3 rounded"
                        style={{ border: "1px solid #E9E9E9" }}
                        type="email"
                        placeholder="Abed@gmail.com"
                      />
                    </label>
                  </div>
                  <div className="mb-5 flex-1">
                    <h2 className="font-medium" style={{ fontSize: "18px" }}>
                      رقم التواصل
                    </h2>
                    <label htmlFor="">
                      <input
                        className="outline-none w-full p-3 mt-3 rounded"
                        style={{ border: "1px solid #E9E9E9" }}
                        type="number"
                        placeholder="96621513515"
                      />
                    </label>
                  </div>
                </div>
                <div className={`mb-5 flex gap-3 items-end `}>
                  <div
                    className="flex items-center rounded justify-center"
                    style={{
                      backgroundColor: "#D3D3D3",
                      height: "161px",
                      width: "130px",
                    }}
                  >
                    <CheckMarkImageIcon
                      style={{ width: "32px", height: "32px" }}
                    />
                  </div>
                  <div className="flex flex-1">
                    <label className="flex-1" htmlFor="">
                      <input
                        className="outline-none flex-1 w-full h-full p-3  rounded"
                        style={{ border: "1px solid #E9E9E9" }}
                        type="text"
                        placeholder=""
                      />
                    </label>
                    <Button
                      type={"normal"}
                      style={{
                        backgroundColor: "rgba(35, 126, 174, 1)",
                        height: "56px",
                        width: "180px",
                      }}
                    >
                      استعراض
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="mb-5">
              <h2 className="mb-2 font-semibold" style={{ color: "#011723" }}>
                الدولة: المملكة العربية السعودية
              </h2>
              <Select
                value={category}
                IconComponent={() => {
                  return <IoIosArrowDown size={"1rem"} />;
                }}
                onChange={handleCategoryChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                renderValue={(selected) => {
                  if (category === "") {
                    return <h2>اختر الدولة ...</h2>;
                  }
                  return selected;
                }}
                className={"rounded-lg"}
                sx={{
                  height: "3.5rem",
                  backgroundColor: "#fff",
                  width: "100%",
                  pl: "1rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #A7A7A780",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #03787A",
                  },
                }}
              >
                {countries.map((item) => {
                  return (
                    <MenuItem
                      className=""
                      sx={{
                        backgroundColor: "#fff",
                        height: "3rem",

                        "&:hover": {},
                        "ul:has(&)": {
                          padding: "0",
                        },
                      }}
                      value={`${item}`}
                    >
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="mb-5">
              <h2 className="mb-2 font-semibold" style={{ color: "#011723" }}>
                المدينة: جدة
              </h2>
              <Select
                value={specialProduct}
                IconComponent={() => {
                  return <IoIosArrowDown size={"1rem"} />;
                }}
                onChange={handleSpecialProductChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                renderValue={(selected) => {
                  if (specialProduct === "") {
                    return <h2>اختر المدينة...</h2>;
                  }
                  return selected;
                }}
                className={"rounded-lg"}
                sx={{
                  height: "3.5rem",
                  backgroundColor: "#fff",
                  width: "100%",
                  pl: "1rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #A7A7A780",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #03787A",
                  },
                }}
              >
                {cities.map((item) => {
                  return (
                    <MenuItem
                      className=""
                      sx={{
                        backgroundColor: "#fff",
                        height: "3rem",

                        "&:hover": {},
                        "ul:has(&)": {
                          padding: "0",
                        },
                      }}
                      value={`${item}`}
                    >
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div className="py-4 px-5" style={{ backgroundColor: "#fff" }}>
              <div className="mb-5">
                <h2 className="font-medium" style={{ fontSize: "18px" }}>
                  رقم واتساب
                </h2>
                <label className={` flex-1 relative   `}>
                  <input
                    className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
                    placeholder=""
                    type="text"
                    name="number"
                    onChange={() => {
                      console.log("zed");
                    }}
                    style={{
                      border: "1px solid #E9E9E9",
                    }}
                  />
                  <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
                    <BsWhatsapp color="#ADB5B9" size={"18px"}></BsWhatsapp>
                  </div>
                </label>
              </div>
              <div className="mb-5">
                <h2 className="font-medium" style={{ fontSize: "18px" }}>
                  سناب شات
                </h2>
                <label className={` flex-1 relative   `}>
                  <input
                    className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
                    placeholder=""
                    type="text"
                    name="number"
                    onChange={() => {
                      console.log("zed");
                    }}
                    style={{
                      border: "1px solid #E9E9E9",
                    }}
                  />
                  <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
                    <BsSnapchat color="#ADB5B9" size={"18px"}></BsSnapchat>
                  </div>
                </label>
              </div>
              <div className="mb-5">
                <h2 className="font-medium" style={{ fontSize: "18px" }}>
                  فيسبوك
                </h2>
                <label className={` flex-1 relative   `}>
                  <input
                    className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
                    placeholder=""
                    type="text"
                    name="number"
                    onChange={() => {
                      console.log("zed");
                    }}
                    style={{
                      border: "1px solid #E9E9E9",
                    }}
                  />
                  <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
                    <BsFacebook color="#ADB5B9" size={"18px"}></BsFacebook>
                  </div>
                </label>
              </div>
              <div className="mb-5">
                <h2 className="font-medium" style={{ fontSize: "18px" }}>
                  تويتر
                </h2>
                <label className={` flex-1 relative   `}>
                  <input
                    className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
                    placeholder=""
                    type="text"
                    name="number"
                    onChange={() => {
                      console.log("zed");
                    }}
                    style={{
                      border: "1px solid #E9E9E9",
                    }}
                  />
                  <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
                    <BsTwitter color="#ADB5B9" size={"18px"}></BsTwitter>
                  </div>
                </label>
              </div>
              <div className="mb-5">
                <h2 className="font-medium" style={{ fontSize: "18px" }}>
                  انستجرام
                </h2>
                <label className={` flex-1 relative   `}>
                  <input
                    className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
                    placeholder=""
                    type="text"
                    name="number"
                    onChange={() => {
                      console.log("zed");
                    }}
                    style={{
                      border: "1px solid #E9E9E9",
                    }}
                  />
                  <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
                    <BsInstagram color="#ADB5B9" size={"18px"}></BsInstagram>
                  </div>
                </label>
              </div>
              <div className="mb-5">
                <h2 className="font-medium" style={{ fontSize: "18px" }}>
                  يوتيوب
                </h2>
                <label className={` flex-1 relative   `}>
                  <input
                    className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
                    placeholder=""
                    type="text"
                    name="number"
                    onChange={() => {
                      console.log("zed");
                    }}
                    style={{
                      border: "1px solid #E9E9E9",
                    }}
                  />
                  <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
                    <BsYoutube color="#ADB5B9" size={"18px"}></BsYoutube>
                  </div>
                </label>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div className="mb-5">
              <h2 className="mb-2" style={{ color: "#011723" }}>
                الحالة{" "}
              </h2>
              <Select
                value={specialProduct}
                IconComponent={() => {
                  return <IoIosArrowDown size={"1rem"} />;
                }}
                onChange={handleSpecialProductChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                renderValue={(selected) => {
                  if (specialProduct === "") {
                    return <h2>تفعيل</h2>;
                  }
                  return selected;
                }}
                className={"rounded-lg"}
                sx={{
                  height: "3.5rem",
                  backgroundColor: "#fff",
                  width: "100%",
                  pl: "1rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #A7A7A780",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #03787A",
                  },
                }}
              >
                {activate.map((item) => {
                  return (
                    <MenuItem
                      className=""
                      sx={{
                        backgroundColor: "#fff",
                        height: "3rem",

                        "&:hover": {},
                        "ul:has(&)": {
                          padding: "0",
                        },
                      }}
                      value={`${item}`}
                    >
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </TabPanel>
        </Box>
      </TabContext>
      <Button
        onClick={() => {
          setEndActionTitle("تم تعديل المندوب بنجاح");
          navigate("/عرض_المناديب");
        }}
        className={"w-full mt-10"}
        type={"normal"}
      >
        {" "}
        حفظ
      </Button>
    </Box>
  );
};

export default TabsComp;
