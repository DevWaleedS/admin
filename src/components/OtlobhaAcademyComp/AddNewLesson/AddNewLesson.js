import React, { useState, useEffect, useContext } from "react";
import Button from "../../../UI/Button/Button";
import styles from "./AddNewLesson.module.css";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";
import { ReactComponent as CopyIcon } from "../../../assets/Icons/copy icon.svg";
import { ReactComponent as ActionAdd } from "../../../assets/Icons/icon-24-action-add.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/Icons/icon-24-delete.svg";
import { ReactComponent as VideoPlay } from "../../../assets/Icons/video-play.svg";
import Context from "../../../store/context";

const BackDrop = ({ onClick }) => {
  return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 pb-36  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const AddNewLesson = ({ cancel, editLessonData }) => {
  const [data, setData] = useState({
    title: '',
    vedio: '',
    image: '',
    link: 'https://www.google.com/search%A%D8%AA%D9%8',
  });
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [images, setImages] = useState([]);
  const [multiImages, setMultiImages] = useState([]);
  console.log(multiImages);
  const [copy, setCopy] = useState(false);
  console.log(editLessonData)

  const handelCopy = () => {
    navigator.clipboard.writeText('https://www.google.com/search%A%D8%AA%D9%8');
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 5000);
  }

  const emptyMultiImages = [];
  for (let index = 0; index < 5 - multiImages.length; index++) {
    emptyMultiImages.push(index);
  }
  console.log(images);
  const maxNumber = 2;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };
  const onChangeMultiImages = (imageList, addUpdateIndex) => {
    // data for submit
    setMultiImages(imageList);
  };

  useEffect(() => {
    if (editLessonData) {
      setData({
        ...data,
        title: editLessonData.title,
        vedio: editLessonData.img,
        image: editLessonData.img,
        link: 'https://www.google.com/search%A%D8%AA%D9%8',
      });
    }
  }, [editLessonData]);

  return (
    <>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-slate-50 z-20 otlobha_new_product ${styles.container}`}
        style={{ width: "1104px", height: "calc(100% - 4rem)" }}
      >
        <div className="flex h-full flex-col justify-between">
          <div
            className="flex flex-col py-[30px] pr-[27px] gap-[10px]"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            {
              editLessonData ?
                <h2 style={{ fontSize: '24px', color: '#011723' }} className="font-bold">
                  تعديل درس
                </h2>
                :
                <h2 style={{ fontSize: '24px', color: '#011723' }} className="font-bold">
                  اضافة درس
                </h2>
            }
            {
              editLessonData ?
                <p style={{ fontSize: '20px', color: '#011723' }} className="font-normal">تعديل درس لقسم الشروحات في اكاديمية اطلبها</p>
                :
                <p style={{ fontSize: '20px', color: '#011723' }} className="font-normal">اضف درس لقسم الشروحات في اكاديمية اطلبها</p>
            }
          </div>
          <div
            style={{ backgroundColor: '#F6F6F6' }}
            className={`flex-1 flex flex-col gap-8 overflow-y-scroll py-8 pr-[27px] pl-[157px] ${styles.content}`}
          >
            <div className="flex flex-row items-center">
              <label style={{ color: '#011723', fontSize: '20px' }} className="w-80 font-medium whitespace-nowrap">
                عنوان الدرس
              </label>
              <input
                className="w-full rounded-md px-5 py-4 outline-none"
                style={{ fontSize: '20px', color: '#011723', backgroundColor: '#02466A00', border: '1px solid #A7A7A7' }}
                placeholder="عنوان الفيديو"
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center">
              <h2
                style={{ color: '#011723', fontSize: '20px' }}
                className="w-80 font-medium whitespace-nowrap">
                ارفاق فيديو الدرس
              </h2>
              {
                editLessonData ?
                  (
                    <ImageUploading
                      maxNumber={1}
                      dataURLKey="data_url"
                      acceptType={["mp4",]}
                    >
                      {({
                        onImageUpload,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div
                          className="upload__image-wrapper mx-auto relative overflow-hidden"
                          style={{
                            width: "100%",
                            padding: 0 ,
                            border: 'none',
                            borderRadius: "10px",
                            strokeDasharray: "'6%2c5'",
                          }}
                          onClick={() => {
                            onImageUpload();
                          }}
                          {...dragProps}
                        >
                          <div style={{ height: '245px', borderRadius: '8px' }} className="flex flex-col items-center justify-center relative">
                            <img style={{ borderRadius: '8px' }} className="w-full h-full" src={data.image} alt="main-img" />
                            <VideoPlay className="absolute cursor-pointer" size="2em" fill="#011723"></VideoPlay>
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  ) :
                  (
                    <div className="w-full flex flex-row items-center gap-5">
                      <ImageUploading
                        maxNumber={1}
                        dataURLKey="data_url"
                        acceptType={["mp4",]}
                      >
                        {({
                          onImageUpload,
                          dragProps,
                        }) => (
                          // write your building UI
                          <div
                            className="w-full upload__image-wrapper relative h-14 flex items-center overflow-hidden rounded-md"
                            style={{
                              border: "1px solid #A7A7A7",
                              backgroundColor: "#02466A00",
                            }}
                            // onClick={() => {
                            //   onImageUpload();
                            // }}
                            {...dragProps}
                          >
                            <div className="w-full flex flex-row items-center justify-center gap-3">
                              <div style={{ width: '24px', height: '24px', backgroundColor: '#ADB5B9', borderRadius: '50%' }}>
                                <ActionAdd fontSize="18px" fill="#FFFFFF" />
                              </div>
                              <h2
                                className="outline-none p-4 cursor-pointer"
                                style={{
                                  color: "#ADB5B9",
                                  fontSize: '18px',
                                }}
                                onClick={() => {
                                  onImageUpload();
                                }}
                              >
                                {images[0]?.file?.name || "قم برفع فيديو"}
                              </h2>
                            </div>
                          </div>
                        )}
                      </ImageUploading>
                      <h2
                        className="w-36 flex justify-center items-center rounded-md px-5 py-4"
                        style={{
                          backgroundColor: '#FAFAFA00',
                          border: "1px solid #A7A7A7",
                        }}
                      >
                        0 دقيقة
                      </h2>
                    </div>
                  )
              }
            </div>
            <div className="flex flex-row items-center">
              <label className="w-80 font-medium whitespace-nowrap" style={{ color: '#011723', fontSize: '20px' }}>
                صورة تعريفية
              </label>
              <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={2}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "jpeg"]}
              >
                {({
                  onImageUpload,
                  dragProps,
                }) => (
                  // write your building UI
                  <div
                    className="upload__image-wrapper mx-auto relative overflow-hidden"
                    style={{
                      width: "100%",
                      padding: editLessonData ? 0 : '8px',
                      border:
                        images[0] || editLessonData ? 'none' : "1px dashed #02466A",
                      borderRadius: "10px",
                      strokeDasharray: "'6%2c5'",
                    }}
                    onClick={() => {
                      onImageUpload();
                    }}
                    {...dragProps}
                  >
                    <div className="image-item h-full w-full cursor-pointer">
                      {!images[0] && !editLessonData && (
                        <div className="flex flex-col justify-center items-center h-full w-full">
                          <IoMdCloudUpload size={"2em"}></IoMdCloudUpload>
                          <h2 style={{ color: '#011723', fontSize: '16px' }}>اسحب الصورة هنا</h2>
                          <h2 style={{ color: '#67747B', fontSize: '14px' }}>(سيتم قبول الصور png & jpg)</h2>
                        </div>
                      )}
                    </div>
                    {editLessonData &&
                      <div style={{ height: '90px', borderRadius: '8px' }} className="flex flex-col items-center justify-center relative">
                        <img style={{ borderRadius: '8px' }} className="w-full h-full" src={data.image} alt="main-img" />
                        <IoMdCloudUpload className="absolute cursor-pointer" size="2em" fill="#011723"></IoMdCloudUpload>
                      </div>
                    }
                  </div>
                )}
              </ImageUploading>
            </div>
            {editLessonData &&
              <div className="flex flex-row items-center justify-center gap-4 pr-[15rem]">
                <Button
                  className="font-medium flex-row-reverse"
                  style={{
                    border: '2px dashed #02466A',
                    width: '212px', height: '56px',
                    borderRadius: '4px',
                  }}
                  textStyle={{ color: "#02466A", fontSize: '20px' }}
                  svg={<ActionAdd fill="#02466A" />}
                  type={"outline"}
                >
                  إعادة رفع فيديو
                </Button>
                <Button
                  className="font-medium flex-row-reverse"
                  style={{
                    border: '1px solid #FF3838',
                    width: '212px', height: '56px',
                    borderRadius: '4px',
                  }}
                  textStyle={{ color: "#FF3838", fontSize: '20px' }}
                  svg={<DeleteIcon />}
                  type={"outline"}
                >
                  حذف الفيديو
                </Button>
              </div>
            }
            <div className="flex flex-row items-center">
              <label
                className="w-80 font-medium whitespace-nowrap"
                style={{ color: '#02466A', fontSize: '20px' }}>
                رابط الدورة <span style={{ color: '#02466A', fontSize: '16px' }}>(تلقائي)</span>
              </label>
              <div
                className="w-full flex flex-row items-center justify-between rounded-md p-4"
                style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
              >
                {copy ? (<h6 style={{ color: '#02466A', fontSize: '16px' }}>Copied</h6>) : (<CopyIcon className="cursor-pointer" fill="#02466A" onClick={() => handelCopy()} />)}
                <input
                  className="outline-none text-left"
                  style={{ width: '100%', backgroundColor: 'transparent', color: '#02466A', fontSize: '16px' }}
                  value={data.link}
                  type="text"
                  placeholder="link"
                  onChange={(e) => setData({ ...data, link: e.target.value })}
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
              className="font-medium"
              style={{ width: '186px', height: '56px', backgroundColor: `#02466A` }}
              textStyle={{ color: "#EFF9FF", fontSize: '22px' }}
              type={"normal"}
              onClick={() => {
                cancel();
                editLessonData ? setEndActionTitle("تم تعديل الدرس بنجاح") : setEndActionTitle("تم اضافة درس جديد بنجاح")
              }}
            >
              حفظ
            </Button>
            <Button
              className="font-medium"
              style={{
                borderColor: `rgba(2, 70, 106, 1)`,
                width: '186px', height: '56px'
              }}
              textStyle={{ color: "#02466A", fontSize: '22px' }}
              type={"outline"}
              onClick={cancel}
            >
              إلغاء
            </Button>
          </div>
        </div >
      </div >
    </>
  );
};

export default AddNewLesson;
