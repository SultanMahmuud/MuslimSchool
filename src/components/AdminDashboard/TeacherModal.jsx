"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { updateTeacher } from "@/services/teacherService";

const TeacherModal = ({ teacher, onClose, onUpdated }) => {
  const [editTeacher, setEditTeacher] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teacher) setEditTeacher({ ...teacher });
  }, [teacher]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateTeacher(editTeacher); // send whole object
      onUpdated(editTeacher);            // update parent table
      onClose();
    } catch (err) {
      console.error("Error updating teacher:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!teacher} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Teacher Details</DialogTitle>
        </DialogHeader>

        {editTeacher && (
          <div className="space-y-2 text-sm">
            {["name", "email", "number", "teacherId", "Department", "joiningDate"].map((key) => (
              <div key={key}>
                <label className="font-medium">{key}:</label>
                <input
                  type={key === "email" ? "email" : key === "joiningDate" ? "date" : "text"}
                  value={editTeacher[key] || ""}
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, [key]: e.target.value })
                  }
                  disabled={key === "teacherId" || key === "email"}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            ))}
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherModal;
