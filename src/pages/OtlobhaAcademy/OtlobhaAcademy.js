import React, { useState } from "react";
import PageNavigate from "../../components/PageNavigate/PageNavigate";
import OtlobhaAcademyComp from "../../components/OtlobhaAcademyComp/OtlobhaAcademyComp";
import AddNewCourse from "../../components/OtlobhaAcademyComp/AddNewCourse/AddNewCourse";
import AddNewVideo from "../../components/OtlobhaAcademyComp/AddNewVideo/AddNewVideo";

import Button from "../../UI/Button/Button";
import { SlArrowUpCircle } from "react-icons/sl";

const OtlobhaAcademy = () => {
  const [newVideoWindow, setNewVideoWindow] = useState(false);
  const [newCourseWindow, setNewCourseWindow] = useState(false);

  return (
    <div
      className={`p-4 relative pl-36`}
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="flex items-center justify-between">
        <PageNavigate currentPage={"أكاديمية أطلبها"} />
        <div className="flex gap-2">
          <Button
            className={"flex justify-center items-center"}
            type={"outline"}
            style={{ borderColor: "#02466A" }}
            textStyle={{ color: "#02466A" }}
            svg={<SlArrowUpCircle fill="#02466A" />}
            onClick={() => {
              setNewCourseWindow(true);
            }}
          >
            إضافة كورس
          </Button>
          <Button
            className={"flex justify-center items-center"}
            type={"normal"}
            svg={<SlArrowUpCircle fill="#fff" />}
            style={{ backgroundColor: "#02466A" }}
            color={"white"}
            onClick={() => {
              setNewVideoWindow(true);
            }}
          >
            إضافة فيديو
          </Button>
        </div>
      </div>
      {newCourseWindow && (
        <AddNewCourse
          cancel={() => {
            setNewCourseWindow(false);
          }}
        ></AddNewCourse>
      )}
      {newVideoWindow && (
        <AddNewVideo
          cancel={() => {
            setNewVideoWindow(false);
          }}
        ></AddNewVideo>
      )}
      <div className="mt-16">
        <OtlobhaAcademyComp></OtlobhaAcademyComp>
      </div>
    </div>
  );
};

export default OtlobhaAcademy;
