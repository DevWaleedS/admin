import React, { useState, useEffect, useContext } from "react";
import styles from "./AddNewCourse.module.css";
import { GoArrowRight } from "react-icons/go";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "../../../UI/Button/Button";
import { IoAddCircleSharp } from "react-icons/io5";
import AddUnit from "./AddUnit/AddUnit";
import { ReactComponent as CopyIcon } from "../../../assets/Icons/copy icon.svg";
import { ReactComponent as ClearSquare } from "../../../assets/Icons/icon-24-actions-clear_square.svg";
import { ReactComponent as Arrow } from "../../../assets/Icons/icon-24-chevron_down.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/Icons/icon-24-delete.svg";
import { ReactComponent as PlayVideo } from "../../../assets/Icons/video-play.svg";
import { ReactComponent as PDFIcon } from "../../../assets/Icons/pfd.svg";
import { NotificationContext } from "../../../store/NotificationProvider";
import Context from '../../../store/context';
import axios from "axios";

const tags = ['إدارة المخاطر', 'الخطة الاستراتيجية لادارة المتجر', 'تنظيم عمليات المتجر', 'شراء المنتجات وإدارة المخزون', 'الخطة الاستراتيجية لادارة المتجر', 'تنظيم عمليات المتجر'];

const AddNewCourse = ({ coursesReload,setCoursesReload,cancel, editData, addNewLesson }) => {
  const token = localStorage.getItem('token');
  const [data, setData] = useState({
    name: editData?.name || '',
    description: editData?.description || '',
    minute: editData?.duration || '',
    hour: editData?.duration || '',
    image: editData?.image || '',
    tags: editData?.tags || [],
    link: 'https://www.google.com/search?q=%D8%B1%D8%A7%D8%A8%D8%B7+%D8%AA%D9%8',
  });
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [copy, setCopy] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const NotificationStore = useContext(NotificationContext);
  const { setNotificationTitle, setActionTitle } = NotificationStore;
  const [description, setDescription] = useState({
    htmlValue: "<h1></h1>\n",
    editorState: EditorState.createEmpty(),
  });
  const [tagsSelected, setTagsSelected] = useState([]);
  const [images, setImages] = useState([]);
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

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };
  const handelCopy = () => {
    navigator.clipboard.writeText('https://www.google.com/search?q=%D8%B1%D8%A7%D8%A8%D8%B7+%D8%AA%D9%8');
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 5000);
  }

  const AddCourse = () =>{
    let formData = new FormData();
		formData.append('name',data?.name);
		formData.append('description',data?.description);
		formData.append('duration',data?.duration);
		formData.append('tags',data?.tags);
    formData.append('image',images[0]?.file || '');

		axios
			.post("https://backend.atlbha.com/api/Admin/course", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setCoursesReload(!coursesReload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setCoursesReload(!coursesReload);
				}
			});
  }

  return (
    <div className='absolute md:pl-[140px] md:pr-5 md:py-[43px] top-0 right-0 z-30 md:pb-36 w-full md:bg-[#fafafa] bg-[#FFFFFF] otlobha_acadmic'>
      {showAddUnit && (
        <AddUnit
          cancel={() => {
            setShowAddUnit(false);
          }}
          cancelAll={cancel}
        ></AddUnit>
      )}
      <div className="flex justify-between items-center mb-2 md:p-0 px-4">
        <div className="flex">
          <div className={`flex items-center gap-2 `}>
            <div
              onClick={cancel}
              className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}
            >
              <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
            </div>

            <h2 className="md:text-[18px] text-[15px] font-medium md:ml-4 ml-2"> الرئيسية </h2>
          </div>

          <h2 className="md:text-[18px] text-[15px] font-medium md:ml-4 ml-2"> / أكاديمية اطلبها </h2>
          {
            editData ?
              (
                <h3 className="md:text-[18px] text-[15px] font-medium" style={{ color: "#67747B" }}>/ تعديل دورة تدريبية</h3>
              ) :
              (
                <h3 className="md:text-[18px] text-[15px] font-medium" style={{ color: "#67747B"}}>/ اضافة دورة تدريبية</h3>
              )
          }

        </div>
      </div>
      <div className="flex flex-col gap-5 mt-[42px] md:pr-[78px] p-4">
        <div className="flex flex-col gap-[10px]">
          <label className="md:text-[18px] text-[16px]" style={{ color: '#011723'}}>
            اسم الدورة التدريبية
          </label>
          <input
            className="w-full md:h-14 h-[45px] outline-none shadow-sm rounded-lg p-4"
            style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>
            الوصف
          </label>
          <div
            className={styles.editor}
          >
            <Editor
              toolbarHidden={false}
              editorState={description.editorState}
              onEditorStateChange={onEditorStateChange}
              inDropdown={true}
              placeholder="الرسالة النصية"
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

        <div className="flex flex-col gap-[10px]">
          <h2 className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>محاور الدورة TAGS</h2>
          <div
            style={{ backgroundColor: "#F4F5F7", border: "1px solid #67747B33", }}
            className="flex flex-row items-center flex-wrap md:gap-6 gap-3 md:p-5 p-3 rounded-lg"
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                style={{ color: '#67747B', backgroundColor: '#EBEBEB', borderRadius: '18px' }}
                className="md:text-[18px] text-[16px] px-3 py-2 flex flex-row items-center gap-4"
              >
                {tag}
                {editData && <ClearSquare className={styles.clear_icon} />}
              </span>

            ))}

          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex md:flex-row flex-col gap-1">
            <h2 className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>مدة الدورة</h2>
            <p className="md:text-[16px] text-[14px]" style={{ color: '#ADB5B9'}}>(يتم احتسابها تلقائياً بحسب مدة الفديويهات الخاصة بالدورة)</p>
          </div>
          <div className="flex">
            <input
              className="w-full flex-1 p-4 outline-none rounded-tr-lg rounded-br-lg"
              style={{
                color: '#67747B',
                backgroundColor: "#F4F5F7",
                border: "1px solid #67747B33",
              }}
              type="text"
              placeholder="دقيقة"
              value={data.minute}
              onChange={(e) => setData({ ...data, minute: e.target.value })}
            />
            <input
              className="w-full flex-1 p-4 outline-none rounded-tl-lg rounded-bl-lg"
              style={{
                color: '#67747B',
                backgroundColor: "#F4F5F7",
                border: "1px solid #67747B33",
              }}
              type="text"
              placeholder="ساعة"
              value={data.hour}
              onChange={(e) => setData({ ...data, hour: e.target.value })}
            />
          </div>
        </div>
        {
          editData &&
          <div className="mb-[80px] mt[33px] flex flex-col gap-4">
            <h6 className="md:text-[24px] text-[20px]" style={{ fontWeight: '500', color: '#000000' }}>دروس الدورة</h6>
            <div className="flex flex-col">
              <div
                style={{ width: '100%', backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
                className="relative md:h-[56px] h-[45px]"
              >
                <div
                  className="flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
                  onClick={() => { setOpenMenu(true); setOpenMenu2(false) }}>
                  <div className="flex flex-row items-center gap-2">
                    <h6 className="md:text-[18px] text-[16px]" style={{ fontWeight: '500', color: '#000000' }}>الوحدة الأولى</h6>
                    <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>(4 دروس)</span>
                    <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>(25 دقيقة)</span>
                  </div>
                  <Arrow className={styles.arrow_icon} />
                </div>
                {openMenu &&
                  <div
                    style={{ backgroundColor: '#F4F5F7' }}
                    className="flex flex-col gap-5 absolute z-10 left-0 top-[55px] w-full p-5"
                    onClick={() => setOpenMenu(false)}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <PlayVideo />
                        <h6 style={{ fontWeight: '500', color: '#011723' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">المقدمة</h6>
                        <span className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>4:00</span>
                      </div>
                      <DeleteIcon className="cursor-pointer"
                        onClick={() => {
                          setNotificationTitle('سيتم حذف الدرس');
                          setActionTitle('تم حذف الدرس بنجاح');

                        }} />
                    </div>
                    {[1, 2, 3].map((_item, index) => (
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                          <PlayVideo />
                          <h6 style={{ fontWeight: '500', color: '#011723' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">مصطلحات تعريفيقة</h6>
                          <span className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>10:05</span>
                        </div>
                        <DeleteIcon className="cursor-pointer"
                          onClick={() => {
                            setNotificationTitle('سيتم حذف الدرس');
                            setActionTitle('تم حذف الدرس بنجاح');
                          }} />
                      </div>
                    ))}
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <PDFIcon />
                        <h6 style={{ fontWeight: '500', color: '#0077FF' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">ملفات الوحدة</h6>
                      </div>
                      <h6 className="md:text-[18px] text-[16px]" style={{ color: '#0077FF', cursor: 'pointer' }}>تحميل</h6>
                    </div>
                  </div>
                }
              </div>
              <div
                style={{ width: '100%', height: '56px', backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
                className="relative md:h-[56px] h-[45px]"
              >
                <div
                  className="flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
                  onClick={() => setOpenMenu2(true)}>
                  <div className="flex flex-row items-center gap-2">
                    <h6 className="md:text-[18px] text-[16px]" style={{ fontWeight: '500', color: '#000000' }}>الوحدة الثانية</h6>
                    <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>(4 دروس)</span>
                    <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>(25 دقيقة)</span>
                  </div>
                  <Arrow className={styles.arrow_icon} />
                </div>
                {openMenu2 &&
                  <div
                    style={{ backgroundColor: '#F4F5F7' }}
                    className="flex flex-col gap-5 absolute z-10 left-0 md:top-[55px] top-[45px] w-full p-5"
                    onClick={() => setOpenMenu2(false)}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <PlayVideo />
                        <h6 style={{ fontWeight: '500', color: '#011723' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">المقدمة</h6>
                        <span className="md:text-[18px] text-[16px]" style={{ fontSize: '18px', color: '#011723' }}>4:00</span>
                      </div>
                      <DeleteIcon className="cursor-pointer"
                        onClick={() => {
                          setNotificationTitle('سيتم حذف الدرس');
                          setActionTitle('تم حذف الدرس بنجاح');
                        }} />
                    </div>
                    {[1, 2, 3].map((_item, index) => (
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                          <PlayVideo />
                          <h6 style={{ fontWeight: '500', color: '#011723' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">مصطلحات تعريفيقة</h6>
                          <span className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>10:05</span>
                        </div>
                        <DeleteIcon className="cursor-pointer"
                          onClick={() => {
                            setNotificationTitle('سيتم حذف الدرس');
                            setActionTitle('تم حذف الدرس بنجاح');
                          }} />
                      </div>
                    ))}
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <PDFIcon />
                        <h6 style={{ fontWeight: '500', color: '#0077FF' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">ملفات الوحدة</h6>
                      </div>
                      <h6 className="md:text-[18px] text-[16px]" style={{ color: '#0077FF', cursor: 'pointer' }}>تحميل</h6>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
        <div className="flex md:flex-row flex-col md:items-center items-start md:gap-16 gap-y-4">
          <label className="md:text-[18px] text-[16px] font-medium whitespace-nowrap" style={{ color: '#011723' }}>
            الصورة التعريفية
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
                  padding: editData ? 0 : '8px',
                  border:
                    images[0] || editData ? 'none' : "1px dashed #02466A",
                  borderRadius: "10px",
                  strokeDasharray: "'6%2c5'",
                }}
                onClick={() => {
                  onImageUpload();
                }}
                {...dragProps}
              >
                <div className="image-item h-full w-full cursor-pointer">
                  {!images[0] && !editData && (
                    <div className="flex flex-col justify-center items-center gap-[5px] h-full w-full">
                      <IoMdCloudUpload size={"2em"}></IoMdCloudUpload>
                      <h2 style={{ color: '#011723', fontSize: '16px' }}>اسحب الصورة هنا</h2>
                      <h2 style={{ color: '#67747B', fontSize: '14px' }}>(سيتم قبول الصور png & jpg)</h2>
                    </div>
                  )}
                  {images[0] && !editData && 
                  <div style={{ height: '90px', borderRadius: '8px' }} className="flex flex-col items-center justify-center">
                    <img style={{ borderRadius: '8px' }} className="w-full h-full" src={images[0]?.data_url || data.image} alt="main-img" />
                  </div>
                  }
                </div>
                {editData &&
                  <div style={{ height: '90px', borderRadius: '8px' }} className="flex flex-col items-center justify-center relative">
                    <img style={{ borderRadius: '8px' }} className="w-full h-full" src={images[0]?.data_url || data.image} alt="main-img" />
                    <div className="absolute flex flex-col justify-center items-center gap-[5px] h-full w-full cursor-pointer">
                      <IoMdCloudUpload fill="#F3FCFD" size="2em"></IoMdCloudUpload>
                      <h2 style={{ color: '#F3FCFD', fontSize: '16px' }}>اسحب الصورة هنا</h2>
                      <h2 style={{ color: '#F3FCFD', fontSize: '14px' }}>(سيتم قبول الصور png & jpg)</h2>
                    </div>
                  </div>
                }
              </div>
            )}
          </ImageUploading>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="md:text-[20px] text-[18px]" style={{ color: '#02466A'}}>
            رابط الدورة
            <span className="md:text-[16px] text-[14px]" style={{ color: '#02466A'}}> (تلقائي) </span>
          </label>
          <div
            className="flex flex-row items-center justify-between rounded-md gap-3 p-4"
            style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
          >
            {copy ? (<h6 style={{ color: '#02466A', fontSize: '16px' }}>Copied</h6>) : (<CopyIcon className="cursor-pointer" fill="#02466A" onClick={() => handelCopy()} />)}

            <input
              className="outline-none text-left md:text-[16px] text-[14px]"
              style={{ width: '100%', backgroundColor: 'transparent', color: '#02466A',whiteSpacepace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}
              value={data.link}
              type="text"
              placeholder=""
              onChange={(e) => setData({ ...data, link: e.target.value })}
            />
          </div>
        </div>
        {editData &&
          <div className="flex mt-10 gap-4">
            <Button
              style={{ backgroundColor: "#02466A" }}
              textStyle={{ color: "#EFF9FF" }}
              className={"md:w-[474px] w-full md:h-[64px] h-[45px] md:text-[20px] text-[18px] flex-1"}
              type={"normal"}
              svg={<IoAddCircleSharp fontSize="1.5rem" color={"#fff"} />}
              onClick={() => {
                setShowAddUnit(true);
              }}
            >
              إضافة وحدة
            </Button>
            <Button
              style={{ borderColor: "#02466A" }}
              textStyle={{ color: "#02466A" }}
              className={"md:w-[474px] w-full md:h-[64px] h-[45px] md:text-[20px] text-[18px] flex-1"}
              type={"outline"}
              svg={<IoAddCircleSharp fontSize="1.5rem" color={"#02466A"} />}
              onClick={() => {
                addNewLesson(true);
              }}
            >
              إضافة درس
            </Button>
          </div>
        }
        {
          editData ?
            (
              <Button
                style={{ width: '100%', backgroundColor: "#1DBBBE" }}
                textStyle={{ color: "#EFF9FF" }}
                className={"md:h-[64px] h-[45px] md:text-[20px] text-[18px] flex-1"}
                type={"normal"}
                onClick={() => {
                  cancel();
                }}
              >
                حفظ التعديلات
              </Button>
            ) :
            (
              <div className="flex mt-10 gap-4">
                <Button
                  style={{ backgroundColor: "#02466A" }}
                  textStyle={{ color: "#EFF9FF"}}
                  className={"md:w-[474px] w-full md:h-[64px] h-[45px] md:text-[20px] text-[18px] flex-1"}
                  type={"normal"}
                  svg={<IoAddCircleSharp fontSize="1.5rem" color={"#fff"} />}
                  onClick={() => {
                    setShowAddUnit(true);
                  }}
                >
                  إضافة وحدة
                </Button>
                <Button
                  style={{ borderColor: "#02466A" }}
                  textStyle={{ color: "#02466A"}}
                  className={"md:w-[474px] w-full md:h-[64px] h-[45px] md:text-[20px] text-[18px] flex-1"}
                  type={"outline"}
                  onClick={cancel}
                >
                  إلغاء
                </Button>
              </div>
            )
        }

      </div>
    </div>
  );
};
export default AddNewCourse;