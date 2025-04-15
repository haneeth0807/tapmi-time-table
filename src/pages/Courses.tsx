
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Filter, Download, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for initial courses
const initialCourses = [
  {
    id: 1,
    program: "BBA",
    semester: 1,
    name: "Introduction to Business",
    credits: 3,
    type: "Core",
    grading: "Relative",
  },
  {
    id: 2,
    program: "BBA",
    semester: 1,
    name: "Management Principles",
    credits: 4,
    type: "Core",
    grading: "Absolute",
  },
  {
    id: 3,
    program: "MBA",
    semester: 1,
    name: "Marketing Management",
    credits: 4,
    type: "Core",
    grading: "Relative",
  },
  {
    id: 4,
    program: "MBA",
    semester: 2,
    name: "Financial Management",
    credits: 3,
    type: "Core",
    grading: "Relative",
  },
  {
    id: 5,
    program: "BBA",
    semester: 2,
    name: "Business Analytics",
    credits: 3,
    type: "Track",
    grading: "Absolute",
  },
];

export default function Courses() {
  const { role } = useUserRole();
  const { toast } = useToast();
  const [courses, setCourses] = useState(initialCourses);
  const [filters, setFilters] = useState({
    program: "",
    semester: "",
  });
  const [newCourse, setNewCourse] = useState({
    program: "BBA",
    semester: "1",
    name: "",
    credits: "3",
    type: "Core",
    grading: "Relative",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCourses = courses.filter((course) => {
    if (filters.program && course.program !== filters.program) return false;
    if (filters.semester && course.semester !== parseInt(filters.semester)) return false;
    return true;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = () => {
    const id = courses.length ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    
    setCourses([
      ...courses,
      {
        id,
        program: newCourse.program,
        semester: parseInt(newCourse.semester),
        name: newCourse.name,
        credits: parseInt(newCourse.credits),
        type: newCourse.type,
        grading: newCourse.grading,
      },
    ]);
    
    setNewCourse({
      program: "BBA",
      semester: "1",
      name: "",
      credits: "3",
      type: "Core",
      grading: "Relative",
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Course Added",
      description: `${newCourse.name} has been added successfully.`,
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Functionality",
      description: "Bulk import would be implemented here in the full version.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Functionality",
      description: "Export functionality would be implemented here in the full version.",
    });
  };

  const isAdmin = role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-500">Manage course structure for BBA and MBA programs</p>
        </div>
        
        {isAdmin && (
          <div className="flex flex-wrap gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle size={16} />
                  <span>Add Course</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new course to the system.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="program">Program</Label>
                      <Select
                        value={newCourse.program}
                        onValueChange={(value) => handleSelectChange("program", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BBA">BBA</SelectItem>
                          <SelectItem value="MBA">MBA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={newCourse.semester}
                        onValueChange={(value) => handleSelectChange("semester", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <SelectItem key={sem} value={sem.toString()}>
                              {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newCourse.name}
                      onChange={handleInputChange}
                      placeholder="Enter course name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="credits">Credits</Label>
                      <Select
                        value={newCourse.credits}
                        onValueChange={(value) => handleSelectChange("credits", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Credits" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((credit) => (
                            <SelectItem key={credit} value={credit.toString()}>
                              {credit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Subject Type</Label>
                      <Select
                        value={newCourse.type}
                        onValueChange={(value) => handleSelectChange("type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Core">Core</SelectItem>
                          <SelectItem value="Track">Track</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grading">Grading Type</Label>
                      <Select
                        value={newCourse.grading}
                        onValueChange={(value) => handleSelectChange("grading", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Grading" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Absolute">Absolute</SelectItem>
                          <SelectItem value="Relative">Relative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCourse} disabled={!newCourse.name}>
                    Add Course
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="gap-2" onClick={handleImport}>
              <Upload size={16} />
              <span>Import</span>
            </Button>
            
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download size={16} />
              <span>Export</span>
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course List</CardTitle>
          <CardDescription>
            {filteredCourses.length} courses found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-full sm:w-auto">
              <Select
                value={filters.program}
                onValueChange={(value) => handleFilterChange("program", value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Programs</SelectItem>
                  <SelectItem value="BBA">BBA</SelectItem>
                  <SelectItem value="MBA">MBA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-auto">
              <Select
                value={filters.semester}
                onValueChange={(value) => handleFilterChange("semester", value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Semesters</SelectItem>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Grading</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.program}</TableCell>
                      <TableCell>{course.semester}</TableCell>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          course.type === "Core" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                        }`}>
                          {course.type}
                        </span>
                      </TableCell>
                      <TableCell>{course.grading}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No courses found matching the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
