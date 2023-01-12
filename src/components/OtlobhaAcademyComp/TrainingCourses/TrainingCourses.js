import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";

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

const TrainingCourses = () => {
  return (
    <div className="mt-12">
      <div>
        {courses.map((course, index) => {
          const image = require("../../../assets/images/drop_shipping_img.png");
          console.log(`"${course.img}"`);
          return (
            <div key={index} className="flex justify-between shadow-lg  mb-4">
              <div className="flex gap-4">
                <div className="w-40 h-40 relative cursor-pointer">
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
                <div className="pt-4">
                  <h2
                    className="font-medium text-xl mb-4"
                    style={{ color: "#02466A" }}
                  >
                    {course.title}
                  </h2>
                  <h2 className="mb-1 text-lg">{course.length} ساعة</h2>
                  <h2 className=" text-lg">{course.numberOfVideos} فيديو</h2>
                </div>
              </div>
              <div className="flex pl-6 pb-2 items-end">
                <BsTrash color="red" size={"1.2rem"}></BsTrash>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingCourses;
