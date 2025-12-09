"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  //   PieChart,
  //   Pie,
  //   Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/* -----------------------------------------------
   TYPE DEFINITIONS
------------------------------------------------ */

// Line chart: completion trend
export interface CompletionTrend {
  day: string;
  completed: number;
  [key: string]: string | number;
}

// Bar chart: steps analytics
export interface StepAnalytics {
  step: string;
  completed: number;
  skipped: number;
  [key: string]: string | number;
}

// Pie chart: device usage
export interface DeviceAnalytics {
  name: string;
  value: number;
  [key: string]: string | number;
}

/* -----------------------------------------------
   COMPONENT
------------------------------------------------ */

const TourChart = () => {
  const [loading, setLoading] = useState(true);

  const [completionTrend, setCompletionTrend] = useState<CompletionTrend[]>([]);
  const [stepData, setStepData] = useState<StepAnalytics[]>([]);
  //   const [deviceData, setDeviceData] = useState<DeviceAnalytics[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch completion trend
        const trendResponse = await fetch('/api/analytics/completion-trend')
        const trendData = await trendResponse.json()
        setCompletionTrend(trendData.trend)

        // Fetch step analytics
        const stepResponse = await fetch('/api/analytics/step-analytics')
        const stepData = await stepResponse.json()

        // Transform to match chart format
        const formattedSteps = stepData.analytics.slice(0, 5).map((item: StepAnalytics) => ({
          step: item.step,
          completed: item.completed,
          skipped: item.skipped,
        }))
        setStepData(formattedSteps)
      } catch (error) {
        console.error('Failed to fetch chart data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  /* -----------------------------------------------
     LOADING STATE (Skeleton)
  ------------------------------------------------ */
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-64 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  /* -----------------------------------------------
     RENDER CHARTS
  ------------------------------------------------ */

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10 lg:mt-16">
      {/* Line Chart – Completion Trend */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Tour Completion Trend (This Week)</CardTitle>
        </CardHeader>

        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={completionTrend}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart – Steps Completed vs Skipped */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Steps Completed vs Skipped</CardTitle>
        </CardHeader>

        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stepData}>
              <XAxis dataKey="step" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#22c55e" />
              <Bar dataKey="skipped" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart – Device Distribution */}
      {/* <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
              >
                <Cell fill="#3b82f6" />
                <Cell fill="#8b5cf6" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default TourChart;
