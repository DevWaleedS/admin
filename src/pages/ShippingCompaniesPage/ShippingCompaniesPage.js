import React, { useState } from "react";
import Switch from "@mui/material/Switch";

const companies = [{ id: 1, name: 'شركة رقم 1', api: '', active: true }, { id: 2, name: 'شركة رقم 2', api: '', active: true }];

const ShippingCompaniesPage = () => {
  const [data, setData] = useState([]);
  const [api, setApi] = useState('');
  return (
    <div
      className="relative h-full md:py-[52px] md:pl-[238px] md:pr-[98px] p-4 pt-0"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <h3 style={{ color: '#011723' }} className="md:text-[24px] text-[20px] font-bold">شركات الشحن</h3>
      <div className="flex flex-col md:gap-8 gap-4 md:mt-20 mt-6">
        {companies.map((company, index) => (
          <div key={index} className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-3">
              <Switch
                onChange={() => {
                  const findIndex = companies.findIndex(
                    (item) => item.id === company.id
                  );
                  const arr = [...companies];
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
                checked={company.active}
              />
              <h6 style={{ color: '#011723' }} className="md:text-[22px] text-[18px] font-medium">{company.name}</h6>
            </div>
            <div className="flex md:flex-row flex-col md:items-center items-start md:gap-5 gap-3">
              <label style={{ color: '#011723' }} className="md:text-[22px] text-[18px] font-medium" htmlFor="api">API</label>
              <input
                style={{ color: '#ADB5B9' }}
                className="md:text-[18px] text-[16px] w-full md:h-14 h-[45px] bg-white py-4 px-5 outline-none rounded-md"
                placeholder="api link"
                value={api}
                onChange={(e) => {
                  setApi(e.target.value);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingCompaniesPage;
