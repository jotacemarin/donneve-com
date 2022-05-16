import { useEffect, useState } from "react";
import "./styles.scss";

const CHAR_SPACE = " ";

export const TagInput = ({ onChange, disabled = false }) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  const handleAddTag = () => {
    const stringTag = String(tag).trim();
    let tagToAdd = [stringTag];

    if (stringTag.includes(CHAR_SPACE)) {
      tagToAdd = stringTag.split(CHAR_SPACE);
      console.log("tagToAdd", tagToAdd);
    }

    setTags([...tags, ...tagToAdd]);
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
    if (key === "Enter" || keyCode === 13) {
      handleAddTag();
    }

    if (key === CHAR_SPACE || keyCode === 32) {
      handleAddTag();
    }

    return null;
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
          disabled={disabled}
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
          <button
            className="button is-info"
            onClick={() => handleAddTag()}
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagInput;
