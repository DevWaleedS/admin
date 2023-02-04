import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ReactComponent as BsTrash } from "../../../assets/Icons/icon-24-delete.svg";
import { ReactComponent as Copy } from "../../../assets/Icons/copy icon.svg";
import { ReactComponent as Edit } from "../../../assets/Icons/editt 2.svg";
import { NotificationContext } from "../../../store/NotificationProvider";

const lessons = [
  {
    img: require("../../../assets/images/lesson_img (1).png"),
    title: "شراء المنتجات المميزة",
    length: "80",
    numberOfVideos: "120",
  },
  {
    img: require("../../../assets/images/lesson_img (2).png"),
    title: "ارسال بريد للعملاء",
    length: "80",
    numberOfVideos: "120",
  },
  {
    img: require("../../../assets/images/lesson_img (3).png"),
    title: "تحليل اداء متجرك",
    length: "80",
    numberOfVideos: "120",
  },
  {
    img: require("../../../assets/images/lesson_img (1).png"),
    title: "شراء المنتجات المميزة",
    length: "80",
    numberOfVideos: "120",
  },
  {
    img: require("../../../assets/images/lesson_img (2).png"),
    title: "ارسال بريد للعملاء",
    length: "80",
    numberOfVideos: "120",
  },
  {
    img: require("../../../assets/images/lesson_img (3).png"),
    title: "تحليل اداء متجرك",
    length: "80",
    numberOfVideos: "120",
  },
];

const AcademyLessons = ({ EditLesson }) => {
  const NotificationStore = useContext(NotificationContext);
  const { setNotificationTitle, setActionTitle } = NotificationStore;
  return (
    <Box className="md:mt-12 mt-6" sx={{ flexGrow: 1 }}>
      <Grid class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {lessons.map((lesson, idx) => {
          return (
            <div key={idx} className="shadow-none">
              <div className="cursor-pointer w-full">
                <img className="w-full object-cover" src={lesson.img} alt="" />
              </div>
              <h2 className="mt-5 mb-8 text-center text-lg font-medium">
                {lesson.title}
              </h2>
              <div className="flex flex-row items-center justify-center gap-5" style={{ backgroundColor: '#FF38380A', height: '52px' }}>
                <Copy ></Copy>
                <Edit className="cursor-pointer" onClick={() => { EditLesson(lesson); }}></Edit>
                <BsTrash
                  className="cursor-pointer"
                  onClick={() => {
                    setNotificationTitle('سيتم حذف الفيديو');
                    setActionTitle('تم حذف الفيديو بنجاح');
                  }}>
                </BsTrash>
              </div>
            </div>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AcademyLessons;
