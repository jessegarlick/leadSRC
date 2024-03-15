import React from "react";
import "../index.css";
import founderImage from "../images/founder.jpg"; // Import the image here

export default function About() {
  return (
    <div className="process-container">
      <h1 className="process-title">About Us</h1>
      <div className="process-description">
        <p>
          LeadSRC, founded in 2024 by web developer Jesse Garlick, stands out in
          lead generation with a solid foundation: 10 years in the field of lead
          generation and 5 years specializing in the solar industry. Our
          expertise not only delivers superior leads but also positions us as
          strategic partners, maximizing opportunities for our clients. We're
          committed to honesty, integrity, and transparency, values that have
          fostered lasting partnerships and driven significant client success.
          Our insight into market trends and sustained growth showcases our
          innovative approach. LeadSRC is more than a lead provider; we're a
          catalyst for change in the industry, aiming to revolutionize lead
          generation with our unique blend of experience and ethical practices,
          all while focusing on our clients' success.
        </p>
        <br />
        <br />
        
      </div>

      <div className="founder-container">
        <h1 className="process-title">Meet the Founder</h1>
        <div className="founder-description">
        <img
          src={founderImage}
          alt="Jesse Garlick, Founder of LeadSRC"
          className="founder-image"
        />
        <p>
          Jesse hails from Alpine, Utah, as the youngest among 13 siblings.
          Together with his wife, Zadi, they have three daughters: Brinley,
          Jade, and Vienna. Jesse's passions drive his daily pursuits, focusing
          on four main areas.
        </p>
        <p>
          {" "}
          Golf - An avid golfer, Jesse harbors aspirations of playing
          professionally one day. His dedication to the sport is a testament to
          his love for the game.
        </p>
        <p>
          Music - With equal fervor, Jesse immerses himself in music,
          particularly the piano, which he has played for over 22 years. He also
          enjoys strumming the guitar, showcasing his musical versatility.
        </p>
        <p>
          {" "}
          Coding - This website stands as a testament to Jesse's burgeoning
          passion for computer programming. Favoring JavaScript and React, he
          devotes substantial effort to developing his programming skills.
        </p>
        <p>
          Family - Above all, Jesse cherishes his time with his daughters,
          instilling in them a sense of confidence and the belief in mastery
          through practice. In balancing these passions, Jesse strives to
          allocate his time wisely, continuously honing his skills and shaping
          his craft.
        </p>
        </div>

      
      </div>
    </div>
  );
}
