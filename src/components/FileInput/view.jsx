import { useEffect, useState } from "react";
import classnames from "classnames";
import { useSize } from "../../hooks";
import "./styles.scss";

export const FileInput = ({ onChange, file: fileProp }) => {
  const [file, setFile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useSize();

  useEffect(() => {
    setIsMobile(width < 500);
  }, [width, setIsMobile]);

  useEffect(() => {
    if (!fileProp) {
      setFile(null);
    }
  }, [fileProp]);

  const onChangeFile = (event) => {
    const {
      target: { files },
    } = event;
    const [fileSelected] = files;

    setFile(fileSelected);

    if (onChange) {
      onChange(fileSelected);
    }
  };

  const renderFile = () => {
    if (!file) {
      return null;
    }

    const { type: mimeType } = file;
    const [type] = mimeType.split("/");
    const fileObject = URL.createObjectURL(file);

    if (type === "image") {
      return (
        <img className="object-fit" src={fileObject} alt="File input preview" />
      );
    }

    if (type === "video") {
      return (
        <video controls>
          <source src={fileObject} type={mimeType} />
        </video>
      );
    }
  };

  const renderFileName = () => {
    if (!file) {
      return null;
    }

    return (
      <span
        className={classnames({
          "file-name": true,
          "fix-file-input": isMobile,
        })}
      >
        {file.name}
      </span>
    );
  };

  return (
    <div className="don-neve-file-input">
      {renderFile()}
      <div
        className={classnames({
          "file is-centered is-normal": true,
          "has-name": Boolean(file),
        })}
      >
        <label
          className={classnames({
            "file-label": true,
            "file-input-isfull": isMobile,
          })}
        >
          <input
            className="file-input"
            type="file"
            name="resume"
            onChange={onChangeFile}
          />
          <span
            className={classnames({
              "file-cta": true,
              "file-input-isfull": isMobile,
            })}
          >
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              {file ? "Change " : "Choose a "}
              file…
            </span>
          </span>
          {renderFileName()}
        </label>
      </div>
    </div>
  );
};

export default FileInput;
