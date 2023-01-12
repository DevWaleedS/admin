import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { ReactComponent as Product } from "../../../assets/Icons/product 24.svg";

const INITIAL_DATA = [
  {
    title: "اجمالي منتجات المخزون",
    amount: 1150,
    icon: (
      <Product
        fill="red"
        style={{
          filter:
            "invert(56%) sepia(81%) saturate(437%) hue-rotate(132deg) brightness(93%) contrast(88%);",
        }}
      />
    ),
  },
  {
    title: "منتجات منتهية",
    amount: 40,
  },
  {
    title: "منتجات تنتهي قريباً",
    amount: 32,
  },
  {
    title: "أحدث المنتجات",
    amount: 28,
  },
  {
    title: "أكثر المنتجات طلباً",
    amount: 110,
  },
];

const StorageStatus = () => {
  return (
    <Stack sx={{ flexGrow: 1, gap: "1rem", mt: "1.5rem" }} direction={"row"}>
      {INITIAL_DATA.map((item) => {
        return (
          <Paper className="flex-1 flex flex-col justify-between h-28 text-center pt-2 pb-4 shadow-xl">
            <h2 className="font-medium text-md">{item.title}</h2>
            {item.icon && (
              <div className="flex justify-center gap-4">
                {item.icon}
                {item.amount}
              </div>
            )}
            {!item.icon && (
              <h2 className="font-semibold text-xl">{item.amount}</h2>
            )}
          </Paper>
        );
      })}
    </Stack>
  );
};

export default StorageStatus;
