import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomSearch.css';
import { Container, Row, Col, Card, Button, Form, Carousel } from 'react-bootstrap';
import '../App.css'
import AOS from "aos";
import "aos/dist/aos.css";
import delux from "./images/Deluxe.jpg"
import com from "./images/Common.jpg"
import Restaurant from "./images/R.jpg"


const RoomSearch = () => {
  const navigate = useNavigate();

  // Handle the search button click and navigate to the search results page
  const handleRoomSelect = (roomType) => {
    navigate('/search-results', { state: { selectedRoomType: roomType } });
  };

  const rooms = [
    { title: "Rooms", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iAairnoKlUtzru7KeK4iSnbjkGCz8UAiEQ&s" },
    // { title: "Entrance", img: "https://www.hospitalitynet.org/picture/xxl_153086941.jpg?t=1519120957" },
    // { title: "Reception", img: "https://cnyglock.com/wp-content/uploads/2023/04/%E6%9C%AA%E6%A0%87%E9%A2%98-2-3.jpg" },
    { title: "Common Area", img: com },
    { title: "Restaurant", img: Restaurant },
    { title: "Meeting Room", img: "https://cityhotels.ge/modules/conference_halls/uploads/jpg/step_1/167.jpg" },
  ];

  const typesRoom = [
    { title: "Delux Room (Ac)", img: delux },
    // { title: "Super Delux Room", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iAairnoKlUtzru7KeK4iSnbjkGCz8UAiEQ&s" },
    // { title: "Premium Room", img: "https://cityhotels.ge/modules/conference_halls/uploads/jpg/step_1/167.jpg" },
  ];

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <Container fluid className="hotel-container">
      {/* Search Form Section */}
      <div className="search-section">
        <Carousel className="carousel-section" interval={2000} pause={false} controls={true} indicators={true}>
          <Carousel.Item>
            <img className="d-block w-100" src="https://d2gsigjpujdc9o.cloudfront.net/images/unit_page_images/1727347505_Jaipur-Bl-unit-banner-updated09.webp" alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://d2gsigjpujdc9o.cloudfront.net/images/unit_page_images/1727347505_Jaipur-Bl-unit-banner-updated09.webp" alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://d2gsigjpujdc9o.cloudfront.net/images/unit_page_images/1727347505_Jaipur-Bl-unit-banner-updated09.webp" alt="Third slide" />
          </Carousel.Item>
        </Carousel>

      </div>

      {/* Types of Rooms Section */}
      <h4 className="mt-10 text-center" data-aos="fade-up">Types of Rooms</h4>
      <Row className="room-visuals g-4 justify-content-center">
        {typesRoom.map((room, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="d-flex align-items-stretch"
            onClick={() => {
              handleRoomSelect(room.title)
            }}
          >
            <Card className="room-card h-100" data-aos="fade-up">
              <Card.Img variant="top" src={room.img} className="img-fluid" />
              <Card.Body>
                <Card.Title className="text-center">{room.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Room Visuals Section */}
      <h4 className="mt-4 text-center" data-aos="fade-up">Room Hire Visuals</h4>
      <Row className="room-visuals g-4">
        {rooms.map((room, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2} className="d-flex align-items-stretch">
            <Card className="room-card"
              data-aos="fade-up"
            >
              <Card.Img variant="top" src={room.img} />
              <Card.Body>
                <Card.Title className="text-center">{room.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className=" d-flex justify-content-center align-items-center">
        <Row>
          {/* Search Button */}
          <Col md={2} className="text-center w-100">
            <Button variant="primary" className="search-btn" data-aos="fade-up"
              onClick={() => handleRoomSelect()}
            >
              For Booking
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default RoomSearch;
