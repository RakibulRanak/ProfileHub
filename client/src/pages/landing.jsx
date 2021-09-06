import React from "react";
import LandingCarousal from "../components/landing/carousal";
import Layout from "../components/generic/layout";




const Landing = () => {
  return (
    <Layout>
     
      <LandingCarousal
        items={[
          {
            title: "ProfileHub",
            src: "d260f131e69b30f214294b89857c80a4.jpeg",
            desc: "Create Your Profile And Share it ",
          },
        ]}
      />
     
    </Layout>
  );
};

export default Landing;
