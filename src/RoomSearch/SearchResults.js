import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  Star,
  Camera,
  Share2,
  Filter,
  SortAsc,
  Eye,
  Clock,
  Shield,
  Award,
  MessageCircle,
  Phone,
  Mail,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Navigation,
  Sun,
  Moon,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { format, set } from 'date-fns';
import dlx1 from './images/dlx1.jpeg'
import dlx2 from './images/dlx2.jpeg'
import dlx3 from './images/dlx3.jpeg'
import dlx4 from './images/dlx4.jpeg'
import { Row, Col, Modal, Button, Spinner, Tabs, Tab, Form, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaDumbbell, FaUsers, FaClock, FaAward, FaTrophy, FaFire, FaPhone, FaPhoneAlt } from 'react-icons/fa';
import axios from "axios";
import "./SearchResults.css";
import { PaymentPage, ConfirmationPage } from '../components/Payment';
// Calendar Component
const DateCalendar = ({ isOpen, onClose, onDateSelect, selectedDate, position }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  if (!isOpen) return null;

  const today = new Date();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    const formattedDate = newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    onDateSelect(formattedDate);
    onClose();
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          minWidth: '320px',
          border: '1px solid #e1e5e9'
        }}
      >
        {/* Calendar Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => navigateMonth('prev')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #e1e5e9',
              borderRadius: '6px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <h4 style={{
            margin: '0',
            fontSize: '18px',
            fontWeight: '600',
            color: '#333'
          }}>
            {monthNames[currentMonth]} {currentYear}
          </h4>
          <button
            onClick={() => navigateMonth('next')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #e1e5e9',
              borderRadius: '6px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Days of Week */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '8px'
        }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              style={{
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6c757d',
                padding: '8px 0'
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px'
        }}>
          {/* Empty cells for days before month starts */}
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <div key={`empty-${index}`} style={{ height: '40px' }} />
          ))}

          {/* Calendar days */}
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const dateToCheck = new Date(currentYear, currentMonth, day);
            const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
            const isPastDate = dateToCheck < today && !isToday;

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={isPastDate}
                style={{
                  height: '40px',
                  backgroundColor: isToday ? '#dc3545' : 'transparent',
                  color: isToday ? 'white' : (isPastDate ? '#bbb' : '#333'),
                  border: '1px solid #e1e5e9',
                  borderRadius: '6px',
                  cursor: isPastDate ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  opacity: isPastDate ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isToday && !isPastDate) {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.borderColor = '#dc3545';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isToday && !isPastDate) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#e1e5e9';
                  }
                }}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Calendar Footer */}
        <div style={{
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #e1e5e9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '12px', color: '#6c757d' }}>
            Select your preferred date
          </span>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({ user, setUser, setAadhar, aadhar, setPoints, points }) => {
  // State Management
  const [selectedRoomType, setSelectedRoomType] = useState("Deluxe Suite");
  const [position, setPosition] = useState('checkIn');
  const [roomCounts, setRoomCounts] = useState([1]);
  const [guestCounts, setGuestCounts] = useState([2]);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000));
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [status, setStatus] = useState("");
  const [paytype, setPaytype] = useState("");
  const [usedPoints, setUsedPoints] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [booked, setBooked] = useState("booked")
  const [aadharFile, setAadharFile] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(10); // Default to 10 for demo selection visibility // Fetched from API
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [value, setValue] = useState(""); // For points input
  const [purposeOfVisit, setPurposeOfVisit] = useState("");
  const [userData, setUserData] = useState({ username: "", phone_number: "", password: "" });
  const [phoneError, setPhoneError] = useState('');
  // Form fields state
  const [location, setLocation] = useState("Gobichettipalayam, Erode India");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [roomType, setRoomType] = useState("Delux Room");
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);// tracking drag selection
  const checkOutRef = useRef();
  const checkInRef = useRef();
  const [checkInOpen, setCheckInOpen] = useState(false);

  // Calendar state
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  // Features State
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');
  const [savedRooms, setSavedRooms] = useState(new Set());
  const [total, setRoom] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Demo Payment states
  const [showDemoPayment, setShowDemoPayment] = useState(false);
  const [showDemoConfirmation, setShowDemoConfirmation] = useState(false);
  const [demoPaymentResult, setDemoPaymentResult] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [nearbyAttractions, setNearbyAttractions] = useState([]);
  const [realTimeOccupancy, setRealTimeOccupancy] = useState({});
  const [virtualTourProgress, setVirtualTourProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  // Special Request State
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    earlyCheckIn: { checked: false, time: "" },
    lateCheckOut: { checked: false, time: "" },
    extraBed: { checked: false, count: 0 },
  });
  // Request Options
  const requestOptions = [
    { id: 'earlyCheckIn', label: 'Early check-in', showTime: true, showInput: false },
    { id: 'lateCheckOut', label: 'Late check-out', showTime: true, showInput: false },
    { id: 'extraBed', label: 'Extra bed', showTime: false, showInput: true },
  ];

  // Enhanced Room Data
  const rooms = [
    {
      id: 1,
      type: 'Deluxe Suite',
      title: 'Premium Deluxe Suite with City View',
      description: 'Experience luxury with panoramic city views, smart home automation, and premium amenities.',
      price: 4500,
      originalPrice: 4500,
      // taxes: 788,
      rating: 4.8,
      reviewCount: 342,
      location: 'Gobichettypalayam Premium District',
      images: [
        // 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
        // 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
        // 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
        // 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg'
        dlx1, dlx2, dlx3, dlx4
      ],
      amenities: [
        { name: 'Smart TV', icon: '📺', available: true },
        { name: 'High-Speed WiFi', icon: '📶', available: true },
        { name: 'Mini Bar', icon: '🍷', available: true },
        { name: 'Room Service', icon: '🛎️', available: true },
        { name: 'Balcony', icon: '🏙️', available: true },
        { name: 'Air Conditioning', icon: '❄️', available: true }
      ],
      features: {
        smartHome: true,
        voiceControl: true,
        moodLighting: true,
        premiumBedding: true,
        cityView: true,
        soundproofing: true
      },
      virtualTour: 'https://example.com/virtual-tour-1',
      ecoRating: 4.2,
      carbonFootprint: 'Low',
      lastBooked: '2 hours ago',
      popularityScore: 95,
      instantConfirmation: true,
      freeCancellation: true,
      cancellationDeadline: '24 hours',
      specialOffers: ['Early Bird 20% Off', 'Extended Stay Discount'],
      nearbyAttractions: ['City Mall - 0.5km', 'Central Park - 1.2km', 'Museum - 2.1km']
    }
  ];

  // Weather Info
  const weatherInfo = {
    temperature: '24°C',
    condition: 'Sunny',
    humidity: '65%',
    windSpeed: '12 km/h'
  };

  const attractions = [
    { name: 'Ancient Temple', distance: '0.8km', rating: 4.7, type: 'Historical' },
    { name: 'Shopping Complex', distance: '1.2km', rating: 4.5, type: 'Shopping' },
    { name: 'Nature Park', distance: '2.1km', rating: 4.9, type: 'Nature' },
    { name: 'Local Market', distance: '0.5km', rating: 4.3, type: 'Culture' }
  ];

  useEffect(() => {
    // Calculate initial total for first room
    setTotalAmount(roomCounts[0] * rooms[0].price);

    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeOccupancy(prev => ({
        ...prev,
        [Math.floor(Math.random() * 3) + 1]: Math.floor(Math.random() * 100)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Special Request Functions
  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = (id) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id].checked },
    }));
  };

  const handleTimeChange = (id, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: { ...prev[id], time: value },
    }));
  };

  const handleCountChange = (id, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: { ...prev[id], count: Number(value) },
    }));
  };

  // Calendar Functions
  const handleCheckInClick = () => {
    setShowCheckInCalendar(true);
    setShowCheckOutCalendar(false);
  };

  const handleCheckOutClick = () => {
    setShowCheckOutCalendar(true);
    setShowCheckInCalendar(false);
  };

  const handleCheckInDateSelect = (date) => {
    const selected = new Date(date);

    // If check-out not chosen → selecting check-out next
    if (!checkInDate || (checkInDate && selected < checkOutDate)) {
      setCheckInDate(selected);
      setCheckOutDate(null);
      setSelectingCheckOut(true);
      setShowCheckOutCalendar(true); // auto open checkout calendar after first click
      return;
    }

    // Drag or second CLICK becomes check-out
    if (selectingCheckOut && selected > checkInDate) {
      setCheckOutDate(selected);
      setSelectingCheckOut(false);
      setShowCheckInCalendar(false);
      setShowCheckOutCalendar(false);
      return;
    }
  };


  const handleCheckOutDateSelect = (date) => {
    const selected = new Date(date);

    if (!checkInDate) {
      toast.error("Select Check-in first");
      setShowCheckInCalendar(true);
      return;
    }

    if (selected <= checkInDate) {
      toast.error("Checkout must be after Check-In");
      return;
    }

    setCheckOutDate(selected);
    setShowCheckOutCalendar(false);
    setSelectingCheckOut(false);
  };


  const incrementRoom = (index) => {
    const updatedCounts = [...roomCounts];
    const maxRooms = availableRooms || 10;
    if (updatedCounts[index] < maxRooms) {
      updatedCounts[index] += 1;
      setRoomCounts(updatedCounts);
      const basePrice = typeof rooms[index].price === "string"
        ? parseFloat(rooms[index].price.replace("₹", "").replace(/,/g, ""))
        : rooms[index].price;
      setTotalAmount(updatedCounts[index] * basePrice);
    }
  };

  const decrementRoom = (index) => {
    const updatedCounts = [...roomCounts];

    if (updatedCounts[index] > 1) {
      updatedCounts[index] -= 1;
      setRoomCounts(updatedCounts);
      const basePrice = typeof rooms[index].price === "string"
        ? parseFloat(rooms[index].price.replace("₹", "").replace(/,/g, ""))
        : rooms[index].price;
      setTotalAmount(updatedCounts[index] * basePrice);

      // 🔥 Auto-adjust guest limit when room decreases
      const updatedGuests = [...guestCounts];
      const newMaxGuests = updatedCounts[index] * 3;

      if (updatedGuests[index] > newMaxGuests) {
        updatedGuests[index] = newMaxGuests;
        setGuestCounts(updatedGuests);
      }
    }
  };

  const handleBookNow = (room, index) => {
    if (!checkInDate) {
      toast.error("Please select Check-In date");
      setShowCheckInCalendar(true);   // open picker
      return;
    }

    if (!checkOutDate) {
      toast.error("Please select Check-Out date");
      setShowCheckOutCalendar(true);  // open picker
      return;
    }

    // If both selected then proceed
    verify(room, index);
  };


  const incrementGuest = (index) => {
    const updatedGuests = [...guestCounts];
    const maxGuests = roomCounts[index] * 3;
    if (updatedGuests[index] < maxGuests) {
      updatedGuests[index] += 1;
      setGuestCounts(updatedGuests);
    }
  };

  const decrementGuest = (index) => {
    const updatedGuests = [...guestCounts];
    if (updatedGuests[index] > 1) {
      updatedGuests[index] -= 1;
      setGuestCounts(updatedGuests);
    }
  };


  // Features Functions
  const toggleSaveRoom = (roomId) => {
    const newSavedRooms = new Set(savedRooms);
    if (newSavedRooms.has(roomId)) {
      newSavedRooms.delete(roomId);
    } else {
      newSavedRooms.add(roomId);
    }
    setSavedRooms(newSavedRooms);
  };

  const shareRoom = async (room) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: room.title,
          text: room.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // alert('Room link copied to clipboard');
    }
  };

  const handleVirtualTour = (room) => {
    setSelectedRoom(room);
    setShowVirtualTour(true);
    setVirtualTourProgress(0);

    // Simulate virtual tour progress
    const progressInterval = setInterval(() => {
      setVirtualTourProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

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
        // "https://454732e0c81a.ngrok-free.app/kovais/customer-login/",
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

      console.log("Login Success:", response.data);

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      localStorage.setItem("currentUserId", JSON.stringify(response.data.user_id));

      if (response.data.emblem_url || response.data.points) {
        localStorage.setItem("url", JSON.stringify(response.data.emblem_url));
        localStorage.setItem(`points_${response.data.user_id}`, JSON.stringify(response.data.points))
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

  const signUp = async () => {
    if (!userData.username || !userData.phone_number || !userData.password) {
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
        "https://api.codingboss.in/kovais/create-customer/",
        // "https://454732e0c81a.ngrok-free.app/kovais/create-customer/",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      console.log("Signup Success:", response.data);
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


  const verify = (room, index) => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      handleShowModal(room, index)
      setShowLoginModal(false);
      setShowModal(true); // ✅ Show payment modal
    } else {
      console.log("No user is logged in. Showing login modal.");
      setShowLoginModal(true);
      setShowModal(false);
    }
  };

  // Handle tab switching
  const handleTabSelect = (key) => {
    setIsNewUser(key === 'signup');
    setErrorMessage(''); // Clear error messages on tab switch
  };

  const fetchAvailableRooms = async (checkInDate, checkOutDate) => {
    try {
      if (!checkInDate || !checkOutDate) {
        console.warn("Dates not selected yet");
        return;
      }

      const formattedCheckIn = format(new Date(checkInDate), "yyyy-MM-dd");
      const formattedCheckOut = format(new Date(checkOutDate), "yyyy-MM-dd");

      const response = await axios.get(
        `https://api.codingboss.in/kovais/hotel/room-availability/?date_in=${formattedCheckIn}&date_out=${formattedCheckOut}`,
        // `https://454732e0c81a.ngrok-free.app/kovais/hotel/room-availability/?date_in=${formattedCheckIn}&date_out=${formattedCheckOut}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      console.log("Fetched Available Rooms:", response.data.available_count);
      console.log("Total Rooms:", response.data.total_rooms)
      setRoom(response.data.total_rooms)
      setAvailableRooms(response.data.available_count);
    } catch (error) {
      console.error("Error fetching available rooms:", error);
    }
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      fetchAvailableRooms(checkInDate, checkOutDate);
    }
  }, [checkInDate, checkOutDate]);

  const handleShowModal = (room, index) => {
    if (!room) {
      console.error("Error: Room is undefined!");
      return;
    }

    let roomPrice = room.price;

    // If it's a string like "₹1,500", clean it
    if (typeof roomPrice === "string") {
      roomPrice = roomPrice.replace("₹", "").replace(/,/g, "");
    }

    const totalAmount = roomCounts[index] * parseFloat(roomPrice);

    setSelectedRoom({
      ...room,
      roomCount: roomCounts[index],
      guestCount: guestCounts[index],
      totalAmount: totalAmount,
    });

    setShowModal(true);
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setAadharFile(file);
  //     console.log("Selected file:", file.name);
  //   }
  // };

  // const handleSave = () => {
  //   if (!aadharFile) {
  //     alert("Please select an Aadhar file.");
  //     return;
  //   }

  //   // You can store it in state, localStorage, or show confirmation
  //   alert(`Aadhar file "${aadharFile.name}" saved successfully!`);

  //   // Optionally preview or show that upload was successful
  //   // setAadharUploaded(true); // You can conditionally hide the upload form
  // };


  // ✅ CREATE PAYMENT (React frontend)
  async function createPayment() {
    const url = 'https://api.codingboss.in/kovais/payment/create/';
    const id = localStorage.getItem('hotelId');
    // const fcm_token = JSON.stringify(localStorage.getItem('fcm_token')) || 'demo_fcm_token';

    const payload = {
      amount: Math.round(totalAmount || selectedRoom.totalAmount), // Use full total amount, not per-room
      order_type: 'hotel',
      order_id: id,
      gateway: 'cashfree',
      fcm_token: 'de985ad4e255a320cda6c55cf79809b4a2c2e7d3',
    };


    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });


      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);


      const data = await response.json();
      console.log('✅ Payment created successfully:', data);


      localStorage.setItem('payment_db_id', String(data.payment_db_id));
      localStorage.setItem('order_id', String(data.order_id));

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = data.upi_link;
      } else {
        const qrContainer = document.getElementById('qrContainer');
        qrContainer.innerHTML = `
<h3>Scan this QR to complete payment</h3>
<img src="${data.qr_code_url}" alt="UPI QR Code" style="width:250px;height:250px;">
<p>Or open this link on your phone:</p>
<a href="${data.upi_link}" target="_blank">${data.upi_link}</a>`;
      }

      await verifyPayment();
      return data;
    } catch (error) {
      console.error('❌ Error creating payment:', error.message);
      // setMessage('Failed to create payment.');
    }
  }

  // ✅ VERIFY PAYMENT STATUS (React frontend)
  async function verifyPayment() {
    // const url = "https://api.codingboss.in/kovais/payment/verify/";
    const url = "https://api.codingboss.in/kovais/payment/verify/";
    const payment_id = localStorage.getItem("payment_db_id");
    const order_id = localStorage.getItem("order_id");
    const fcm_token = JSON.stringify(localStorage.getItem('fcm_token')) || 'demo_fcm_token';

    const payload = {
      gateway: "cashfree",
      order_id: order_id,
      payment_id: String(payment_id), // ✅ ensure string type
      signature: null,
      fcm_token: 'de985ad4e255a320cda6c55cf79809b4a2c2e7d3'
    };

    console.log("🔍 Verifying payment with payload:", payload);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("✅ Payment verified successfully:", data);
      // ✅ Handle different statuses (Universal Gateway Response)
      const status = (data.status || "").toUpperCase().trim();

      if (["PAID", "SUCCESS", "COMPLETED", "OK"].includes(status)) {
        console.log("🎉 Payment Successful!");
        // alert("✅ Payment Successful!");
      }
      else if (["FAILED", "FAILURE", "ERROR", "DECLINED"].includes(status)) {
        console.warn("❌ Payment Failed.");

        // alert("❌ Payment Failed!");
      }
      else if (["PENDING", "PROCESSING", "AWAITED"].includes(status)) {
        console.info("⏳ Payment Pending.");
        // alert("⏳ Payment Pending, please wait...");
        // Optional: Auto recheck status after delay
        pollVerify();
      }
      else {
        console.log("ℹ️ Unknown payment status:", status);
        // alert(`ℹ️ Unknown Status: ${status}`);
      }
      return data;
    } catch (error) {
      console.error("❌ Error verifying payment:", error.message);
    }
  }

  // 🕒 OPTIONAL: AUTO VERIFY (poll every 10s until status changes)
  async function pollVerify(interval = 10000) {
    console.log("🔄 Polling payment status every 10s...");
    const check = async () => {
      const result = await verifyPayment();
      if (result && (result.status === "PAID" || result.status === "FAILED")) {
        console.log("✅ Stopping polling — final status:", result.status);
        return;
      }
      setTimeout(check, interval);
    };
    check();
  }


  // Remove the useEffect that auto-triggers booking when status/paytype changes
  /*
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
  */

  // Improved confirm button handler for the modal
  const handleConfirmBooking = () => {
    if (!paytype) {
      Swal.fire("Select Method", "Please choose a payment method", "warning");
      return;
    }

    if (paytype === "online") {
      setShowModal(false);
      setShowDemoPayment(true);
    } else {
      // offline
      handleDemoBookNowPayLater({ paymentMethod: "offline" });
    }
  };

  const handleDemoPaymentSuccess = (result) => {
    setDemoPaymentResult(result);
    setShowDemoPayment(false);
    setStatus("completed");
    setPaytype("online");

    // Create order
    hotelRequest();

    setTimeout(() => {
      setShowDemoConfirmation(true);
    }, 500);
  };

  const handleDemoPaymentFailure = (error) => {
    console.log("Payment failed:", error);
  };

  const handleDemoBookNowPayLater = (info) => {
    setStatus("pending");
    setPaytype("offline");
    setShowDemoPayment(false);
    setShowModal(false);

    // Create order
    hotelRequest();

    setTimeout(() => {
      setDemoPaymentResult({ paymentMethod: "offline", amount: totalAmount || selectedRoom?.totalAmount });
      setShowDemoConfirmation(true);
    }, 500);
  };

  const handleUsePoints = (value) => {
    const pointsToUse = Number(value);

    // Load points from localStorage if not in state yet
    let currentPoints = points;
    const storedPoints = localStorage.getItem("points");

    if (!currentPoints && storedPoints) {
      currentPoints = Number(storedPoints);
      setPoints(currentPoints);
    }

    // Total booking price from selected room
    const currentBookingTotal = selectedRoom?.totalAmount || 0;

    // VALIDATIONS -------------------------------

    if (!pointsToUse || pointsToUse <= 0) {
      return Swal.fire("Invalid Input", "Enter valid points to use.", "warning");
    }

    if (pointsToUse > currentPoints) {
      return Swal.fire("Not Enough Points", `You only have ${currentPoints} points.`, "error");
    }

    // 1 point = ₹0.10
    const discount = pointsToUse * 0.10;

    if (discount > currentBookingTotal) {
      return Swal.fire("Exceeds Bill Amount", "Points exceed payable total.", "error");
    }

    // APPLY DISCOUNT ----------------------------

    const updatedPoints = currentPoints - pointsToUse;
    const finalAmount = currentBookingTotal - discount;

    setPoints(updatedPoints);
    setTotalAmount(finalAmount);
    setUsedPoints(pointsToUse); // Track the applied points for the order request

    // SAVE NEW VALUES SO THEY DON'T RESET
    localStorage.setItem("points", updatedPoints);
    localStorage.setItem("reducedPrice", finalAmount);

    Swal.fire({
      icon: "success",
      title: "Points Applied 🎉",
      html: `
      Used: <b>${pointsToUse}</b> pts (₹${discount.toFixed(2)})<br>
      New Total: <b>₹${finalAmount.toFixed(2)}</b><br>
      Remaining Points: <b>${updatedPoints}</b>
    `
    });

    setValue(""); // Clear the input field for next use
  };



  const handleFreeService = () => {
    hotelRequest()
    setShowModal(false);

  }

  const handlePayupi = () => {
    setShowModal(false)
    hotelRequest()
    setTimeout(() => {
      createPayment()
    }, 3000)
  }

  const hotelRequest = async () => {
    setLoading(true);
    const bookingPromises = [];
    const successBookings = [];
    const failedBookings = [];

    try {
      // Create individual bookings for each room
      for (let i = 0; i < selectedRoom.roomCount; i++) {
        const bookingData = {
          category: roomType,
          amount: Math.round((totalAmount || selectedRoom.totalAmount) / selectedRoom.roomCount),
          date_in: format(checkInDate, "yyyy-MM-dd"),
          date_out: format(checkOutDate, "yyyy-MM-dd"),
          payment_status: status,
          payment_type: paytype,
          room_count: selectedRoom.roomCount, // Each request is for 1 room
          guest_count: selectedRoom.guestCount,
          status: "booked",
          customer_id: user.user_id,
          guest_name: user.username,
          points: usedPoints ? Math.round(usedPoints / selectedRoom.roomCount) : 0,
          visit: purposeOfVisit
        };
        bookingPromises.push(
          axios.post(
            // "https://454732e0c81a.ngrok-free.app/kovais/hotel/orders/",
            "https://api.codingboss.in/kovais/hotel/orders/",
            bookingData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            }
          )
            .then(response => {
              successBookings.push(response.data);
              localStorage.setItem("hotelId", JSON.stringify(response.data.order.id))
              console.log("Booking id:", response.data.order.id);
              return response;
            })
            .catch(error => {
              failedBookings.push({
                error: error.response?.data || error.message,
                attempt: i + 1
              });
              return null;
            })
        );
      }

      // Wait for all bookings to complete
      const results = await Promise.all(bookingPromises);

      // Update points only if all bookings succeeded
      if (failedBookings.length === 0 && usedPoints) {
        const newPoints = points - usedPoints;
        setPoints(newPoints);
        localStorage.setItem(`points_${user.user_id}`, JSON.stringify(newPoints));
      }

      // Show appropriate message based on results
      if (failedBookings.length === 0) {
        Swal.fire({
          title: "Booking Successful!",
          text: `${selectedRoom.roomCount} room(s) booked successfully.`,
          icon: "success",
          timer: 3000
        });
      } else if (successBookings.length > 0) {
        Swal.fire({
          title: "Partial Success",
          html: `
            <p>${successBookings.length} room(s) booked successfully.</p>
            ${failedBookings.length > 0 ?
              `<p>${failedBookings.length} room(s) failed to book.</p>` :
              ''
            }
          `,
          icon: "warning"
        });
      } else {
        throw new Error("All bookings failed");
      }

      // Close modals on success
      setShowModal(false);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire({
        title: "Booking Failed",
        text: error.message || "An error occurred while processing your booking",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };


  // Filter and Sort Functions
  const getFilteredAndSortedRooms = () => {
    let filteredRooms = [...rooms];

    if (filterBy !== 'all') {
      filteredRooms = filteredRooms.filter(room => {
        switch (filterBy) {
          case 'eco': return room.ecoRating >= 4.0;
          case 'luxury': return room.price >= 5000;
          case 'business': return room.features.businessCenter;
          case 'instant': return room.instantConfirmation;
          default: return true;
        }
      });
    }

    filteredRooms.sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'rating': return b.rating - a.rating;
        case 'popularity': return b.popularityScore - a.popularityScore;
        case 'eco': return b.ecoRating - a.ecoRating;
        default: return 0;
      }
    });
    return filteredRooms;
  };

  const filteredRooms = getFilteredAndSortedRooms();

  useEffect(() => {
    const baseAmount = filteredRooms[0]?.price || 0;
    setTotalAmount(baseAmount * roomCounts[0] + (filteredRooms[0]?.taxes || 0));
  }, [roomCounts]);

  return (
    <div className={`search-results-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Search Form Header */}
      <div className="search-form-header">
        <div className="search-form-container">
          <div className="search-form-grid">
            <div className="form-field">
              <label className="form-label">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-field date-field">
              <label className="form-label">Check-In Date</label>
              <div onClick={handleCheckInClick} className="date-input">
                <span>{checkInDate ? format(checkInDate, "yyyy-MM-dd") : "Not selected"}</span>
                <Calendar size={16} color="#dc3545" />
              </div>
            </div>

            <div className="form-field date-field">
              <label className="form-label">Check-Out Date</label>
              <div onClick={handleCheckOutClick} className="date-input">
                <span>{checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : "Not selected"}</span>
                <Calendar size={16} color="#dc3545" />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Room Type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="form-select"
              >
                <option value="Delux Room">Delux Room</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Components */}
      <DateCalendar
        isOpen={showCheckInCalendar}
        onClose={() => setShowCheckInCalendar(false)}
        onDateSelect={handleCheckInDateSelect}
        selectedDate={checkInDate}
        position="checkIn"
      />

      <DateCalendar
        isOpen={showCheckOutCalendar}
        onClose={() => setShowCheckOutCalendar(false)}
        onDateSelect={handleCheckOutDateSelect}
        selectedDate={checkOutDate}
        position="checkOut"
      />


      {/* Header */}
      <div className="main-header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-info">
              <div className="location-info">
                <h1 className="location-title">
                  <MapPin size={28} color="#dc3545" />
                  Gobichettypalayam Hotels
                </h1>
                <p className="booking-details">
                  {checkInDate ? format(checkInDate, "yyyy-MM-dd") : "Not selected"} - {checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : "Not selected"} • {guestCounts[0]} guests
                </p>
              </div>
              <span className="availability-badge">
                <Sparkles size={14} />
                {availableRooms} Available
              </span>
            </div>
            {/* <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="theme-toggle-btn"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button> */}
          </div>
        </div>
      </div>

      {/* Weather and Local Info Bar */}
      <div className="info-bar">
        <div className="info-bar-container">
          <div className="info-bar-content">
            <div className="info-items">
              <div className="weather-info">
                <Sun size={18} color="#dc3545" />
                <span>{weatherInfo.temperature} • {weatherInfo.condition}</span>
              </div>
              <div className="attractions-info">
                <MapPin size={16} color="#dc3545" />
                <span>{attractions.length} nearby attractions</span>
              </div>
            </div>
            <span className="last-updated">Last updated: 2 min ago</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {filteredRooms.map((room, index) => (
          <div key={room.id} className="room-card-enhanced">
            {/* Room Header */}
            <div className="room-header">
              <div className="room-header-content">
                <div className="room-header-info">
                  <h4 className="room-title">{room.title}</h4>
                  <div className="room-badges">
                    {room.instantConfirmation && (
                      <span className="badge instant-badge">Instant</span>
                    )}
                    {room.ecoRating >= 4.5 && (
                      <span className="badge eco-badge">Eco+</span>
                    )}
                    {realTimeOccupancy[room.id] && (
                      <span className="badge occupancy-badge">
                        <Eye size={12} />
                        {realTimeOccupancy[room.id]}% full
                      </span>
                    )}
                  </div>
                </div>
                <div className="room-actions">
                  <button
                    onClick={() => toggleSaveRoom(room.id)}
                    className={`action-btn ${savedRooms.has(room.id) ? 'saved' : ''}`}
                  >
                    <Heart size={16} fill={savedRooms.has(room.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => shareRoom(room)}
                    className="action-btn share-btn"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="room-content-grid">
              {/* Enhanced Image Gallery */}
              <div className="image-gallery-container">
                <div className="main-image-container">
                  <img
                    src={room.images[currentImageIndex[room.id] || 0]}
                    alt={room.title}
                    className="main-room-image"
                  />
                  <div className="image-counter">
                    {(currentImageIndex[room.id] || 0) + 1} / {room.images.length}
                  </div>
                  <button
                    onClick={() => handleVirtualTour(room)}
                    className="virtual-tour-btn"
                  >
                    <Camera size={14} />
                    360° Virtual Tour
                  </button>
                </div>
                <div className="thumbnail-gallery">
                  {room.images.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`${room.title} ${imgIndex + 1}`}
                      onClick={() => setCurrentImageIndex({
                        ...currentImageIndex,
                        [room.id]: imgIndex
                      })}
                      className={`thumbnail ${(currentImageIndex[room.id] || 0) === imgIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* Enhanced Room Details */}
              <div className="room-details">
                {/* Rating and Reviews */}
                <div className="rating-section">
                  <div className="rating-info">
                    <div className="rating-badge">
                      <Star size={14} fill="currentColor" />
                      {room.rating}
                    </div>
                    <span className="review-count">({room.reviewCount} reviews)</span>
                    <span className="last-booked-badge">
                      <Clock size={12} />
                      Last booked: {room.lastBooked}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="room-description">{room.description}</p>

                {/* Smart Amenities Grid */}
                <div className="amenities-section">
                  <h6 className="amenities-title">Premium Amenities</h6>
                  <div className="amenities-grid">
                    {room.amenities.slice(0, 6).map((amenity, amenityIndex) => (
                      <div
                        key={amenityIndex}
                        className={`amenity-item ${amenity.available ? 'available' : 'unavailable'}`}
                      >
                        <span className="amenity-icon">{amenity.icon}</span>
                        <span className="amenity-name">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eco Score and Sustainability */}
                <div className="sustainability-section">
                  <div className="sustainability-header">
                    <div className="eco-score">
                      <Award color="#dc3545" size={18} />
                      <span className="eco-score-text">Eco Score: {room.ecoRating}/5.0</span>
                    </div>
                    <span className="carbon-badge">{room.carbonFootprint}</span>
                  </div>
                  <div className="eco-progress-bar">
                    <div
                      className="eco-progress-fill"
                      style={{ width: `${(room.ecoRating / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="pricing-section">
                  <div className="price-display">
                    <span className="current-price">₹{room.price.toLocaleString()}</span>
                    {/* <span className="original-price">₹{room.originalPrice.toLocaleString()}</span>
                    <span className="discount-badge">
                      {Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)}% OFF
                    </span> */}
                  </div>
                  {/* <p className="tax-info">+ ₹{room.taxes} taxes & fees</p> */}
                </div>

                {/* Room and Guest Controls */}
                <div className="booking-controls">
                  <div className="control-grid">
                    {/* Rooms */}
                    <div className="control-group">
                      <label className="control-label">
                        Rooms <span className="availability-text">({availableRooms} available)</span>
                      </label>
                      <div className="counter-controls">
                        <button
                          onClick={() => decrementRoom(index)}
                          disabled={roomCounts[index] <= 1}
                          className="counter-btn"
                        >
                          -
                        </button>
                        <span className="count-display">{roomCounts[index]}</span>
                        <button
                          onClick={() => incrementRoom(index)}
                          disabled={roomCounts[index] >= (availableRooms || 10)}
                          className="counter-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="control-group">
                      <label className="control-label">Guests</label>
                      <div className="counter-controls">
                        <button
                          onClick={() => decrementGuest(index)}
                          disabled={guestCounts[index] <= 1}
                          className="counter-btn"
                        >
                          -
                        </button>
                        <span className="count-display">{guestCounts[index]}</span>
                        <button
                          onClick={() => incrementGuest(index)}
                          disabled={guestCounts[index] >= roomCounts[index] * 3}
                          className="counter-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="total-display">
                      <div className="total-label">Total</div>
                      <div className="total-amount">
                        {/* ₹{index === 0 ? totalAmount.toLocaleString() : room.price.toLocaleString()} */}
                        ₹{room.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Request Section */}
                <div className="special-request-section">
                  <div className="special-request-card">
                    <div className="special-request-header" onClick={toggleAccordion}>
                      <div className="special-request-info">
                        <h4 className="special-request-title">Special Request</h4>
                        <p className="special-request-subtitle">
                          Special requests are subject to each hotel's availability, may be chargeable & can't be guaranteed.
                        </p>
                      </div>
                      <button className="accordion-toggle">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="special-request-content">
                        <p className="request-options-title">Commonly Requested</p>
                        <ul className="request-options-list">
                          {requestOptions.map(({ id, label, showTime, showInput }) => (
                            <li key={id} className="request-option-item">
                              <div className="checkbox-container">
                                <input
                                  type="checkbox"
                                  id={id}
                                  checked={!!selectedOptions[id]}
                                  onChange={() => handleCheckboxChange(id)}
                                  className="request-checkbox"
                                />
                                <label htmlFor={id} className="request-label">{label}</label>
                              </div>
                              {showTime && selectedOptions[id] && (
                                <div className="time-input-container">
                                  <label htmlFor={`${id}_time`} className="time-label">
                                    Select time:
                                  </label>
                                  <input
                                    type="time"
                                    id={`${id}_time`}
                                    value={selectedOptions[id]?.time || ""}
                                    onChange={(e) => handleTimeChange(id, e.target.value)}
                                    className="time-input"
                                  />
                                </div>
                              )}
                              {showInput && selectedOptions[id] && (
                                <div className="count-input-container">
                                  <label htmlFor={`${id}_count`} className="count-label">
                                    Enter number of beds:
                                  </label>
                                  <input
                                    type="number"
                                    id={`${id}_count`}
                                    min={1}
                                    value={selectedOptions[id]?.count || ""}
                                    onChange={(e) => handleCountChange(id, e.target.value)}
                                    placeholder="e.g. 1 or 2"
                                    className="count-input"
                                  />
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>

                        <p className="other-request-title">Any other request?</p>
                        <textarea
                          cols="30"
                          rows="2"
                          placeholder="Enter your special request"
                          className="other-request-textarea"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <div className="action-buttons-grid">
                    <button
                      onClick={() => handleVirtualTour(room)}
                      className="action-btn-outline virtual-tour-action"
                    >
                      <Camera size={16} />
                      Virtual Tour
                    </button>
                    <button
                      onClick={() => setShowReviewModal(true)}
                      className="action-btn-outline reviews-action"
                    >
                      <MessageCircle size={16} />
                      Reviews
                    </button>
                    <button
                      onClick={() => handleBookNow(room, index)}
                      className="action-btn-primary book-now-action"
                    >
                      <Bookmark size={16} />
                      Book Now
                    </button>

                  </div>
                </div>

                {/* Special Offers */}
                {room.specialOffers && room.specialOffers.length > 0 && (
                  <div className="special-offers">
                    <h6 className="special-offers-title">Special Offers</h6>
                    <div className="special-offers-list">
                      {room.specialOffers.map((offer, offerIndex) => (
                        <span key={offerIndex} className="offer-badge">
                          {offer}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Nearby Attractions */}
        <div className="attractions-section">
          <h3 className="attractions-title">
            <Navigation color="#dc3545" />
            Explore Nearby
          </h3>
          <div className="attractions-grid">
            {attractions.map((attraction, index) => (
              <div key={index} className="attraction-card">
                <div className="attraction-icon">
                  {attraction.type === 'Historical' && '🏛️'}
                  {attraction.type === 'Shopping' && '🛍️'}
                  {attraction.type === 'Nature' && '🌳'}
                  {attraction.type === 'Culture' && '🎭'}
                </div>
                <h6 className="attraction-name">{attraction.name}</h6>
                <p className="attraction-distance">{attraction.distance}</p>
                <div className="attraction-rating">
                  <Star size={14} color="#dc3545" fill="currentColor" />
                  <span>{attraction.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered /* This prop vertically centers the modal */
        // size="lg"
        className="hotel-booking-modal-wrapper"
        backdrop="static"
      >
        {/* 1. Header - UPDATED TO CENTER TITLE */}
        <Modal.Header closeButton className="hotel-modal-header justify-content-center">
          <Modal.Title className="hotel-modal-title w-100 d-flex justify-content-center">
            <span className="icon-wrapper">
              <Sparkles size={20} />
            </span>
            Complete Your Stay
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="hotel-modal-body">
          {selectedRoom && (
            <div className="booking-content-stack">

              {/* 2. Room Summary Card */}
              <div className="room-summary-card">
                <div className="row g-0">
                  <div className="col-12 col-md-8">
                    <div className="room-info-section">
                      <h5 className="room-title">{selectedRoom.title}</h5>
                      <p className="room-desc">{selectedRoom.description}</p>

                      <div className="room-meta-tags">
                        <div className="meta-tag">
                          <Calendar size={14} />
                          <span>
                            {checkInDate instanceof Date
                              ? checkInDate.toLocaleDateString()
                              : checkInDate}{" "}
                            -{" "}
                            {checkOutDate instanceof Date
                              ? checkOutDate.toLocaleDateString()
                              : checkOutDate}
                          </span>
                        </div>
                        <div className="meta-tag">
                          <Users size={14} />
                          <span>
                            {selectedRoom.roomCount} room(s) •{" "}
                            {selectedRoom.guestCount} guest(s)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="price-display-section">
                      <div className="total-price">
                        ₹{selectedRoom.totalAmount?.toLocaleString() || selectedRoom.price.toLocaleString()}
                      </div>
                      <div className="price-breakdown">
                        <span>Base: ₹{(selectedRoom.price * selectedRoom.roomCount).toLocaleString()}</span>
                        {/* <span>Tax: ₹{selectedRoom.taxes}</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Purpose Input */}
              <div className="form-group-hotel">
                <label className="hotel-label">Purpose of Visit</label>
                <input
                  type="text"
                  className="hotel-input form-control"
                  placeholder="e.g. Business, Leisure..."
                  value={purposeOfVisit}
                  onChange={(e) => setPurposeOfVisit(e.target.value)}
                />
              </div>

              {/* 4. Loyalty/Points Section */}
              <div className="loyalty-section">
                <div className="loyalty-header">
                  <div className="loyalty-title">
                    <Award size={18} className="loyalty-icon" /> Use Rewards
                  </div>
                  <span className="points-badge">Available: {points || 0} pts</span>
                </div>

                <div className="loyalty-controls">
                  <div className="input-group loyalty-input-group">
                    <span className="input-group-text">Pts</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter amount"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <Button
                    className="btn-apply-points"
                    onClick={() => handleUsePoints(value)}
                    disabled={!value || parseInt(value) <= 0}
                  >
                    Apply
                  </Button>
                </div>

                {usedPoints > 0 && (
                  <div className="loyalty-success-msg">
                    <i className="fas fa-check-circle"></i> Success! ₹{usedPoints} discount applied.
                  </div>
                )}
              </div>

              {/* 5. Payment Selection */}
              <div className="payment-section">
                <label className="hotel-label">Select Payment Method</label>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div
                      className={`payment-method-card ${paytype === "offline" ? "active" : ""}`}
                      onClick={() => {
                        setStatus("pending");
                        setPaytype("offline");
                      }}
                    >
                      <div className="method-icon">
                        <Clock size={24} />
                      </div>
                      <div className="method-info">
                        <h6>Pay at Hotel</h6>
                        <small>Reserve now, pay later.</small>
                      </div>
                      <div className="selection-indicator"></div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div
                      className={`payment-method-card ${paytype === "online" ? "active" : ""}`}
                      onClick={() => {
                        setStatus("paid");
                        setPaytype("online");
                      }}
                    >
                      <div className="method-icon">
                        <Zap size={24} />
                      </div>
                      <div className="method-info">
                        <h6>Pay Now</h6>
                        <small>Instant confirmation.</small>
                      </div>
                      <div className="selection-indicator"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Trust Badges */}
              <div className="trust-badges-container">
                <div className="trust-badge">
                  <Shield size={16} /> Secure Booking
                </div>
                <div className="trust-badge">
                  <Clock size={16} /> Free Cancellation
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="hotel-modal-footer">
          <Button
            className="btn-confirm-booking"
            onClick={handleConfirmBooking}
            disabled={!paytype}
          >
            Confirm Booking • ₹{(totalAmount || selectedRoom?.totalAmount)?.toLocaleString()}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="virtual-tour-overlay">
          <div className="virtual-tour-modal">
            <div className="virtual-tour-header">
              <h3 className="virtual-tour-title">
                <Camera color="#dc3545" />
                360° Virtual Tour - {selectedRoom?.title}
              </h3>
              <button
                onClick={() => setShowVirtualTour(false)}
                className="virtual-tour-close"
              >
                ×
              </button>
            </div>
            <div className="virtual-tour-content">
              <div className="tour-viewer">
                <img
                  src={selectedRoom?.images[0]}
                  alt="Virtual Tour"
                  className="tour-image"
                />
                <div className="tour-controls">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="tour-control-btn"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="tour-control-btn"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <button className="tour-control-btn">
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
              <div className="tour-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${virtualTourProgress}%` }}
                  />
                </div>
                <div className="progress-text">
                  <span>Tour Progress</span>
                  <span>{virtualTourProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Reviews Modal */}
      {showReviewModal && (
        <div className="reviews-overlay">
          <div className="reviews-modal">
            <div className="reviews-header">
              <h3>Guest Reviews & Ratings</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="reviews-close"
              >
                ×
              </button>
            </div>
            <div className="reviews-content">
              {/* Overall Rating */}
              <div className="overall-rating-section">
                <div className="rating-display">
                  <div className="rating-circle">
                    <span className="rating-number">4.8</span>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={8} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rating-breakdown">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="rating-row">
                      <span className="rating-label">{rating}</span>
                      <Star size={10} fill="currentColor" color="#dc3545" />
                      <div className="rating-bar">
                        <div
                          className="rating-bar-fill"
                          style={{ width: `${rating === 5 ? 75 : rating === 4 ? 20 : 5}%` }}
                        />
                      </div>
                      <span className="rating-count">
                        {rating === 5 ? '256' : rating === 4 ? '68' : '18'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="reviews-list">
                <h6 className="reviews-list-title">Recent Reviews</h6>
                {[
                  {
                    name: "Sarah Johnson",
                    rating: 5,
                    date: "2 days ago",
                    comment: "Absolutely stunning room with amazing city views. The smart home features were impressive and the staff was incredibly helpful.",
                    helpful: 12
                  },
                  {
                    name: "Michael Chen",
                    rating: 4,
                    date: "1 week ago",
                    comment: "Great location and clean facilities. The eco-friendly initiatives are commendable. Would definitely stay again.",
                    helpful: 8
                  },
                  {
                    name: "Emma Davis",
                    rating: 5,
                    date: "2 weeks ago",
                    comment: "Perfect for business travel. The workspace was well-equipped and the WiFi was excellent throughout my stay.",
                    helpful: 15
                  }
                ].map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <h6 className="reviewer-name">{review.name}</h6>
                        <div className="review-meta">
                          <div className="review-stars">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                fill={i < review.rating ? "currentColor" : "none"}
                                color="#dc3545"
                              />
                            ))}
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="review-text">{review.comment}</p>
                    <div className="review-actions">
                      <button className="helpful-btn">
                        <ThumbsUp size={10} />
                        Helpful ({review.helpful})
                      </button>
                      <button className="not-helpful-btn">
                        <ThumbsDown size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="enhanced-footer">
        <Row className="text-center text-md-start py-4">
          <Col className="mb-3">
            <iframe
              src="https://www.google.com/maps?q=Kovais+Lodge+A%2FC+Rooms,+097,+SH+15,+Otthakkuthirai,+Gobichettipalayam,+Tamil+Nadu+638455&output=embed"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-iframe"
            />
            <div className="footer-hotel-info">
              <h5><b>Kovais (AC) Hotel</b></h5>
              <p>097, SH 15, Otthakkuthirai, Tk, DT, Gobichettipalayam, Tamil Nadu 638455</p>
            </div>
          </Col>
        </Row>
        <p className="footer-copyright">&copy; 2024 KOVAIS. All Rights Reserved. | Contact: 9234567891 | Email: info@kovaisbeauty.com</p>
      </footer>

      {/* Demo Payment Modal */}
      <PaymentPage
        show={showDemoPayment}
        onHide={() => setShowDemoPayment(false)}
        onSuccess={handleDemoPaymentSuccess}
        onFailure={handleDemoPaymentFailure}
        onBookNowPayLater={handleDemoBookNowPayLater}
        amount={totalAmount || selectedRoom?.totalAmount || 0}
        serviceName={selectedRoom?.title || "Hotel Room"}
      />

      {/* Demo Confirmation Modal */}
      <ConfirmationPage
        show={showDemoConfirmation}
        onHide={() => {
          setShowDemoConfirmation(false);
          // Optional: redirect to home or history
        }}
        paymentResult={demoPaymentResult}
        amount={totalAmount || selectedRoom?.totalAmount || 0}
        serviceName={selectedRoom?.title || "Hotel Room"}
      />
    </div>
  );
};
export default SearchResults;