import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import PersonalInfo from "../../../components/DelegatesPageComp/AddNewDelegateComp/PersonalInfo/PersonalInfo";
import CopyRights from "../../../components/DelegatesPageComp/AddNewDelegateComp/CopyRights/CopyRights";

import SocialMediaInfo from "../../../components/DelegatesPageComp/AddNewDelegateComp/SocialMediaInfo/SocialMediaInfo";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "../../../UI/Button/Button";

const DelegatesTablePage = () => {
  const [valid, setValid] = useState(false);
  return (
    <div
      className={`mt-5 px-4 pt-4 pl-36`}
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="mt-6 flex justify-between items-center">
        <PageNavigate
          nestedPage={true}
          parentPage={"عرض المناديب"}
          currentPage={"اضافة مندوب جديد"}
        />
      </div>
      <PersonalInfo></PersonalInfo>
      <SocialMediaInfo></SocialMediaInfo>
      <CopyRights></CopyRights>
      <FormGroup>
        <FormControlLabel
          sx={{
            py: 1,
            mr: 0,
            "& .MuiTypography-root": {
              fontSize: "18px",
              fontWeight: "500",
              color: "#1DBBBE",
            },
          }}
          control={
            <Checkbox
              onChange={() => {
                setValid(!valid);
              }}
              sx={{ "& path": { fill: "#1DBBBE" } }}
            />
          }
          label="أوافق على الشروط أعلاه"
        />
      </FormGroup>
      <Button
        disabled={!valid}
        className={"mt-6 py-4"}
        type={"normal"}
        style={{ width: "100%" }}
      >
        تسجيل
      </Button>
    </div>
  );
};

export default DelegatesTablePage;
