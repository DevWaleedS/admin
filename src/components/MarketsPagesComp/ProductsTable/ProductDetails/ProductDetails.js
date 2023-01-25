import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Cam1 from '../../../../assets/images/cam1.png';
import Cam2 from '../../../../assets/images/cam2.png';
import Cam3 from '../../../../assets/images/cam3.png';
const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10"
    ></div>
  );
};

const ProductDetails = ({ cancel, details }) => {
  const [subject,setSubject] = useState("");
  const [description, setDescription] = useState({
    htmlValue: "<h1></h1>\n",
    editorState: EditorState.createEmpty(),
  });

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
  return (
    <>
      <BackDrop />
      <div
        className="fixed trader_alert   flex flex-col top-[55%] translate-x-2/4 -translate-y-2/4 right-2/4 z-40 rounded-2xl overflow-hidden"
        style={{ width: "51.25rem", maxHeight: "600px" }}
      >
        <div
          className="h-16 w-full flex items-center justify-between py-4 px-4"
          style={{ backgroundColor: "#1DBBBE", }}
        >
          <h2 style={{ fontSize:'22px',color:'#ECFEFF' }} className="font-medium text-center flex-1">{details.product}</h2>
          <IoMdCloseCircleOutline
            width="20px"
            height="20px"
            size={"1.25rem"}
            color={"#fff"}
            className={"cursor-pointer"}
            onClick={cancel}
          ></IoMdCloseCircleOutline>
        </div>
        <div className="flex-1 bg-white px-[98px] pt-[72px] pb-[46px] overflow-y-auto">
            <div className="flex flex-row gap-[18px]">
              <div className="flex flex-col items-center justify-center" style={{ width:'180px',height:'226px',border:'1px solid #EEEEEE' }}>
                  <img className="w-full" src={Cam1} alt="main-img" />
              </div>
              <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center justify-center" style={{ width:'80px',height:'65px',border:'1px solid #EEEEEE' }}>
                    <img className="w-full" src={Cam2} alt="small-img" />
                  </div>
                  <div className="flex flex-col items-center justify-center" style={{ width:'80px',height:'65px',border:'1px solid #EEEEEE' }}>
                    <img className="w-full" src={Cam3} alt="small-img" />
                  </div>
                  <div className="flex flex-col items-center justify-center" style={{ width:'80px',height:'65px',border:'1px solid #EEEEEE' }}>
                    <img className="w-full" src={Cam1} alt="small-img" />
                  </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] mt-[38px]">
                <h5 style={{ fontSize:'20px',color:'#011723',fontWeight:'500' }}>وصف المنتج</h5>
                <div style={{ padding:'20px',border:'1px solid #EEEEEE' }}>
                  <p style={{ fontSize:'18px',color:'#011723' }}>
                      هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق
                  </p>
                </div>
            </div>
            <div className="flex flex-col gap-[17px] mt-[38px]">
                <span className="flex flex-col items-center justify-center" style={{ 
                  fontSize:'20px',
                  fontWeight:'500',
                  color:'#011723',
                  width:'180px',
                  height: '50px',
                  padding:'11px 45px', 
                  backgroundColor:'#B6BE341A',
                  borderRadius:'25px'
                 }}>
                    الكترونيات
                 </span>
                <div className="flex flex-row items-center gap-4">
                    <span className="flex flex-col items-center justify-center" style={{ 
                      fontSize:'20px',
                      fontWeight:'500',
                      color:'#011723',
                      width:'115px',
                      height: '50px',
                      padding:'11px 30px', 
                      backgroundColor:'#1DBBBE1A',
                      borderRadius:'25px'
                    }}>
                        كاميرا
                    </span>
                    <span className="flex flex-col items-center justify-center" style={{ 
                      fontSize:'20px',
                      fontWeight:'500',
                      color:'#011723',
                      width:'115px',
                      height: '50px',
                      padding:'11px 30px', 
                      backgroundColor:'#1DBBBE1A',
                      borderRadius:'25px'
                    }}>
                        سوني
                    </span>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
