import React, { useState } from "react";
import TrainingCourses from "./TrainingCourses/TrainingCourses";
import AcademyLessons from "./AcademyLessons/AcademyLessons";

const tabs = [{ id: 1, title: 'الدورات التدريبية', active: true }, { id: 2, title: 'شروحات', active: false }];

const OtlobhaAcademyComp = ({
  courses,
  coursesLoading,
  coursesReload,
  setCoursesReload,
  lessons,
  lessonsLoading,
  lessonsReload,
  setLessonsReload,
  setSelectTab,
  EditCourse,
  DetailsCourse,
  EditLesson
}) => {
  const [selectedId, setSelectedId] = useState(1);
  setSelectTab(selectedId);
  return (
    <div>
      <div className="flex flex-row items-center md:gap-12 gap-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="md:w-[278px] w-full md:h-[140px] h-[80px] px-3 flex cursor-pointer duration-200 rounded-lg justify-center items-center"
            style={{
              backgroundColor: selectedId === tab.id ? "#B4EDEE" : "#B4EDEE33",
            }}
            onClick={() => {
              setSelectedId(tab.id);
            }}
          >
            <h2 className="md:text-2xl text-[18px] font-medium whitespace-nowrap" style={{ color: "#02466A" }}>
              {tab.title}
            </h2>
          </div>
        ))}
      </div>
      {selectedId === 1 ?
        <TrainingCourses
          courses={courses}
          coursesLoading={coursesLoading}
          coursesReload={coursesReload}
          setCoursesReload={setCoursesReload}
          EditCourse={EditCourse}
          DetailsCourse={DetailsCourse}
        />
        :
        <AcademyLessons
          lessons={lessons}
          lessonsLoading={lessonsLoading}
          lessonsReload={lessonsReload}
          setLessonsReload={setLessonsReload}
          EditLesson={EditLesson}
        />
      }
    </div>
  );
};

export default OtlobhaAcademyComp;
