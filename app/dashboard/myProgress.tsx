"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
} from "recharts";
import { Status } from "../types";

const RADIAN = Math.PI / 180;
const COLORS = ["#bc1c0d", "#af6900", "#076554"];

export default function MyProgress() {
  const router = useRouter();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [hasFetchedStatuses, setHasFetchedStatuses] = useState(false);

  useEffect(() => {
    if (hasFetchedStatuses) return;
    setHasFetchedStatuses(true);
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/statuses`)
      .then((response) => response.json())
      .then((data) => setStatuses(data));
  }, []);

  return (
    <div className="flex flex-col">
      <PieChart
        style={{
          flex: 1,
          width: "100% !important",
          minWidth: "200px",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={statuses.map(({ id, name, movements }) => ({
            id,
            name,
            value: movements.length,
          }))}
          labelLine={false}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            name,
            id,
          }: PieLabelRenderProps) => {
            if (
              !percent ||
              cx == null ||
              cy == null ||
              innerRadius == null ||
              outerRadius == null
            )
              return null;

            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

            const ncx = Number(cx);
            const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);

            const ncy = Number(cy);
            const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > ncx ? "start" : "end"}
                dominantBaseline="central"
                className="font-bold underline hover:cursor-pointer"
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_DOMAIN}/movements?status=${id}`,
                  )
                }
              >
                {name}: {`${((percent ?? 1) * 100).toFixed(0)}%`}
              </text>
            );
          }}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={true}
          shape={(props: PieSectorShapeProps) => {
            return (
              <Sector {...props} fill={COLORS[props.index % COLORS.length]} />
            );
          }}
        />
      </PieChart>
    </div>
  );
}
