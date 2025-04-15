
// Course-related types
export interface Course {
  id: number;
  program: string;
  semester: number;
  name: string;
  credits: number;
  type: "Core" | "Track";
  grading: "Absolute" | "Relative";
}

// Faculty-related types
export interface Faculty {
  id: number;
  name: string;
  email: string;
  subjectsTaught: string[];
  maxClassesPerDay: number;
  avoidBackToBack: boolean;
}

// Timetable-related types
export interface ClassSlot {
  course: string;
  faculty: string;
  program?: string;
  semester?: number;
}

export interface DaySchedule {
  [slotId: string]: ClassSlot | null;
}

export interface TimetableSchedule {
  [day: string]: DaySchedule;
}

export interface TimetableData {
  program: string;
  semester: number;
  days: string[];
  slots: string[];
  schedule: TimetableSchedule;
}

export interface FacultyTimetable {
  faculty: string;
  courses: string[];
  days: string[];
  slots: string[];
  schedule: TimetableSchedule;
}

// Conflict-related types
export interface Conflict {
  type: string;
  description: string;
  severity: "low" | "medium" | "high";
}
