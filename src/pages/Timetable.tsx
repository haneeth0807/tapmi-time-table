import React, { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, RefreshCw, Check, AlertTriangle, Info } from "lucide-react";

// Class slot time definitions
const slotTimes = {
  "A": "8:30 - 9:45",
  "1": "10:00 - 11:15",
  "2": "11:30 - 12:45",
  "Lunch": "12:45 - 2:00",
  "3": "2:00 - 3:15",
  "4": "3:30 - 4:45",
  "B": "5:00 - 6:15"
};

// Mock data for generated timetable
const mockBBATimetable = {
  program: "BBA",
  semester: 1,
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  slots: Object.keys(slotTimes),
  schedule: {
    "Monday": {
      "A": null,
      "1": { course: "Introduction to Business", faculty: "Dr. Sunil Verma" },
      "2": { course: "Management Principles", faculty: "Prof. Anand Mishra" },
      "Lunch": null,
      "3": { course: "Business Communication", faculty: "Dr. Meera Patel" },
      "4": null,
      "B": null,
    },
    "Tuesday": {
      "A": null,
      "1": { course: "Business Mathematics", faculty: "Prof. Ravi Kumar" },
      "2": { course: "Management Principles", faculty: "Prof. Anand Mishra" },
      "Lunch": null,
      "3": { course: "Introduction to Business", faculty: "Dr. Sunil Verma" },
      "4": { course: "Digital Literacy", faculty: "Dr. Priya Sharma" },
      "B": null,
    },
    "Wednesday": {
      "A": null, 
      "1": { course: "Business Communication", faculty: "Dr. Meera Patel" },
      "2": { course: "Business Mathematics", faculty: "Prof. Ravi Kumar" },
      "Lunch": null,
      "3": null,
      "4": { course: "Introduction to Business", faculty: "Dr. Sunil Verma" },
      "B": null,
    },
    "Thursday": {
      "A": null,
      "1": { course: "Management Principles", faculty: "Prof. Anand Mishra" },
      "2": { course: "Digital Literacy", faculty: "Dr. Priya Sharma" },
      "Lunch": null,
      "3": { course: "Business Mathematics", faculty: "Prof. Ravi Kumar" },
      "4": null,
      "B": null,
    },
    "Friday": {
      "A": null,
      "1": { course: "Digital Literacy", faculty: "Dr. Priya Sharma" },
      "2": null,
      "Lunch": null,
      "3": { course: "Business Communication", faculty: "Dr. Meera Patel" },
      "4": { course: "Management Principles", faculty: "Prof. Anand Mishra" },
      "B": null,
    },
  }
};

// Mock data for MBA schedule
const mockMBATimetable = {
  program: "MBA",
  semester: 1,
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  slots: Object.keys(slotTimes),
  schedule: {
    "Monday": {
      "A": null,
      "1": { course: "Marketing Management", faculty: "Dr. Rajesh Kumar" },
      "2": { course: "Financial Management", faculty: "Prof. Amita Sharma" },
      "Lunch": null,
      "3": { course: "Organizational Behavior", faculty: "Dr. Preeti Gupta" },
      "4": { course: "Operations Management", faculty: "Dr. Vijay Mehta" },
      "B": null,
    },
    "Tuesday": {
      "A": null,
      "1": { course: "Operations Management", faculty: "Dr. Vijay Mehta" },
      "2": { course: "Marketing Management", faculty: "Dr. Rajesh Kumar" },
      "Lunch": null,
      "3": { course: "Business Analytics", faculty: "Prof. Rahul Singh" },
      "4": null,
      "B": null,
    },
    "Wednesday": {
      "A": null,
      "1": { course: "Financial Management", faculty: "Prof. Amita Sharma" },
      "2": { course: "Organizational Behavior", faculty: "Dr. Preeti Gupta" },
      "Lunch": null,
      "3": { course: "Marketing Management", faculty: "Dr. Rajesh Kumar" },
      "4": { course: "Business Analytics", faculty: "Prof. Rahul Singh" },
      "B": null,
    },
    "Thursday": {
      "A": null,
      "1": { course: "Organizational Behavior", faculty: "Dr. Preeti Gupta" },
      "2": { course: "Financial Management", faculty: "Prof. Amita Sharma" },
      "Lunch": null,
      "3": { course: "Operations Management", faculty: "Dr. Vijay Mehta" },
      "4": null,
      "B": null,
    },
    "Friday": {
      "A": null,
      "1": { course: "Business Analytics", faculty: "Prof. Rahul Singh" },
      "2": { course: "Financial Management", faculty: "Prof. Amita Sharma" },
      "Lunch": null,
      "3": null,
      "4": { course: "Operations Management", faculty: "Dr. Vijay Mehta" },
      "B": null,
    },
  }
};

// Mock data for faculty timetable
const mockFacultyTimetable = {
  faculty: "Dr. Rajesh Kumar",
  courses: ["Marketing Management", "Consumer Behavior"],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  slots: Object.keys(slotTimes),
  schedule: {
    "Monday": {
      "A": null,
      "1": { course: "Marketing Management", program: "MBA", semester: 1 },
      "2": null,
      "Lunch": null,
      "3": null, 
      "4": null,
      "B": null,
    },
    "Tuesday": {
      "A": null,
      "1": null,
      "2": { course: "Marketing Management", program: "MBA", semester: 1 },
      "Lunch": null,
      "3": null,
      "4": { course: "Consumer Behavior", program: "MBA", semester: 3 },
      "B": null,
    },
    "Wednesday": {
      "A": null,
      "1": null,
      "2": null,
      "Lunch": null,
      "3": { course: "Marketing Management", program: "MBA", semester: 1 },
      "4": null,
      "B": null,
    },
    "Thursday": {
      "A": null,
      "1": null,
      "2": null,
      "Lunch": null,
      "3": { course: "Consumer Behavior", program: "MBA", semester: 3 },
      "4": null,
      "B": null,
    },
    "Friday": {
      "A": null,
      "1": null,
      "2": { course: "Consumer Behavior", program: "MBA", semester: 3 },
      "Lunch": null,
      "3": null,
      "4": null,
      "B": null,
    },
  }
};

// Conflict checking function (simplified for demo)
const checkForConflicts = (timetable) => {
  const conflicts = [];
  
  // Check for faculty assigned to multiple classes at the same time
  const facultySlots = new Map();
  
  Object.entries(timetable.schedule).forEach(([day, slots]) => {
    Object.entries(slots).forEach(([slot, data]) => {
      if (data && data.faculty) {
        const key = `${day}-${slot}`;
        if (facultySlots.has(key)) {
          facultySlots.get(key).push(data.faculty);
        } else {
          facultySlots.set(key, [data.faculty]);
        }
      }
    });
  });
  
  facultySlots.forEach((faculties, key) => {
    if (faculties.length > 1) {
      const [day, slot] = key.split("-");
      conflicts.push({
        type: "Faculty Double Booking",
        description: `Multiple faculty assigned to ${day} ${slot}: ${faculties.join(", ")}`,
        severity: "high"
      });
    }
  });
  
  return conflicts;
};

export default function Timetable() {
  const { role } = useUserRole();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>(role === 'faculty' ? 'faculty' : 'student');
  const [program, setProgram] = useState<string>("BBA");
  const [semester, setSemester] = useState<string>("1");
  const [faculty, setFaculty] = useState<string>("Dr. Rajesh Kumar");
  const [timetableData, setTimetableData] = useState<any>(mockBBATimetable);
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const isAdmin = role === 'admin';

  // Update timetable data when selections change
  React.useEffect(() => {
    if (activeTab === 'student') {
      if (program === 'BBA') {
        setTimetableData(mockBBATimetable);
      } else {
        setTimetableData(mockMBATimetable);
      }
    } else if (activeTab === 'faculty') {
      setTimetableData(mockFacultyTimetable);
    }
  }, [activeTab, program, faculty]);

  const handleGenerateTimetable = () => {
    setIsGenerating(true);
    
    // Simulate timetable generation
    setTimeout(() => {
      setIsGenerating(false);
      const newConflicts = checkForConflicts(timetableData);
      setConflicts(newConflicts);
      
      toast({
        title: newConflicts.length ? "Timetable Generated with Conflicts" : "Timetable Generated Successfully",
        description: newConflicts.length 
          ? `${newConflicts.length} conflicts were found. Please review.`
          : "The timetable has been generated without any conflicts.",
        variant: newConflicts.length ? "destructive" : "default",
      });
    }, 2000);
  };

  const handleDownload = () => {
    toast({
      title: "Download Functionality",
      description: "Export to PDF/Excel would be implemented here in the full version.",
    });
  };

  const getCellStyle = (slot, classInfo) => {
    if (!classInfo || slot === "Lunch") return "";
    
    const baseStyle = "h-full";
    
    // For free slots (A and B)
    if ((slot === "A" || slot === "B") && classInfo) {
      return `${baseStyle} bg-amber-50 border-amber-200`;
    }
    
    return `${baseStyle} bg-blue-50 border-blue-200`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Timetable Management</h1>
          <p className="text-gray-500">Generate and view class schedules</p>
        </div>
        
        <div className="flex gap-3">
          {isAdmin && (
            <Button 
              disabled={isGenerating} 
              onClick={handleGenerateTimetable}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Calendar size={16} />
                  <span>Generate Timetable</span>
                </>
              )}
            </Button>
          )}
          
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download size={16} />
            <span>Download</span>
          </Button>
        </div>
      </div>

      {/* Conflict display for admin */}
      {isAdmin && conflicts.length > 0 && (
        <Card className="border-amber-300 bg-amber-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={18} />
              <CardTitle className="text-lg text-amber-700">Timetable Conflicts ({conflicts.length})</CardTitle>
            </div>
            <CardDescription className="text-amber-700">
              The following conflicts were detected in the timetable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {conflicts.map((conflict, index) => (
                <li key={index} className="border-l-4 border-amber-400 pl-3 py-1 bg-amber-100 rounded-r-md">
                  <p className="text-sm font-medium">{conflict.type}</p>
                  <p className="text-xs text-amber-800">{conflict.description}</p>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="text-amber-700 border-amber-300 hover:bg-amber-200">
              Resolve Conflicts
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Timetable View</CardTitle>
          <CardDescription>
            {activeTab === 'student' 
              ? `${program} Semester ${semester} Schedule` 
              : (activeTab === 'faculty' ? `${faculty}'s Teaching Schedule` : 'All Schedules')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <TabsList>
              <TabsTrigger value="student">Student View</TabsTrigger>
              <TabsTrigger value="faculty">Faculty View</TabsTrigger>
              {isAdmin && <TabsTrigger value="admin">Admin View</TabsTrigger>}
            </TabsList>
            
            <div className="my-4 flex flex-wrap gap-4">
              {activeTab === 'student' && (
                <>
                  <Select value={program} onValueChange={setProgram}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BBA">BBA</SelectItem>
                      <SelectItem value="MBA">MBA</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={semester} onValueChange={setSemester}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              
              {activeTab === 'faculty' && (
                <Select value={faculty} onValueChange={setFaculty}>
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder="Select Faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</SelectItem>
                    <SelectItem value="Prof. Amita Sharma">Prof. Amita Sharma</SelectItem>
                    <SelectItem value="Dr. Sunil Verma">Dr. Sunil Verma</SelectItem>
                    <SelectItem value="Dr. Preeti Gupta">Dr. Preeti Gupta</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            
            {/* Legend */}
            <div className="mb-4 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded-sm"></div>
                <span>Regular Class</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-amber-50 border border-amber-200 rounded-sm"></div>
                <span>Flexible Slot</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm"></div>
                <span>Lunch Break</span>
              </div>
            </div>
            
            {/* Timetable */}
            <div className="border rounded-lg overflow-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-r p-2 bg-gray-50 text-left">Time Slot</th>
                    {timetableData.days.map((day) => (
                      <th key={day} className="border-b border-r p-2 bg-gray-50 text-left">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetableData.slots.map((slot) => (
                    <tr key={slot}>
                      <td className="border-b border-r p-2 bg-gray-50">
                        <div className="flex flex-col">
                          <span className="font-medium">Slot {slot}</span>
                          <span className="text-xs text-gray-500">{slotTimes[slot]}</span>
                        </div>
                      </td>
                      {timetableData.days.map((day) => {
                        const classInfo = timetableData.schedule[day][slot];
                        return (
                          <td 
                            key={`${day}-${slot}`} 
                            className={`border-b border-r p-2 ${
                              slot === "Lunch" 
                                ? "bg-gray-100" 
                                : (classInfo ? (slot === "A" || slot === "B" ? "bg-amber-50" : "bg-blue-50") : "")
                            }`}
                          >
                            {slot === "Lunch" ? (
                              <div className="text-center text-gray-500 text-sm">Lunch Break</div>
                            ) : classInfo ? (
                              <div className="space-y-1">
                                <div className="font-medium">{classInfo.course}</div>
                                {activeTab === 'student' ? (
                                  <div className="text-xs text-gray-600">{classInfo.faculty}</div>
                                ) : activeTab === 'faculty' ? (
                                  <div className="text-xs text-gray-600">
                                    {classInfo.program} Sem {classInfo.semester}
                                  </div>
                                ) : (
                                  <div className="text-xs text-gray-600">{classInfo.faculty}</div>
                                )}
                              </div>
                            ) : null}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      {isAdmin && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Info size={18} className="text-blue-500" />
            <CardTitle className="text-lg">Timetable Generation Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              The automatic timetable generator follows these constraints:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Subject credits = number of sessions/week</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Max 3 classes/day per faculty</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>No subject repeats per day</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Max 4 class slots/day per semester (excluding free slots)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>No classes on weekends</span>
              </li>
            </ul>
            <div className="pt-2">
              <p className="text-sm font-medium">Soft constraints:</p>
              <ul className="space-y-2 text-sm pt-2">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-amber-500" />
                  <span>Avoid back-to-back classes for faculty</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
