import React, { useEffect,useContext, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { ReactComponent as BsTrash } from "../../../assets/Icons/icon-24-delete.svg";
import { ReactComponent as Copy } from "../../../assets/Icons/copy icon.svg";
import { ReactComponent as Edit } from "../../../assets/Icons/editt 2.svg";
import { ReactComponent as TrueIcon } from "../../../assets/Icons/icon-24- true.svg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NotificationContext } from "../../../store/NotificationProvider";
import Context from '../../../store/context';
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';
import axios from "axios";

const TrainingCourses = ({ courses, coursesLoading, coursesReload, setCoursesReload, EditCourse,DetailsCourse }) => {
  const token = localStorage.getItem('token');
  const [id,setId] = useState("");
  const NotificationStore = useContext(NotificationContext);
  const { setNotificationTitle,confirm, setConfirm,actionTitle,setActionTitle } = NotificationStore;
  const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
  const [copy, setCopy] = useState(false);

  useEffect(() => {
		if (confirm && actionTitle==='DeleteCourse') {
			axios
				.delete(`https://backend.atlbha.com/api/Admin/course/${id}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res?.data?.success === true && res?.data?.data?.status === 200) {
						setEndActionTitle(res?.data?.message?.ar);
						setCoursesReload(!coursesReload);
					} else {
						setEndActionTitle(res?.data?.message?.ar);
						setCoursesReload(!coursesReload);
						
					}
				});
			setActionTitle(null);
			setConfirm(false);
      setId("");
		}
	}, [confirm]);

  const handelCopy = (courseId) => {
    const course = courses?.data?.courses?.filter((course) => (course?.id === courseId));
    navigator.clipboard.writeText(course[0]?.url);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
    setId("");
  }

  return (
    <div className="md:mt-12 mt-6">
      {
        coursesLoading ?
          (
            <div className="flex flex-col items-center justify-center">
              <CircularLoading />
            </div>
          )
          :
          (
            courses?.data?.courses.map((course, index) => {
              return (
                <div key={index} className="flex md:flex-row flex-col md:items-center items-start justify-between shadow-lg gap-y-4 md:p-0 p-3 mb-4">
                  <div className="flex flex-row md:gap-4 gap-3">
                    <div className="md:w-40 w-[86px] md:h-40 h-[85px] relative cursor-pointer">
                      <img
                        className="w-full h-full object-cover rounded-md"
                        src={course?.image}
                        alt={course?.name}
                      />
                      <BsPlayCircle
                        className={
                          "absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-4xl"
                        }
                        color={"#fff"}
                      ></BsPlayCircle>
                    </div>
                    <div className="md:pt-4">
                      <h2
                        className="font-medium md:text-xl text-[18px] md:mb-4 mb-2"
                        style={{ color: "#02466A" }}
                      >
                        {course?.name}
                      </h2>
                      <h2 className="mb-1 md:text-lg text-[16px]">{course?.duration} ساعة</h2>
                      <h2 className="md:text-lg text-[16px]">{course?.count} فيديو</h2>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-5 md:pl-6 pr-2">
                    {id === course?.id && copy ? (<TrueIcon />) : (<Copy className="cursor-pointer" onClick={() => {handelCopy(course?.id);setId(course?.id);}} />)}
                    <Edit className="cursor-pointer" onClick={() => { EditCourse(course); }}></Edit>
                    <VisibilityIcon style={{ color: '#1DBBBE' }} className="cursor-pointer" onClick={() => { DetailsCourse(course); }}></VisibilityIcon>
                    <BsTrash
                      className="cursor-pointer"
                      onClick={() => {
                        setId(course?.id);
                        setNotificationTitle('سيتم حذف الدورة');
                        setActionTitle('DeleteCourse');
                      }}>
                    </BsTrash>
                  </div>
                </div>
              );
            })
          )
      }

    </div>
  );
};

export default TrainingCourses;
