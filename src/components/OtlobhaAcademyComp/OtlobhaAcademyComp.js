import React, { useState } from "react";
import TrainingCourses from "./TrainingCourses/TrainingCourses";
import AcademyLessons from "./AcademyLessons/AcademyLessons";

const tabs = [{id:1,title:'الدورات التدريبية',active:true},{id:2,title:'شروحات',active:false}];

const OtlobhaAcademyComp = ({setSelectTab}) => {
  const [selectedId, setSelectedId] = useState(1);
  setSelectTab(selectedId);
  return (
    <div>
      <div className="block lg:flex gap-12">
        {tabs.map((tab,index)=>(
          <div
              key={index}
              className="flex cursor-pointer duration-200 rounded-lg justify-center items-center"
              style={{
                height: "140px",
                width: "278px",
                backgroundColor: selectedId === tab.id ? "#B4EDEE" : "#B4EDEE33",
              }}
              onClick={() => {
                setSelectedId(tab.id);           
              }}
            >
              <h2 className="text-2xl font-medium" style={{ color: "#02466A" }}>
                {tab.title}
              </h2>
            </div>
        ))}
      </div>
      {selectedId=== 1 ? <TrainingCourses></TrainingCourses> : <AcademyLessons></AcademyLessons>}
    </div>
  );
};

export default OtlobhaAcademyComp;
