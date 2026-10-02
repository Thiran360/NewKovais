import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form, Carousel, InputGroup, Tabs, Tab } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './spa.css';
import spaBannerImg from './images/spa_banner_lux.jpg';
import { PaymentPage, ConfirmationPage } from '../components/Payment';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaPhoneAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";

const SpaBooking = ({ user, setUser, points, setPoints, setAadhar }) => {
  const [selectedGender, setSelectedGender] = useState('Men');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paytype, setPaytype] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [usedPoints, setUsedPoints] = useState();
  const [booked, setBooked] = useState("booked");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [point, setPoint] = useState();
  const [value, setValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    phone_number: "",
    password: ""
  });
  const [spaId, setSpaId] = useState("");
  const [message, setMessage] = useState("");
  const [showDemoPayment, setShowDemoPayment] = useState(false);
  const [showDemoConfirmation, setShowDemoConfirmation] = useState(false);
  const [demoPaymentResult, setDemoPaymentResult] = useState(null);

  const services = {
    Men: [
      {
        id: 1,
        name: 'Swedish Massage',
        description: 'It is often used to relax you, relieve stress and relieve pain. Swedish massage often involves rubbing, kneading, stroking and tapping your muscles',
        amount: 1,
        imageUrl: 'https://massagenownepa.com/wp-content/uploads/2021/08/Top-10-Benefits-of-Swedish-Massage-Therapy-3.jpeg',
      },
      {
        id: 2,
        name: 'Aromatherapy Massage',
        description: 'Aromatherapy is a specific type of therapy that incorporates scented essential oils into a massage. The massage involves alternating between gentle and harder pressure while using a particular blend of essential oils.',
        amount: 1,
        imageUrl: 'https://mtroyalspa.com/media/main/images/image_3.normal.png',
      },
      {
        id: 3,
        name: 'Thai Massage',
        description: 'Traditional Thai massage combines acupressure, Indian Ayurvedic principles, and assisted yoga postures, but with no use of oils or lotions. The recipient remains clothed during treatment.',
        amount: 1,
        imageUrl: 'https://t4.ftcdn.net/jpg/00/49/84/71/360_F_49847134_GDTYb3FKMNxHDPvZ35OlMPT6G3Wpfkpm.jpg',
      },
    ],
    Women: [
      {
        id: 1,
        name: 'Swedish Massage',
        amount: 1,
        description: 'It is often used to relax you, relieve stress and relieve pain. Swedish massage often involves rubbing, kneading, stroking and tapping your muscles',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/63a35472a0ab201630426c20/424ec407-ad4d-431d-a1c7-126bea60d868/Head-Massage-FloridaAcademy-1500x1000.jpg',
      },
      {
        id: 2,
        name: 'Aromatherapy Massage',
        description: 'Aromatherapy is a specific type of therapy that incorporates scented essential oils into a massage. The massage involves alternating between gentle and harder pressure while using a particular blend of essential oils.',
        amount: 1,
        imageUrl: 'https://us.123rf.com/450wm/kzenon/kzenon1401/kzenon140100090/25006116-chinese-asian-woman-in-wellness-beauty-spa-having-aroma-therapy-massage-with-essential-oil-looking.jpg?ver=6',
      },
      {
        id: 3,
        name: 'Thai Massage',
        description: 'Traditional Thai massage combines acupressure, Indian Ayurvedic principles, and assisted yoga postures, but with no use of oils or lotions. The recipient remains clothed during treatment.',
        amount: 1,
        imageUrl: 'https://t3.ftcdn.net/jpg/07/81/44/36/360_F_781443695_k9Y2KZgZemjtnTybNPD4gSFP1OLcD90H.jpg',
      },
    ],
  };

  useEffect(() => {
    if (
      !selectedService ||
      !services[selectedGender].some(
        (service) => service.id === selectedService.id
      )
    ) {
      setSelectedService(services[selectedGender][0]);
    }

    AOS.init({ duration: 1500 });
  }, [selectedGender, services]);
  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
  ];
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getAvailableTimeSlots = () => {
    return timeSlots;
  };

  const isTimeSlotDisabled = (slot) => {
    if (!isToday(selectedDate)) {
      return false;
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const [time, period] = slot.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let slotHour = hours;

    if (period === 'PM' && hours !== 12) {
      slotHour += 12;
    } else if (period === 'AM' && hours === 12) {
      slotHour = 0;
    }

    return slotHour < currentHour || (slotHour === currentHour && minutes <= currentMinute);
  };
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };
  const isSlotBooked = (slot) => bookedSlots.includes(slot);
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    setSelectedTime(null); // Reset selected time when date changes
  };
  const handleSelectService = (service) => {
    setSelectedServices((prevSelected) => {
      const alreadySelected = prevSelected.find(s => s.id === service.id);
      if (alreadySelected) {
        return prevSelected.filter(s => s.id !== service.id);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  const handleSelectSlot = (slot) => {
    setSelectedTime(slot);
  };
  const availableSlots = getAvailableTimeSlots();
  const handleScroll = () => {
    const section = document.getElementById("target-section");
    section.scrollIntoView({ behavior: "smooth" });
  };
  //Helper functions
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    const section = document.getElementById("datetime-section");
    section.scrollIntoView({ behavior: "smooth" });
  };

  const handleDown = () => {
    const section = document.getElementById("section");
    section.scrollIntoView({ behavior: "smooth" });
  };

  const signUp = async () => {
    if (!userData.username || (isNewUser && !userData.phone_number) || !userData.password) {
      setErrorMessage('All fields are required');
      return;
    }

    setLoading(true);

    const formattedData = {
      name: userData.username,
      phone_number: userData.phone_number,
      password: userData.password,
    };

    try {
      const response = await axios.post(
        // "https://1e53d0afb221.ngrok-free.app/kovais/create-customer/",
        "https://api.codingboss.in/kovais/create-customer/",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      // console.log("Signup Success:", response.data);
      localStorage.setItem("signedUpUser", JSON.stringify(formattedData));

      setErrorMessage('');

      setTimeout(() => {
        setIsNewUser(false);
        setLoading(false);

        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Please sign in with your new account",
        });
      }, 1000);

    } catch (error) {
      console.error("Signup Error:", error);

      const errorMsg = error.response?.data?.error ||
        error.response?.data?.message ||
        "Sign-Up Failed. Please try again.";

      setErrorMessage(errorMsg);

      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, phone_number: value });

    // Only validate if the phone number field is visible (i.e., on the signup tab)
    if (isNewUser) {
      validatePhoneNumber(value);
    }
  };

  const validatePhoneNumber = (number) => {
    // 1. Basic Check: Empty or null
    if (!number) {
      setPhoneError('Phone number is required.');
      return false;
    }

    // 2. Regex Check: Allows digits, spaces, hyphens, and parentheses.
    // This regex ensures input looks like a phone number format.
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(number)) {
      setPhoneError('Only digits and common symbols (-, (,), space) are allowed.');
      return false;
    }

    // 3. Length Check: Assumes 10 to 15 digits is standard for global flexibility.
    // Strips non-digits before checking length.
    const digitsOnly = number.replace(/[^\d]/g, '');

    if (digitsOnly.length < 10) {
      setPhoneError('Phone number must be between 10 digits long (excluding formatting).');
      return false;
    }

    // If all checks pass
    setPhoneError('');
    return true;
  };


  const handleSignUpClick = () => {
    // Check if the current tab is signup and perform validation
    if (isNewUser) {
      const phoneValid = validatePhoneNumber(userData.phone_number);

      if (phoneValid && userData.username && userData.password) {
        signUp(); // Call the parent component's signup function
      }
    } else {
      // This case should ideally not be hit if the button reads "Login"
      signUp();
    }
  };

  // Determine if the main action button should be disabled
  const isButtonDisabled = loading || (isNewUser && !!phoneError);


  const loginUser = async () => {
    if (!userData.username || !userData.password) {
      setErrorMessage('Username and password are required');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(
        "https://api.codingboss.in/kovais/customer-login/",
        // "https://1e53d0afb221.ngrok-free.app/kovais/customer-login/",
        {
          username: userData.username,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      // console.log("Login Success:", response.data);

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      localStorage.setItem("currentUserId", JSON.stringify(response.data.user_id));

      if (response.data.emblem_url || response.data.points) {
        localStorage.setItem("url", JSON.stringify(response.data.emblem_url));
        localStorage.setItem(`points_${response.data.user_id}`, JSON.stringify(response.data.points));
      }

      setUser(response.data);
      setPoints(response.data.points);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        setErrorMessage('');
        setShowLoginModal(false);
        setShowModal(true);
      }, 500);

    } catch (error) {
      console.error("Login Error:", error);

      const errorMsg = error.response?.data?.login ||
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";

      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleTabSelect = (key) => {
    setIsNewUser(key === 'signup');
    setErrorMessage('');
  };

  const handleUsePoints = (value) => {
    const pointsToUse = Number(value);
    setUsedPoints(pointsToUse);

    // 🔥 Always calculate fresh total from selectedService.amount
    const totalAmount = selectedServices?.length > 0
      ? selectedServices.reduce((sum, s) => sum + Number(s.amount || s.price || 0), 0)
      : amount || 0;

    // 🛑 No spa price
    if (totalAmount <= 0) {
      return Swal.fire("No Service Selected", "Add a spa service before applying points.", "warning");
    }

    // 🛑 Invalid input
    if (!pointsToUse || pointsToUse <= 0) {
      return Swal.fire("Invalid Points", "Enter valid number of points.", "warning");
    }

    // 🛑 Not enough points
    if (pointsToUse > points) {
      return Swal.fire("Not Enough Points", `You only have ${points} points.`, "error");
    }

    // 1 point = ₹0.10 discount
    const discount = pointsToUse * 0.10;

    if (discount > totalAmount) {
      return Swal.fire("Too Many Points Used", `You can only use up to ₹${totalAmount}.`, "error");
    }

    // 🟢 Apply
    const remainingPoints = points - pointsToUse;
    const newAmount = totalAmount - discount;

    // UPDATE EVERYWHERE 🔥
    setPoints(remainingPoints);
    setAmount(newAmount);
    localStorage.setItem("points", remainingPoints);
    localStorage.setItem("spaAmount", newAmount);

    Swal.fire({
      icon: "success",
      title: "Points Applied Successfully 🎉",
      html: `
      Used <b>${pointsToUse}</b> pts (₹${discount.toFixed(2)} discount)<br/>
      New Total → <b>₹${newAmount.toFixed(2)}</b><br/>
      Remaining Points → <b>${remainingPoints}</b>
    `
    });

    setValue("");
  };


  const handlePayment = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser && selectedServices.length > 0 && selectedTime) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      setShowLoginModal(false);
      setShowDemoPayment(true);
    } else {
      setShowLoginModal(true);
      setShowModal(false);
    }
  };

  const handleDemoPaymentSuccess = (result) => {
    setDemoPaymentResult(result);
    setShowDemoPayment(false);
    setStatus("completed");
    setPaytype("online");
    spaRequest();
    setTimeout(() => setShowDemoConfirmation(true), 500);
  };

  const handleDemoPaymentFailure = (error) => {
    console.log("Payment failed:", error);
  };

  const handleDemoBookNowPayLater = (info) => {
    setStatus("pending");
    setPaytype("offline");
    setShowDemoPayment(false);
    spaRequest();
    setTimeout(() => {
      setDemoPaymentResult({ paymentMethod: "offline", amount: amount });
      setShowDemoConfirmation(true);
    }, 500);
  };

  // === CASHFREE PAYMENT FLOW ===
  // ✅ CREATE PAYMENT (React frontend)
  async function createPayment() {
    const url = 'https://api.codingboss.in/kovais/payment/create/';
    const id = localStorage.getItem('spaId');
    // const fcm_token = JSON.stringify(localStorage.getItem('fcm_token')) || 'demo_fcm_token';

    const payload = {
      amount: amount || selectedServices.reduce((total, service) => total + Number(service.amount || 0), 0),
      order_type: 'spa',
      order_id: id,
      gateway: 'cashfree',
      fcm_token: "de985ad4e255a320cda6c55cf79809b4a2c2e7d3",
    };


    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });


      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);


      const data = await response.json();
      // console.log('✅ Payment created successfully:', data);


      localStorage.setItem('payment_db_id', String(data.payment_db_id));
      localStorage.setItem('order_id', String(data.order_id));
      // setPaymentData(data);


      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = data.upi_link;
      } else {
        const qrContainer = document.getElementById('qrContainer');
        qrContainer.innerHTML = `
<h3>Scan this QR to complete payment</h3>
<img src="${data.qr_code_url}" alt="UPI QR Code" style="width:250px;height:250px;">
<p>Or open this link on your phone:</p>
<a href="${data.upi_link}" target="_blank">${data.upi_link}</a>
`;
      }

      // await Webhook();
      await verifyPayment();
      return data;
    } catch (error) {
      console.error('❌ Error creating payment:', error.message);
      setMessage('Failed to create payment.');
    }
  }

  // ✅ VERIFY PAYMENT STATUS (React frontend)
  async function verifyPayment() {
    // const url = "https://api.codingboss.in/kovais/payment/verify/";
    const url = "https://api.codingboss.in/kovais/payment/verify/";
    const payment_id = localStorage.getItem("payment_db_id");
    const order_id = localStorage.getItem("order_id");
    // const fcm_token = JSON.stringify(localStorage.getItem('fcm_token')) || 'demo_fcm_token';

    const payload = {
      gateway: "cashfree",
      order_id: order_id,
      payment_id: String(payment_id), // ✅ ensure string type
      signature: null,
      fcm_token: 'de985ad4e255a320cda6c55cf79809b4a2c2e7d3'
    };

    // console.log("🔍 Verifying payment with payload:", payload);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      // console.log("✅ Payment verified successfully:", data);

      // ✅ Handle different statuses
      // switch (data.status) {
      //   case "PAID" :
      //     // console.log("🎉 Payment Successful!");
      //     alert("✅ Payment Successful!");
      //     break;

      //   case "FAILED":
      //     console.warn("❌ Payment Failed.");
      //     alert("❌ Payment Failed!");
      //     break;

      //   case "PENDING":
      //     console.info("⏳ Payment Pending.");
      //     alert("⏳ Payment Pending, please wait...");
      //     // Optional: auto recheck every few seconds
      //     pollVerify();
      //     break;

      //   default:
      //     // console.log("ℹ️ Unknown payment status:", data.status);
      // }

      // ✅ Handle different statuses (Universal Gateway Response)
      const status = (data.status || "").toUpperCase().trim();

      if (["PAID", "SUCCESS", "COMPLETED", "OK"].includes(status)) {
        // console.log("🎉 Payment Successful!");
        // alert("✅ Payment Successful!");
      }
      else if (["FAILED", "FAILURE", "ERROR", "DECLINED"].includes(status)) {
        console.warn("❌ Payment Failed.");
        deleteOrder()
      }
      else if (["PENDING", "PROCESSING", "AWAITED"].includes(status)) {
        console.info("⏳ Payment Pending.");
        // alert("⏳ Payment Pending, please wait...");
        // Optional: Auto recheck status after delay
        pollVerify();
      }
      else {
        // console.log("ℹ️ Unknown payment status:", status);
        // alert(`ℹ️ Unknown Status: ${status}`);
      }

      return data;
    } catch (error) {
      console.error("❌ Error verifying payment:", error.message);
    }
  }

  // 🕒 OPTIONAL: AUTO VERIFY (poll every 10s until status changes)
  async function pollVerify(interval = 10000) {
    // console.log("🔄 Polling payment status every 10s...");
    const check = async () => {
      const result = await verifyPayment();
      if (result && (result.status === "PAID" || result.status === "FAILED")) {
        // console.log("✅ Stopping polling — final status:", result.status);
        return;
      }
      setTimeout(check, interval);
    };
    check();
  }
  async function deleteOrder() {
    const orderId = localStorage.getItem("spaId");
    const userId = user.user_id;
    const url = `https://api.codingboss.in/kovais/delete-booking/?booking_id=${orderId}&user_id=${userId}&role=spa`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      // console.log("✅ Order deleted successfully:", data);
      // alert("❌ Payment Failed! Order has been deleted.");
    }
    catch (error) {
      console.error("❌ Error deleting order:", error.message);
    }
  }

  const handleClicked = () => {
    setShowModal(false);
  };

  const handleFreeService = () => {
    spaRequest();
    setShowModal(false);
  };

  const handlePayupi = () => {
    setShowModal(false);
    spaRequest();
    setTimeout(() => {
      createPayment()
    }, 3000)
  };

  useEffect(() => {
    if (status && paytype) {
      setTimeout(() => {
        if (paytype === "offline") {
          handleFreeService();
        } else if (paytype === "online") {
          handlePayupi();
        }
      }, 500);
    }
  }, [status, paytype]);

  const spaRequest = async () => {
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const data = {
      category: selectedGender,
      services: selectedServices.map(service => service.name).join(", "),
      amount: amount || selectedServices.reduce((total, service) => total + Number(service.amount || 0), 0),
      date: formattedDate,
      time: selectedTime,
      payment_status: status,
      payment_type: paytype,
      customer_id: user.user_id,
      status: booked,
      customer_name: user.username,
      points: usedPoints
    };

    try {
      const response = await axios.post(
        "https://api.codingboss.in/kovais/spa/orders/",
        // "https://1e53d0afb221.ngrok-free.app/kovais/spa/orders/",
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      // console.log("Success:", response.data);
      localStorage.setItem("spaId", JSON.stringify(response.data.order.id));
      // console.log("spa id", response.data.order.id)
      // createPayment()
      // setSpaId(response.data.order.id);

      // Swal.fire({
      //   title: "success",
      //   icon: "success",
      //   draggable: false
      // });

    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="spa-booking-page">
      <Container fluid className="spa-container">

        {/* Premium Spa Hero Section */}
        <section className="spa-hero-section">
          <div className="spa-hero-overlay"></div>
          <img src={spaBannerImg} alt="Kovais Spa Luxury" className="spa-hero-bg" />
          
          <Container className="position-relative h-100 d-flex flex-column justify-content-center align-items-center text-center z-index-2">
            <div data-aos="zoom-in" data-aos-duration="1200" className="spa-hero-content-new">
              <div className="spa-badge mb-4">
                <span className="spa-badge-dot"></span> KOVAIS SPA & WELLNESS
              </div>
              
              <h1 className="spa-hero-title-new mb-4">
                Premium <span>Spa</span> <br/> <span>Therapies</span>
              </h1>
              
              <p className="spa-hero-desc mb-5">
                Premium wellness therapies tailored to your ultimate relaxation. From 
                deep tissue massages to authentic holistic treatments — experience luxury
                redefined.
              </p>
              
              <div className="spa-hero-buttons d-flex gap-3 justify-content-center flex-wrap">
                <button onClick={handleScroll} className="btn-spa-primary">
                  EXPLORE SERVICES
                </button>
                <button onClick={handleScroll} className="btn-spa-outline">
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>
          </Container>
        </section>

        {/* Gender Selection */}
        <section className="gender-selection-section">
          <Container>
            <div className="spa-section-header" data-aos="fade-up">
              <span className="spa-section-tag">Treatments</span>
              <h2>Select Your Preference</h2>
              <p>Choose your preferred treatment category for a personalized spa experience</p>
            </div>
            <Row className="justify-content-center">
              {[
                {
                  gender: "Men",
                  image: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg",
                  description: "Specialized holistic treatments designed to alleviate muscle tension and restore balance for men."
                },
                {
                  gender: "Women",
                  image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                  description: "Customized wellness therapies crafted to rejuvenate the mind, body, and spirit for women."
                }
              ].map(({ gender, image, description }, index) => (
                <Col key={index} xs={12} md={6} lg={5} className="mb-5">
                  <div 
                    data-aos="fade-up" 
                    data-aos-delay={index * 150}
                    className={`spa-gender-card ${selectedGender === gender ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedGender(gender);
                      handleScroll();
                    }}
                  >
                    <div className="spa-gender-img-wrapper">
                      <img src={image} alt={gender} className="spa-gender-img" />
                      <div className="spa-gender-overlay"></div>
                      <h3 className="spa-gender-title">{gender}</h3>
                    </div>
                    <div className="spa-gender-content">
                      <p className="spa-gender-desc">{description}</p>
                      <div className="spa-gender-select-wrapper">
                        <span className="spa-gender-select-text">
                          {selectedGender === gender ? 'SELECTED' : `SELECT ${gender.toUpperCase()}`}
                        </span>
                        <div className={`spa-gender-circle ${selectedGender === gender ? 'selected' : ''}`}>
                          {selectedGender === gender ? '✓' : '→'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Service Selection */}
        <section className="service-selection-section" id="target-section">
          <Container>
            <div className="spa-section-header" data-aos="fade-up">
              <span className="spa-section-tag">Therapies</span>
              <h2>Choose Your Services</h2>
              <p>Select multiple premium services for your perfect, tailored spa experience</p>
            </div>
            <Row>
              {services[selectedGender] && services[selectedGender].map((service, index) => {
                const isSelected = selectedServices.find(s => s?.id === service.id);
                return (
                  <Col lg={4} md={6} key={service.id} className="mb-4">
                    <div 
                      data-aos="fade-up" 
                      data-aos-delay={index * 100}
                      className={`spa-service-card ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSelectService(service)}
                    >
                      <div className="spa-service-img-wrapper">
                        <img src={service.imageUrl} alt={service.name} className="spa-service-img" />
                        <div className="spa-service-price">₹{service.amount}</div>
                        {isSelected && (
                          <div className="spa-service-check">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="spa-service-content">
                        <h4 className="spa-service-title">{service.name}</h4>
                        <div className="spa-service-meta">
                          <span className="spa-service-duration"><i className="far fa-clock"></i> 60 Min</span>
                        </div>
                        <p className="spa-service-desc">{service.description}</p>
                        <button className={`spa-service-btn ${isSelected ? 'selected' : ''}`}>
                          {isSelected ? 'ADDED TO BOOKING' : 'ADD SERVICE'}
                        </button>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>

            {selectedServices.length > 0 && (
              <div className="text-center mt-5" data-aos="fade-up">
                <button
                  onClick={handleScrollDown}
                  className="btn-spa-primary"
                >
                  CONTINUE TO DATE & TIME ({selectedServices.length} SELECTED)
                </button>
              </div>
            )}
          </Container>
        </section>

        {/* Date and Time Selection */}
        <section id="datetime-section" className="datetime-section">
          <Container>
            <div className="spa-section-header" data-aos="fade-up">
              <span className="spa-section-tag">Schedule</span>
              <h2>Select Date & Time</h2>
              <p>Choose your preferred appointment date and available time slot for your session</p>
            </div>

            <div className="spa-datetime-container" data-aos="fade-up">
              <Row className="g-0">
                <Col md={5} className="spa-date-col">
                  <div className="spa-datetime-panel">
                    <h3 className="spa-panel-title">1. Select Date</h3>
                    <div className="spa-date-input-wrapper">
                      <input
                        type="date"
                        value={formatDateForInput(selectedDate)}
                        onChange={handleDateChange}
                        min={formatDateForInput(new Date())}
                        className="spa-date-input"
                      />
                    </div>
                    <div className="spa-selected-date-display">
                      <span>YOUR SELECTED DATE</span>
                      <h4>{selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}</h4>
                    </div>
                  </div>
                </Col>
                
                <Col md={7} className="spa-time-col">
                  <div className="spa-datetime-panel">
                    <h3 className="spa-panel-title">2. Available Times</h3>
                    <div className="spa-time-grid">
                      {availableSlots.map((slot) => {
                        const isDisabled = isTimeSlotDisabled(slot);
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => !isDisabled && setSelectedTime(slot)}
                            disabled={isDisabled}
                            className={`spa-time-slot ${isSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {isToday(selectedDate) && (
                      <p className="spa-time-warning mt-4">
                        * Past time slots are disabled for today's date.
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
            </div>

            {selectedTime && selectedServices.length > 0 && (
              <div className="text-center mt-5" data-aos="fade-up">
                <button
                  onClick={handlePayment}
                  className="btn-spa-primary px-5 py-3"
                  style={{ fontSize: '1.1rem' }}
                >
                  PROCEED TO SECURE PAYMENT
                </button>
              </div>
            )}
          </Container>
        </section>

        {/* Demo Payment Modal */}
        <PaymentPage
          show={showDemoPayment}
          onHide={() => setShowDemoPayment(false)}
          bookingSummary={{
            services: selectedServices.map(s => ({ name: s.name, price: s.amount || s.price })),
            date: selectedDate,
            time: selectedTime,
            amount: amount || selectedServices.reduce((sum, s) => sum + Number(s.amount || s.price || 0), 0),
          }}
          onPaymentSuccess={handleDemoPaymentSuccess}
          onPaymentFailure={handleDemoPaymentFailure}
          onBookNowPayLater={handleDemoBookNowPayLater}
          points={points}
          onUsePoints={(pts, discount) => {
            setUsedPoints(pts);
            setPoints(prev => prev - pts);
            setAmount(prev => Math.max(0, prev - discount));
          }}
        />

        <ConfirmationPage
          show={showDemoConfirmation}
          onHide={() => setShowDemoConfirmation(false)}
          transactionId={demoPaymentResult?.transactionId}
          amount={demoPaymentResult?.amount || amount}
          paymentMethod={demoPaymentResult?.paymentMethod}
          bookingSummary={{
            services: selectedServices.map(s => ({ name: s.name, price: s.amount || s.price })),
            date: selectedDate,
            time: selectedTime,
          }}
          onDone={() => setShowDemoConfirmation(false)}
        />

        {/* Login Modal  */}
        <Modal
          show={showLoginModal}
          onHide={() => setShowLoginModal(false)}
          centered
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="w-100 text-center">Welcome</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4 pt-0">
            <Tabs
              activeKey={isNewUser ? 'signup' : 'login'}
              onSelect={handleTabSelect}
              className="mb-4 nav-fill"
            >
              <Tab eventKey="login" title="Login" />
              <Tab eventKey="signup" title="Sign Up" />
            </Tabs>

            <Form>
              {/* Username Field */}
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <FaUser className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={userData.username || ""}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    placeholder="Username"
                    className="border-start-0"
                  />
                </InputGroup>
              </Form.Group>

              {/* Phone Field (Only for Signup) - WITH VALIDATION */}
              {isNewUser && (
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text className="bg-light">
                      <FaPhoneAlt className="text-secondary" />
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      value={userData.phone_number || ""}
                      onChange={handlePhoneNumberChange} // Uses validation handler
                      placeholder="Enter Your Phone Number"
                      className="border-start-0"
                      isInvalid={!!phoneError} // Toggles error styling
                    />
                    {/* Display Validation Error */}
                    <Form.Control.Feedback type="invalid">
                      {phoneError}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              )}

              {/* Password Field */}
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <FaLock className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={userData.password || ""}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    placeholder="Password"
                    className="border-start-0 border-end-0"
                  />
                  <InputGroup.Text
                    className="bg-light cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?
                      <FaEyeSlash className="text-secondary" /> :
                      <FaEye className="text-secondary" />
                    }
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Forgot Password Link */}
              {!isNewUser && (
                <div className="d-flex justify-content-end mb-3">
                  <Button variant="link" className="p-0 text-decoration-none" size="sm">
                    Forgot password?
                  </Button>
                </div>
              )}

              {/* Overall Error Message */}
              {errorMessage && (
                <Alert variant="dark" className="py-2 mb-3">
                  {errorMessage}
                </Alert>
              )}

              {/* Main Action Button */}
              <Button
                variant="primary"
                // Use validation wrapper for Sign Up, use original login for Login
                onClick={isNewUser ? handleSignUpClick : loginUser}
                disabled={isButtonDisabled}
                className="w-100 py-2 mt-2 mb-3"
              >
                {loading ?
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isNewUser ? "Creating Account..." : "Logging in..."}
                  </span> :
                  isNewUser ? "Create Account" : "Login"
                }
              </Button>

              {/* The Social Login section has been removed */}

              {/* Terms & Privacy */}

              <p className="text-muted text-center small mt-4">
                By signing up, you agree to our <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>.
              </p>

            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <footer className="spa-footer">
        <div className="spa-footer-map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15643.088825667954!2d77.4287803!3d11.4593457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba93d7c7fa918b9%3A0x6a0ed7962eb0237!2sKovais%20Gym!5e0!3m2!1sen!2sin!4v1689269415671!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '15px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="spa-footer-content">
          <h3 className="spa-footer-title">
            <i className="fas fa-spa me-2"></i> KOVAIS SPA
          </h3>
          <p className="spa-footer-address">
            097, SH 15, Otthakkuthirai gobichettipalayam Tk, DT, Gobichettipalayam, Tamil Nadu 638455
          </p>
          <div className="spa-footer-divider"></div>
          <p className="spa-footer-copyright">
            &copy; 2024 KOVAIS. All Rights Reserved. | Contact: 9234567891 | Email: info@kovaisbeauty.com
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SpaBooking;
