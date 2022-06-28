import PanelItem from "../PanelItem";

export const Panel = ({
  heading,
  items = [],
  onChange = () => false,
  footer,
}) => {
  const renderItem = (item) => item;

  const renderItems = () => {
    if (items.length === 0) {
      return <PanelItem icon="fas fa-search" label="empty" />;
    }

    return items.map(renderItem);
  };

  const renderFooter = () => {
    if (footer) {
      return (
        <div className="panel-block">
          <button className="button is-link is-outlined is-fullwidth">
            Reset all filters
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="panel is-info">
      <p className="panel-heading">{heading}</p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Search"
            onChange={({ target }) => onChange(target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>

      {renderItems()}

      {renderFooter()}
    </div>
  );
};

export default Panel;
