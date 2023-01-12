import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import CommentPageTable from "../../../components/TemplatePageComps/CommentsPage/CommentPageTable/CommentPageTable";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IoIosArrowDown } from "react-icons/io";

const categoryList = ["التجار", "العملاء"];

const CommentsPage = () => {
  const [category, setCategory] = useState("");
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div
      className={`mt-5 px-4 pt-4 pl-36`}
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="mt-6">
        <PageNavigate
          nestedPage={true}
          parentPage={"تنسيق القالب"}
          currentPage={"التعليقات"}
        />
      </div>
      <div className={"mt-8"}>
        <FormControl sx={{ minWidth: 120, flex: "1" }}>
          <Select
            value={category}
            IconComponent={() => {
              return <IoIosArrowDown size={"1rem"} />;
            }}
            onChange={handleCategory}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            renderValue={(selected) => {
              if (category === "") {
                return <h2>جميع المستخدمين</h2>;
              }
              return selected;
            }}
            sx={{
              height: "3.5rem",
              backgroundColor: "#fff",
              pl: "1rem",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-select": {
                width: "8rem",
              },
            }}
          >
            {categoryList.map((item) => {
              return (
                <MenuItem
                  className=""
                  sx={{
                    backgroundColor: "#fff",
                    height: "3rem",

                    "&:hover": {},
                    "ul:has(&)": {
                      padding: "0",
                    },
                  }}
                  value={`${item}`}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="mt-10" dir={"ltr"}>
        <CommentPageTable></CommentPageTable>
      </div>
    </div>
  );
};

export default CommentsPage;
