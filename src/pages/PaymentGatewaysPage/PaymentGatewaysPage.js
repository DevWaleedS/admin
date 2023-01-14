import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import mada from '../../assets/images/mada.png';
import stc from '../../assets/images/stc.png';
import paypal from '../../assets/images/paypal.png';

const payments = [{ id: 1, name:'mada',img:mada, active: true }, { id: 2, name: 'stc',img:stc, active: true }, { id: 3, name: 'paypal',img:paypal, active: true }];

const PaymentGatewaysPage = () => {
  const [data, setData] = useState([]);
  return (
    <div
      className="relative h-full py-12 pl-36 pr-24"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <h3 style={{ fontSize: '24px', color: '#011723' }} className="font-bold">بوابات الدفع</h3>
      <div className="flex flex-row items-center gap-4 flex-wrap mt-20">
        {payments.map((payment, index) => (
          <div style={{ width:'280px',height:'120px' }} key={index} className="flex flex-col items-center gap-5">
            <div style={{ boxShadow: '3px 3px 6px #0000000A'}} 
                  className="w-full flex flex-row items-center justify-center bg-white p-8 rounded-sm"
            >
              <img src={payment.img} alt={payment.name} style={{ width:'85px', height:'35px' }}/>
            </div>
            <Switch
                onChange={() => {
                  const findIndex = payments.findIndex(
                    (item) => item.id === payment.id
                  );
                  const arr = [...payments];
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
                checked={payment.active}
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentGatewaysPage;
