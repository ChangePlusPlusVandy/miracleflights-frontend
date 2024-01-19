import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import Icon from "../../components/CustomIcon/Icon";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const Submit = () => {
    console.log("Submitted");
  };
  return (
    <>
      <img
        src="/src/styles/MiracleFlightsLogo.png"
        alt="Description of the image"
        className={styles.logo}
      />
      <div className={styles.loginContainer}>
        <div className={styles.loginBlock}>
          <div className={styles.loginBlockHeader}>Log In</div>
          <div className={styles.loginRedirect}>
            Dont have an account?
            <Link to="/sign-up" className={styles.loginBlockLink}>
              {" "}
              Sign up
            </Link>
          </div>
          <form className={styles.loginBlockContent}>
            <div className={styles.loginInputContainerUpper}>
              <div className={styles.loginInputLabel}>Username</div>
              <input
                className={styles.loginInput}
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div className={styles.loginInputContainerLower}>
              <div className={styles.loginInputLabel}>Password</div>
              <input
                className={styles.loginInput}
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
              />
              <div
                className={styles.passwordToggle}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <div className={styles.Icon}>
                  <Icon glyph={passwordVisible ? "eye-slash" : "eye"} />
                </div>
              </div>
            </div>
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password" className={styles.loginBlockLink}>
                Forgot password?
              </Link>
            </div>
            <Button onClick={Submit} text={"Login"} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
