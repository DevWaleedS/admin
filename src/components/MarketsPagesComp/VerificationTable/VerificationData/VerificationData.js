import React, { useState, useEffect } from "react";
import Button from "../../../../UI/Button/Button";
import ImageUploading from "react-images-uploading";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PDF } from "../../../../assets/Icons/index";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10"
    ></div>
  );
};

const VerificationData = ({ cancel, verificationInfo, editVerificationData, setVerification }) => {
  const [images, setImages] = useState([]);
  const onChangeLogoImage = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList);
    setImages(imageList);
  };
  const [data, setData] = useState({
    store_name: '',
    store_activity: '',
    store_owner: '',
    maroof_link: '',
    commercial_register: ''
  })
  useEffect(() => {
    if (editVerificationData) {
      setData({
        store_name: editVerificationData.store,
        store_activity: editVerificationData.activity,
        store_owner: "محمد خالد",
        maroof_link: "https://maroof.storename.sa/",
        commercial_register: 'السجل التجاري'
      });
    } else {
      setData({
        store_name: verificationInfo.store,
        store_activity: verificationInfo.activity,
        store_owner: "علوي العيدروس",
        maroof_link: "https://maroof.storename.sa/",
        commercial_register: 'السجل التجاري',
      });
    }
  }, [editVerificationData, verificationInfo]);

  return (
    <>
      <BackDrop onClick={cancel} />
      <div
        className="absolute flex flex-col top-5 translate-x-2/4  right-2/4 z-20 rounded-lg overflow-hidden"
        style={{ width: "60.25rem" }}
      >
        <div
          className="h-16 w-full flex items-center justify-between py-4 px-4 trader_alert"
          style={{ backgroundColor: editVerificationData ? "#FF9F1A" : "#1DBBBE" }}
        >
          {editVerificationData ?
            (<h2 style={{ color: '#ECFEFF',fontSize:'22px' }} className="font-medium text-center flex-1">تعديل طلب توثيق متجر</h2>) :
            (<h2 style={{ color: '#ECFEFF',fontSize:'22px' }} className="font-medium text-center flex-1">بيانات طلب توثيق متجر</h2>)
          }
          <IoMdCloseCircleOutline
            width="20px"
            height="20px"
            size={"1.25rem"}
            color={"#fff"}
            className={"cursor-pointer"}
            onClick={cancel}
          ></IoMdCloseCircleOutline>
        </div>
        <div className="flex-1 flex flex-col px-[98px] py-[48px] gap-[24px] bg-white text-right">
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723',fontSize:'20px' }} htmlFor="activity_store">نشاط المتجر</label>
            <input
              id="activity_store"
              className="py-[14px] px-[24px] rounded-md outline-none"
              style={{ backgroundColor: '#FAFAFA', color: '#67747B',fontSize:'20px' }}
              type="text"
              placeholder="ملابس"
              value={data.store_activity}
              onChange={(e) => setData({ ...data, store_activity: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723',fontSize:'20px' }} htmlFor="owner">المالك</label>
            <input
              id="owner"
              className="py-[14px] px-[24px] rounded-md outline-none"
              style={{ backgroundColor: '#FAFAFA', color: '#67747B',fontSize:'20px' }}
              type="text"
              placeholder="خالد محمد"
              value={data.store_owner}
              onChange={(e) => setData({ ...data, store_owner: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723',fontSize:'20px' }} htmlFor="store_name">اسم المتجر</label>
            <input
              id="store_name"
              className="py-[14px] px-[24px] rounded-md outline-none"
              style={{ backgroundColor: '#FAFAFA', color: '#67747B',fontSize:'20px' }}
              type="text"
              placeholder="أمازون"
              value={data.store_name}
              onChange={(e) => setData({ ...data, store_name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723',fontSize:'20px' }}>وثيقة العمل الحر/ السجل التجاري</label>
            <ImageUploading
              value={images}
              onChange={onChangeLogoImage}
              maxNumber={1}
              dataURLKey="data_url"
              acceptType={["pdf", "jpg", "png", "jpeg"]}
              disabled={true}
            >
              {({
                onImageUpload,
              }) => (
                <div
                  className="upload__image-wrapper relative"
                >
                  <div className="image-item w-full ">
                    <div
                      onClick={() => {
                        onImageUpload();
                      }}
                      className="flex cursor-pointer justify-between items-center p-4 mt-2"
                      style={{
                        backgroundColor: "#FAFAFA",
                      }}
                    >
                      <div className="flex flex-row items-center gap-2">
                          <h2 style={{ color: '#67747B',fontSize:'20px' }}>السجل التجاري</h2>
                          <img src={PDF} alt="pdf-icon" />
                      </div>
                      <h2 style={{ color: '#0099FB',fontSize:'16px' }}>تحميل السجل التجاري</h2>
                    </div>
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723',fontSize:'20px' }} htmlFor="link">رابط منصة معروف</label>
            <input
              id="link"
              className="py-[14px] px-[24px] rounded-md outline-none"
              style={{ backgroundColor: '#FAFAFA', color: '#0099FB',fontSize:'20px' }}
              type="text"
              placeholder="https://maroof.amazon.sa/"
              value={data.maroof_link}
              onChange={(e) => setData({ ...data, maroof_link: e.target.value })}
            />
          </div>
        </div>
        {editVerificationData ?
          (
            <div className="flex flex-row items-center">
              <Button
                onClick={() => {
                  setVerification('edit');
                  cancel();
                }}
                type={"normal"}
                style={{ backgroundColor: '#1DBBBE', color: '#F7FCFF' }}
                textStyle={{ color: "#F7FCFF", fontSize: '18px' }}
                className={"text-center w-full py-4 rounded-none font-medium"}
              >
                تعديل الطلب
              </Button>
              <Button
                onClick={() => {
                  cancel();
                }}
                type={"outline"}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #011723' }}
                textStyle={{ color: "#011723", fontSize: '18px' }}
                className={"text-center w-full py-4 rounded-none font-medium"}
              >
                الغاء التعديل
              </Button>
            </div>
          )
          :
          (
            <div className="flex flex-row items-center">
              <Button
                onClick={() => {
                  setVerification('accepted');
                  cancel();
                }}
                type={"normal"}
                style={{ backgroundColor: '#1DBBBE' }}
                textStyle={{ color: "#F7FCFF", fontSize: '18px' }}
                className={"text-center w-full py-4 rounded-none font-medium"}
              >
                قبول التوثيق
              </Button>
              <Button
                onClick={() => {
                  setVerification('rejected');
                  cancel();
                }}
                type={"outline"}
                textStyle={{ color: "#011723", fontSize: '18px' }}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #011723' }}
                className={"text-center w-full py-4 rounded-none font-medium"}
              >
                رفض التوثيق
              </Button>
            </div>
          )}
      </div>
    </>
  );
};

export default VerificationData;
