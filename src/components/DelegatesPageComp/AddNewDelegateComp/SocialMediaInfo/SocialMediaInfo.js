import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsWhatsapp,
  BsSnapchat,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";

const SocialMediaInfo = () => {
  return (
    <div className="mt-14">
      <h2 className="text-xl font-semibold mb-3">التواصل الاجتماعى</h2>
      <div className="py-4 px-5" style={{ backgroundColor: "#fff" }}>
        <div className="mb-5">
          <h2 className="font-medium" style={{ fontSize: "18px" }}>
            رقم واتساب
          </h2>
          <label className={` flex-1 relative   `}>
            <input
              className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
              placeholder=""
              type="text"
              name="number"
              onChange={() => {
                console.log("zed");
              }}
              style={{
                border: "1px solid #E9E9E9",
              }}
            />
            <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
              <BsWhatsapp color="#ADB5B9" size={"18px"}></BsWhatsapp>
            </div>
          </label>
        </div>
        <div className="mb-5">
          <h2 className="font-medium" style={{ fontSize: "18px" }}>
            سناب شات
          </h2>
          <label className={` flex-1 relative   `}>
            <input
              className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
              placeholder=""
              type="text"
              name="number"
              onChange={() => {
                console.log("zed");
              }}
              style={{
                border: "1px solid #E9E9E9",
              }}
            />
            <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
              <BsSnapchat color="#ADB5B9" size={"18px"}></BsSnapchat>
            </div>
          </label>
        </div>
        <div className="mb-5">
          <h2 className="font-medium" style={{ fontSize: "18px" }}>
            فيسبوك
          </h2>
          <label className={` flex-1 relative   `}>
            <input
              className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
              placeholder=""
              type="text"
              name="number"
              onChange={() => {
                console.log("zed");
              }}
              style={{
                border: "1px solid #E9E9E9",
              }}
            />
            <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
              <BsFacebook color="#ADB5B9" size={"18px"}></BsFacebook>
            </div>
          </label>
        </div>
        <div className="mb-5">
          <h2 className="font-medium" style={{ fontSize: "18px" }}>
            تويتر
          </h2>
          <label className={` flex-1 relative   `}>
            <input
              className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
              placeholder=""
              type="text"
              name="number"
              onChange={() => {
                console.log("zed");
              }}
              style={{
                border: "1px solid #E9E9E9",
              }}
            />
            <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
              <BsTwitter color="#ADB5B9" size={"18px"}></BsTwitter>
            </div>
          </label>
        </div>
        <div className="mb-5">
          <h2 className="font-medium" style={{ fontSize: "18px" }}>
            انستجرام
          </h2>
          <label className={` flex-1 relative   `}>
            <input
              className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
              placeholder=""
              type="text"
              name="number"
              onChange={() => {
                console.log("zed");
              }}
              style={{
                border: "1px solid #E9E9E9",
              }}
            />
            <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
              <BsInstagram color="#ADB5B9" size={"18px"}></BsInstagram>
            </div>
          </label>
        </div>
        <div className="mb-5">
          <h2 className="font-medium" style={{ fontSize: "18px" }}>
            يوتيوب
          </h2>
          <label className={` flex-1 relative   `}>
            <input
              className="h-full p-4 w-full outline-0 mt-3 pr-10 rounded-lg "
              placeholder=""
              type="text"
              name="number"
              onChange={() => {
                console.log("zed");
              }}
              style={{
                border: "1px solid #E9E9E9",
              }}
            />
            <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
              <BsYoutube color="#ADB5B9" size={"18px"}></BsYoutube>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaInfo;
