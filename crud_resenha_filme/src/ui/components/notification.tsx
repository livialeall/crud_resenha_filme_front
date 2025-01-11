
const Notification = ({ message,type }: { message: string,type:string }) => {
  console.log("entrou aqui")
  return (
    <div className="notification-overlay">
      <div className={`${type} notification-container p-8-12`}>{message}</div>
    </div>
  )
};

export default Notification;
