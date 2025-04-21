import "./Home.css";
import { FaRegCheckSquare } from "react-icons/fa";
import monitoringImage from "../images/undraw_mobile_login_ikmv.png";
import image from "../images/Group (3).png";
import montior from "../images/undraw_happy_news_hxmt.png";
import defectIcon from "../images/Combined Shape.png";
import influncer from "../images/undraw_social_influencer_sgsv.png";
import DefectTypes, {defecttype} from "../Component/defecttype"


function Home() {
  return (
    <>
    <div className="home">
       <section className="hero">
      <div className="hero-content">
        <h1>Real-Time Fabric Defect Detection</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo 
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis 
          parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, 
          pellentesque eu, pretium quis, sem.
        </p>
        <div className="buttons">
          <button className="primary-btn">RealTime Analysis</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={image} alt="Fabric Defect Detection" />
      </div>
    </section>


    <section className="real-time-monitoring">
      <div className="content">
        <h2>Real-Time Monitoring</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.
        </p>
        <div className="features">
          <div className="feature">
            <i className="icon">📊</i>
            <h3>Title Goes Here</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor.
            </p>
          </div>
          <div className="feature">
            <i className="icon">🔍</i>
            <h3>Title Goes Here</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor.
            </p>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img src={monitoringImage} alt="Real-Time Monitoring" />
      </div>
    </section>


    <section className="real-time-monitoring">
    <div className="image-container">
        <img src={montior} alt="Real-Time Monitoring" />
      </div>

      <div className="content">
        <h2>Defect Classification</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.
        </p>
        </div>
     
    </section>

    <DefectTypes />


<section className="real-time-monitoring">
    <div className="image-container">
        <img src={influncer} alt="Real-Time Monitoring" />
      </div>

      <div className="content">
        <h2>SnapShot Analysis</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.
        </p>
        </div>
     
    </section>




      </div>


      </>
    );

}

export default Home;




