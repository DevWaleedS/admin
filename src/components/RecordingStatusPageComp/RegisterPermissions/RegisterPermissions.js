import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RegisterPermission from "./RegisterPermission/RegisterPermission";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
}));

const arr = ["التسجيل مع موافقة الإدارة", "إيقاف التسجيل", "التسجيل تلقائي"];

const RegisterPermissions = () => {
  const [selected, setSelected] = useState(0);
  return (
    <Box className="mt-8">
      <Grid container spacing={0}>
        {arr.map((item, idx) => {
          return (
            <Grid item xs={4}>
              <Item>
                <RegisterPermission
                  key={idx}
                  title={item}
                  selected={selected === idx}
                  index={idx}
                  onClick={() => {
                    setSelected(idx);
                  }}
                />
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default RegisterPermissions;
