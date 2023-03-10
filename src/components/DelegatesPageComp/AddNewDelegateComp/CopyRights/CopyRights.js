import React from "react";

const CopyRights = () => {
  return (
    <div className="mt-5">
      <h2
        className="font-medium"
        style={{ fontSize:'20px', color: "#011723" }}
      >
        الشروط والاحكام
      </h2>
      <div
        className="md:h-[175px] h-full bg-white overflow-scroll hide_scrollbar mt-[10px] p-4"
        style={{ boxShadow:'0px 3px 6px #0000000F' }}
      >
        <p>
          ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت
          تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد
          الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص
          العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من
          الأحيان أن يطلع على صورة حقيقية لتصميم الموقع
        </p>
      </div>
    </div>
  );
};

export default CopyRights;
