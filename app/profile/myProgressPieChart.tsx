"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

export default function MyProgressPieChart({ userId }: { userId?: string }) {
  const router = useRouter();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const hasFetchedStatusesRef = useRef(false);

  useEffect(() => {
    if (hasFetchedStatusesRef.current) return;
    hasFetchedStatusesRef.current = true;
    fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/statuses${userId ? `?userId=${userId}` : ""}`,
    )
      .then((response) => response.json())
      .then((data) => setStatuses(data));
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!isMounted) {
    return (
      <div
        aria-hidden
        className="w-full"
        style={{ minWidth: 200, aspectRatio: 1 }}
      />
    );
  }

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
