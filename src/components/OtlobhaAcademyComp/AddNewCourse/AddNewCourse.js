import React, { useState, useContext } from "react";
import styles from "./AddNewCourse.module.css";
import { GoArrowRight } from "react-icons/go";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import ImageUploading from "react-images-uploading";
import { IoMdCloudUpload } from "react-icons/io";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "../../../UI/Button/Button";
import { IoAddCircleSharp } from "react-icons/io5";
import AddUnit from "./AddUnit/AddUnit";
import { ReactComponent as CopyIcon } from "../../../assets/Icons/copy icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/Icons/icon-24-delete.svg";
import { ReactComponent as PlayVideo } from "../../../assets/Icons/video-play.svg";
import { ReactComponent as PDFIcon } from "../../../assets/Icons/pfd.svg";
import { NotificationContext } from "../../../store/NotificationProvider";
import Context from '../../../store/context';
import axios from "axios";
import { TagsInput } from "react-tag-input-component";



const AddNewCourse = ({ coursesReload, setCoursesReload, cancel, editData, detailsData, addNewLesson }) => {
  const token = localStorage.getItem('token');
  const [description, setDescription] = useState({
    htmlValue: "<h1></h1>\n",
    editorState: EditorState.createEmpty(),
  });
  const [data, setData] = useState({
    name: editData?.name || detailsData?.name || '',
    minute: editData?.duration || detailsData?.duration || '',
    hour: editData?.duration || detailsData?.duration || '',
    image: editData?.image || detailsData?.image || '',
    link: editData?.url || detailsData?.url,
  });
  const [tagsSelected, setTagsSelected] = useState(editData?.tags || detailsData?.tags || []);

  const [showAddUnit, setShowAddUnit] = useState(false);
  const [unitDetails, setUnitDetails] = useState([]);
  const [copy, setCopy] = useState(false);
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const NotificationStore = useContext(NotificationContext);
  const { setNotificationTitle, setActionTitle } = NotificationStore;
  const [images, setImages] = useState([]);
  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(
      convertToRaw(editorValue.getCurrentContent())
    );
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
    navigator.clipboard.writeText(data?.link);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 5000);
  }

  const AddCourse = () => {
    let formData = new FormData();
    formData.append('name', data?.name);
    formData.append('description', description?.htmlValue);
    formData.append('duration', data?.minute);
    formData.append('tags', tagsSelected.join(","));
    formData.append('image', images[0]?.file || '');

    for (let i = 0; i < unitDetails?.length; i++) {
      formData.append([`data[${i}][title]`], unitDetails[i]?.title);
      for (let  d = 0; d < unitDetails[i]?.documents?.length; d++) {
        formData.append([`data[${i}][file][${d}]`], unitDetails[i]?.documents[d]);
      }
      
      for (let v = 0; v < unitDetails[i]?.videos?.length; v++) {
      formData.append([`data[${i}][video][${v}]`], unitDetails[i]?.videos[v]);
      }
    }
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

  const updateCourse = () =>{
    const formData = new FormData();
		formData.append('_method', 'PUT');
		formData.append('name', data?.name);
    formData.append('description', description?.htmlValue);
    formData.append('duration', data?.minute);
    formData.append('tags', tagsSelected.join(","));
		if(images.length !==0){
			formData.append('image', images[0]?.file || '');
		}

		axios
			.post(`https://backend.atlbha.com/api/Admin/course/${editData?.id}`, formData, {
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
          unitDetails={ details => setUnitDetails([...unitDetails, details])}
          cancel={() => {
            setShowAddUnit(false);
          }}
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

            <h2 className="md:text-[18px] text-[15px] font-medium md:ml-4 ml-2"> ???????????????? </h2>
          </div>

          <h2 className="md:text-[18px] text-[15px] font-medium md:ml-4 ml-2"> / ???????????????? ???????????? </h2>
          {
            editData ?
              (
                <h3 className="md:text-[18px] text-[15px] font-medium" style={{ color: "#67747B" }}>/ ?????????? ???????? ??????????????</h3>
              )
              : detailsData ?
                (
                  <h3 className="md:text-[18px] text-[15px] font-medium" style={{ color: "#67747B" }}>/ ???????????? ???????? ??????????????</h3>
                )
                :
                (
                  <h3 className="md:text-[18px] text-[15px] font-medium" style={{ color: "#67747B" }}>/ ?????????? ???????? ??????????????</h3>
                )
          }

        </div>
      </div>
      <div className="flex flex-col gap-5 mt-[42px] md:pr-[78px] p-4">
        <div className="flex flex-col gap-[10px]">
          <label className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>
            ?????? ???????????? ??????????????????
          </label>
          <input
            className="w-full md:h-14 h-[45px] outline-none shadow-sm rounded-lg p-4"
            style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            disabled={detailsData ? true : false}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>
            ??????????
          </label>
          <div
            className={styles.editor}
          >
            <Editor
              toolbarHidden={false}
              editorState={description.editorState}
              onEditorStateChange={onEditorStateChange}
              inDropdown={true}
              placeholder="?????????????? ????????????"
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
          <h2 className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>?????????? ???????????? TAGS</h2>
          <div
            style={{ backgroundColor: "#F4F5F7", border: "1px solid #67747B33", }}
            className={`${styles.tags} flex flex-row items-center flex-wrap rounded-lg`}
          >
            <TagsInput
              value={tagsSelected}
              onChange={setTagsSelected}
              name="tags"
              placeHolder="???????? ?????????? ???????????? TAGS"
              disabled={detailsData ? true : false}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex md:flex-row flex-col gap-1">
            <h2 className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>?????? ????????????</h2>
            <p className="md:text-[16px] text-[14px]" style={{ color: '#ADB5B9' }}>(?????? ???????????????? ???????????????? ???????? ?????? ???????????????????? ???????????? ??????????????)</p>
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
              placeholder="??????????"
              value={data.minute}
              onChange={(e) => setData({ ...data, minute: e.target.value })}
              disabled={detailsData ? true : false}
            />
            <input
              className="w-full flex-1 p-4 outline-none rounded-tl-lg rounded-bl-lg"
              style={{
                color: '#67747B',
                backgroundColor: "#F4F5F7",
                border: "1px solid #67747B33",
              }}
              type="text"
              placeholder="????????"
              value={data.hour}
              onChange={(e) => setData({ ...data, hour: e.target.value })}
              disabled={detailsData ? true : false}
            />
          </div>
        </div>
        {
          unitDetails.length !== 0 &&
          <div className="mb-[80px] mt[33px] flex flex-col gap-4">
            <h6 className="md:text-[24px] text-[20px]" style={{ fontWeight: '500', color: '#000000' }}>???????? ????????????</h6>
            <div>
              {unitDetails?.map((item, index) => (
                <Accordion
                  sx={{
                    '.Mui-expanded': {
                      margin: 0,
                    }
                  }}
                  key={index}
                  style={{ width: '100%', backgroundColor: '#F4F5F7', border: '1px solid #67747B33', boxShadow: 'none' }}
                  className="relative md:h-[56px] h-[45px]"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      '&.Mui-expanded': {
                        minHeight: '48px'
                      }
                    }}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <h6 className="md:text-[18px] text-[16px]" style={{ fontWeight: '500', color: '#000000' }}>{item?.title}</h6>
                      <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>({item?.videos?.length + item?.documents?.length} ????????)</span>
                      <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>(25 ??????????)</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ backgroundColor: '#F4F5F7' }}
                    className="flex flex-col gap-5 absolute z-10 left-0 top-[55px] w-full p-5"

                  >
                    {item?.videos?.map((video, index) => (
                      <div key={index} className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                          <PlayVideo />
                          <h6 style={{ fontWeight: '500', color: '#011723' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">{video?.name}</h6>
                          <span className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>10:05</span>
                        </div>
                        <DeleteIcon className="cursor-pointer"
                          onClick={() => {
                            setNotificationTitle('???????? ?????? ??????????');
                            setActionTitle('???? ?????? ?????????? ??????????');
                          }} />
                      </div>
                    ))}

                    {Array.from(item?.documents || [])?.map((file, index) => (
                      <div key={index} className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                          <PDFIcon />
                          <h6 style={{ fontWeight: '500', color: '#0077FF' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">{file?.name}</h6>
                        </div>
                        <h6 className="md:text-[18px] text-[16px]" style={{ color: '#0077FF', cursor: 'pointer' }}>??????????</h6>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        }
        {
          editData?.unit &&
          <div className="mb-[80px] mt[33px] flex flex-col gap-4">
            <h6 className="md:text-[24px] text-[20px]" style={{ fontWeight: '500', color: '#000000' }}>???????? ????????????</h6>
            <div>
              {editData?.unit?.map((item, index) => (
                <Accordion
                  sx={{
                    '.Mui-expanded': {
                      margin: 0,
                    }
                  }}
                  key={index}
                  style={{ width: '100%', backgroundColor: '#F4F5F7', border: '1px solid #67747B33', boxShadow: 'none' }}
                  className="relative md:h-[56px] h-[45px]"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      '&.Mui-expanded': {
                        minHeight: '48px'
                      }
                    }}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <h6 className="md:text-[18px] text-[16px]" style={{ fontWeight: '500', color: '#000000' }}>{item?.title}</h6>
                      <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>({item?.unitvideo} ????????)</span>
                      <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>(25 ??????????)</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ backgroundColor: '#F4F5F7' }}
                    className="flex flex-col gap-5 absolute z-10 left-0 top-[55px] w-full p-5"

                  >
                    {item?.videos?.map((video, index) => (
                      <div key={index} className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                          <PlayVideo />
                          <h6 style={{ maxWidth: '600px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontWeight: '500', color: '#011723' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">{video?.video || ''}</h6>
                          <span className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>{video?.duration || ''}</span>
                        </div>
                        <DeleteIcon className="cursor-pointer"
                          onClick={() => {
                            setNotificationTitle('???????? ?????? ??????????');
                            setActionTitle('???? ?????? ?????????? ??????????');
                          }} />
                      </div>
                    ))}
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <PDFIcon />
                        <h6 style={{ fontWeight: '500', color: '#0077FF' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">{item?.file}</h6>
                      </div>
                      <h6 className="md:text-[18px] text-[16px]" style={{ color: '#0077FF', cursor: 'pointer' }}>??????????</h6>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        }
        {
          detailsData?.unit &&
          <div className="mb-[80px] mt[33px] flex flex-col gap-4">
            <h6 className="md:text-[24px] text-[20px]" style={{ fontWeight: '500', color: '#000000' }}>???????? ????????????</h6>
            <div>
              {detailsData?.unit?.map((item, index) => (
                <Accordion
                  sx={{
                    '.Mui-expanded': {
                      margin: 0,
                    }
                  }}
                  key={index}
                  style={{ width: '100%', backgroundColor: '#F4F5F7', border: '1px solid #67747B33', boxShadow: 'none' }}
                  className="relative md:h-[56px] h-[45px]"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      '&.Mui-expanded': {
                        minHeight: '48px'
                      }
                    }}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <h6 className="md:text-[18px] text-[16px]" style={{ fontWeight: '500', color: '#000000' }}>{item?.title}</h6>
                      <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>({item?.unitvideo} ????????)</span>
                      <span className="md:text-[18px] text-[16px]" style={{ color: '#67747B' }}>(25 ??????????)</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ backgroundColor: '#F4F5F7' }}
                    className="flex flex-col gap-5 absolute z-10 left-0 top-[55px] w-full p-5"

                  >
                    {item?.videos?.map((video, index) => (
                      <div key={index} className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                          <PlayVideo />
                          <h6 style={{ maxWidth: '600px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontWeight: '500', color: '#011723' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">{video?.video || ''}</h6>
                          <span className="md:text-[18px] text-[16px]" style={{ color: '#011723' }}>{video?.duration || ''}</span>
                        </div>
                        <DeleteIcon className="cursor-pointer"
                          onClick={() => {
                            setNotificationTitle('???????? ?????? ??????????');
                            setActionTitle('???? ?????? ?????????? ??????????');
                          }} />
                      </div>
                    ))}
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center">
                        <PDFIcon />
                        <h6 style={{ fontWeight: '500', color: '#0077FF' }} className="md:text-[20px] text-[18px] mr-[20px] ml-[30px]">{item?.file}</h6>
                      </div>
                      <h6 className="md:text-[18px] text-[16px]" style={{ color: '#0077FF', cursor: 'pointer' }}>??????????</h6>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        }
        <div className="flex md:flex-row flex-col md:items-center items-start md:gap-16 gap-y-4">
          <label className="md:text-[18px] text-[16px] font-medium whitespace-nowrap" style={{ color: '#011723' }}>
            ???????????? ??????????????????
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
                  detailsData ? console.log() : onImageUpload();
                }}
                {...dragProps}
              >
                <div className="image-item h-full w-full cursor-pointer">
                  {!images[0] && !editData && !detailsData && (
                    <div className="flex flex-col justify-center items-center gap-[5px] h-full w-full">
                      <IoMdCloudUpload size={"2em"}></IoMdCloudUpload>
                      <h2 style={{ color: '#011723', fontSize: '16px' }}>???????? ???????????? ??????</h2>
                      <h2 style={{ color: '#67747B', fontSize: '14px' }}>(???????? ???????? ?????????? png & jpg)</h2>
                    </div>
                  )}
                  {images[0] && !editData && !detailsData &&
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
                      <h2 style={{ color: '#F3FCFD', fontSize: '16px' }}>???????? ???????????? ??????</h2>
                      <h2 style={{ color: '#F3FCFD', fontSize: '14px' }}>(???????? ???????? ?????????? png & jpg)</h2>
                    </div>
                  </div>
                }
                {detailsData &&
                  <div style={{ height: '90px', borderRadius: '8px' }} className="flex flex-col items-center justify-center relative">
                    <img style={{ borderRadius: '8px' }} className="w-full h-full" src={images[0]?.data_url || data.image} alt="main-img" />
                  </div>
                }
              </div>
            )}
          </ImageUploading>
        </div>
        {
          (editData || detailsData) &&
          <div className="flex flex-col gap-[10px]">
            <label className="md:text-[20px] text-[18px]" style={{ color: '#02466A' }}>
              ???????? ????????????
              <span className="md:text-[16px] text-[14px]" style={{ color: '#02466A' }}> (????????????) </span>
            </label>
            <div
              className="flex flex-row items-center justify-between rounded-md gap-3 p-4"
              style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
            >
              {copy ? (<h6 style={{ color: '#02466A', fontSize: '16px' }}>Copied</h6>) : (<CopyIcon className="cursor-pointer" fill="#02466A" onClick={() => handelCopy()} />)}
              <input
                className="outline-none text-left md:text-[16px] text-[14px]"
                style={{ width: '100%', backgroundColor: 'transparent', color: '#02466A', whiteSpacepace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                value={data.link}
                type="text"
                disabled
              />
            </div>
          </div>
        }
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
              ?????????? ????????
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
              ?????????? ??????
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
                onClick={updateCourse}
              >
                ?????? ??????????????????
              </Button>
            )
            :
            detailsData ? ''
              :
              (
                <>
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
                      ?????????? ????????
                    </Button>
                    <Button
                      style={{ borderColor: "#02466A" }}
                      textStyle={{ color: "#02466A" }}
                      className={"md:w-[474px] w-full md:h-[64px] h-[45px] md:text-[20px] text-[18px] flex-1"}
                      type={"outline"}
                      onClick={cancel}
                    >
                      ??????????
                    </Button>
                  </div>
                  {unitDetails.length !== 0 &&
                    (
                      <Button
                        style={{ width: '100%', backgroundColor: "#1DBBBE" }}
                        textStyle={{ color: "#EFF9FF" }}
                        className={"md:h-[64px] h-[45px] md:text-[20px] text-[18px] flex-1"}
                        type={"normal"}
                        onClick={AddCourse}
                      >
                        ?????? ????????????
                      </Button>
                    )
                  }
                </>
              )
        }

      </div>
    </div>
  );
};
export default AddNewCourse;