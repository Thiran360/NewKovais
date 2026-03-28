import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./ServiceInfo.module.css";

const ServiceInfo = () => {
  const { id } = useParams(); // Get ID from URL
  const location = useLocation();
  const service = location.state?.service; // Retrieve service data from state

  if (!service) {
    return <h2>Service not found</h2>;
  }

  const [titleStyle, setTitleStyle] = useState({
    position: "absolute",
    top: "50%",
    left: "-100%", // Start off-screen
    transform: "translate(-50%, -50%)",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "white",
    WebkitTextStroke: "1px black",
    transition: "left 2s ease-in-out",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setTitleStyle((prev) => ({ ...prev, left: "50%" }));
    }, 100);
  }, []);

  return (
    <div className={styles.haircutwrapper}>
      <section className={styles.banner} >
        <img src={service.imageUrl} alt={service.name} className={styles.bannerImage} />
        <h1 style={titleStyle}>{service.name}</h1>
      </section>

      {service.description && (
        <section className={styles.container}>
          <div className={styles.box}>
            <img src={service.descriptionUrl} alt="Img" className={styles.boxImage} />
          </div>
          <div className={`${styles.box} ${styles.fadeInright}`}>
            <p className={styles.content}>{service.description}</p>
          </div>
        </section>
      )}

      {service.details && (
        <section className={styles.container}>
          <div className={`${styles.box} ${styles.fadeInleft}`}>
            <p className={styles.content}>{service.details}</p>
          </div>
          <div className={styles.box}>
            <img src={service.detailsUrl} alt="Img" className={styles.boxImage} />
          </div>
        </section>
      )}

      {service.benifit && (
        <section className={styles.container}>
          <div className={styles.box}>
            <img src={service.benifitUrl} alt="Img" className={styles.boxImage} />
          </div>
          <div className={`${styles.box} ${styles.fadeInright}`}>
            <p className={styles.content}>{service.benifit}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceInfo;