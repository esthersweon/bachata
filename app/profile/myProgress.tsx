"use client";

import { useEffect, useState } from "react";
import { Status } from "../types";

import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
} from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["#bc1c0d", "#af6900", "#076554"];

export default function MyProgress() {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [selectedStatusName, setSelectedStatusName] = useState<string | null>(
    null,
  );
  const [hasFetchedStatuses, setHasFetchedStatuses] = useState(false);

  const selectedStatus = statuses.find(
    ({ name }) => name === selectedStatusName,
  );

  useEffect(() => {
    if (hasFetchedStatuses) return;
    setHasFetchedStatuses(true);
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/statuses`)
      .then((response) => response.json())
      .then((data) => setStatuses(data));
  }, []);

  return (
    <div className="flex flex-col">
      <h3>My Progress</h3>
      <div className="flex flex-wrap gap-2">
        <PieChart
          style={{
            flex: 1,
            width: "100% !important",
            minWidth: "200px",
            maxWidth: "350px",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={statuses.map(({ name, movements }) => ({
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
                  onClick={() => setSelectedStatusName(name ?? null)}
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
                <Sector
                  {...props}
                  fill={COLORS[props.index % COLORS.length]}
                  className="hover:cursor-pointer"
                  onClick={() => setSelectedStatusName(props.name ?? null)}
                />
              );
            }}
          />
        </PieChart>
        <div className="flex flex-1 flex-wrap gap-4 justify-center">
          {statuses.map(({ name, movements }, index) => (
            <div
              key={name}
              className="flex flex-1 flex-col text-center text-nowrap rounded-md"
              style={{ border: `1px solid ${COLORS[index % COLORS.length]}` }}
            >
              <h4
                className="p-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              >
                {name}
              </h4>
              {movements.length > 0 ? (
                <ul className="p-4 flex flex-col gap-2">
                  {movements.map(
                    ({ id, name }: { id: string; name: string }) => (
                      <li key={id}>{name}</li>
                    ),
                  )}
                </ul>
              ) : (
                <div className="p-4">
                  No movements assigned to this status yet.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
