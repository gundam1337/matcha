const Primary = () => {
  return (
    <div>
      <div className="message">
        <div className="profile-photo">
          <img src="./images/profile-17.jpg" alt="" />
        </div>
        <div className="message-body">
          <h5>Edem Quist</h5>
          <p className="text-muted">Just woke up bruh</p>
        </div>
      </div>

      <div className="message">
        <div className="profile-photo">
          <img src="./images/profile-6.jpg" alt="" />
        </div>
        <div className="message-body">
          <h5>Daniella Jackson</h5>
          <p className="text-bold">2 new messages</p>
        </div>
      </div>
    </div>
  );
};

export default Primary;
