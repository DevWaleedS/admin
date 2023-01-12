import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { BsTrash } from "react-icons/bs";

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

const AcademyLessons = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: "3rem" }}>
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
              <div>
                <BsTrash className="mx-auto text-xl" color={"red"}></BsTrash>
              </div>
            </div>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AcademyLessons;
