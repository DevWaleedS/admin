import React, { useState,useContext } from "react";
import Button from "../../UI/Button/Button";
import styles from "./MyAccount.module.css";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosCall } from "react-icons/io";
import Select from "@mui/material/Select";
import Person from "../../assets/Icons/Image Person.png";
import MenuItem from "@mui/material/MenuItem";
import ImageUploading from "react-images-uploading";
import { IoIosArrowDown } from "react-icons/io";
import {
  UploadOutlined
} from "../../assets/Icons/index";
import Context from "../../store/context";

const packagesOptions = [
  "إدارة المنصة",
  "المشرف العام",
  "مسئول المتاجر والباقات",
  "مسئول السوق والصفحات",
];

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};

//

const MyAccount = ({ cancel, user,setUser,edit,setEditUser }) => {
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [images, setImages] = useState([]);
  const [packageOption, setPackageOption] = useState("");
  const handleCategory = (event) => {
    setPackageOption(event.target.value);
  };
  const onChangeImage = (imageList, addUpdateIndex) => {
    console.log(imageList[0].file.name);
    // data for submit
    setImages(imageList);
  };
  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-slate-50 z-20 otlobha_new_product ${styles.container}`}
        style={{ width: "1104px", height: "calc(100% - 4rem)" }}
      >
        <div className="flex h-full flex-col justify-between">
          <div
            className="p-8"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            {edit ? (
                <>
                    <h2 className="font-semibold text-2xl  mb-3">
                      تعديل بيانات حسابي
                    </h2>
                    <div className="flex">
                        <h2 className="font-semibold ml-4"> حسابي الادمن </h2>

                        <h3 className="font-medium" style={{ color: "#67747B" }}>
                          /
                          تعديل بيانات الحساب
                        </h3>
                    </div>
                </>
            ):( 
                <h2 className="font-semibold text-2xl  mb-3">
                  حسابي الادمن
                </h2>
            )}
          </div>
          <div
            className={`flex-1 px-20 overflow-y-scroll py-12  ${styles.content}`}
          >
            <div className="flex justify-between">
              <div className="flex gap-4 ">
                <div className="h-44 w-44">
                  <img className="h-full w-full" src={Person} alt="profile-img" />
                </div>
                <div>
                  <h2 className="text-2xl font-medium mb-4">{user.name}</h2>
                  <h2 className="text-lg mb-4 flex gap-2 items-center">
                    <HiOutlineMail
                      style={{
                        cursor: "pointer",
                        color: "rgba(29, 187, 190, 1)",
                        fontSize: "1.5rem",
                      }}
                    ></HiOutlineMail>
                    {user.email}
                  </h2>
                  <h2 className="text-lg mb-4 flex gap-2 items-center">
                    <IoIosCall
                      style={{
                        cursor: "pointer",
                        color: "rgba(29, 187, 190, 1)",
                        fontSize: "1.5rem",
                      }}
                    ></IoIosCall>
                    {user.phone}
                  </h2>
                </div>
              </div>
              <div>
                <Button
                  style={{
                    width: "278px",
                    backgroundColor: edit ? '#02466A' :'#5EBFF2',
                  }}
                  type={"normal"}
                  className={"cursor-auto"}
                >
                  {user.role}
                </Button>
              </div>
            </div>
            {edit && (
              <div className="flex mt-12 gap-48">
                <div className="flex-1 ">
                  <div className="mt-6  ">
                    <h2 className="font-medium mb-2">الدور الوظيفى</h2>
                    <Select
                      value={packageOption}
                      onChange={handleCategory}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      IconComponent={() => {
                        return <IoIosArrowDown size={"1rem"} />;
                      }}
                      renderValue={(selected) => {
                        if (packageOption === "") {
                          return <h2>اختر نوع الدور الوظيفي</h2>;
                        }
                        return selected;
                      }}
                      sx={{
                        height: "3.5rem",
                        width: "100%",
                        border: "none",
                        pl: "1rem",
                        backgroundColor: "#EBEBEB",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    >
                      {packagesOptions.map((item) => {
                        return (
                          <MenuItem
                            className="souq_storge_category_filter_items"
                            sx={{
                              backgroundColor: "rgba(211, 211, 211, 1)",
                              height: "3rem",
                              "&:hover": {},
                            }}
                            value={`${item}`}
                          >
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="mt-6  ">
                    <h2 className="font-medium mb-2">اسم المتسخدم</h2>
                    <label className="w-full" htmlFor="">
                      <input
                        className="w-full outline-none p-4 rounded-lg"
                        style={{
                          border: "1px solid #ccc",
                          backgroundColor: "#EBEBEB",
                          color: '#011723',
                        }}
                        type="text"
                        placeholder="ادخل حروف فقط"
                        value={user.name}
                        onChange={(e)=>setUser({ ...user,name:e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="mt-6  ">
                    <h2 className="font-medium mb-2">البريد الالكترونى</h2>
                    <label className="w-full" htmlFor="">
                      <input
                        className="w-full outline-none p-4 rounded-lg"
                        style={{
                          border: "1px solid #ccc",
                          backgroundColor: "#EBEBEB",
                          color: '#011723',
                        }}
                        type="email"
                        placeholder="sample@sa.com"
                        value={user.email}
                        onChange={(e)=>setUser({ ...user,email:e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="mt-6  ">
                    <h2 className="font-medium mb-2">الصورة الشخصية</h2>
                    <ImageUploading
                      value={images}
                      onChange={onChangeImage}
                      maxNumber={2}
                      dataURLKey="data_url"
                      acceptType={["jpg", "png", "jpeg"]}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div
                          className="upload__image-wrapper relative h-14 flex items-center overflow-hidden"
                          style={{
                            border: "1px solid #ccc",
                            backgroundColor: "#EBEBEB",
                          }}
                          // onClick={() => {
                          //   onImageUpload();
                          // }}
                          {...dragProps}
                        >
                          <h2
                            className="w-full outline-none p-4 cursor-pointer"
                            style={{
                              color: "#aaa",
                            }}
                            onClick={() => {
                              onImageUpload();
                            }}
                          >
                            {images[0]?.file?.name || "أدخل الصورة الشخصية"}
                          </h2>
                          <div
                            className="flex h-full items-center justify-center"
                            style={{
                              width: "3.5rem",
                              backgroundColor: "#02466A",
                            }}
                          >
                            <img src={UploadOutlined} alt='upload-icon' />
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                </div>
                <div className="flex-1 ">
                <div className="mt-6  ">
                    <h2 className="font-medium mb-2">رقم الجوال</h2>
                    <label className="w-full" htmlFor="">
                      <input
                        className="w-full outline-none p-4 rounded-lg"
                        style={{
                          border: "1px solid #ccc",
                          backgroundColor: "#EBEBEB",
                          color: '#011723',
                        }}
                        type="text"
                        placeholder="96651548315"
                        value={user.phone}
                        onChange={(e)=>setUser({ ...user,phone:e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="mt-6  ">
                    <h2 className="font-medium mb-2">كلمة المرور</h2>
                    <label className="w-full" htmlFor="">
                      <input
                        className="w-full outline-none p-4 rounded-lg"
                        style={{
                          border: "1px solid #ccc",
                          backgroundColor: "#EBEBEB",
                          color: '#011723',
                        }}
                        type="password"
                        placeholder="*******************"
                        value={user.password}
                        onChange={(e)=>setUser({ ...user,password:e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="mt-6  ">
                    <h2 className="font-medium mb-2">تأكيد كلمة المرور</h2>
                    <label className="w-full" htmlFor="">
                      <input
                        className="w-full outline-none p-4 rounded-lg"
                        style={{
                          border: "1px solid #ccc",
                          backgroundColor: "#EBEBEB",
                          color: '#011723',
                        }}
                        type="password"
                        placeholder="*******************"
                        value={user.confirmPassword}
                        onChange={(e)=>setUser({ ...user,confirmPassword:e.target.value })}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="p-8 flex justify-center gap-4"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            {!edit && (
              <div className="flex flex-row gap-4">
                <Button
                  style={{
                    backgroundColor:'#02466A',
                    borderColor: `#02466A`,
                  }}
                  textStyle={{ color: "#EFF9FF" }}
                  className={"h-14 w-44 font-medium"}
                  type={"normal"}
                  onClick={setEditUser}
                >
                تعديل
                </Button>
                <Button
                  style={{
                    borderColor: `#02466A`,
                  }}
                  textStyle={{ color: "#02466A" }}
                  className={"h-14 w-44 font-medium"}
                  type={"outline"}
                  onClick={cancel}
                >
                  اغلاق
                </Button>
              </div>
            )}
            {edit && (
              <Button
                style={{
                  borderColor: `#02466A`,
                }}
                textStyle={{ color: "#02466A" }}
                className={"h-14 w-44 font-medium"}
                type={"outline"}
                onClick={ ()=>{
                  cancel();
                  setEndActionTitle("تم تعديل بيانات الآدمن بنجاح");
                  setEditUser(false);
                  }
                }
              >
                حفظ وإغلاق
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
