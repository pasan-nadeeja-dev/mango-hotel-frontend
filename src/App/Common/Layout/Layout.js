import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Button } from "antd";
import classNames from "./Layout.module.scss";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(
    window.localStorage.getItem("MANGO.loggedUser")
  );

  const handleClick = () => {
    if (isLogged) {
      window.localStorage.removeItem("MANGO.loggedUser");
      setIsLogged(false);
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className={classNames.wrapper}>
      <PageHeader
        ghost={false}
        title="Mango Holidays"
        extra={[
          <Button onClick={handleClick} key="1" type="primary">
            {isLogged ? "Sign out" : "Signin"}
          </Button>,
        ]}
      >
        {children}
      </PageHeader>
    </div>
  );
};

export default Layout;
