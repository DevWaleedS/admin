import React from "react";

const InputsComps = () => {
  return (
    <div className="mt-10 pr-24 pl-40 pb-24">
      <div className="mb-5">
        <h2 className="font-medium" style={{ fontSize: "18px" }}>
          اسم المنصة
        </h2>
        <label htmlFor="">
          <input
            className="outline-none w-full p-3 mt-3 rounded"
            style={{ border: "none" }}
            type="text"
            placeholder="ادخل اسم المنصة"
          />
        </label>
      </div>
      <div className="mb-5">
        <h2 className="font-medium" style={{ fontSize: "18px" }}>
          وصف المنصة
        </h2>
        <label htmlFor="">
          <input
            className="outline-none w-full p-3 mt-3 rounded"
            style={{ border: "none" }}
            type="text"
            placeholder="اكتب وصف للمنصة"
          />
        </label>
      </div>
      <div className="mb-5">
        <h2 className="font-medium" style={{ fontSize: "18px" }}>
          رابط المنصة
        </h2>
        <label htmlFor="">
          <input
            className="outline-none w-full p-3 mt-3 rounded"
            style={{ border: "none" }}
            type="text"
            placeholder="www.sample.com"
          />
        </label>
      </div>
      <div className="mb-5">
        <h2 className="font-medium" style={{ fontSize: "18px" }}>
          البريد الالكتروني
        </h2>
        <label htmlFor="">
          <input
            className="outline-none w-full p-3 mt-3 rounded"
            style={{ border: "none" }}
            type="email"
            placeholder="www.sample.com"
          />
        </label>
      </div>
      <div className="mb-5">
        <h2 className="font-medium" style={{ fontSize: "18px" }}>
          العنوان
        </h2>
        <label htmlFor="">
          <input
            className="outline-none w-full p-3 mt-3 rounded"
            style={{ border: "none" }}
            type="text"
            placeholder="ادخل العنوان والاقامة"
          />
        </label>
      </div>
      <div className="mb-5">
        <h2 className="font-medium" style={{ fontSize: "18px" }}>
          رقم الهاتف
        </h2>
        <label htmlFor="">
          <input
            className="outline-none w-full p-3 mt-3 rounded"
            style={{ border: "none" }}
            type="number"
            placeholder="966515131515"
          />
        </label>
      </div>
      <div className="mb-5">
        <h2 className="font-medium" style={{ fontSize: "18px" }}>
          الشعار
        </h2>
        <label htmlFor="">
          <input
            className="outline-none w-full p-3 mt-3 rounded"
            style={{ border: "none" }}
            type="text"
            placeholder="قم برفع شعار للمنصة"
          />
        </label>
      </div>
    </div>
  );
};

export default InputsComps;
