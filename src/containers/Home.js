import React from "react";
import "./Home.css";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";


export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>COVID-19 Data Playground</h1>
        <p>You either navigate straight to the covid-19 chart editor:</p>
        <Link to="/Covid19Editor">
          <p>Covid-19 Chart Editor</p>
        </Link>
        <p>Or you can create and account/login and gain the ability to save and share your covid-19 analyses</p>
        <Link to="/signup">
          <p>Covid-19 Chart Editor</p>
        </Link>
      </div>
    </div>
  );
}
