import React from "react";
import Layout from "./../components/Layout/Layout";
import '../styles/customeAll.css'

const About = () => {
  return (
    <Layout>
      <div className="row contactus">
        <h1 className="text-center">About Us</h1>
        <div className="col-md-6">
          <img
            src="/images/allround.jpg"
            alt="contactus"
            className="about-img"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to GadgetGalaxy

            Greetings, fellow tech adventurers! I'm Akash Ghosh, the solo virtuoso steering the ship at Gadegetgalaxy. Armed with nothing but my trusty keyboard and an insatiable thirst for innovation, I've embarked on a solo odyssey to curate the finest array of tech marvels.

            From conquering coding challenges to navigating the ever-changing seas of software development, I've honed my craft as a lone wolf developer. But fear not, for behind this solitary facade lies a powerhouse of creativity and ingenuity, ready to push the boundaries of what's possible in the digital realm.
          </p>
        </div>
      </div>
      <div style={{ marginBottom: "100px" }}></div> {/* Add space for the footer */}
    </Layout>
  );
};

export default About;
