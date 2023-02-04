import React,{useContext} from "react";
import { BsPlayCircle } from "react-icons/bs";
import { ReactComponent as BsTrash } from "../../../assets/Icons/icon-24-delete.svg";
import { ReactComponent as Copy } from "../../../assets/Icons/copy icon.svg";
import { ReactComponent as Edit } from "../../../assets/Icons/editt 2.svg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NotificationContext } from "../../../store/NotificationProvider";

const courses = [
  {
    img: "../../../assets/images/drop_shipping_img.png",
    title: "كورس دروب شيبيينج",
    length: "80",
    numberOfVideos: "120",
  },
  {
    img: "../../../assets/images/drop_shipping_img.png",
    title: "كورس دروب شيبيينج",
    length: "80",
    numberOfVideos: "120",
  },
  {
    img: "../../../assets/images/drop_shipping_img.png",
    title: "كورس دروب شيبيينج",
    length: "80",
    numberOfVideos: "120",
  },
  {
    img: "../../../assets/images/drop_shipping_img.png",
    title: "كورس دروب شيبيينج",
    length: "80",
    numberOfVideos: "120",
  },
];

const TrainingCourses = ({EditCourse}) => {
  const NotificationStore = useContext(NotificationContext);
  const { setNotificationTitle,setActionTitle } = NotificationStore;
  return (
    <div className="md:mt-12 mt-6">
      <div>
        {courses.map((course, index) => {
          const image = require("../../../assets/images/drop_shipping_img.png");
          return (
            <div key={index} className="flex md:flex-row flex-col md:items-center items-start justify-between shadow-lg gap-y-4 md:p-0 p-3 mb-4">
              <div className="flex flex-row md:gap-4 gap-3">
                <div className="md:w-40 w-[86px] md:h-40 h-[85px] relative cursor-pointer">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={image}
                    alt=""
                  />
                  <BsPlayCircle
                    className={
                      "absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-4xl"
                    }
                    color={"#fff"}
                  ></BsPlayCircle>
                </div>
                <div className="md:pt-4">
                  <h2
                    className="font-medium md:text-xl text-[18px] md:mb-4 mb-2"
                    style={{ color: "#02466A" }}
                  >
                    {course.title}
                  </h2>
                  <h2 className="mb-1 md:text-lg text-[16px]">{course.length} ساعة</h2>
                  <h2 className="md:text-lg text-[16px]">{course.numberOfVideos} فيديو</h2>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-5 md:pl-6 pr-2">
                <Copy ></Copy>
                <Edit className="cursor-pointer" onClick={() => {EditCourse(course);}}></Edit>
                <VisibilityIcon style={{ color:'#1DBBBE' }}></VisibilityIcon>
                <BsTrash 
                  className="cursor-pointer"
                  onClick={()=>{
                    setNotificationTitle('سيتم حذف الدورة');
                    setActionTitle('تم حذف الدورة بنجاح');
                }}>
                </BsTrash>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingCourses;
