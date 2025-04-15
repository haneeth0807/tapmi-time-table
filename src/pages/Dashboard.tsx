
import React from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, GraduationCap, Users, Clock } from "lucide-react";

export default function Dashboard() {
  const { role } = useUserRole();

  const stats = [
    {
      title: "Programs",
      value: "2",
      description: "BBA, MBA",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Courses",
      value: "42",
      description: "Active courses",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Faculty",
      value: "18",
      description: "Assigned to courses",
      icon: <Users className="h-5 w-5" />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Class Slots",
      value: "6",
      description: "Available per day",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Badge variant="outline" className="text-sm py-1 px-2">
          {role.charAt(0).toUpperCase() + role.slice(1)} View
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {role === "admin" && (
              <>
                <a href="/courses" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-colors">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Manage Courses</div>
                    <div className="text-sm text-muted-foreground">Add, edit or remove course offerings</div>
                  </div>
                </a>
                <a href="/faculty" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-colors">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Faculty Assignment</div>
                    <div className="text-sm text-muted-foreground">Assign faculty to courses</div>
                  </div>
                </a>
                <a href="/timetable" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-colors">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Generate Timetable</div>
                    <div className="text-sm text-muted-foreground">Create new timetable schedules</div>
                  </div>
                </a>
              </>
            )}
            {role === "faculty" && (
              <a href="/timetable" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-colors">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">View Teaching Schedule</div>
                  <div className="text-sm text-muted-foreground">See your weekly class schedule</div>
                </div>
              </a>
            )}
            {role === "student" && (
              <a href="/timetable" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-colors">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">View Class Timetable</div>
                  <div className="text-sm text-muted-foreground">See your weekly class schedule</div>
                </div>
              </a>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current timetable status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Current Academic Year:</div>
              <Badge variant="outline">2023-24</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Current Semester:</div>
              <Badge variant="outline">Summer</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Timetable Status:</div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Last Updated:</div>
              <span className="text-sm text-gray-500">April 10, 2023</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
