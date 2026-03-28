import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingOrders.css";
import hotelImg from "./Image/Deluxe.jpg";
import gymImg from "./Image/Gym.jpg";
import barberImg from "./Image/barber.jpg";
import spaImg from "./Image/spa.jpg";
import axios from "axios";
// import TrackProvider from "./TrackProvider"

const BookingOrders = ({ points, setPoints }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [userId, setUserId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const imagesCategory = {
    hotel: hotelImg,
    spa: spaImg,
    saloon: barberImg,
    gym: gymImg,
  };

  const normalizeDate = (date) => {
    const d = typeof date === "string"
      ? new Date(date.split("T")[0] + "T12:00:00")
      : new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
  };

  const getOrderDate = (order) => {
    // Handle multiple date field names and ensure valid date
    const dateValue = order.check_in || order.date || order.date_in || order.purchaseddate;
    if (!dateValue) return new Date(); // fallback to today if no date
    return new Date(dateValue);
  };

  const isTrackingAvailable = (order) => {
    if (
      order.Category !== "saloon" ||
      order.order_type !== "Door Step" ||
      !order.employee_id || 
      !order.time ||
      !order.date
    ) {
      return false;
    }

    const [hour, minute] = order.time.split(":").map(Number);
    const bookingDateTime = new Date(order.date);
    bookingDateTime.setHours(hour, minute, 0, 0);

    const now = new Date();
    const diffInMs = bookingDateTime - now;
    const diffInMinutes = diffInMs / (1000 * 60);

    return diffInMinutes <= 60 && diffInMinutes >= -120; // 1 hour before to 2 hours after
  };

  // Move fetch functions outside useEffect for better performance
  const fetchOrders = useCallback(async (userId) => {
    if (!userId) return;
    
    setLoading(true);
    setErrorMessage("");
    
    try {
      // console.log("Fetching orders for user:", userId); // Debug log
      
      const response = await fetch(
        `https://api.codingboss.in/kovais/orders/?user_id=${userId}&status=booked`,
        // `https://454732e0c81a.ngrok-free.app/kovais/orders/?user_id=${userId}&status=booked`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // "ngrok-skip-browser-warning": "true", // Add this for ngrok
          },
        }
      );
      
      // console.log("Response status:", response.status); // Debug log
      
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      // console.log("Fetched data:", data); // Debug log
      
      // Handle case where API returns null/undefined for arrays
      const hotelOrders = data.hotel_orders || [];
      const gymOrders = data.gym_orders || [];
      const spaOrders = data.spa_orders || [];
      const saloonOrders = data.saloon_orders || [];
      
      const allOrders = [
        ...hotelOrders.map((order) => ({
          id: order.id,
          guest_name: order.guest_name,
          category: order.category || "Deluxe Room",
          check_in: order.date_in, // Keep original field for hotel
          room_count: order.room_count,
          amount: order.amount,
          status: order.status,
          paymentStatus: order.payment_status,
          date: order.date_in, // For filtering
          Category: "hotel",
        })),
        ...gymOrders.map((order) => ({
          id: order.id,
          guest_name: order.customer_name,
          category: order.plan,
          timeslot: order.timeslot,
          date: order.purchaseddate,
          amount: order.amount,
          status: order.status,
          paymentStatus: order.payment_status,
          Category: "gym",
        })),
        ...spaOrders.map((order) => ({
          id: order.id,
          guest_name: order.customer_name,
          category: order.services,
          date: order.date,
          time: order.time,
          amount: order.amount,
          status: order.status,
          paymentStatus: order.payment_status,
          Category: "spa",
        })),
        ...saloonOrders.map((order) => ({
          id: order.id,
          guest_name: order.customer_name,
          category: order.services,
          gender: order.category,
          date: order.date,
          time: order.time,
          amount: order.amount,
          status: order.status,
          paymentStatus: order.payment_status,
          order_type: order.order_type, // Add missing field
          employee_id: order.employee_id, // Add missing field
          Category: "saloon",
        })),
      ];
      
      // console.log("All orders:", allOrders); // Debug log
      
      // Filter for upcoming orders
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      
      const upcomingOrders = allOrders.filter((order) => {
        const orderDate = getOrderDate(order);
        return orderDate >= today;
      });
      // console.log("Upcoming orders:", upcomingOrders); // Debug log
      setOrders(upcomingOrders);
      
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setErrorMessage(`Failed to load bookings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserPoints = useCallback(async (userId) => {
    if (!userId) return;
    
    try {
      // console.log("Fetching points for user:", userId); // Debug log
      
      const response = await fetch(
        `https://api.codingboss.in/kovais/user-points/?user_id=${userId}`,
        // `https://454732e0c81a.ngrok-free.app/kovais/user-points/?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch points: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      // console.log("Points data:", data); // Debug log
      
      setPoints(data.points);
      localStorage.setItem(`points_${data.user_id}`, JSON.stringify(data.points));
      
    } catch (error) {
      console.error("Points Error:", error.message);
      setErrorMessage("Unable to fetch user points.");
    }
  }, [setPoints]);

  // Get userId from localStorage
  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem("loggedInUser");
      // console.log("Logged in user from localStorage:", loggedInUser); // Debug log
      
      if (!loggedInUser) {
        console.warn("User not logged in!");
        setErrorMessage("Please log in to view your bookings.");
        return;
      }

      const user = JSON.parse(loggedInUser);
      const uid = user?.user_id;
      // console.log("Extracted user ID:", uid); // Debug log
      
      if (!uid) {
        console.warn("User ID is not available!");
        setErrorMessage("User ID not found. Please log in again.");
        return;
      }
      
      setUserId(uid);
    } catch (error) {
      console.error("Error parsing user data:", error);
      setErrorMessage("Invalid user data. Please log in again.");
    }
  }, []);

  // Fetch data when userId changes
  useEffect(() => {
    if (!userId) return;
    
    // console.log("useEffect triggered with userId:", userId); // Debug log
    fetchOrders(userId);
    fetchUserPoints(userId);
  }, [userId, fetchOrders, fetchUserPoints]);

  const filteredOrders = orders.filter((order) => {
    const matchesCategory = filter === "all" || order.Category === filter;
    const orderDate = getOrderDate(order);
    const bookingDate = normalizeDate(orderDate);
    const selectedDateStr = selectedDate ? normalizeDate(selectedDate) : null;
    const matchesDate = selectedDateStr ? bookingDate === selectedDateStr : true;
    return matchesCategory && matchesDate;
  });

  const handleCancel = async (orderId, order) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://api.codingboss.in/kovais/delete-booking/?booking_id=${orderId}&user_id=${userId}&role=${order.Category}`,
        // `https://454732e0c81a.ngrok-free.app/kovais/delete-booking/?booking_id=${orderId}&user_id=${userId}&role=${order.Category}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 204 || response.status === 200) {
        // Remove the cancelled order from state
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        // Refresh points after cancellation
        await fetchUserPoints(userId);
        // console.log("Order cancelled successfully");
      } else {
        console.error("Failed to cancel order:", response);
        setErrorMessage("Failed to cancel booking. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      setErrorMessage("Error cancelling booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handlePayment = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, paymentStatus: "paid" } : order
      )
    );
  };

  return (
    <Container className="booking-history-container py-4">
      <h2 className="text-center mb-4">Your Upcoming Bookings</h2>
      {/* Show error message if any */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      
      {/* Show loading indicator */}
      {loading && (
        <div className="text-center mb-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      <Row className="align-items-end mb-4">
        <Col md={8}>
          <div className="d-flex flex-wrap gap-2">
            {["all", "hotel", "spa", "gym", "saloon"].map((type) => (
              <Button
                key={type}
                variant={
                  filter === type ? "primary" :
                  type === "hotel" ? "outline-success" :
                  type === "spa" ? "outline-warning" :
                  type === "gym" ? "outline-info" :
                  type === "saloon" ? "outline-dark" : "outline-primary"
                }
                className="filter-btn px-3"
                onClick={() => setFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </Col>
        <Col md={4}>
          <label className="fw-semibold mb-2 d-block">Filter by Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            placeholderText="DD/MM/YYYY"
            dateFormat="dd/MM/yyyy"
            className="form-control shadow-sm"
            isClearable
          />
        </Col>
      </Row>

      {/* Debug info - remove in production */}
      <div className="mb-3" style={{ fontSize: "12px", color: "#666" }}>
        Debug: User ID: {userId || "Not set"} | Total Orders: {orders.length} | Filtered: {filteredOrders.length}
      </div>

      {!loading && filteredOrders.length === 0 ? (
        <div className="text-center py-5">
          <h5>No upcoming bookings found</h5>
          <p className="text-muted">
            {filter !== "all" 
              ? `No ${filter} bookings found. Try changing the filter or date.`
              : "You don't have any upcoming bookings at the moment."
            }
          </p>
        </div>
      ) : (
        filteredOrders.map((order) => (
          <Card key={`${order.Category}-${order.id}`} className="mb-4 shadow-sm rounded">
            <Row className="g-0">
              <Col md={4}>
                <Card.Img
                  src={imagesCategory[order.Category]}
                  alt={order.Category}
                  className="h-100 object-fit-cover rounded-start"
                  style={{ minHeight: "200px" }}
                />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <h5 className="mb-3">
                    {order.Category.charAt(0).toUpperCase() + order.Category.slice(1)} Booking
                  </h5>
                  <p><strong>Guest:</strong> {order.guest_name}</p>
                  <p><strong>Service:</strong> {order.category}</p>
                  {order.Category === "hotel" && (
                    <>
                      <p><strong>Check-In:</strong> {order.check_in ? normalizeDate(order.check_in) : 'Not specified'}</p>
                      <p><strong>Room Count:</strong> {order.room_count || 1}</p>
                    </>
                  )}
                  
                  {["spa", "gym", "saloon"].includes(order.Category) && (
                    <>
                      <p><strong>Date:</strong> {order.date ? normalizeDate(order.date) : 'Not specified'}</p>
                      {order.time && <p><strong>Time:</strong> {order.time}</p>}
                      {order.timeslot && <p><strong>Time Slot:</strong> {order.timeslot}</p>}
                    </>
                  )}
                  
                  {order.Category === "saloon" && order.gender && (
                    <p><strong>Gender:</strong> {order.gender}</p>
                  )}
                  
                  {/* Tracking component for saloon door step orders */}
                  {order.Category === "saloon" && order.order_type === "Door Step" && isTrackingAvailable(order) && (
                    <div style={{ height: "300px", marginTop: "1rem" }}>
                      {/* <TrackProvider employeeId={order.employee_id} /> */}
                      <div className="border rounded p-3 bg-light">
                        <p><strong>Employee Tracking Available</strong></p>
                        <p>Employee ID: {order.employee_id}</p>
                      </div>
                    </div>
                  )}

                  <p><strong>Price:</strong> ₹{order.amount} ({order.paymentStatus || 'Unknown'})</p>
                  <p><strong>Status:</strong> {order.status}</p>

                  <Row className="mt-3">
                    <Col md={6}>
                      {order.paymentStatus?.toLowerCase() === "pending" ? (
                        <Button 
                          variant="success" 
                          onClick={() => handlePayment(order.id)} 
                          className="w-100"
                          disabled={loading}
                        >
                          Pay Now
                        </Button>
                      ) : (
                        <Button variant="secondary" className="w-100" disabled>
                          {order.paymentStatus?.toLowerCase() === "paid" ? "Paid" : "Payment Status Unknown"}
                        </Button>
                      )}
                    </Col>
                    <Col md={6}>
                      <Button 
                        variant="dark" 
                        onClick={() => handleCancel(order.id, order)} 
                        className="w-100"
                        disabled={loading}
                      >
                        {loading ? "Cancelling..." : "Cancel Booking"}
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))
      )}
    </Container>
  );
};

export default BookingOrders;