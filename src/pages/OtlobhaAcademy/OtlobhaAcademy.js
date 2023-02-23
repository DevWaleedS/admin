import React, { useState } from "react";
import PageNavigate from "../../components/PageNavigate/PageNavigate";
import OtlobhaAcademyComp from "../../components/OtlobhaAcademyComp/OtlobhaAcademyComp";
import AddNewCourse from "../../components/OtlobhaAcademyComp/AddNewCourse/AddNewCourse";
import AddNewLesson from "../../components/OtlobhaAcademyComp/AddNewLesson/AddNewLesson";
import Button from "../../UI/Button/Button";
import { ReactComponent as ActionAdd } from "../../assets/Icons/icon-24-action-add.svg";
import useFetch from '../../hooks/useFetch';

const OtlobhaAcademy = () => {
  const { fetchedData: courses, loading: coursesLoading, reload: coursesReload, setReload: setCoursesReload } = useFetch('https://backend.atlbha.com/api/Admin/course');
  const [newLessonWindow, setNewLessonWindow] = useState(false);
  const [newCourseWindow, setNewCourseWindow] = useState(false);
  const [editCourseData, setEditCourseData] = useState(null);
  const [editLessonData, setEditLessonData] = useState(null);
  const [selectedTab, setSelectTab] = useState();
  return (
    <div
      className={`p-4 relative md:pl-36 pt-0 md:bg-[#fafafa] bg-[#FFFFFF]`}
    >
      <div className="flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4">
        <PageNavigate currentPage={"أكاديمية أطلبها"} />
        <div className="md:w-auto w-full flex gap-2">
          {
            selectedTab === 1 ?
              (
                <Button
                  className={"md:w-[180px] w-full md:h-[56px] h-[45px] md:text-[20px] text-[18px] flex justify-center items-center"}
                  type={"outline"}
                  style={{ borderColor: "#02466A" }}
                  textStyle={{ color: "#02466A" }}
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
                  className={"md:w-[180px] w-full md:h-[56px] h-[45px] md:text-[20px] text-[18px] flex justify-center items-center"}
                  type={"outline"}
                  style={{ borderColor: "#02466A" }}
                  textStyle={{ color: "#02466A" }}
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
          coursesReload={coursesReload}
          setCoursesReload={setCoursesReload}
          cancel={() => {
            setNewCourseWindow(false);
          }}
          editData={editCourseData}
          addNewLesson={() => setNewLessonWindow(true)}
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
      <div className="md:mt-16 mt-6">
        <OtlobhaAcademyComp
          courses={courses}
          coursesLoading={coursesLoading}
          coursesReload={coursesReload}
          setCoursesReload={setCoursesReload}
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
