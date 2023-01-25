import React, { useState, useEffect,useContext } from "react";
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
import MainImage from '../../../assets/images/drop_shipping_img.png';
import { NotificationContext } from "../../../store/NotificationProvider";

const tags = ['إدارة المخاطر', 'الخطة الاستراتيجية لادارة المتجر', 'تنظيم عمليات المتجر', 'شراء المنتجات وإدارة المخزون', 'الخطة الاستراتيجية لادارة المتجر', 'تنظيم عمليات المتجر'];

const AddNewCourse = ({ cancel, editData }) => {
  const [data, setData] = useState({
    name: '',
    description: '',
    minute: '',
    hour: '',
    image: '',
    link: 'https://www.google.com/search?q=%D8%B1%D8%A7%D8%A8%D8%B7+%D8%AA%D9%8',
  });
  console.log(editData);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [copy, setCopy] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const NotificationStore = useContext(NotificationContext);
  const { setNotificationTitle } = NotificationStore;
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
	const [images, setImages] = useState([]);
	console.log(description);
	const onEditorStateChange = (editorValue) => {
		const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()));
		console.log(editorStateInHtml);

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

  useEffect(() => {
    if (editData) {
      setData({
        ...data,
        name: editData.title,
        describe: 'دورة في مجال التجارة الالكترونية المتخصصة في دروب شيبينج تستطيع من خلالها تعلم مهارات البيع والتسويق باحترافية عالية',
        minute: '20 دقيقة',
        hour: '8 ساعات',
        image: MainImage,
        link: 'https://www.google.com/search?q=%D8%B1%D8%A7%D8%A8%D8%B7+%D8%AA%D9%8',
      });
    }
  }, [editData]);

  return (
    <div className='absolute pl-[140px] pr-5 py-[43px]  top-0 right-0  z-10  pb-36  w-full otlobha_acadmic' style={{ backgroundColor: '#fafafa' }}>
      {showAddUnit && (
        <AddUnit
          cancel={() => {
            setShowAddUnit(false);
          }}
          cancelAll={cancel}
        ></AddUnit>
      )}
      <div className="flex justify-between items-center mb-2">
        <div className="flex">
          <div className={`flex items-center gap-2 `}>
            <div
              onClick={cancel}
              className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}
            >
              <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
            </div>

	return (
		<div className='absolute pl-[140px] pr-5 py-[43px]  top-0 right-0  z-10  pb-36  w-full otlobha_acadmic' style={{ backgroundColor: '#fafafa' }}>
			{showAddUnit && (
				<AddUnit
					cancel={() => {
						setShowAddUnit(false);
					}}
					cancelAll={cancel}
				></AddUnit>
			)}
			<div className='flex justify-between items-center mb-2'>
				<div className='flex'>
					<div className={`flex items-center gap-2 `}>
						<div onClick={cancel} className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}>
							<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
						</div>
          <h2 style={{ fontSize: '18px' }} className="font-medium ml-4"> / أكاديمية اطلبها </h2>
          {
            editData ?
              (
                <h3 className="font-medium" style={{ color: "#67747B", fontSize: '18px' }}>/ تعديل دورة تدريبية</h3>
              ) :
              (
                <h3 className="font-medium" style={{ color: "#67747B", fontSize: '18px' }}>/ اضافة دورة تدريبية</h3>
              )
          }

        </div>
      </div>
      <div className="flex flex-col gap-5 mt-[42px] pr-[78px]">
        <div className="flex flex-col gap-[10px]">
          <label style={{ color: '#011723', fontSize: '18px' }}>
            اسم الدورة التدريبية
          </label>
          <input
            className="w-full outline-none shadow-sm rounded-lg p-4"
            style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label style={{ color: '#011723', fontSize: '18px' }}>
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
          <h2 style={{ color: '#011723', fontSize: '18px' }}>محاور الدورة TAGS</h2>
          <div
            style={{ backgroundColor: "#F4F5F7", border: "1px solid #67747B33", }}
            className="flex flex-row items-center flex-wrap gap-6 p-5 rounded-lg"
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                style={{ fontSize: '18px', color: '#67747B', backgroundColor: '#EBEBEB', borderRadius: '18px' }}
                className="px-3 py-2 flex flex-row items-center gap-4"
              >
                {tag}
                {editData && <ClearSquare className={styles.clear_icon} />}
              </span>

            ))}

          </div>
        </div>
        <div className="flex flex-col gap-[10xp]">
          <div className="flex flex-row gap-1">
            <h2 style={{ color: '#011723', fontSize: '18px' }}>مدة الدورة</h2>
            <p style={{ color: '#ADB5B9', fontSize: '16px' }}>(يتم احتسابها تلقائياً بحسب مدة الفديويهات الخاصة بالدورة)</p>
          </div>
          <div className="flex">
            <input
              className="flex-1 p-4 outline-none rounded-tr-lg rounded-br-lg"
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
              className="flex-1 p-4 outline-none rounded-tl-lg rounded-bl-lg"
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
            <h6 style={{ fontSize: '24px', fontWeight: '500', color: '#000000' }}>دروس الدورة</h6>
            <div className="flex flex-col">
              <div
                style={{ width: '100%', height: '56px', backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
                className=" relative"
              >
                <div
                  className="flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
                  onClick={() => {setOpenMenu(true);setOpenMenu2(false)}}>
                  <div className="flex flex-row items-center gap-2">
                    <h6 style={{ fontSize: '18px', fontWeight: '500', color: '#000000' }}>الوحدة الأولى</h6>
                    <span style={{ fontSize: '18px', color: '#67747B' }}>(4 دروس)</span>
                    <span style={{ fontSize: '18px', color: '#67747B' }}>(25 دقيقة)</span>
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
                        <h6 style={{ fontSize: '20px', fontWeight: '500', color: '#011723' }} className="mr-[20px] ml-[30px]">المقدمة</h6>
                        <span style={{ fontSize: '18px', color: '#011723' }}>4:00</span>
                      </div>
                      <DeleteIcon className="cursor-pointer" 
                        onClick={() => {
                        setNotificationTitle('سيتم حذف الدرس');
                      }}/>
                    </div>
                    {[1, 2, 3].map((_item, index) => (
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                          <PlayVideo />
                          <h6 style={{ fontSize: '20px', fontWeight: '500', color: '#011723' }} className="mr-[20px] ml-[30px]">مصطلحات تعريفيقة</h6>
                          <span style={{ fontSize: '18px', color: '#011723' }}>10:05</span>
                        </div>
                        <DeleteIcon className="cursor-pointer" 
                        onClick={() => {
                        setNotificationTitle('سيتم حذف الدرس');
                      }}/>
                      </div>
                    ))}
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <PDFIcon />
                        <h6 style={{ fontSize: '20px', fontWeight: '500', color: '#0077FF' }} className="mr-[20px] ml-[30px]">ملفات الوحدة</h6>
                      </div>
                      <h6 style={{ fontSize: '18px', color: '#0077FF',cursor:'pointer' }}>تحميل</h6>
                    </div>
                  </div>
                }
              </div>
              <div
                style={{ width: '100%', height: '56px', backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
                className=" relative"
              >
                <div
                  className="flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
                  onClick={() => setOpenMenu2(true)}>
                  <div className="flex flex-row items-center gap-2">
                    <h6 style={{ fontSize: '18px', fontWeight: '500', color: '#000000' }}>الوحدة الثانية</h6>
                    <span style={{ fontSize: '18px', color: '#67747B' }}>(4 دروس)</span>
                    <span style={{ fontSize: '18px', color: '#67747B' }}>(25 دقيقة)</span>
                  </div>
                  <Arrow className={styles.arrow_icon} />
                </div>
                {openMenu2 &&
                  <div
                    style={{ backgroundColor: '#F4F5F7' }}
                    className="flex flex-col gap-5 absolute z-10 left-0 top-[55px] w-full p-5"
                    onClick={() => setOpenMenu2(false)}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <PlayVideo />
                        <h6 style={{ fontSize: '20px', fontWeight: '500', color: '#011723' }} className="mr-[20px] ml-[30px]">المقدمة</h6>
                        <span style={{ fontSize: '18px', color: '#011723' }}>4:00</span>
                      </div>
                      <DeleteIcon className="cursor-pointer" 
                        onClick={() => {
                        setNotificationTitle('سيتم حذف الدرس');
                      }}/>
                    </div>
                    {[1, 2, 3].map((_item, index) => (
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                          <PlayVideo />
                          <h6 style={{ fontSize: '20px', fontWeight: '500', color: '#011723' }} className="mr-[20px] ml-[30px]">مصطلحات تعريفيقة</h6>
                          <span style={{ fontSize: '18px', color: '#011723' }}>10:05</span>
                        </div>
                        <DeleteIcon className="cursor-pointer" 
                        onClick={() => {
                        setNotificationTitle('سيتم حذف الدرس');
                      }}/>
                      </div>
                    ))}
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <PDFIcon />
                        <h6 style={{ fontSize: '20px', fontWeight: '500', color: '#0077FF' }} className="mr-[20px] ml-[30px]">ملفات الوحدة</h6>
                      </div>
                      <h6 style={{ fontSize: '18px', color: '#0077FF',cursor:'pointer' }}>تحميل</h6>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
        <div className="flex flex-row items-center gap-16">
          <label className="font-medium whitespace-nowrap" style={{ color: '#011723', fontSize: '18px' }}>
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
                  {images[0] && !editData && <h2 style={{ color: '#011723', fontSize: '16px' }}>{images[0]?.file?.name}</h2>}
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
          <label style={{ color: '#02466A', fontSize: '20px' }}>
            رابط الدورة
            <span style={{ color: '#02466A', fontSize: '16px' }}> (تلقائي) </span>
          </label>
          <div
            className="flex flex-row items-center justify-between rounded-md p-4"
            style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
          >
            {copy ? (<h6 style={{ color: '#02466A', fontSize: '16px' }}>Copied</h6>) : (<CopyIcon className="cursor-pointer" fill="#02466A" onClick={() => handelCopy()} />)}

            <input
              className="outline-none text-left"
              style={{ width: '100%', backgroundColor: 'transparent', color: '#02466A', fontSize: '16px' }}
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
              style={{ width: '474px', height: '64px', backgroundColor: "#02466A" }}
              textStyle={{ color: "#EFF9FF", fontSize: '20px' }}
              className={"flex-1"}
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
              textStyle={{ color: "#02466A", fontSize: '20px' }}
              className={"flex-1"}
              type={"outline"}
              svg={<IoAddCircleSharp fontSize="1.5rem" color={"#02466A"} />}
              onClick={() => {
                setShowAddUnit(true);
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
                style={{ width: '100%', height: '64px', backgroundColor: "#1DBBBE" }}
                textStyle={{ color: "#EFF9FF", fontSize: '20px' }}
                className={"flex-1"}
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
                  style={{ width: '474px', height: '64px', backgroundColor: "#02466A" }}
                  textStyle={{ color: "#EFF9FF", fontSize: '20px' }}
                  className={"flex-1"}
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
                  textStyle={{ color: "#02466A", fontSize: '20px' }}
                  className={"flex-1"}
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