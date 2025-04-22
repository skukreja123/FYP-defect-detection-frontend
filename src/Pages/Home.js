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
        Our real-time fabric defect detection system leverages advanced machine learning and computer vision algorithms to automatically identify and classify defects in fabrics during production. Whether it's a tear, discoloration, or weave inconsistency, the system provides immediate feedback, helping manufacturers detect and address quality issues early in the production process. This not only ensures high-quality output but also reduces waste, lowers production costs, and improves overall efficiency in fabric manufacturing.
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
        Our system provides continuous, real-time monitoring of fabric production lines, ensuring that any defects or irregularities are instantly detected and analyzed. By integrating advanced sensors and machine learning models, it enables manufacturers to maintain high standards of quality throughout the entire production process.
        </p>
        <div className="features">
          <div className="feature">
            <i className="icon">📊</i>
            <h3>Data Analytics & Reporting</h3>
            <p>
            Gain valuable insights through real-time analytics. Our system generates detailed reports on fabric quality, defect patterns, and production efficiency, allowing manufacturers to make informed decisions and improve their processes.
            </p>
          </div>
          <div className="feature">
            <i className="icon">🔍</i>
            <h3>Defect Detection & Visual Inspection</h3>
            <p>
            Utilizing advanced computer vision, the system provides instant visual feedback of detected defects. Whether it's a hole, discoloration, or weaving error, it helps production teams quickly address issues before they affect the final product.
            </p>
          </div>
          <div className="feature">
            <i className="icon">🔍</i>
            <h3>Upload Feature</h3>
            <p>
            To further enhance defect detection, the system allows users to upload fabric images directly into the platform for analysis. The machine learning model will quickly process the uploaded image and highlight any potential defects, offering a fast and efficient way to inspect samples.
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
        The system automatically classifies various types of fabric defects, such as tears, color inconsistencies, weave errors, and other imperfections, into specific categories. By leveraging machine learning algorithms and pattern recognition techniques, the system can quickly and accurately categorize defects, enabling manufacturers to take timely corrective actions. This classification not only improves the accuracy of defect detection but also enhances the overall quality control process, making it easier to identify recurring issues and optimize production workflows.
        </p>
        </div>
     
    </section>

    <DefectTypes />


<section className="real-time-monitoring">
    <div className="image-container">
        <img src={influncer} alt="Real-Time Monitoring" />
      </div>

      <div className="content">
        <h2>Snapshot & Video Analysis</h2>
        <p>
        Snapshot Analysis allows for the rapid inspection of fabric samples by uploading images directly into the system. Once uploaded, the system uses advanced image processing and machine learning algorithms to detect defects such as tears, stains, or weave inconsistencies. This feature enables quick, on-the-spot analysis of fabric quality, ideal for batch testing or quality checks during production.

        Video Analysis extends this functionality by enabling real-time monitoring of fabric production through live video feeds. The system processes the video in real-time, detecting defects as they occur on the production line. This feature is especially useful for continuous production environments, allowing manufacturers to catch defects instantly and prevent defective products from reaching the final stage. Both snapshot and video analysis together provide a comprehensive solution for fabric quality assurance.
        </p>
        </div>
     
    </section>




      </div>


      </>
    );

}

export default Home;




