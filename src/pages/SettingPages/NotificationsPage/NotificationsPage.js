import React, { useState } from "react";
// import PagesPageTable from "../../components/PagesPageComp/PagesPageTable/PagesPageTable";
// import Filtering from "../../components/PagesPageComp/Filtering/Filtering";
import {
  CommunicationSendOutlined,
  Delete,
  ShowStoreRequest,
} from "../../../assets/Icons/index";

const cases = [
  { id: 1, name: 'استفسار حول دعم السيرفر',store_name:'متجر أمازون',time:'اليوم 08:20 ص', type: 'enquiry' },
  { id: 2, name: 'قبول متجر نون',store_name:'جديد',time:'', type: 'acceptance' },
  { id: 3, name: 'استفسار حول دعم السيرفر',store_name:'متجر أمازون',time:'اليوم 08:20 ص', type: 'enquiry' },
  { id: 4, name: 'قبول متجر نون',store_name:'جديد',time:'', type: 'acceptance' },
  { id: 5, name: 'قبول متجر نون',store_name:'جديد',time:'', type: 'acceptance' },
  { id: 6, name: 'استفسار حول دعم السيرفر',store_name:'متجر أمازون',time:'اليوم 08:20 ص', type: 'enquiry' },
  { id: 7, name: 'استفسار حول دعم السيرفر',store_name:'متجر أمازون',time:'اليوم 08:20 ص', type: 'enquiry' },
  { id: 8, name: 'قبول متجر نون',store_name:'جديد',time:'', type: 'acceptance' },
];

const NotificationsPage = () => {
  const [data, setData] = useState([]);
  return (
    <div className={`relative h-full py-10 pl-36 pr-24`} style={{ backgroundColor: "#F7F7F7" }}>
      <h3 style={{ fontSize: '24px', color: '#011723' }} className="font-bold">الاشعارات</h3>
      <div className="mt-8">
        <div className="flex flex-row items-center gap-3">
          <input style={{ width:'18px',height:'18px' }} type="checkbox" />
          <label style={{ color:'#011723',fontSize:'18px' }} htmlFor="all">تحديد الكل</label>
        </div>
        <div className="flex flex-col gap-4 flex-wrap mt-4">
          {cases.map((box, index) => (
            <div 
                key={index} 
                style={{boxShadow: '3px 3px 6px #00000005'}} 
                className="bg-white w-full flex flex-row items-center justify-between gap-2 px-4 py-2"
            >
              <div className="w-full flex flex-row items-center gap-8">
                  <input style={{ width:'18px',height:'18px' }} type="checkbox" />
                  <div className="w-full flex flex-row items-center justify-between pl-20">
                      <div className="flex flex-col gap-1">
                        <h2 style={{ fontSize: '20px', color: '#011723' }} className="font-medium whitespace-nowrap">{box.name}</h2>
                        {
                          box.type==='enquiry'?
                          (<p style={{ fontSize: '18px', color: '#011723' }}>{box.store_name}</p>) :
                          (<p style={{ fontSize: '18px', color: '#1DBBBE' }}>{box.store_name}</p>)
                        }
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: '#A7A7A7' }} className="font-light">{box.type==='enquiry'? box.time :''}</p>
                      </div>
                  </div>
              </div>
              <div className="flex flex-row items-center gap-7">
                  {
                    box.type==='enquiry'?
                     (<img className="cursor-pointer" src={CommunicationSendOutlined} alt="communication-send-outlined-icon" />) :
                     (<img className="cursor-pointer" src={ShowStoreRequest} alt="show-store-request-icon" />)
                  }
                  <img className="cursor-pointer" src={Delete} alt="delete-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
