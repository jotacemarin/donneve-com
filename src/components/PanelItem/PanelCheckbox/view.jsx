export const PanelCheckbox = ({ label, onChange, value, disabled }) => (
  <label>
    <input
      type="checkbox"
      onChange={onChange}
      checked={Boolean(value)}
      disabled={disabled}
    />
    {label}
  </label>
);

export default PanelCheckbox;
