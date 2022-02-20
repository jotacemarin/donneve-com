import { useEffect, useState } from "react";
import "./styles.scss";

export const TagInput = ({ onChange }) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  const handleAddTag = () => {
    setTags([...tags, tag]);
    setTag("");
  };

  const handleRemoveTag = (tag, index) => {
    const position = tags.indexOf(tag);

    if (position !== index) {
      return null;
    }

    const currentTags = Object.assign([], tags);
    currentTags.splice(index, 1);
    setTags(currentTags);
  };

  const handleOnChange = ({ target }) => {
    const { value } = target;
    setTag(value);
  };

  const handleOnKeyDown = ({ key, keyCode }) => {
    if (key !== "Enter" || keyCode !== 13) {
      return null;
    }

    handleAddTag();
  };

  const renderTags = () => {
    if (!tags.length) {
      return null;
    }

    return tags.map((tag, index) => (
      <span key={`${tag}-${index}`} className="tag is-info is-medium mt-1 mr-1">
        {tag}
        <button
          className="delete is-small"
          onClick={() => handleRemoveTag(tag, index)}
        />
      </span>
    ));
  };

  return (
    <div className="don-neve-tag-input">
      {renderTags()}

      <div className="field has-addons mt-1">
        <div className="control don-neve-tag-input">
          <input
            className="input"
            type="text"
            placeholder="Add tag..."
            value={tag}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          />
        </div>
        <div className="control">
          <button className="button is-info" onClick={() => handleAddTag()}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagInput;
