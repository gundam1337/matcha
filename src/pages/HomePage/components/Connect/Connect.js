const Connect = () => {
  return (
    <div className="connect">
      <div className="messages">
        <div className="heading">
          <h4>Messages</h4>
          <i className="uil uil-edit"></i>
        </div>
        {/* SEARCH BAR */}
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search messages"
            id="message-search"
          />
        </div>
        {/* MESSAGES CATEGORY */}
        <div className="category">
          <h6 className="active">Primary</h6>
          <h6>Matches</h6>
          <h6 className="message-requests">Likes (7)</h6>
        </div>
        {/* MESSAGES */}
        <div className="message">
          <div className="profile-photo">
            <img src="./images/profile-17.jpg" alt="" />
          </div>
          <div className="message-body">
            <h5>Edem Quist</h5>
            <p className="text-muted">Just woke up bruh</p>
          </div>
        </div>
        {/* MESSAGES */}
        <div className="message">
          <div className="profile-photo">
            <img src="./images/profile-6.jpg" alt="" />
          </div>
          <div className="message-body">
            <h5>Daniella Jackson</h5>
            <p className="text-bold">2 new messages</p>
          </div>
        </div>
        {/* MESSAGES */}
        <div className="message">
          <div className="profile-photo">
            <img src="./images/profile-8.jpg" alt="" />
            <div className="active"></div>
          </div>
          <div className="message-body">
            <h5>Chantel Msiza</h5>
            <p className="text-muted">lol u right</p>
          </div>
        </div>
        {/* MESSAGES */}
        <div className="message">
          <div className="profile-photo">
            <img src="./images/profile-10.jpg" alt="" />
          </div>
          <div className="message-body">
            <h5>Juliet Makarey</h5>
            <p className="text-muted">Birthday Tomorrow</p>
          </div>
        </div>
        {/* MESSAGES */}
        <div className="message">
          <div className="profile-photo">
            <img src="./images/profile-3.jpg" alt="" />
            <div className="active"></div>
          </div>
          <div className="message-body">
            <h5>Keylie Hadid</h5>
            <p className="text-bold">5 new messages</p>
          </div>
        </div>
        {/* MESSAGES */}
        <div className="message">
          <div className="profile-photo">
            <img src="./images/profile-15.jpg" alt="" />
          </div>
          <div className="message-body">
            <h5>Benjamin Dwayne</h5>
            <p className="text-muted">haha got that!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
