import React, { useState } from "react";
import styles from "./AddNewCourse.module.css";
import { GoArrowRight } from "react-icons/go";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { TagsInput } from "react-tag-input-component";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "../../../UI/Button/Button";
import { IoAddCircleSharp } from "react-icons/io5";
import AddUnit from "./AddUnit/AddUnit";

const AddNewCourse = ({ cancel }) => {
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [description, setDescription] = useState({
    htmlValue: "<h1></h1>\n",
    editorState: EditorState.createEmpty(),
  });
  const [tagsSelected, setTagsSelected] = useState([]);
  console.log(description);
  const onEditorStateChange = (editorValue) => {
    const editorStateInHtml = draftToHtml(
      convertToRaw(editorValue.getCurrentContent())
    );
    console.log(editorStateInHtml);

    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue,
    });
  };

  return (
    <div
      className="absolute pl-36  top-0 right-0  z-10  w-full h-full otlobha_acadmic"
      style={{ backgroundColor: "#fafafa" }}
    >
      {showAddUnit && (
        <AddUnit
          cancel={() => {
            setShowAddUnit(false);
          }}
          cancelAll={cancel}
        ></AddUnit>
      )}
      <div className="flex justify-between items-center mb-2">
        <div className="flex">
          <div className={`flex items-center gap-2 `}>
            <div
              onClick={cancel}
              className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}
            >
              <GoArrowRight style={{ color: "#02466A", fontSize: "1.2rem" }} />
            </div>

            <h2 className="font-semibold ml-4"> الإعدادات </h2>
          </div>

          <h2 className="font-semibold ml-4"> / جدول الدول </h2>

          <h3 className="font-medium" style={{ color: "#67747B" }}>
            / اضافة دولة
          </h3>
        </div>
      </div>
      <div className="mt-4 pr-24">
        <div>
          <h2 className="font-medium">اسم النشاط</h2>
          <label>
            <input
              className="w-full outline-none shadow-sm rounded-md p-4 my-4"
              placeholder="ادخل اسم النشاط"
              type="text"
              name="name"
            />
          </label>
        </div>
        <div>
          <h2 className="font-medium mb-4">الوصف</h2>
          <Editor
            toolbarHidden={false}
            editorState={description.editorState}
            onEditorStateChange={onEditorStateChange}
            inDropdown={true}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            toolbar={{
              options: ["inline", "textAlign"],
              inline: {
                options: ["bold", "italic"],
              },
            }}
          />
        </div>

        <div className="mt-5">
          <h2 className="font-medium">محاور الكورس Tags</h2>
          <TagsInput
            value={tagsSelected}
            onChange={setTagsSelected}
            name="القسم"
            placeHolder="القسم"
          />
        </div>
        <div className="mt-16">
          <h2 className="mb-2">مدة الكورس</h2>
          <div className="flex">
            <input
              className="flex-1 p-4 outline-none"
              style={{
                backgroundColor: "#F4F5F7",
                border: "1px solid #67747B33",
              }}
              type="text"
              placeholder="دقيقة"
            />
            <input
              className="flex-1 p-4 outline-none"
              style={{
                backgroundColor: "#F4F5F7",
                border: "1px solid #67747B33",
              }}
              type="text"
              placeholder="ساعة"
            />
          </div>
        </div>
        <div className="flex mt-10 gap-4">
          <Button
            style={{ backgroundColor: "#02466A" }}
            className={"flex-1"}
            type={"normal"}
            svg={<IoAddCircleSharp color={"#fff"} />}
            onClick={() => {
              setShowAddUnit(true);
            }}
          >
            إضافة وحدة
          </Button>
          <Button
            style={{ borderColor: "#02466A" }}
            textStyle={{ color: "#02466A" }}
            className={"flex-1"}
            type={"outline"}
            onClick={cancel}
          >
            إلغاء
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewCourse;
