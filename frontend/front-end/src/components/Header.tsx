import { useState, useEffect } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation } from "react-i18next";
import Container from "../common/Container/index.tsx";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { Button } from "../common/Button/index.tsx";
import {
  HeaderSection,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "../styles/Header.ts";

const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

if (token && token.length>=3) {
  if (token[0]==null) {
    cookies.remove("TOKEN", { path: "/" });
  }
}

const Header = ({ t }: any) => {
  const [visible, setVisibility] = useState(false);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e=="/home_page") {
      if (token) {
        navigate(`/user/${token[1]}`)
      } else {
        navigate("/")
      }
    } else {
      navigate(e);
    }
  }

  

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };

    const [user, setUser] = useState("")
  const [manager, setManager] = useState("")
  const [driver, setDriver] = useState("")

    
      useEffect(() => {
        if (token && Array.isArray(token) && token.length >= 3 && token[0]!=null) {
          console.log("matlab andhar aya?")
          console.log(token)
          // if (token[0]==null) {
          //   cookies.remove("TOKEN");
          // }
        // set configurations for the API call here
        const configuration = {
          method: "get",
          url: `https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/auth-endpoint/`,//"https://nodejs-mongodb-auth-app.herokuapp.com/auth-endpoint",
          headers: {
            Authorization: `Bearer ${token[0]}`,
          },
        };
    
        // make the API call
        // axios(configuration)
        //   .then((result) => {
        //     console.log(result)
        //     // assign the message in our result to the message we initialized above
        //     setMessage(result.data.user);
        //   })
        //   .catch((error) => {
        //     error = new Error();
        //   });
    
        const role = token[2].substring(7)
        if (role=="USER") {
          setUser(true)
        } else if (role=="MANAGER") {
          setManager(true)
        } else {
          setDriver(true)
        }
    
        console.log(token)
      }
    }, []);
     
    if (token===undefined) {
      console.log("token doesn't exist")
    }
    

    const logout = () => {
      // destroy the cookie
      cookies.remove("TOKEN", { path: "/" });
      // redirect user to the landing page
      window.location.href = "/";
    }

    const handleChat = (e) => {
      window.open("https://react-chat-kaushiks-projects-d8f80fc1.vercel.app/") // replace with the URL of the chat application
    }

    return (
      <>
        <CustomNavLinkSmall onClick={() => handleClick("/")}>
          <Span>{t("About")}</Span>
        </CustomNavLinkSmall>
        
        <CustomNavLinkSmall onClick={() => handleClick("/tracking")}>
          <Span>{t("Tracking")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => handleClick("/search")}>
          <Span>{t("Search")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => handleChat("/chat")}>
          <Span>{t("Chat")}</Span>
        </CustomNavLinkSmall>
        {user && <>
        {/* <CustomNavLinkSmall onClick={() => handleClick("/ship_package")}>
          <Span>{t("Ship Package")}</Span>
        </CustomNavLinkSmall> */}
        <CustomNavLinkSmall onClick={() => handleClick(`/past_orders/${token[1]}`)}>
          <Span>{t("Past Orders")}</Span>
        </CustomNavLinkSmall></>}
        {/* {driver && <h1>ddrriiiiivvvveeerrrr</h1>} */}
        
        {manager && <>
        {/* <CustomNavLinkSmall onClick={() => handleClick("/assign_driver")}>
          <Span>{t("Assign Driver")}</Span>
        </CustomNavLinkSmall> */}
        <CustomNavLinkSmall onClick={() => handleClick("/track_and_review")}>
          <Span>{t("Track Orders and Reviews")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => handleClick("/services")}>
          <Span>{t("Services")}</Span>
        </CustomNavLinkSmall></>}
        {token && <><CustomNavLinkSmall
          style={{ width: "180px" }}
          //Send user to registration page
          onClick={() => logout()}
        >
          <Span>
            <Button>{t("Log Out")}</Button>
          </Span>
        </CustomNavLinkSmall></>}
        {!token && <>
          <CustomNavLinkSmall onClick={() => handleClick("/login")}>
          <Span>{t("Log In")}</Span>
        </CustomNavLinkSmall>
        {/* <CustomNavLinkSmall onClick={() => handleClick("/ship_package")}>
          <Span>{t("Ship Package")}</Span>
        </CustomNavLinkSmall> */}
        <CustomNavLinkSmall
          style={{ width: "180px" }}
          //Send user to registration page
          onClick={() => handleClick("/register")}
        >
          <Span>
            <Button>{t("Sign up")}</Button>
          </Span>
        </CustomNavLinkSmall></>}
        
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between" >
          <h1 onClick={() => handleClick("/home_page")} >Speedmail</h1>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={onClose}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={onClose}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
