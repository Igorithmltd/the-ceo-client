import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const data = [
  { value: 5, label: "A" },
  { value: 10, label: "B" },
  { value: 15, label: "C" },
  { value: 20, label: "D" },
];

const size = {
  width: 400,
  height: 200,
};

const CenteredText = styled("div")({
  position: "absolute",
  top: "50%",
  left: "38%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  fontSize: "20px",
  color: "#000",
});

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function DonutChart() {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  return (
    <div className="relative flex items-center justfy-center">
      <PieChart
        colors={["#e12533", "#e5e7eb", "#bfdbfe", "#fca5a5", "#6b7280", "#dbeafe"]} // Use palette
        series={[
          {
            data: [
              { id: 0, value: 55 },
              { id: 1, value: 15 },
              { id: 2, value: 23 },
              { id: 4, value: 34 },
              { id: 5, value: 18 },
              { id: 3, value: 20 },
            ],
            innerRadius: 60,
            // startAngle: -45,
            // endAngle: 225,
          },
        ]}
        width={400}
        height={200}
      />
      <CenteredText>
        <div
          className="flex flex-col gap-1 px-6 py-4 items-center 
          shadow-md bg-gray-300 rounded-[7px] font-bold text-[12px]"
        >
          <span>Total</span>
          <span>₦7.3M</span>
        </div>
      </CenteredText>
      {/*</PieChart>*/}
    </div>
  );
}

// terLab
// export default function PieChartWithCenel() {
//   return (
//     <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
//       <PieCenterLabel>Center label</PieCenterLabel>
//     </PieChart>
//   );
// }
