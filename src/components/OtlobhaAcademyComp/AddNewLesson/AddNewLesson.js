import React, { useState, Fragment, useContext } from 'react';
import Button from "../../../UI/Button/Button";
import styles from "./AddNewLesson.module.css";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";
import { ReactComponent as CopyIcon } from "../../../assets/Icons/copy icon.svg";
import { ReactComponent as ActionAdd } from "../../../assets/Icons/icon-24-action-add.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/Icons/icon-24-delete.svg";
import { ReactComponent as VideoPlay } from "../../../assets/Icons/video-play.svg";
import Context from "../../../store/context";
import axios from "axios";

const BackDrop = ({ onClick }) => {
  return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 pb-36  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const AddNewLesson = ({ cancel, lessonsReload, setLessonsReload, editLessonData }) => {
  const token = localStorage.getItem('token');
  const [data, setData] = useState({
    title: editLessonData?.title || '',
    video: editLessonData?.video || '',
    thumbnail: editLessonData?.thumbnail || '',
    link: editLessonData?.url,
  });
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [copy, setCopy] = useState(false);
  const [duration,setDuration] = useState(0);
  const handelCopy = () => {
    navigator.clipboard.writeText(data?.link);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 5000);
  }
  const onChange = (imageList) => {
    setImages(imageList);
  };
  const onChangeVideo = (videoList) => {
    // data for submit
    setVideos(videoList);
    let formData = new FormData();
    formData.append('video', videoList[0]?.file);
    axios
      .post('https://backend.atlbha.com/api/showVideoDuration', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status===200 ) {
          setDuration(res?.data);
        } else {
          console.log(res);
        }
      });
  };

  const addLesson = () => {
    let formData = new FormData();
    formData.append('title', data?.title);
    formData.append('video', videos[0]?.file || '');
    formData.append('thumbnail', images[0]?.file || '');
    axios
      .post('https://backend.atlbha.com/api/Admin/explainVideos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setLessonsReload(!lessonsReload);
        } else {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setLessonsReload(!lessonsReload);
        }
      });
  };

  const editLesson = () => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('title', data?.title);
    if(images.length !==0){
			formData.append('thumbnail', images[0]?.file || null);
		}
    if(videos.length !==0){
			formData.append('video', videos[0]?.file || null);
		}
    axios
      .post(`https://backend.atlbha.com/api/Admin/explainVideos/${editLessonData?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setLessonsReload(!lessonsReload);
        } else {
          setEndActionTitle(res?.data?.message?.ar);
          cancel();
          setLessonsReload(!lessonsReload);
        }
      });
  }

  return (
    <Fragment>
      <BackDrop onClick={cancel}></BackDrop>
      <div
        className={`fixed bottom-0 left-0 bg-slate-50 z-30 otlobha_new_product ${styles.container}`}
        style={{ width: "1104px", maxWidth: '100%', height: "calc(100% - 4rem)" }}
      >
        <div className="flex h-full flex-col justify-between">
          <div
            className="flex flex-col md:py-[30px] md:pr-[27px] p-4 gap-[10px]"
            style={{
              height: "135px",
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            {
              editLessonData ?
                <h2 style={{ color: '#011723' }} className="md:text-[24px] text-[20px] font-bold">
                  تعديل درس
                </h2>
                :
                <h2 style={{ color: '#011723' }} className="md:text-[24px] text-[20px] font-bold">
                  اضافة درس
                </h2>
            }
            {
              editLessonData ?
                <p style={{ color: '#011723' }} className="md:text-[20px] text-[16px] font-normal">تعديل درس لقسم الشروحات في اكاديمية اطلبها</p>
                :
                <p style={{ color: '#011723' }} className="md:text-[20px] text-[16px] font-normal">اضف درس لقسم الشروحات في اكاديمية اطلبها</p>
            }
          </div>
          <div
            style={{ backgroundColor: '#F6F6F6' }}
            className={`flex-1 flex flex-col gap-8 overflow-y-scroll md:py-8 md:pr-[27px] md:pl-[157px] p-4 ${styles.content}`}
          >
            <div className="flex md:flex-row flex-col md:items-center items-start gap-y-4">
              <label style={{ color: '#011723' }} className="md:w-80 w-full md:text-[20px] text-[18px] font-medium whitespace-nowrap">
                عنوان الدرس
              </label>
              <input
                className="w-full md:h-14 h-[45px] rounded-md px-5 py-4 outline-none"
                style={{ fontSize: '20px', color: '#011723', backgroundColor: '#02466A00', border: '1px solid #A7A7A7' }}
                placeholder="عنوان الفيديو"
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </div>
            <div className="flex md:flex-row flex-col md:items-center items-start gap-y-4">
              <h2
                style={{ color: '#011723', fontSize: '20px' }}
                className="min-w-[14.5rem] font-medium whitespace-nowrap">
                ارفاق فيديو الدرس
              </h2>
              {
                editLessonData ?
                  (
                    <>
                      <video controls width="100%">
                        <source src={editLessonData?.video} type="video/webm" />
                        <source src={editLessonData?.video} type="video/mp4"
                        />
                        Sorry, your browser doesn't support videos.
                      </video>
                      {/*<ImageUploading
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
                              padding: 0,
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
                              <img style={{ borderRadius: '8px' }} className="w-full h-full" src={data?.vedio} alt="main-img" />
                              <VideoPlay className="absolute cursor-pointer" size="2em" fill="#011723"></VideoPlay>
                            </div>
                          </div>
                        )}
                          </ImageUploading>*/}
                    </>
                  ) :
                  (
                    <div className="w-full flex flex-row items-center gap-5">
                      <ImageUploading
                        value={videos}
                        onChange={onChangeVideo}
                        maxNumber={2}
                        dataURLKey="data_url"
                        acceptType={["mp4",]}
                        allowNonImageType={true}
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
                          >
                            <div className="w-full flex flex-row items-center justify-center gap-3">
                              {!videos[0] &&
                                <div style={{ width: '24px', height: '24px', backgroundColor: '#ADB5B9', borderRadius: '50%' }}>
                                  <ActionAdd fontSize="18px" fill="#FFFFFF" />
                                </div>
                              }
                              <h2
                                className="outline-none p-4 cursor-pointer"
                                style={{
                                  color: "#ADB5B9",
                                  fontSize: '18px',
                                  maxWidth: '60%',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                                onClick={() => {
                                  onImageUpload();
                                }}
                                {...dragProps}
                              >
                                {videos[0]?.file?.name || "قم برفع فيديو"}
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
                        {duration} دقيقة
                      </h2>
                    </div>
                  )
              }
            </div>
            <div className="flex md:flex-row flex-col md:items-center items-start gap-y-4">
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
                    {images[0] && !editLessonData &&
                      <div style={{ height: '90px', borderRadius: '8px' }} className="flex flex-col items-center justify-center relative">
                        <img style={{ borderRadius: '8px' }} className="w-full h-full" src={images[0]?.data_url} alt="main-img" />
                      </div>
                    }
                    {editLessonData &&
                      <div style={{ height: '90px', borderRadius: '8px' }} className="flex flex-col items-center justify-center relative">
                        <img style={{ borderRadius: '8px' }} className="w-full h-full" src={images[0]?.data_url || data?.thumbnail} alt="main-img" />
                        <IoMdCloudUpload className="absolute cursor-pointer" size="2em" fill="#011723"></IoMdCloudUpload>
                      </div>
                    }
                  </div>
                )}
              </ImageUploading>
            </div>
            {editLessonData &&
              <div className="flex flex-row items-center justify-center gap-4 md:pr-[15rem]">
                <Button
                  className="md:w-[212px] w-full md:h-[56px] h-[45px] md:text-[20px] text-[16px] font-medium flex-row-reverse"
                  style={{
                    border: '2px dashed #02466A',
                    borderRadius: '4px',
                  }}
                  textStyle={{ color: "#02466A" }}
                  svg={<ActionAdd fill="#02466A" />}
                  type={"outline"}
                >
                  إعادة رفع فيديو
                </Button>
                <Button
                  className="md:w-[212px] w-full md:h-[56px] h-[45px] md:text-[20px] text-[16px] font-medium flex-row-reverse"
                  style={{
                    border: '1px solid #FF3838',
                    borderRadius: '4px',
                  }}
                  textStyle={{ color: "#FF3838" }}
                  svg={<DeleteIcon />}
                  type={"outline"}
                >
                  حذف الفيديو
                </Button>
              </div>
            }
            {
              editLessonData &&
              <div className="flex md:flex-row flex-col md:items-center items-start gap-y-4">
              <label
                className="w-80 font-medium whitespace-nowrap"
                style={{ color: '#02466A', fontSize: '20px' }}>
                رابط الدورة <span style={{ color: '#02466A', fontSize: '16px' }}>(تلقائي)</span>
              </label>
              <div
                className="md:h-14 h-[45px] w-full flex flex-row items-center justify-between rounded-md gap-3 p-4"
                style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
              >
                {copy ? (<h6 style={{ color: '#02466A', fontSize: '16px' }}>Copied</h6>) : (<CopyIcon className="cursor-pointer" fill="#02466A" onClick={() => handelCopy()} />)}
                <input
                  className="md:h-14 h-[45px] outline-none text-left"
                  style={{ width: '100%', backgroundColor: 'transparent', color: '#02466A', whiteSpacepace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  value={data?.link}
                  type="text"
                  disabled
                />
              </div>
            </div>
            }
          </div>
          <div
            className="md:h-[135px] h-[100px] md:p-8 p-4 flex items-center justify-center gap-4 md:bg-[#ebebeb] bg-[#f6f6f6]"
            style={{
              backgroundColor: "rgba(235, 235, 235, 1)",
            }}
          >
            <Button
              className="font-medium"
              style={{ width: '186px', height: '56px', backgroundColor: `#02466A` }}
              textStyle={{ color: "#EFF9FF", fontSize: '22px' }}
              type={"normal"}
              onClick={() => editLessonData ? editLesson() : addLesson()}
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
    </Fragment>
  );
};

export default AddNewLesson;
