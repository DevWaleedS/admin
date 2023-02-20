import React, { useState } from "react";
import Button from "../../../UI/Button/Button";
import useFetch from '../../../hooks/useFetch';
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10"
    ></div>
  );
};
const PackageTemplate = ({ getSelectedTemplate,cancel }) => {
  const { fetchedData, loading } = useFetch('https://backend.atlbha.com/api/Admin/selector/templates');
  const [templateSelected, setTemplateSelected] = useState([]);
  getSelectedTemplate(templateSelected);
  return (
    <>
      <BackDrop onClick={cancel} />
      <div
        className="w-full fixed flex flex-col top-16 translate-x-2/4  right-2/4 z-20 rounded-lg overflow-hidden"
      >
        {loading ?
          (
            <div className="mt-28">
              <CircularLoading />
            </div>

          )
          :
          (
            <div className="flex flex-col items-center">
              <div className="flex-1 flex flex-row items-center justify-center flex-wrap md:px-10 md:py-12 p-4 md:gap-6 gap-4">
                {fetchedData?.data?.templates?.map((item, index) => (
                  <div key={index} className="md:w-[250px] w-[162px] md:h-[250px] h-[150px] rounded-md flex flex-col"
                    style={{ backgroundColor: '#ECFEFF', border: '1px solid #B4EDEE' }}
                  >
                    <div className="w-full flex-1 flex flex-col items-center justify-center">
                      <h6 style={{ color: '#011723', fontSize: '18px' }} className="font-medium">{item.name}</h6>
                    </div>
                    <div style={{ height: '45px', backgroundColor: '#FF38380A' }} className="w-full flex flex-col items-center justify-center">
                      <input
                        style={{ width: '16px', height: '16px' }}
                        type="checkbox"
                        value={item.id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTemplateSelected([...templateSelected, parseInt(e.target.value)])
                          }
                          else {
                            setTemplateSelected(
                              templateSelected.filter((template) => parseInt(template) !== item.id)
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:w-[572px] w-[338px] flex  flex-row items-center">
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
          )}
      </div>
    </>
  );
};

export default PackageTemplate;
