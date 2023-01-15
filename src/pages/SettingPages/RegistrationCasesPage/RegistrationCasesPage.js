import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
// import PagesPageTable from "../../components/PagesPageComp/PagesPageTable/PagesPageTable";
// import Filtering from "../../components/PagesPageComp/Filtering/Filtering";
import Switch from "@mui/material/Switch";

const cases = [{ id: 1, name: 'التسجيل مع موافقة الادارة', active: true }, { id: 2, name: 'ايقاف التسجيل', active: false }, { id: 3, name: 'التسجيل تلقائي', active: false }];

const RegistrationCasesPage = () => {
  const [data, setData] = useState([]);
  return (
    <div className={`relative h-full py-10 pl-36 pr-5`} style={{ backgroundColor: "#F7F7F7" }}>
      <div
        className="flex flex-row items-center gap-3"
      >
        <h3 style={{ fontSize: '24px', color: '#011723' }} className="font-bold">حالات التسجيل</h3>
        <p style={{ fontSize: '18px', color: '#67747B' }} className="font-medium">( تتيح هذه الواجهة التحكم بحالة التسجيل في الصفحة الرئيسية)</p>
      </div>
      <div className="mt-4">
        <PageNavigate
          nestedPage={true}
          parentPage={"الاعدادات"}
          currentPage={"حالات التسجيل"}
        />
        <div className="flex flex-row items-center justify-center gap-4 flex-wrap mt-16">
          {cases.map((box, index) => (
            <div 
                key={index} 
                style={{ width: '280px', height: '120px', boxShadow: '3px 3px 6px #0000000A', backgroundColor: box.active ? '#DDF9E7' : '#E6E6E6' }} 
                className="flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
              <h2 style={{ fontSize: '20px', color: '#011723' }} className="font-medium whitespace-nowrap">{box.name}</h2>
              <Switch
                onChange={() => {
                  const findIndex = cases.findIndex(
                    (item) => item.id === box.id
                  );
                  const arr = [...cases];
                  arr[findIndex].active = !arr[findIndex].active;
                  setData(arr);
                }}
                sx={{
                  "& .Mui-checked .MuiSwitch-thumb": {
                    backgroundColor: "#3AE374",
                  },
                  "&.MuiSwitch-root .Mui-checked+.MuiSwitch-track":
                  {
                    backgroundColor: "#3AE374",
                  },
                }}
                checked={box.active}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationCasesPage;
