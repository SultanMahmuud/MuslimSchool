import JoditEditor from 'jodit-react';
import { useRef } from 'react';

const CourseDesc = ({ savedValue, setValue }) => {
  const editor = useRef(null);

  const config = {
    buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
  };

  const handleBlur = (event, editorInstance) => {
    const content = editorInstance.getHTML();
    setValue(content);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4">
      <JoditEditor
        ref={editor}
        value={savedValue}
        config={config}
        tabIndex={1}
        onBlur={handleBlur}
        className="border border-gray-300 rounded-md shadow-sm"
      />
    </div>
  );
};

export default CourseDesc;
