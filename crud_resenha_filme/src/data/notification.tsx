import { useState } from "react";

const handleNotification = () => {
    const [notificationOpen, setNotificationOpen] = useState(false);
    setNotificationOpen(true);
    setTimeout(() => {
      setNotificationOpen(false);
    }, 3000);
    return notificationOpen;
  };

export default handleNotification