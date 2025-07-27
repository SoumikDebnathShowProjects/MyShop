import React from "react";
import Layout from "./../components/Layout/Layout";
import '../styles/customeAll.css'

const About = () => {
  return (
    <Layout>
      <div className="row contactus">
        <h1 className="text-center">Privacy Policy</h1>
        <div className="col-md-6">
          <img
            src="/images/privacy.jpg"
            alt="contactus"
            className="about-img"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Please refrain from sharing any private or personal information here.
           This website is solely for the purpose of a personal project and does 
           not collect or store any personal data. Thank you for your cooperation
            in maintaining privacy and confidentiality.

            </p>
        </div>
      </div>
      <div style={{ marginBottom: "100px" }}></div> {/* Add space for the footer */}
    </Layout>
  );
};

export default About;
