import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Store, User, Service } from "../../../assets/Icons/index";

const QuickDetails = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack gap={5} sx={{ flexDirection: "row" }}>
        <Paper
          sx={{
            flex: "1",
            height: "7.125rem",
            p: "1.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "3rem",
          }}
          className="shadow-xl"
        >
          <div>
            <div
              className="h-12 w-12 flex justify-center items-center rounded"
              style={{ backgroundColor: "rgba(182, 190, 52, 0.4)" }}
            >
              <img src={Store} alt="" />
            </div>
          </div>
          <div className="flex-1 h-full flex flex-col justify-between">
            <h2 className="font-semibold">عدد المتاجر</h2>
            <div className="flex justify-between ">
              <h2 className="font-semibold">170</h2>
              <h6 className="font-semibold text-green-500">20% +</h6>
            </div>
          </div>
        </Paper>
        <Paper
          sx={{
            flex: "1",
            height: "7.125rem",
            p: "1.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "3rem",
          }}
          className="shadow-xl"
        >
          <div>
            <div
              className="h-12 w-12 flex justify-center items-center rounded"
              style={{ backgroundColor: "rgba(29, 187, 190, 0.4)" }}
            >
              <img src={User} alt="" />
            </div>
          </div>
          <div className="flex-1 h-full flex flex-col justify-between">
            <h2 className="font-semibold">عدد المندوبين</h2>
            <div className="flex justify-between ">
              <h2 className="font-semibold">815</h2>
              <h6 className="font-semibold text-green-500">45% +</h6>
            </div>
          </div>
        </Paper>
        <Paper
          sx={{
            flex: "1",
            height: "7.125rem",
            p: "1.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "3rem",
          }}
          className="shadow-xl"
        >
          <div>
            <div
              className="h-12 w-12 flex justify-center items-center rounded"
              style={{ backgroundColor: "rgba(255, 56, 56, 0.4)" }}
            >
              <img src={Service} alt="" />
            </div>
          </div>
          <div className="flex-1 h-full flex flex-col justify-between">
            <h2 className="font-semibold">عدد الخدمات</h2>
            <div className="flex justify-between ">
              <h2 className="font-semibold">6</h2>
              <h6 className="font-semibold text-red-500">45% -</h6>
            </div>
          </div>
        </Paper>
      </Stack>
    </Box>
  );
};

export default QuickDetails;
