import React, { useState, useEffect,useContext } from "react";
import Button from "../../../../UI/Button/Button";
import ImageUploading from "react-images-uploading";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PDF } from "../../../../assets/Icons/index";
import Context from '../../../../store/context';
import axios from "axios";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-70 z-10"
    ></div>
  );
};

const VerificationData = ({ reload, setReload, cancel, verificationInfo, editVerificationData, setVerification }) => {
  const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [images, setImages] = useState([]);
  const onChangeLogoImage = (imageList, addUpdateIndex) => {
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
        store_name: editVerificationData?.store_name,
        store_activity: editVerificationData?.activity[0]?.name,
        store_owner: editVerificationData?.user?.name,
        maroof_link: editVerificationData?.business_license,
        commercial_register: 'السجل التجاري'
      });
    } else {
      setData({
        store_name: verificationInfo?.store_name,
        store_activity: verificationInfo?.activity[0]?.name,
        store_owner: verificationInfo?.user?.name,
        maroof_link: verificationInfo?.business_license,
        commercial_register: 'السجل التجاري',
      });
    }
  }, [editVerificationData, verificationInfo]);

  const acceptVerification = () => {
    axios
      .get(`https://backend.atlbha.com/api/Admin/acceptVerification/${verificationInfo?.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          cancel();
					setReload(!reload);
          setVerification('accepted');
        } else {
          setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
        }
      });
  }

  const rejectVerification = () =>{
    axios
    .get(`https://backend.atlbha.com/api/Admin/rejectVerification/${verificationInfo?.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.data?.success === true && res?.data?.data?.status === 200) {
          cancel();
					setReload(!reload);
          setVerification('rejected');
      } else {
          setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
      }
    });
  }

  const updateVerification = () =>{
    let formData = new FormData();
		formData.append('store_name',data?.store_name);
		formData.append('store_id',editVerificationData?.id);
		formData.append('name',data?.store_owner);
		formData.append('link',data?.maroof_link);
		formData.append('file',images[0]?.file || '');
		formData.append('activity_id[0]',data?.store_activity);
    
    axios
    .post("https://backend.atlbha.com/api/Admin/verification_update",formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.data?.success === true && res?.data?.data?.status === 200) {
          cancel();
					setReload(!reload);
          setVerification('edit');
      } else {
          setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
      }
    });
  }

  return (
    <>
      <BackDrop onClick={cancel} />
      <div
        className="absolute flex flex-col top-5 translate-x-2/4  right-2/4 z-20 rounded-lg overflow-hidden"
        style={{ width: "60.25rem", maxWidth: "90%" }}
      >
        <div
          className="h-16 w-full flex items-center justify-between py-4 px-4 trader_alert"
          style={{ backgroundColor: editVerificationData ? "#FF9F1A" : "#1DBBBE" }}
        >
          {editVerificationData ?
            (<h2 style={{ color: '#ECFEFF' }} className="md:text-[22px] text-[18px] font-medium text-center flex-1">تعديل طلب توثيق متجر</h2>) :
            (<h2 style={{ color: '#ECFEFF' }} className="md:text-[22px] text-[18px] font-medium text-center flex-1">بيانات طلب توثيق متجر</h2>)
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
        <div className="flex-1 flex flex-col md:px-[98px] md:py-[48px] px-4 py-[30px] gap-[24px] bg-white text-right">
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723' }} className="md:text-[20px] text-[16px]" htmlFor="activity_store">نشاط المتجر</label>
            <input
              id="activity_store"
              className="md:text-[20px] text-[16px] py-[14px] px-[24px] rounded-md outline-none"
              style={{ backgroundColor: '#FAFAFA', color: '#67747B' }}
              type="text"
              placeholder="ملابس"
              value={data.store_activity}
              onChange={(e) => setData({ ...data, store_activity: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723' }} className="md:text-[20px] text-[16px]" htmlFor="owner">المالك</label>
            <input
              id="owner"
              className="md:text-[20px] text-[16px] py-[14px] px-[24px] rounded-md outline-none"
              style={{ backgroundColor: '#FAFAFA', color: '#67747B' }}
              type="text"
              placeholder="خالد محمد"
              value={data.store_owner}
              onChange={(e) => setData({ ...data, store_owner: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723' }} className="md:text-[20px] text-[16px]" htmlFor="store_name">اسم المتجر</label>
            <input
              id="store_name"
              className="md:text-[20px] text-[16px] py-[14px] px-[24px] rounded-md outline-none"
              style={{ backgroundColor: '#FAFAFA', color: '#67747B' }}
              type="text"
              placeholder="أمازون"
              value={data.store_name}
              onChange={(e) => setData({ ...data, store_name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723' }} className="md:text-[20px] text-[16px]">وثيقة العمل الحر/ السجل التجاري</label>
            <ImageUploading
              value={images}
              onChange={onChangeLogoImage}
              maxNumber={1}
              dataURLKey="data_url"
              acceptType={["pdf", "jpg", "png", "jpeg"]}
              disabled={true}
            >
              {({
                imageList, onImageUpload,
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
                      <div className="flex-1 flex flex-row items-center md:justify-start justify-between gap-2">
                        <h2 className="md:text-[20px] text-[16px] whitespace-nowrap" style={{ color: '#67747B' }}>السجل التجاري</h2>
                        <img src={PDF} alt="pdf-icon" />
                      </div>
                      <h2 className="md:text-[16px] text-[14px] md:flex hidden" style={{ color: '#0099FB' }}>تحميل السجل التجاري</h2>
                    </div>
                  </div>
                </div>
              )}
            </ImageUploading>
            <h2 className="md:text-[16px] text-[14px] md:hidden flex" style={{ color: '#0099FB' }}>تحميل السجل التجاري</h2>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label style={{ color: '#011723' }} className="md:text-[20px] text-[16px]" htmlFor="link">رابط منصة معروف</label>
            <input
              id="link"
              className="md:text-[20px] text-[16px] py-[14px] px-[24px] rounded-md outline-none"
              style={{ backgroundColor: '#FAFAFA', color: '#0099FB' }}
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
                onClick={updateVerification}
                type={"normal"}
                style={{ backgroundColor: '#1DBBBE', color: '#F7FCFF' }}
                textStyle={{ color: "#F7FCFF" }}
                className="md:h-[60px] h-[45px] md:text-[18px] text-[16px] text-center w-full py-4 rounded-none font-medium"
              >
                تعديل الطلب
              </Button>
              <Button
                onClick={() => {
                  cancel();
                }}
                type={"outline"}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #011723' }}
                textStyle={{ color: "#011723" }}
                className="md:h-[60px] h-[45px] md:text-[18px] text-[16px] text-center w-full py-4 rounded-none font-medium"
              >
                الغاء التعديل
              </Button>
            </div>
          )
          :
          (
            <div className="flex flex-row items-center">
              <Button
                onClick={acceptVerification}
                type={"normal"}
                style={{ backgroundColor: '#1DBBBE' }}
                textStyle={{ color: "#F7FCFF" }}
                className="md:h-[60px] h-[45px] md:text-[18px] text-[16px] text-center w-full py-4 rounded-none font-medium"
              >
                قبول التوثيق
              </Button>
              <Button
                onClick={rejectVerification}
                type={"outline"}
                textStyle={{ color: "#011723" }}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #011723' }}
                className="md:h-[60px] h-[45px] md:text-[18px] text-[16px] text-center w-full py-4 rounded-none font-medium"
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
