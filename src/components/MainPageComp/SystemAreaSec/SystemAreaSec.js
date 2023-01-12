import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PieChartSec from "./PieChartSec/PieChartSec";
import MapChartSec from "./MapChartSec/MapChartSec";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const SystemAreaSec = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 4, height: "16rem" }}>
      <Grid container spacing={2}>
        <Grid className="shadow-xl" sx={{ height: "16rem" }} item xs={4}>
          <Item sx={{ height: "1", p: "1rem" }}>
            <h2 className="font-medium">إجمالي استخدام النظام</h2>
            <PieChartSec />
          </Item>
        </Grid>
        <Grid className="shadow-xl" sx={{ height: "16rem" }} item xs={8}>
          <Item sx={{ height: "1", p: "1rem" }}>
            <h2 className="font-medium text" style={{ color: "#1DBBBE" }}>
              المناطق الأكثر اشتراكاً
            </h2>
            <MapChartSec />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemAreaSec;
