
const Notification = ({ message,type }: { message: string,type:string }) => {
  return (
    <div className="notification-overlay">
      <div className="notification-container p-8-12">{message}</div>;
    </div>
  )
};

export default Notification;
