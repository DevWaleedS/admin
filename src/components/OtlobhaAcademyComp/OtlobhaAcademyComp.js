import React, { useState } from "react";
import TrainingCourses from "./TrainingCourses/TrainingCourses";
import AcademyLessons from "./AcademyLessons/AcademyLessons";

const OtlobhaAcademyComp = () => {
  const [selected, setSelected] = useState(true);
  return (
    <div>
      <div className="block lg:flex gap-12">
        <div
          className="flex cursor-pointer duration-200 rounded-lg justify-center items-center"
          style={{
            height: "140px",
            width: "278px",
            backgroundColor: selected ? "#B4EDEE" : "#B4EDEE33",
          }}
          onClick={() => {
            setSelected(true);
          }}
        >
          <h2 className="text-2xl font-medium" style={{ color: "#02466A" }}>
            الدورات التدريبية
          </h2>
        </div>
        <div
          className="flex cursor-pointer duration-200 rounded-lg justify-center items-center"
          style={{
            height: "140px",
            width: "278px",
            backgroundColor: !selected ? "#B4EDEE" : "#B4EDEE33",
          }}
          onClick={() => {
            setSelected(false);
          }}
        >
          <h2 className="text-2xl font-medium" style={{ color: "#02466A" }}>
            شروحات
          </h2>
        </div>
      </div>
      {selected && <TrainingCourses></TrainingCourses>}
      {!selected && <AcademyLessons></AcademyLessons>}
    </div>
  );
};

export default OtlobhaAcademyComp;
