import React from "react";
import "../../styles/register.css";
import { Helmet } from "react-helmet";

const Registraction = () => {
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <div class="screen">
        <div class="form-container">
          <div class="form-content">
            <h2>
              <a href="./index.html">ChatSpace</a>
            </h2>
            <h3>Create an account</h3>
            <p>We need informations to help you to found your love</p>
            <form action="" method="POST">
              <h3>Tell us more about yourself</h3>
              <div class="main-informations">
                <input name="name " type="text" placeholder="Name" />
                <input type="email" placeholder="Email" name="mail" />
                <input type="password" placeholder="Password" name="password" />
                <input type="text" placeholder="MM/DD/YYYY" />
              </div>

              <div class="gender radio">
                <h4>Your gender :</h4>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="user-gender"
                      value="man"
                      checked
                    />
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

              <h4>You Search</h4>
              <div class="gender radio">
                <div>
                  <label>
                    <input
                      type="radio"
                      name="search-gender"
                      value="man"
                      checked
                    />
                    <span>Man</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input type="radio" name="search-gender" value="woman" />
                    <span>Woman</span>
                  </label>
                </div>
              </div>

              <h4>Your Hobbies :</h4>
              <div class="hobbies radio">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="cooking"
                    />
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
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="reading"
                    />
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
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="astronomy"
                    />
                    <span>Astronomy</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobibes"
                      value="gardening"
                    />
                    <span>Gardening</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="photography"
                    />
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
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="videos-games"
                    />
                    <span>Video-Games</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="drawing"
                    />
                    <span>Drawing</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="animals"
                    />
                    <span>Animals</span>
                  </label>
                </div>
              </div>

              <input class="btn-login" type="submit" value="Register" />
            </form>
            <p>
              Already have an account ?<a href="login.html">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registraction;
