
import React from "react";
import { useUserRole } from "@/hooks/useUserRole";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RoleSelector() {
  const { role, setRole } = useUserRole();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Role:</span>
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="faculty">Faculty</SelectItem>
          <SelectItem value="student">Student</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
