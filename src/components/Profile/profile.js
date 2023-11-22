import React from "react";
import "./profile.css";

const Hobies = () => {
  return (
    <div>
      <h4>Your Hobbies :</h4>
      <div class="hobbies radio">
        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="cooking" />
            <span>Cooking</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="sport" />
            <span>Sport</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="reading" />
            <span>Reading</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="music" />
            <span>Music</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="dance" />
            <span>Dance</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="astronomy" />
            <span>Astronomy</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobibes" value="gardening" />
            <span>Gardening</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="photography" />
            <span>Photography</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="travel" />
            <span>Travel</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="cinema" />
            <span>Cinema</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="videos-games" />
            <span>Video-Games</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="drawing" />
            <span>Drawing</span>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="user-hobbies" value="animals" />
            <span>Animals</span>
          </label>
        </div>
      </div>
    </div>
  );
};
const Profile = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="settings-box">

        {/* //NOTE this for the image  */}

        <div className="form-group profile-photo-upload">
          <label for="profilePhoto">Profile Photo</label>
          <img
            src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Person's profile"
            className="profile-img"
          ></img>
          <p className="file-type-info">
            Accepted file type: .png. Less than 1MB
          </p>

          <button type="button" className="btn-upload">
            Upload
          </button>
        </div>

        {/* //NOTE this for the inputs */}

        <br />
        <div className="form-row">
          <div>
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" />
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label for="date">Birthday</label>
            <input type="date" id="date" name="birthday" />
          </div>
          <div>
            <label for="phone">Phone Number</label>
            <input type="text" id="phone" name="phone" />
          </div>
        </div>

        {/* //NOTE the gender */}

        <div class="gender radio">
          <h4>Your gender :</h4>
          <div>
            <label>
              <input type="radio" name="user-gender" value="man" checked />
              <span>Man</span>
            </label>
          </div>

          <div>
            <label>
              <input type="radio" name="user-gender" value="woman" />
              <span>Woman</span>
            </label>
          </div>
        </div>
        {/* //NOTE hobies */}

        <Hobies />

        {/* //NOTE THE SUBMTION */}
        <input className="btn-login" type="submit" value="Submit" />
      </div>
    </div>
  );
};

export default Profile;
