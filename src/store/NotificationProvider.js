import React, { useState } from "react";

export const NotificationContext = React.createContext({});

const NotificationProvider = (props) => {
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [actionTitle, setActionTitle] = useState(null);
  const notification = {
    notificationTitle,
    setNotificationTitle,
    actionTitle,
    setActionTitle
  };

  return <NotificationContext.Provider value={notification}>{props.children}</NotificationContext.Provider>;
};

export default NotificationProvider;
