
import React, { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Download, Upload, Search, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for initial faculty
const initialFaculty = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@tapmi.edu.in",
    subjectsTaught: ["Marketing Management", "Consumer Behavior"],
    maxClassesPerDay: 3,
    avoidBackToBack: true,
  },
  {
    id: 2,
    name: "Prof. Amita Sharma",
    email: "amita.sharma@tapmi.edu.in",
    subjectsTaught: ["Financial Management", "Corporate Finance"],
    maxClassesPerDay: 3,
    avoidBackToBack: true,
  },
  {
    id: 3,
    name: "Dr. Sunil Verma",
    email: "sunil.verma@tapmi.edu.in",
    subjectsTaught: ["Introduction to Business", "Business Ethics"],
    maxClassesPerDay: 2,
    avoidBackToBack: false,
  },
  {
    id: 4,
    name: "Dr. Preeti Gupta",
    email: "preeti.gupta@tapmi.edu.in",
    subjectsTaught: ["Human Resource Management", "Organizational Behavior"],
    maxClassesPerDay: 3,
    avoidBackToBack: true,
  },
];

export default function Faculty() {
  const { role } = useUserRole();
  const { toast } = useToast();
  const [faculty, setFaculty] = useState(initialFaculty);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    subjectsTaught: "",
    maxClassesPerDay: "3",
    avoidBackToBack: "true",
  });

  const [showAssignCourseDialog, setShowAssignCourseDialog] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState("");

  const isAdmin = role === 'admin';

  const filteredFaculty = faculty.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock available courses
  const availableCourses = [
    "Marketing Management",
    "Financial Management",
    "Introduction to Business",
    "Business Ethics",
    "Human Resource Management",
    "Organizational Behavior",
    "Business Analytics",
    "Management Principles",
    "Operations Management",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFaculty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewFaculty((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFaculty = () => {
    const id = faculty.length ? Math.max(...faculty.map((f) => f.id)) + 1 : 1;
    const subjectsList = newFaculty.subjectsTaught
      .split(',')
      .map(subject => subject.trim())
      .filter(subject => subject);

    setFaculty([
      ...faculty,
      {
        id,
        name: newFaculty.name,
        email: newFaculty.email,
        subjectsTaught: subjectsList,
        maxClassesPerDay: parseInt(newFaculty.maxClassesPerDay),
        avoidBackToBack: newFaculty.avoidBackToBack === "true",
      },
    ]);

    setNewFaculty({
      name: "",
      email: "",
      subjectsTaught: "",
      maxClassesPerDay: "3",
      avoidBackToBack: "true",
    });

    setIsDialogOpen(false);

    toast({
      title: "Faculty Added",
      description: `${newFaculty.name} has been added successfully.`,
    });
  };

  const handleAssignCourse = () => {
    if (selectedFaculty !== null && selectedCourse) {
      setFaculty((prevFaculty) =>
        prevFaculty.map((f) => {
          if (f.id === selectedFaculty) {
            return {
              ...f,
              subjectsTaught: [...f.subjectsTaught, selectedCourse],
            };
          }
          return f;
        })
      );

      setShowAssignCourseDialog(false);
      setSelectedFaculty(null);
      setSelectedCourse("");

      toast({
        title: "Course Assigned",
        description: `${selectedCourse} has been assigned successfully.`,
      });
    }
  };

  const openAssignDialog = (facultyId: number) => {
    setSelectedFaculty(facultyId);
    setShowAssignCourseDialog(true);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-gray-500">Manage faculty members and their teaching assignments</p>
        </div>
        
        {isAdmin && (
          <div className="flex flex-wrap gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle size={16} />
                  <span>Add Faculty</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Faculty</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new faculty member.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newFaculty.name}
                      onChange={handleInputChange}
                      placeholder="Enter faculty name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newFaculty.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subjectsTaught">Subjects Taught (comma separated)</Label>
                    <Input
                      id="subjectsTaught"
                      name="subjectsTaught"
                      value={newFaculty.subjectsTaught}
                      onChange={handleInputChange}
                      placeholder="e.g. Marketing Management, Consumer Behavior"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxClassesPerDay">Max Classes Per Day</Label>
                      <Select
                        value={newFaculty.maxClassesPerDay}
                        onValueChange={(value) => handleSelectChange("maxClassesPerDay", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="avoidBackToBack">Avoid Back-to-Back</Label>
                      <Select
                        value={newFaculty.avoidBackToBack}
                        onValueChange={(value) => handleSelectChange("avoidBackToBack", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddFaculty}
                    disabled={!newFaculty.name || !newFaculty.email}
                  >
                    Add Faculty
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showAssignCourseDialog} onOpenChange={setShowAssignCourseDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Course</DialogTitle>
                  <DialogDescription>
                    Assign a course to {faculty.find(f => f.id === selectedFaculty)?.name}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCourses
                          .filter(course => !faculty.find(f => f.id === selectedFaculty)?.subjectsTaught.includes(course))
                          .map(course => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAssignCourseDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAssignCourse} disabled={!selectedCourse}>
                    Assign Course
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
          <CardTitle>Faculty List</CardTitle>
          <CardDescription>
            {filteredFaculty.length} faculty members found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search faculty by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Schedule Constraints</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.length > 0 ? (
                  filteredFaculty.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.name}</TableCell>
                      <TableCell>{f.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {f.subjectsTaught.map((subject, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">Max classes per day:</span> {f.maxClassesPerDay}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Avoid back-to-back:</span>{" "}
                            {f.avoidBackToBack ? "Yes" : "No"}
                          </div>
                        </div>
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => openAssignDialog(f.id)}
                            >
                              <PlusCircle size={14} />
                              <span>Assign Course</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="gap-1"
                            >
                              <Calendar size={14} />
                              <span>View Schedule</span>
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                      No faculty members found matching your search.
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
