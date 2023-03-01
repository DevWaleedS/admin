import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AiFillStar } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import Select from "@mui/material/Select";
import Button from "../../../UI/Button/Button";
import Context from "../../../store/context";
import { ReactComponent as Arrow } from "../../../assets/Icons/icon-24-chevron_down.svg";
// import { ReactComponent as Clear } from "../../../assets/Icons/icon-24-actioins-clear.svg";
import styles from "./AddNewPackagePlan.module.css";
import MenuItem from "@mui/material/MenuItem";
import { GoArrowRight } from "react-icons/go";
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Template } from '../../../assets/Icons/index';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import useFetch from '../../../hooks/useFetch';
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddNewPackagePlan = ({ reload, setReload, cancel, selectedTemplate, setChooseTemplate, editPackageDetails }) => {
  const { fetchedData: planList } = useFetch('https://backend.atlbha.com/api/Admin/selector/plans');
  const token = localStorage.getItem('token');
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [datapackage, setDataPackage] = useState({
    name: editPackageDetails?.name || '',
    monthly_price: editPackageDetails?.monthly_price || '',
    yearly_price: editPackageDetails?.yearly_price || '',
    discount: editPackageDetails?.discount || '',
    plan: [],
    template: [],
  });
  const AddPackagePlan = () => {
    const data = {
      name: datapackage?.name,
      monthly_price: datapackage?.monthly_price,
      yearly_price: datapackage?.yearly_price,
      discount: datapackage?.discount,
      plan: datapackage?.plan,
      template: selectedTemplate,
    };
    axios
      .post("https://backend.atlbha.com/api/Admin/package", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setReload(!reload);
        } else {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setReload(!reload);
        }
      });
  }
  const updatePackagePlan = () => {
    const data = {
      name: datapackage?.name,
      monthly_price: datapackage?.monthly_price,
      yearly_price: datapackage?.yearly_price,
      discount: datapackage?.discount,
      plan: datapackage?.plan || editPackageDetails?.plans?.map(item => item?.id),
      template: selectedTemplate || editPackageDetails?.templates?.map(item => item?.id),
    };
    axios
      .put(`https://backend.atlbha.com/api/Admin/package/${editPackageDetails?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setReload(!reload);
        } else {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setReload(!reload);
        }
      });
  }

  return (
    <div
      className="absolute md:pb-20 md:py-[40px] md:pl-[102px] md:pr-4 p-4 pt-0 top-0 right-0  z-10 w-full md:h-auto h-full"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-4 mb-2">
        <div className="flex items-center gap-2">
          <div onClick={cancel} className={` ${styles.arrow_con}`}>
            <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
          </div>
          <h2 className='md:text-lg text-[16px] font-medium whitespace-nowrap' style={{ color: '#011723' }}>الباقات والأسعار</h2>
        </div>
        <Button
          className="md:w-[180px] w-full md:h-[56px] h-[45px] md:text-[22px] text-[18px]"
          style={{ color: '#011723', whiteSpace: 'nowrap', }}
          onClick={() => {
            editPackageDetails ? updatePackagePlan() : AddPackagePlan();
          }}
          type={"normal"}
        >
          {editPackageDetails ? "حفظ التعديلات" : "اعتماد الباقة"}
        </Button>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h2 className='md:text-[18px] text-[16px] font-normal' style={{ color: '#1DBBBE' }}>
          رقم الباقة
        </h2>
        <input
          className="w-[180px] md:h-[56px] h-[45px] font-medium text-center py-[12px] px-2 outline-none rounded-lg placeholder:text-[#02466A]"
          style={{ backgroundColor: "#D3D3D3", color: '#02466A', fontSize: '24px' }}
          placeholder="0212"
          type="text"
        />
        {editPackageDetails && (
          <div className="mt-[20px] p-4 rounded-lg" style={{ backgroundColor: "#EBEBEB" }}>
            <h3 className="mb-3 font-medium" style={{ color: "#67747B", fontSize: "20px" }}>
              الخطة الحالية
            </h3>
            {editPackageDetails?.plans?.map((plan, index) => {
              if (plan?.selected) {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#0BF1D1",
                      marginLeft: "14px",
                      display: "inline-flex",
                    }}
                    className="gap-4 items-center py-1 px-3 mb-4 rounded-lg"
                  >
                    <h2
                      className=" "
                      style={{
                        color: "#011723",
                      }}
                    >
                      {plan?.name}
                    </h2>
                    <MdClear
                      className="cursor-pointer"
                      fill="#011723"
                    ></MdClear>
                  </div>
                );
              }
            })}
          </div>
        )}
        {
          editPackageDetails ?
            (
              <div className="bg-white mt-6 p-8 pb-20 rounded-lg" style={{ boxShadow: '0px 3px 6px #1DBBBE0F' }}>
                <h2 style={{ color: "#0099FB" }} className="text-lg font-medium mb-3">
                  اضافة محتوى جديد للخطة
                </h2>
                <FormControl sx={{ width: "100%", minHeight: "240px" }}>
                  <Select
                    className={styles.select}
                    multiple
                    displayEmpty
                    value={datapackage?.plan}
                    onChange={(e) => { setDataPackage({ ...datapackage, plan: e.target.value }) }}
                    IconComponent={(props) => (<Arrow fill="#242424" {...props} />)}
                    input={<OutlinedInput />}
                    sx={{
                      backgroundColor: "#EFF9FF",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#92D9FF !important",
                      },
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return "اختر وصف الباقة";
                      }

                      return selected.map((item) => {
                        const result = planList?.data?.plans?.filter((p) => p?.id === parseInt(item))
                        return (
                          <div
                            className="py-1 px-3 text-slate-50 rounded-lg font-light"
                            style={{
                              maxWidth: "fit-content",
                              backgroundColor: "#0099FB",
                              display: "inline",
                            }}
                          >
                            {result[0]?.name}
                          </div>
                        );
                      });
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {
                      planList?.data?.plans?.map((option, index) => (
                      <MenuItem className="souq_storge_category_filter_items"
                        key={index}
                        value={option?.id}
                        sx={{
                          padding: 0,
                          backgroundColor: "#FAFAFA",
                          height: "56px",
                          "&:hover": {
                            backgroundColor: '#5EBFF2'
                          },
                        }}
                      >
                        <Checkbox checked={datapackage?.plan?.indexOf(option?.id) > -1} />
                        <ListItemText primary={option?.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )
            :
            (
              <div className="flex flex-col gap-[28px] bg-white mt-[28px] pr-[10px] pl-[30px] pt-[20px] pb-52 rounded-lg" style={{ boxShadow: '0px 3px 6px #1DBBBE0F' }}>
                <h2 style={{ color: "#0099FB", fontSize: '20px' }} className="font-medium">
                  <AiFillStar
                    style={{
                      display: "inline-block",
                      marginLeft: "1rem",
                      color: "red",
                    }}
                  ></AiFillStar>
                  خطة الباقة
                </h2>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    className={styles.select}
                    multiple
                    displayEmpty
                    value={datapackage?.plan}
                    onChange={(e) => { setDataPackage({ ...datapackage, plan: e.target.value }) }}
                    IconComponent={(props) => (<Arrow fill="#242424" {...props} />)}
                    input={<OutlinedInput />}
                    sx={{
                      backgroundColor: "#EFF9FF",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#92D9FF !important",
                      },
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return "اختر وصف الباقة";
                      }

                      return selected.map((item) => {
                        const result = planList?.data?.plans?.filter((p) => p?.id === parseInt(item))
                        return (
                          <div
                            className="py-1 px-3 text-slate-50 rounded-lg font-light"
                            style={{
                              maxWidth: "fit-content",
                              backgroundColor: "#0099FB",
                              display: "inline",
                            }}
                          >
                            {result[0]?.name}
                          </div>
                        );
                      });
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {planList?.data?.plans?.map((option, index) => (
                      <MenuItem className="souq_storge_category_filter_items"
                        key={index}
                        value={option?.id}
                        sx={{
                          padding: 0,
                          backgroundColor: "#FAFAFA",
                          height: "56px",
                          "&:hover": {
                            backgroundColor: '#5EBFF2'
                          },
                        }}
                      >
                        <Checkbox checked={datapackage?.plan?.indexOf(option?.id) > -1} />
                        <ListItemText primary={option?.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )
        }
        <div className="flex flex-col gap-[28px] bg-white mt-6 p-8 rounded-lg" style={{ boxShadow: '0px 3px 6px #1DBBBE0F' }}>
          <h2 style={{ color: "#0099FB" }} className="md:text-[20px] text-[18px] font-medium">
            <AiFillStar
              style={{
                display: "inline-block",
                marginLeft: "1rem",
                color: "red",
              }}
            ></AiFillStar>
            البيانات الأساسية
          </h2>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              <Grid item md={6} xs={12} container rowSpacing={4}>
                <Grid item xs={12}>
                  <Box className="flex md:flex-row flex-col md:items-center items-start gap-2">
                    <label style={{ color: '#011723' }} className="md:text-[18px] text-[16px] w-60 whitespace-nowrap" htmlFor="name">اسم الباقة</label>
                    <input
                      id="name"
                      className="w-full md:h-[56px] h-[45px]  px-4 py-3 outline-none rounded-lg"
                      style={{ backgroundColor: "#EFF9FF", '&::placeholder': '#A7A7A7' }}
                      placeholder="أدخل اسم الباقة"
                      type="text"
                      value={datapackage?.name}
                      onChange={(e) => { setDataPackage({ ...datapackage, name: e.target.value }) }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="flex md:flex-row flex-col md:items-center items-start gap-2">
                    <label style={{ color: '#011723' }} className="md:text-[18px] text-[16px] w-60 whitespace-nowrap" htmlFor="month">المبلغ الشهري</label>
                    <input
                      id="month"
                      className=" w-full md:h-[56px] h-[45px]  px-4 py-3 outline-none rounded-lg"
                      style={{ backgroundColor: "#EFF9FF", '&::placeholder': '#A7A7A7' }}
                      placeholder="350 ر.س"
                      type="text"
                      value={datapackage?.monthly_price}
                      onChange={(e) => { setDataPackage({ ...datapackage, monthly_price: e.target.value }) }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="flex md:flex-row flex-col md:items-center items-start gap-2">
                    <label style={{ color: '#011723' }} className="md:text-[18px] text-[16px] w-60 whitespace-nowrap" htmlFor="month">الخصم</label>
                    <input
                      id="month"
                      className=" w-full md:h-[56px] h-[45px] px-4 py-3 outline-none rounded-lg"
                      style={{ backgroundColor: "#EFF9FF", '&::placeholder': '#A7A7A7' }}
                      placeholder="أدخل مبلغ الخصم"
                      type="text"
                      value={datapackage?.discount}
                      onChange={(e) => { setDataPackage({ ...datapackage, discount: e.target.value }) }}
                    />
                  </Box>
                  <div className="flex flex-row items-center mt-3">
                    <div className="md:w-40 w-0"></div>
                    <span style={{ color: '#D3D3D3' }} className="md:text-sm text-[12px]">ادخال نسبة الخصم في حال الشراء سنوياً مثال 30%</span>
                  </div>
                </Grid>
              </Grid>
              <Grid item md={6} xs={12} container>
                <Grid item xs={12}>
                  <Box className="flex md:flex-row flex-col md:items-center items-start gap-2">
                    <label style={{ color: '#011723' }} className="md:text-[18px] text-[16px] w-60 whitespace-nowrap" htmlFor="name">المبلغ السنوي</label>
                    <input
                      id="name"
                      className="w-full md:h-[56px] h-[45px] px-4 py-3 outline-none rounded-lg"
                      style={{ backgroundColor: "#EFF9FF", '&::placeholder': '#A7A7A7' }}
                      placeholder="2500 ر.س"
                      type="text"
                      value={datapackage?.yearly_price}
                      onChange={(e) => { setDataPackage({ ...datapackage, yearly_price: e.target.value }) }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <div className="w-full mt-5 flex md:flex-row flex-col gap-6 pb-16">
        <AiFillStar
          style={{
            color: "red",
          }}
        ></AiFillStar>
        <Button
          className={"w-full md:h-[56px] h-[45px] rounded-lg py-4 md:ml-10 ml-0"}
          style={{ width: '960px', backgroundColor: "#FFFFFF", border: '1px solid #02466A' }}
          svg={<img src={Template} alt="template-icon" />}
          type={"outline"}
          onClick={() => {
            setChooseTemplate(true);
          }}
        >
          <h2 style={{ color: '#02466A' }} className="md:text-[20px] text-[18px] font-medium">اختر قوالب الباقة</h2>
        </Button>
      </div>
    </div>
  );
};

export default AddNewPackagePlan;