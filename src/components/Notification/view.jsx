import classNames from "classnames";
import { useEffect, useRef } from "react";
import "./styles.scss";

export const Notification = ({
  children,
  text,
  isInfo,
  isError,
  isSuccess,
  onTimeout,
  close = () => false,
  visible = false,
  duration = 3000,
}) => {
  const timeout = useRef(null);

  const handleOnTimeout = () => {
    if (onTimeout) {
      onTimeout();
    }
  };

  useEffect(() => {
    if (visible) {
      timeout.current = setTimeout(handleOnTimeout, duration);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    clearTimeout(timeout.current);
    if (visible) {
      timeout.current = setTimeout(handleOnTimeout, duration);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [visible, duration]);

  const renderChildren = () => {
    if (children) {
      return children;
    }

    return text;
  };

  return (
    <div className="notification-float donneve-notification">
      <div
        className={classNames({
          "notification is-light": true,
          "is-info": Boolean(isInfo),
          "is-danger": Boolean(isError),
          "is-success": Boolean(isSuccess),
          "is-hidden": !visible,
        })}
      >
        <button className="delete" onClick={close} />
        {renderChildren()}
      </div>
    </div>
  );
};

export default Notification;
