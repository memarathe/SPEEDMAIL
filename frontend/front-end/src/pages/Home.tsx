import React from "react";
import { lazy } from "react";
import { withTranslation } from "react-i18next";
import IntroContent from "../content/IntroContent.json";
import AboutContent from "../content/AboutContent.json";
import ContactContent from "../content/ContactContent.json";

const Contact = lazy(() => import("../components/ContactForm/index.tsx"));
const Container = lazy(() => import("../common/Container/index.tsx"));
const ScrollToTop = lazy(() => import("../common/ScrollToTop/index.tsx"));
const ContentBlock = lazy(() => import("../components/ContentBlock/index.tsx"));

const Home = () => {

  

  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="developer.svg"
        id="intro"
      />
      <ContentBlock
        type="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="graphs.svg"
        id="about"
      /> 
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
      
    </Container>
  );
};

export default withTranslation()(Home);
