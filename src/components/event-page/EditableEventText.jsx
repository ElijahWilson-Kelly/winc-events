import { useEffect, useRef } from "react";

export const EditableEventText = ({
  editing,
  value,
  placeholder,
  styles,
  onChange,
}) => {
  const textAreaElement = useRef();

  useEffect(() => {
    if (!textAreaElement.current) return;

    resizeTextArea();
  }, [editing]);

  const resizeTextArea = () => {
    textAreaElement.current.style.height = "5px";
    textAreaElement.current.style.height = `${textAreaElement.current.scrollHeight}px`;
  };

  const handleChange = (e) => {
    resizeTextArea();
    onChange(e.target.value);
  };

  return (
    <div>
      {editing ? (
        <textarea
          style={styles}
          className="editable-text"
          value={value}
          placeholder={placeholder}
          ref={textAreaElement}
          onChange={handleChange}
          rows="1"
        ></textarea>
      ) : (
        <p style={styles} className="preview-text">
          {value}
        </p>
      )}
    </div>
  );
};
