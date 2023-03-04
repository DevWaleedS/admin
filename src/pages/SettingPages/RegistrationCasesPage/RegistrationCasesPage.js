import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";

import Switch from "@mui/material/Switch";

const cases = [{ id: 1, name: 'التسجيل مع موافقة الادارة', active: true }, { id: 2, name: 'ايقاف التسجيل', active: false }, { id: 3, name: 'التسجيل تلقائي', active: false }];

const RegistrationCasesPage = () => {
  const [data, setData] = useState([]);
  return (
    <div className={`relative h-full md:py-10 md:pl-36 md:pr-5 p-4 pt-0`} style={{ backgroundColor: "#F7F7F7" }}>
      <div
        className="flex flex-row md:items-center items-start gap-3"
      >
        <h3 style={{ color: '#011723' }} className="md:text-[24px] text-[20px] font-bold whitespace-nowrap">حالات التسجيل</h3>
        <p style={{ color: '#67747B' }} className="md:text-[18px] text-[14px] font-medium">( تتيح هذه الواجهة التحكم بحالة التسجيل في الصفحة الرئيسية)</p>
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
                className="flex flex-col items-center justify-center gap-[18px] p-8 rounded-lg">
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
                  width: '32px',
                  height: '20px',
                  padding: 0,
                  borderRadius:'12px',
                  "& .MuiSwitch-thumb": {
                    width: '12px',
                    height: '12px',
                  },
                  "& .MuiSwitch-switchBase": {
                    padding: '5px',
                    top: '-1px',
                    left: '0'
                  },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    left: '-10px',
                  },
                  "& .Mui-checked .MuiSwitch-thumb": {
                    backgroundColor: "#FFFFFF",
                  },
                  "&.MuiSwitch-root .Mui-checked+.MuiSwitch-track":
                  {
                    backgroundColor: "#3AE374",
                    opacity: 1,
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
