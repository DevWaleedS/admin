import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const IncreaseRateChartPiece = ({chartInfo}) => {
  const data = [
    {
      name: "Jan",
      uv: chartInfo?.[1]?.active,
      pv: chartInfo?.[1]?.not_active,
    },
    {
      name: "Feb",
      uv: chartInfo?.[2]?.active,
      pv: chartInfo?.[2]?.not_active,
    },
    {
      name: "Mar",
      uv: chartInfo?.[3]?.active,
      pv: chartInfo?.[3]?.not_active,
    },
    {
      name: "Apr",
      uv: chartInfo?.[4]?.active,
      pv: chartInfo?.[4]?.not_active,
    },
    {
      name: "May",
      uv: chartInfo?.[5]?.active,
      pv: chartInfo?.[5]?.not_active,
    },
    {
      name: "Jun",
      uv: chartInfo?.[6]?.active,
      pv: chartInfo?.[6]?.not_active,
    },
    {
      name: "Jul",
      uv: chartInfo?.[7]?.active,
      pv: chartInfo?.[7]?.not_active,
    },
    {
      name: "Aug",
      uv: chartInfo?.[8]?.active,
      pv: chartInfo?.[8]?.not_active,
    },
    {
      name: "Sep",
      uv: chartInfo?.[9]?.active,
      pv: chartInfo?.[9]?.not_active,
    },
    {
      name: "Oct",
      uv: chartInfo?.[10]?.active,
      pv: chartInfo?.[10]?.not_active,    
    },
    {
      name: "Nov",
      uv: chartInfo?.[11]?.active,
      pv: chartInfo?.[11]?.not_active,
    },
    {
      name: "Dec",
      uv: chartInfo?.[12]?.active,
      pv: chartInfo?.[12]?.not_active,
    },
  ];

  return (
    <div className="md:mt-[2.5rem] mt-1" style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal vertical={false} />
          <XAxis axisLine={false} tickLine={false} dataKey="name" />
          <YAxis
            axisLine={false}
            tickLine={false}
            yAxisId="left"
            orientation="left"
            tickMargin={30}
            tickFormatter={(e) => {
              return `${e > 999 ? `${e * 1}K` : e}`;
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            yAxisId="right"
            orientation="right"
            tickMargin={30}
            tickFormatter={(e) => {
              return `${e > 999 ? `${e * 1}K` : e}`;
            }}
          />

          <Bar yAxisId="left" dataKey="uv" fill="#B6BE34" barSize={6} />
          <Bar yAxisId="right" dataKey="pv" fill="#b6be3480" barSize={6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncreaseRateChartPiece;
