'use client'

import * as React from "react";
import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";



const EditLesson = ({
  editableLesson,
  open,
  setOpen,
  onSave,
}) => {
  const [lesson, setLesson] = React.useState({});
  const [moduleTitle, setModuleTitle] = React.useState("");

  React.useEffect(() => {
    if (editableLesson) {
      setLesson(editableLesson.lesson || {});
      setModuleTitle(editableLesson.moduleName || "");
    }
  }, [editableLesson]);

  const handleSave = () => {
    if (onSave) {
      onSave({ ...lesson, moduleName: moduleTitle });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Lesson</DialogTitle>
          <DialogDescription>
            Modify module and lesson details here
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <label className="text-sm font-medium">Module Title</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />

          <label className="text-sm font-medium">Lesson Title</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={lesson?.title || ""}
            onChange={(e) =>
              setLesson((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <p className="text-sm text-gray-500">Type: {lesson?.lessonType}</p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditLesson;
