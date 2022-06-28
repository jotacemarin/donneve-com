import PanelIcon from "./PanelIcon";
import PanelCheckbox from "./PanelCheckbox";

export const PanelBlock = ({
  children,
  icon,
  label,
  checkbox,
  onChange,
  disabled,
}) => {
  if (children) {
    return <div className="panel-block">{children}</div>;
  }

  const existCheckbox = checkbox === null || checkbox === undefined;

  const renderIcon = () => {
    if (icon) {
      return <PanelIcon icon={icon} />;
    }

    return null;
  };

  const renderLabel = () => {
    if (label && existCheckbox) {
      return label;
    }

    return null;
  };

  const renderCheckbox = () => {
    if (label && !existCheckbox && onChange) {
      return (
        <PanelCheckbox
          label={label}
          onChange={onChange}
          value={checkbox}
          disabled={disabled}
        />
      );
    }

    return null;
  };

  return (
    <div className="panel-block">
      {renderIcon()}
      {renderLabel()}
      {renderCheckbox()}
    </div>
  );
};

export default PanelBlock;
