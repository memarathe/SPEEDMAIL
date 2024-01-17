//Last Edit By Enrique Jimenez 


import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
//import { SvgIcon } from "../../common/SvgIcon";
import Container from "../common/Container/index.tsx";

//import i18n from "i18next";
import {
  FooterSection,
  //Title,
  NavLink,
  Extra,
 // LogoContainer,
  Para,
  Large,
  Chat,
  //Empty,
  FooterContainer,
  Language,
  //Label,
  //LanguageSwitch,
  //LanguageSwitchContainer,
} from "../styles/Footer.ts";

/*interface SocialLinkProps {
  href: string;
  src: string;
}*/

const Footer = ({ t }: any) => {
  //const handleChange = (language: string) => {
    //i18n.changeLanguage(language);
 // };

 /* const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };*/

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Language>{t("Contact")}</Language>
              <Large to="/">{t("Tell us everything")}</Large>
              <Para>
                {t(`Do you have any question? Feel free to reach out.`)}
              </Para>
              <a href="mailto:speedmail@gmail.com">
                <Chat>{t(`Let's Chat`)}</Chat>
              </a>
            </Col>
          </Row>
            {/*<Col lg={6} md={6} sm={12} xs={12}>
              <Label htmlFor="select-lang">{t("Language")}</Label>
              <LanguageSwitchContainer>
                <LanguageSwitch onClick={() => handleChange("en")}>
                  <SvgIcon
                    src="united-states.svg"
                    aria-label="homepage"
                    width="30px"
                    height="30px"
                  />
                </LanguageSwitch>
                <LanguageSwitch onClick={() => handleChange("es")}>
                  <SvgIcon
                    src="spain.svg"
                    aria-label="homepage"
                    width="30px"
                    height="30px"
                  />
                </LanguageSwitch>
              </LanguageSwitchContainer>
            </Col>*/}
          
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true.toString()}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: "3rem" }}
          >
            <NavLink to="/">
              <h1>
                SpeedMail
              </h1>
            </NavLink>
            <FooterContainer>
              
              
            </FooterContainer>
          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default withTranslation()(Footer);
