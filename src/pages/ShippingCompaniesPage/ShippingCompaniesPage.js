import React, { useState } from "react";
import Switch from "@mui/material/Switch";

const companies = [{ id: 1, name: 'شركة رقم 1', api: '', active: true }, { id: 2, name: 'شركة رقم 2', api: '', active: true }];

const ShippingCompaniesPage = () => {
  const [data, setData] = useState([]);
  const [api, setApi] = useState('');
  return (
    <div
      className="relative h-full py-[52px] pl-[238px] pr-[98px]"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <h3 style={{ fontSize: '24px', color: '#011723' }} className="font-bold">شركات الشحن</h3>
      <div className="flex flex-col gap-8 mt-20">
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
              <h6 style={{ fontSize: '22px', color: '#011723' }} className="font-medium">{company.name}</h6>
            </div>
            <div className="flex flex-row items-center gap-5">
              <label style={{ fontSize: '22px', color: '#011723' }} className="font-medium" htmlFor="api">API</label>
              <input
                style={{ color: '#ADB5B9', fontSize: '18px' }}
                className="w-full bg-white py-4 px-5 outline-none rounded-md"
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
