import React, { useState } from "react";
import Button from "../../../UI/Button/Button";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10"
    ></div>
  );
};

const template = [{id:1,name: 'القالب الأول'},{id:2,name: 'القالب الثاني'},
  {
    id:3,name: 'القالب الثالث'
  },
  {
    id:4,name: 'القالب الرابع'
  },
  {
    id:5,name: 'القالب الخامس'
  },
  {
    id:6,name: 'القالب السادس'
  },
  {
    id:7,name: 'القالب السابع'
  },
  {
    id:8,name: 'القالب الثامن'
  }
]
const PackageTemplate = ({ cancel }) => {
  const [templateSelected,setTemplateSelected] = useState([]);
  return (
    <>
      <BackDrop onClick={cancel} />
      <div
        className="w-full absolute flex flex-col top-8 translate-x-2/4  right-2/4 z-20 rounded-lg overflow-hidden"
      >
        <div className="flex-1 flex flex-row flex-wrap px-10 py-12 gap-6">
          {template.map((item,index)=>(
            <div key={index} className="rounded-md flex flex-col"
                  style={{ width:'250px', height:'250px',backgroundColor:'#ECFEFF',border:'1px solid #B4EDEE' }}
            >
                <div className="w-full flex-1 flex flex-col items-center justify-center">
                    <h6 style={{ color:'#011723' }} className="font-medium">{item.name}</h6>
                </div>
                <div style={{ height:'45px',backgroundColor:'#FF38380A' }} className="w-full flex flex-col items-center justify-center">
                    <input 
                      style={{ width:'16px',height:'16px' }} 
                      type="checkbox" 
                      value={item.id}
                      onChange={(e)=>setTemplateSelected(e.target.value)}
                      />
                </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center px-80">
            <Button
              onClick={() => {
                cancel();
              }}
              type={"normal"}
              style={{ backgroundColor: '#1DBBBE', color: '#F7FCFF' }}
              className={"w-full text-center py-4 rounded-lg"}
            >
                <h2 className="font-medium">اعتماد</h2>
            </Button>
        </div>
      </div>
    </>
  );
};

export default PackageTemplate;
