import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ReactComponent as BsTrash } from "../../../assets/Icons/icon-24-delete.svg";
import { ReactComponent as Copy } from "../../../assets/Icons/copy icon.svg";
import { ReactComponent as Edit } from "../../../assets/Icons/editt 2.svg";
import { ReactComponent as TrueIcon } from "../../../assets/Icons/icon-24- true.svg";
import { NotificationContext } from "../../../store/NotificationProvider";
import Context from '../../../store/context';
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';
import axios from "axios";

const AcademyLessons = ({ lessons, lessonsLoading, lessonsReload, setLessonsReload, EditLesson }) => {
  const token = localStorage.getItem('token');
  const [id, setId] = useState("");
  const NotificationStore = useContext(NotificationContext);
  const { setNotificationTitle, confirm, setConfirm, actionTitle, setActionTitle } = NotificationStore;
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    if (confirm && actionTitle === 'DeleteLesson') {
      axios
        .delete(`https://backend.atlbha.com/api/Admin/explainVideos/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.success === true && res?.data?.data?.status === 200) {
            setEndActionTitle(res?.data?.message?.ar);
            setLessonsReload(!lessonsReload);
          } else {
            setEndActionTitle(res?.data?.message?.ar);
            setLessonsReload(!lessonsReload);

          }
        });
      setActionTitle(null);
      setConfirm(false);
      setId("");
    }
  }, [confirm]);

  const handelCopy = (lessonId) => {
    const lesson = lessons?.data?.explainvideos?.filter((lesson) => (lesson?.id === lessonId));
    navigator.clipboard.writeText(lesson[0]?.url);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  }

  return (
    <Box className="md:mt-12 mt-6" sx={{ flexGrow: 1 }}>
      {
        lessonsLoading ?
          (
            <div className="w-full flex flex-col items-center justify-center">
              <CircularLoading />
            </div>
          )
          :
          (
            <Grid className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {lessons?.data?.explainvideos?.map((lesson, idx) => (
                <div key={idx} className="shadow-none">
                  <div className="cursor-pointer w-full">
                    <img className="w-full h-[200px] object-cover" src={lesson?.thumbnail} alt="lesson-img" />
                  </div>
                  <h2 className="mt-5 mb-8 text-center text-lg font-medium">
                    {lesson?.title}
                  </h2>
                  <div className="flex flex-row items-center justify-center gap-5" style={{ backgroundColor: '#FF38380A', height: '52px' }}>
                    {id === lesson?.id && copy ? (<TrueIcon />) : (<Copy className="cursor-pointer" onClick={() => {handelCopy(lesson?.id);setId(lesson?.id);}} />)}
                    <Edit className="cursor-pointer" onClick={() => { EditLesson(lesson); }}></Edit>
                    <BsTrash
                      className="cursor-pointer"
                      onClick={() => {
                        setId(lesson?.id);
                        setNotificationTitle('سيتم حذف الفيديو');
                        setActionTitle('DeleteLesson');
                      }}>
                    </BsTrash>
                  </div>
                </div>
              ))}
            </Grid>
          )}
    </Box>
  );
};

export default AcademyLessons;
