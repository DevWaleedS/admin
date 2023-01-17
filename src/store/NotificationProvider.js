import React, { useState } from "react";

export const NotificationContext = React.createContext({});

const NotificationProvider = (props) => {
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [action, setAction] = useState(false);
  const notification = {
    notificationTitle,
    setNotificationTitle,
    action,
    setAction
  };

  return <NotificationContext.Provider value={notification}>{props.children}</NotificationContext.Provider>;
};

export default NotificationProvider;
