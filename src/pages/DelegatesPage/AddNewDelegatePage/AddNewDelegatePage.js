import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import TabsComp from "../../../components/DelegatesPageComp/AddNewDelegateComp/TabsComp/TabsComp";
import CopyRights from "../../../components/DelegatesPageComp/AddNewDelegateComp/CopyRights/CopyRights";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "../../../UI/Button/Button";

const DelegatesTablePage = () => {
  const [valid, setValid] = useState(false);
  return (
    <div
      className={`md:px-5 md:py-10 p-4 pt-0`}
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="flex justify-between items-center md:text-lg text-[16px] font-medium">
        <PageNavigate
          nestedPage={true}
          parentPage={"عرض المندوبين"}
          currentPage={"اضافة مندوب جديد"}
        />
      </div>
      <TabsComp></TabsComp>
      <CopyRights></CopyRights>
      <FormGroup>
        <FormControlLabel
          sx={{
            mt: '40px',
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
        className={"mt-[26px] py-4"}
        type={"normal"}
        style={{ width: "100%" }}
      >
        تسجيل
      </Button>
    </div>
  );
};

export default DelegatesTablePage;
