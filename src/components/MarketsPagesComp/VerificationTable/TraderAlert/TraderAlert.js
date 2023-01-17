import React, { useState } from "react";
import styles from "./TraderAlert.module.css";
import Button from "../../../../UI/Button/Button";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { FiSend } from "react-icons/fi";
const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10"
    ></div>
  );
};

const TraderAlert = ({ cancel, traderPackageDetails }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState({
    htmlValue: "<h1></h1>\n",
    editorState: EditorState.createEmpty(),
  });

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
    <>
      <BackDrop onClick={cancel} />
      <div
        className="fixed trader_alert   flex flex-col top-1/2 translate-x-2/4 -translate-y-2/4 right-2/4 z-20 rounded-lg overflow-hidden"
        style={{ width: "51.25rem", maxHeight: "662px" }}
      >
        <div
          className="h-16 w-full flex items-center justify-center py-4 px-4 trader_alert"
          style={{ backgroundColor: "#1DBBBE" }}
        >
          <h2 style={{ fontSize: '22px', color: '#ECFEFF' }} className="font-medium text-center">ارسال ملاحظة</h2>
        </div>
        <div className="flex-1 pb-4"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          <div style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
            className="flex flex-row items-center gap-4 px-5 py-4">
            <h2 style={{ fontSize: '20px', color: '#011723' }} className="font-medium">
              إلى
            </h2>
            <span style={{ fontSize: '20px', color: '#67747B' }} className="font-medium">{traderPackageDetails.store}</span>
          </div>
          <textarea
            style={{ fontSize: '18px', color: '#67747B' }}
            className="w-full p-4 text-md font-medium outline-none"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="الموضوع"
            rows={3}
          >
          </textarea>
          <div style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }}
            className="flex flex-row items-center gap-4 px-5 py-4">
            <h2 className="text-md font-medium">
              نص الرسالة
            </h2>
          </div>
          <div
            className={styles.editor}
          >
            <Editor
              toolbarHidden={false}
              editorState={description.editorState}
              onEditorStateChange={onEditorStateChange}
              inDropdown={true}
              placeholder="الرسالة النصية"
              editorClassName="demo-editor"
              toolbar={{
                options: ["inline", "textAlign"],
                inline: {
                  options: ["bold", "italic"],
                },
              }}
            />
          </div>
          <div className="flex gap-5 justify-center">
            <Button
              onClick={cancel}
              type={"normal"}
              className={"text-center mt-12"}
              style={{ fontSize: '20px', backgroundColor: "#02466A" }}
              svg={<FiSend color={"#fff"} />}
            >
              ارسال
            </Button>
            <Button
              type={"outline"}
              className={"text-center  mt-12"}
              style={{ borderColor: "#02466A" }}
              textStyle={{ fontSize: '20px', color: "#02466A" }}
              onClick={cancel}
            >
              الغاء
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TraderAlert;
