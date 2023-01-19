import React, { useState } from "react";
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
import { ReactComponent as GiftIcon } from "../../../assets/Icons/icon-26-gift.svg";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";

const BackDrop = ({ onClick, complaintDetails }) => {
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
  const [description, setDescription] = useState({
    htmlValue: "<h1></h1>\n",
    editorState: EditorState.createEmpty(),
  });

  const findStateChanges = stateChanges.find(
    (i) => complaintDetails.state === i.value
  );

  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(
      convertToRaw(editorValue.getCurrentContent())
    );
    console.log(editorStateInHtml);

    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue,
    });
  };

  // useEffect(() => {
  //   if (data) {
  //     setCountryNumber(data.CountryNumber);
  //     setCityNumber(data.cityNumber);
  //     setArabicCountryName(data.name);
  //     setEnglishCountryName(data.nameEn);
  //   }
  // }, [data]);

  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-slate-50 z-20 ${styles.container}`}
        style={{ width: "1104px", height: "calc(100% - 5rem)" }}
      >
        <div className="flex h-full flex-col justify-between">
          <div
            className="pt-[48px] pb-3 px-[70px]"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <h2 style={{ fontSize: '24px', color: '#011723' }} className="font-bold mb-3">تفاصيل الشكوى</h2>
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

                <h2 className="ml-4" style={{ fontSize: '18px', color: "#011723" }}> الدعم الفني </h2>
              </div>

              <h2 className="ml-4" style={{ fontSize: '18px', color: "#011723" }}> / جدول الشكاوى </h2>

              <h3 style={{ fontSize: '18px', color: "#7C7C7C" }}>
                / تفاصيل الشكوى
              </h3>
            </div>
          </div>
          <div
            className={`flex-1 overflow-y-scroll pt-[30px] pb-[10px] pr-[70px] pl-[155px] ${styles.content}`}
            style={{ backgroundColor: "#F6F6F6" }}
          >
            <h2 style={{ fontSize: '16px', color: "#4D4F5C" }}>
              رقم الشكوى
            </h2>
            <div
              className="mt-[10px] flex items-center rounded-lg justify-center  h-[60px] w-[180px]"
              style={{ backgroundColor: "#237EAE" }}
            >
              <h2 style={{ fontSize: '24px', color: '#EFF9FF' }} className="font-bold">
                {complaintDetails.stateNumber}
              </h2>
            </div>
            <div
              className={"mt-[20px] gap-12 p-[20px] pr-[22px] flex justify-between rounded-lg"}
              style={{ width: "752px", backgroundColor: "#fff", boxShadow: '0px 3px 6px #0000000F' }}
            >
              <div className="flex-1 flex flex-col gap-5">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex gap-[10px]" style={{ width: "136px" }}>
                    <StoreIcon className={styles.icons}></StoreIcon>
                    <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>اسم المتجر</h2>
                  </div>
                  <div
                    className={"flex items-center justify-center rounded-lg"}
                    style={{
                      backgroundColor: "#EFF9FF",
                      boxShadow: '0px 3px 6px #0000000F',
                      height: "70px",
                      width: "180px",
                    }}
                  >
                    <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                      {complaintDetails.marketName}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="flex gap-[10px]" style={{ width: "136px" }}>
                    <Category className={styles.icons}></Category>
                    <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>التصنيف</h2>
                  </div>
                  <div
                    className={"flex items-center justify-center rounded-lg"}
                    style={{
                      backgroundColor: "#EFF9FF",
                      boxShadow: '0px 3px 6px #0000000F',
                      height: "70px",
                      width: "180px",
                    }}
                  >
                    <h2 className="flex flex-row gap-[14px]" style={{ fontSize: '18px', color: "#0077FF" }}>
                      <GiftIcon />
                      {complaintDetails.variety}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                  <div className="flex gap-[10px]" style={{ width: "136px" }}>
                    <CallIcon className={styles.icons}></CallIcon>
                    <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>الهاتف</h2>
                  </div>
                  <div
                    className={"flex items-center justify-center rounded-lg"}
                    style={{
                      backgroundColor: "#EFF9FF",
                      boxShadow: '0px 3px 6px #0000000F',
                      height: "70px",
                      width: "180px",
                    }}
                  >
                    <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                      {complaintDetails.phoneNumber}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex gap-[10px]" style={{ width: "136px" }}>
                    <StatusIcon className={styles.icons}></StatusIcon>
                    <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>الحالة</h2>
                  </div>
                  <div
                    className={"flex items-center justify-center rounded-lg"}
                    style={{
                      backgroundColor: findStateChanges.BgColor,
                      boxShadow: '0px 3px 6px #0000000F',
                      height: "70px",
                      width: "180px",
                    }}
                  >
                    <h2 style={{ fontSize: '18px', color: findStateChanges.color }}>
                      {complaintDetails.state}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-5">
                <div className="flex flex-row items-center gap-4">
                  <div
                    className="flex gap-[10px]"
                    style={{ width: "136px" }}
                  >
                    <DateIcon className={styles.icons}></DateIcon>
                    <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>تاريخ الشكوى</h2>
                  </div>
                  <div
                    className={"flex items-center justify-center rounded-lg"}
                    style={{
                      backgroundColor: "#EFF9FF",
                      boxShadow: '0px 3px 6px #0000000F',
                      height: "70px",
                      width: "180px",
                    }}
                  >
                    <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                      {complaintDetails.complaintDate}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex gap-[10px]" style={{ width: "136px" }}>
                    <TypeSupportIcon className={styles.icons}></TypeSupportIcon>
                    <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>نوع الاتصال</h2>
                  </div>
                  <div
                    className={"flex items-center justify-center rounded-lg"}
                    style={{
                      backgroundColor: "#FF00000A",
                      boxShadow: '0px 3px 6px #0000000F',
                      height: "70px",
                      width: "180px",
                    }}
                  >
                    <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                      {complaintDetails.connectionType}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex gap-[10px]" style={{ width: "136px" }}>
                    <SupportIcon className={styles.icons}></SupportIcon>
                    <h2 style={{ fontSize: '18px', color: '#011723', whiteSpace: 'nowrap' }}>عنوان الشكوى</h2>
                  </div>
                  <div
                    className={"flex items-center justify-center rounded-lg"}
                    style={{
                      backgroundColor: "#EFF9FF",
                      boxShadow: '0px 3px 6px #0000000F',
                      height: "70px",
                      width: "180px",
                    }}
                  >
                    <h2 style={{ fontSize: '18px', color: "#0077FF" }}>
                      {complaintDetails.complaintAddress}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-[10px]">
              <h2 style={{ fontSize: '18px', color: '#011723' }}>محتوى الشكوى</h2>
              <div
                className={styles.editor}
              >
                <Editor
                  toolbarHidden={false}
                  editorState={description.editorState}
                  onEditorStateChange={onEditorStateChange}
                  inDropdown={true}
                  placeholder="هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع."
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
          <div
            className="p-8 flex justify-center gap-4"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <Button
              className={"h-[55px] w-[115px] rounded-lg px-8 py-3"}
              style={{ backgroundColor: '#02466A00', border: '1px solid #02466A' }}
              type={"outline"}
              onClick={cancel}
            >
              <h2 style={{ fontSize: '24px', color: '#02466A' }}>إغلاق</h2>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCountry;
