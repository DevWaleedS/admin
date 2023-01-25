import { PieChart, Pie, Sector, Cell } from "recharts";

const data = [
  { name: "Group A", value: 15 },
  { name: "Group B", value: 35 },
  { name: "Group C", value: 50 },
];
const COLORS = ["#B6BE34", "#1DBBBE", "#02466A"];
const TITLES = ["15% تابلت", "35% لابتوب", "50% موبايل"];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <text
        className="text-[22px] font-bold"
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={"#000"}
      >
        100%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const PieChartSec = () => {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <PieChart width={200} height={200}>
          <Pie
            activeIndex={0}
            activeShape={renderActiveShape}
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4">
        {COLORS.map((color, idx) => {
          return (
            <div className="flex gap-2 items-center">
              <div
                className=" h-4 w-4 rounded-full"
                style={{ backgroundColor: `${color}` }}
              ></div>
              <h2 className='text-[15px] text-medium'>{TITLES[idx]}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChartSec;
