import React, { useEffect, useState } from "react";
import useFetch from '../../../hooks/useFetch';
import Button from "../../../UI/Button/Button";
import styles from "./ComplaintDetails.module.css";
import { GoArrowRight } from "react-icons/go";
import { ReactComponent as StoreIcon } from "../../../assets/Icons/icon-24-store.svg";
import { ReactComponent as Category } from "../../../assets/Icons/icon-24-Category.svg";
import { ReactComponent as CallIcon } from "../../../assets/Icons/icon-24- call.svg";
import { ReactComponent as SupportIcon } from "../../../assets/Icons/icon-support.svg";
import { ReactComponent as DateIcon } from "../../../assets/Icons/icon-date.svg";
import { ReactComponent as StatusIcon } from "../../../assets/Icons/status.svg";
import { ReactComponent as TypeSupportIcon } from "../../../assets/Icons/type support.svg";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw,ContentState,convertFromHTML } from 'draft-js';
import moment from 'moment/moment';
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 opacity-50  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};

const stateChanges = [
  {
    value: "منتهية",
    BgColor: "#3AE374",
    color: '#ffffff'
  },
  {
    value: "غير منتهية",
    BgColor: "#D3D3D3",
    color: '#ffffff'
  },
  {
    value: "قيد المعالجة",
    BgColor: "#FFFAF3",
    color: '#FF9F1A'
  },
];

const AddCountry = ({ cancel, complaintDetails }) => {
  const { fetchedData, loading } = useFetch(`https://backend.atlbha.com/api/Admin/technicalSupport/${complaintDetails}`);
  const [description, setDescription] = useState({
    htmlValue: '',
    editorState: EditorState.createEmpty(),
  });

  const findStateChanges = stateChanges.find(
    (i) => fetchedData?.data?.technicalSupports?.supportstatus === i.value
  );

  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(
      convertToRaw(editorValue.getCurrentContent())
    );
    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue ,
    });
  };

  useEffect(()=>{
    setDescription({
      htmlValue: '',
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(fetchedData?.data?.technicalSupports?.content || '')
        )
      ),
    });
  },[fetchedData?.data?.technicalSupports?.content])
  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-slate-50 z-30 ${styles.container}`}
        style={{ width: "1104px", maxWidth: "100%", height: "calc(100% - 5rem)" }}
      >
        <div className="flex h-full flex-col justify-between">
          <div
            className="md:pt-[48px] md:pb-3 md:px-[70px] px-4 py-8"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <h2 style={{ color: '#011723' }} className="md:text-[24px] text-[20px] font-bold mb-3">تفاصيل الشكوى</h2>
            <div className="flex">
              <div className={`flex items-center gap-2 `}>
                <div
                  onClick={cancel}
                  className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}
                >
                  <GoArrowRight
                    style={{ color: "#02466A", fontSize: "1.2rem" }}
                  />
                </div>

                <h2 className="md:text-[18px] text-[16px] ml-4" style={{ color: "#011723",whiteSpace:'nowrap' }}> الدعم الفني </h2>
              </div>

              <h2 className="md:text-[18px] text-[16px] ml-4" style={{ color: "#011723",whiteSpace:'nowrap' }}> / جدول الشكاوى </h2>

              <h3 className="md:text-[18px] text-[16px]" style={{ color: "#7C7C7C",whiteSpace:'nowrap' }}>
                / تفاصيل الشكوى
              </h3>
            </div>
          </div>
          <div
            className={`flex-1 flex flex-col md:items-start items-center overflow-y-scroll md:pt-[30px] md:pb-[10px] md:pr-[70px] md:pl-[155px] p-4 ${styles.content}`}
            style={{ backgroundColor: "#F6F6F6" }}
          >
            {loading ?
            (
              <div className="w-full flex flex-col items-center">
                <CircularLoading />
              </div>
            )
            :
            (
              <div className="w-full">
              <h2 style={{ fontSize: '16px', color: "#4D4F5C",whiteSpace:'nowrap' }}>
                رقم الشكوى
              </h2>
              <div
                className="mt-[10px] flex items-center rounded-lg justify-center  md:min-h-[60px] min-h-[45px] w-[180px]"
                style={{ backgroundColor: "#237EAE" }}
              >
                <h2 style={{ color: '#EFF9FF' }} className="md:text-[24px] text-[20px] font-bold">
                  {fetchedData?.data?.technicalSupports?.id}
                </h2>
              </div>
              <div
                className={"mt-[20px] md:gap-12 gap-4 p-[20px] pr-[22px] flex md:flex-row flex-col justify-between rounded-lg"}
                style={{ width: "752px", maxWidth: "100%", backgroundColor: "#fff", boxShadow: '0px 3px 6px #0000000F' }}
              >
                <div className="flex-1 flex flex-col gap-5">
                  <div className="flex md:flex-row flex-col md:items-center items-start md:gap-4 gap-3">
                    <div className="flex gap-[10px]" style={{ width: "136px" }}>
                      <StoreIcon className={styles.icons}></StoreIcon>
                      <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>اسم المتجر</h2>
                    </div>
                    <div
                      className={"md:w-[180px] w-full md:h-[70px] h-[45px] flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        boxShadow: '0px 3px 6px #0000000F',
                        height: "70px",
                        width: "180px",
                      }}
                    >
                      <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                        {fetchedData?.data?.technicalSupports?.store?.store_name}
                      </h2>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col md:items-center items-start md:gap-4 gap-3">
                    <div className="flex gap-[10px]" style={{ width: "136px" }}>
                      <Category className={styles.icons}></Category>
                      <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>التصنيف</h2>
                    </div>
                    <div
                      className={"md:w-[180px] w-full md:h-[70px] h-[45px] flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        boxShadow: '0px 3px 6px #0000000F',
                      }}
                    >
                      <h2 className="flex flex-row gap-[14px]" style={{ fontSize: '18px', color: "#0077FF" }}>
                        <img src={fetchedData?.data?.technicalSupports?.store?.activity[0]?.icon} alt={fetchedData?.data?.technicalSupports?.store?.activity[0]?.name} />
                        {fetchedData?.data?.technicalSupports?.store?.activity[0]?.name}
                      </h2>
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col md:items-center items-start md:gap-4 gap-3">
                    <div className="flex gap-[10px]" style={{ width: "136px" }}>
                      <CallIcon className={styles.icons}></CallIcon>
                      <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>الهاتف</h2>
                    </div>
                    <div
                      className={"md:w-[180px] w-full md:h-[70px] h-[45px] flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        boxShadow: '0px 3px 6px #0000000F',
                      }}
                    >
                      <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                        {fetchedData?.data?.technicalSupports?.store?.phonenumber}
                      </h2>
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col md:items-center items-start md:gap-4 gap-3">
                    <div className="flex gap-[10px]" style={{ width: "136px" }}>
                      <StatusIcon className={styles.icons}></StatusIcon>
                      <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>الحالة</h2>
                    </div>
                    <div
                      className={"md:w-[180px] w-full md:h-[70px] h-[45px] flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: findStateChanges?.BgColor,
                        boxShadow: '0px 3px 6px #0000000F',
                      }}
                    >
                      <h2 style={{ fontSize: '18px', color: findStateChanges?.color }}>
                       {findStateChanges?.value}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-5">
                  <div className="flex md:flex-row flex-col md:items-center items-start md:gap-4 gap-3">
                    <div
                      className="flex gap-[10px]"
                      style={{ width: "136px" }}
                    >
                      <DateIcon className={styles.icons}></DateIcon>
                      <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>تاريخ الشكوى</h2>
                    </div>
                    <div
                      className={"md:w-[180px] w-full md:h-[70px] h-[45px] flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        boxShadow: '0px 3px 6px #0000000F',
                      }}
                    >
                      <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                        {moment(fetchedData?.data?.technicalSupports?.created_at).format('DD/MM/YYYY')}
                      </h2>
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col md:items-center items-start md:gap-4 gap-3">
                    <div className="flex gap-[10px]" style={{ width: "136px" }}>
                      <TypeSupportIcon className={styles.icons}></TypeSupportIcon>
                      <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>نوع الاتصال</h2>
                    </div>
                    <div
                      className={"md:w-[180px] w-full md:h-[70px] h-[45px] flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#FF00000A",
                        boxShadow: '0px 3px 6px #0000000F',
                      }}
                    >
                      <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                        {fetchedData?.data?.technicalSupports?.type}
                      </h2>
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col md:items-center items-start md:gap-4 gap-3">
                    <div className="flex gap-[10px]" style={{ width: "136px" }}>
                      <SupportIcon className={styles.icons}></SupportIcon>
                      <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>عنوان الشكوى</h2>
                    </div>
                    <div
                      className={"md:w-[180px] w-full md:h-[70px] h-[45px] flex items-center justify-center rounded-lg"}
                      style={{
                        backgroundColor: "#EFF9FF",
                        boxShadow: '0px 3px 6px #0000000F',
                      }}
                    >
                      <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                        {fetchedData?.data?.technicalSupports?.title}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-[10px] max-w-full">
                <h2 style={{ fontSize: '18px', color: '#011723' }}>محتوى الشكوى</h2>
                <div
                  className={styles.editor}
                >
                  <Editor
                    toolbarHidden={false}
                    editorState={description.editorState}
                    onEditorStateChange={onEditorStateChange}
                    inDropdown={true}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    toolbar={{
                      options: ["inline", "textAlign", "image", "list"],
                      inline: {
                        options: ["bold"],
                      },
                      list: {
                        options: ["unordered", "ordered"],
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            )
            }
            
          </div>
          <div className="p-8 flex justify-center items-center gap-4 md:h-[135px] h-[100px] md:bg-[#ebebeb] bg-[#F6F6F6]">
            <Button
              className={"md:h-[55px] h-[45px] w-[115px] rounded-lg px-8 py-3"}
              style={{ backgroundColor: '#02466A00', border: '1px solid #02466A' }}
              type={"outline"}
              onClick={cancel}
            >
              <h2 className="md:text-[24px] text-[20px]" style={{ color: '#02466A' }}>إغلاق</h2>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCountry;
