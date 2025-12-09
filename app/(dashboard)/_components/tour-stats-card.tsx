"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapIcon,
  CheckCircle2Icon,
  PercentIcon,
  ForwardIcon,
  TimerIcon,
  FlagIcon,
  CircleSlash2Icon,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";


interface Stat {
  title: string;
  value: string | number;
  icon: LucideIcon;
}
const TourStatsCard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stat[]>([]);
  // fid loggedIn inqueryparams
  const searchParams = useSearchParams();
  const loggedIn = searchParams.get("loggedIn");

  
useEffect(() => {
  async function fetchStats() {
    try {
      const response = await fetch('/api/analytics/stats')
      const data = await response.json()
      
      // Map the stats to the card format
      setStats([
        {
          title: "Total Tours Created",
          value: data.stats.totalToursCreated,
          icon: MapIcon,
        },
        {
          title: "Total Tours Completed",
          value: data.stats.totalToursCompleted,
          icon: CheckCircle2Icon,
        },
        {
          title: "Completion Rate",
          value: `${data.stats.completionRate}%`,
          icon: PercentIcon,
        },
        {
          title: "Steps Skipped",
          value: data.stats.stepsSkipped,
          icon: ForwardIcon,
        },
        {
          title: "Average Tour Duration",
          value: `${data.stats.averageDurationInMinutes} mins`,
          icon: TimerIcon,
        },
        {
          title: "Active Tours Today",
          value: data.stats.activeToursToday,
          icon: FlagIcon,
        },
        {
          title: "Abandon Rate",
          value: `${data.stats.abandonRate}%`,
          icon: CircleSlash2Icon,
        },
      ])
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  fetchStats()
}, [])

// show already loggedin toast
useEffect(() => {
  if (loggedIn) {
    toast.success(`You are already logged in as ${loggedIn}. Logout first to login to another account`)
  }
}, [loggedIn])

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {loading
        ? [...Array(7)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))
        : stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>

                  <Icon className="h-5 w-5 text-primary" />
                </CardHeader>

                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
    </div>
  );
};

export default TourStatsCard;
