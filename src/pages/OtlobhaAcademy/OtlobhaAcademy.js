import React, { useState } from "react";
import PageNavigate from "../../components/PageNavigate/PageNavigate";
import OtlobhaAcademyComp from "../../components/OtlobhaAcademyComp/OtlobhaAcademyComp";
import AddNewCourse from "../../components/OtlobhaAcademyComp/AddNewCourse/AddNewCourse";
import AddNewLesson from "../../components/OtlobhaAcademyComp/AddNewLesson/AddNewLesson";
import Button from "../../UI/Button/Button";
import { ReactComponent as ActionAdd } from "../../assets/Icons/icon-24-action-add.svg";


const OtlobhaAcademy = () => {
  const [newLessonWindow, setNewLessonWindow] = useState(false);
  const [newCourseWindow, setNewCourseWindow] = useState(false);
  const [editCourseData, setEditCourseData] = useState(null);
  const [editLessonData, setEditLessonData] = useState(null);
  const [selectedTab, setSelectTab] = useState();
  return (
    <div
      className={`p-4 relative pl-36`}
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="flex items-center justify-between">
        <PageNavigate currentPage={"أكاديمية أطلبها"} />
        <div className="flex gap-2">
          {
            selectedTab === 1 ?
              (
                <Button
                  className={"flex justify-center items-center"}
                  type={"outline"}
                  style={{ width: '180px', height: '56px', borderColor: "#02466A" }}
                  textStyle={{ color: "#02466A", fontSize: '20px' }}
                  svg={<ActionAdd fill="#02466A" />}
                  onClick={() => {
                    setNewCourseWindow(true);
                    setEditCourseData(null);
                  }}
                >
                  اضافة دورة
                </Button>
              ) :
              (
                <Button
                  className={"flex justify-center items-center"}
                  type={"outline"}
                  style={{ width: '180px', height: '56px', borderColor: "#02466A" }}
                  textStyle={{ color: "#02466A", fontSize: '20px' }}
                  svg={<ActionAdd fill="#02466A" />}
                  onClick={() => {
                    setNewLessonWindow(true);
                    setEditLessonData(null);
                  }}
                >
                  اضافة درس
                </Button>
              )
          }

        </div>
      </div>
      {newCourseWindow && (
        <AddNewCourse
          cancel={() => {
            setNewCourseWindow(false);
          }}
          editData={editCourseData}
        ></AddNewCourse>
      )}
      {newLessonWindow && (
        <AddNewLesson
          cancel={() => {
            setNewLessonWindow(false);
          }}
          editLessonData={editLessonData}
        ></AddNewLesson>
      )}
      <div className="mt-16">
        <OtlobhaAcademyComp
          EditCourse={(data) => {
            setNewCourseWindow(true);
            setEditCourseData(data);
          }}
          EditLesson={(data) => {
            setNewLessonWindow(true);
            setEditLessonData(data);
          }}
          setSelectTab={setSelectTab}
        >
        </OtlobhaAcademyComp>
      </div>
    </div>
  );
};

export default OtlobhaAcademy;
