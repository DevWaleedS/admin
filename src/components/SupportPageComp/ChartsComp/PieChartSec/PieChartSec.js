// import { PieChart, Pie, Sector, Cell } from "recharts";
import { Pie } from "@ant-design/plots";

const data = [
  { name: "Group A", value: 32 },
  { name: "Group B", value: 16 },
];
const COLORS = ["#B6BE34", "#02466A"];
const TITLES = ["شكاوى تمت معالجتها", "شكاوى قيد المعالجة"];
const total = data.reduce((a, b) => {
  if (b < 5) {
    return;
  }
  return a + b.value;
}, 0);

// const renderActiveShape = (props: any) => {
//   const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
//     props;

//   return (
//     <g className="flex">
//       <text
//         className="text-xl font-medium -translate-y-4"
//         x={cx}
//         y={cy}
//         dy={8}
//         textAnchor="middle"
//         fill={"#000"}
//       >
//         1111dsad
//       </text>
//       <text
//         className="text-xl font-medium translate-y-4"
//         x={cx}
//         y={cy}
//         dy={8}
//         textAnchor="middle"
//         fill={"#000"}
//       >
//         1111dsaxsadd
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//     </g>
//   );
// };

const PieChartSec = () => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "name",
    tooltip: false,
    radius: 5,
    color: COLORS,
    radius: 1,
    height: 140,
    width: 200,
    innerRadius: 0.85,
    legend: false,
    annotations: [
      {
        type: "regionFilter",
        position: ["", "0"],
        content: "0",
        style: {
          fill: "red",
        },
      },
    ],
    label: {
      content: "",
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: "400",
          color: "#02466A",
        },
        content: `${total}\nشكوى`,
      },
    },
  };
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        {/* <PieChart width={200} height={130}>
          <Pie
            activeIndex={0}
            activeShape={renderActiveShape}
            data={data}
            innerRadius={70}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className={`${index}`}
              />
            ))}
          </Pie>
        </PieChart> */}
        <Pie {...config} />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4">
        {COLORS.map((color, idx) => {
          return (
            <div key={idx} className="flex gap-3 ">
              <div
                className="h-5 w-5 rounded-full translate-y-1"
                style={{ backgroundColor: `${color}` }}
              ></div>
              <div>
                <h2 className="font-medium md:text[18px] text-[16px]" style={{ color: color }}>
                  {TITLES[idx]}
                </h2>
                <h2 className="font-medium md:text[18px] text-[16px]" style={{ color: color }}>
                  {data[idx].value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChartSec;
