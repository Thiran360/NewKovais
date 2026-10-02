import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col, Modal, Button, Tab, Tabs, Form, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaDumbbell, FaUsers, FaClock, FaAward, FaTrophy, FaFire, FaPhoneAlt } from 'react-icons/fa';
import Swal from "sweetalert2";
import axios from "axios";
import {
    Menu, X, Scissors, ChevronLeft, ChevronRight, Star, Clock, Award,
    User, Sparkles, DollarSign, Users, Calendar, Phone, Mail, CreditCard,
    Check, MapPin, Instagram, Facebook, Twitter, Home, Calendar as CalendarIcon, CheckCircle
} from "lucide-react";
import "./Funeral.css";
import { PaymentPage, ConfirmationPage } from '../components/Payment';
import { FaScissors } from "react-icons/fa6";
import funeralBanner from "../spa/images/spa_zen.png";
// import { set } from "react-datepicker/dist/date_utils";
import { useInView } from 'react-intersection-observer';

// Lazy Image Component
const LazyImage = ({ src, alt, className, style, ...props }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '50px 0px' });

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div ref={ref} className="lazy-image-container">
            {inView && (
                <img
                    src={src}
                    alt={alt}
                    className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
                    style={{
                        ...style,
                        opacity: isLoaded ? 1 : 0.5,
                        transition: 'opacity 0.3s ease-in-out',
                        filter: isLoaded ? 'none' : 'blur(5px)'
                    }}
                    onLoad={() => setIsLoaded(true)}
                    loading="lazy"
                    {...props}
                />
            )}
            {!inView && (
                <div
                    className="image-placeholder"
                    style={style}
                />
            )}
        </div>
    );
};

const SingleBarberPage = ({ user, setUser, points, setPoints, setAadhar }) => {
    // Navigation State
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Hero Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);

    // Gallery State
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState("all");

    // New Booking State for enhanced booking system
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTime, setSelectedTime] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [phoneError, setPhoneError] = useState('');
    const [amount, setAmount] = useState(0)
    const [status, setStatus] = useState("")
    const [bookedStatus, setBookedStatus] = useState("booked")
    const [usedPoints, setUsedPoints] = useState()
    const [paytype, setPaytype] = useState("")
    const [bookedSlots, setBookedSlots] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(true)
    const [shopLocation, setShopLocation] = useState("")
    const [address, setAddress] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [bookings, setBookings] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        phone_number: "",
        password: ""
    });
    const [location, setLocation] = useState(""); // For GPS coordinates
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [barberId, setBarberId] = useState("");
    const [showDemoPayment, setShowDemoPayment] = useState(false);
    const [showDemoConfirmation, setShowDemoConfirmation] = useState(false);
    const [demoPaymentResult, setDemoPaymentResult] = useState(null);

    const navigate = useNavigate()
    const [booking, setBooking] = useState({
        services: [],
        location: 'Door Step',
        employee: null,
        date: '',
        time: null,
        customerInfo: {
            name: '',
            phone: '',
            email: '',
            notes: ''
        }
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [showErrors, setShowErrors] = useState(false);

    // Get today's date in YYYY-MM-DD format for the date picker
    const today = new Date().toISOString().split('T')[0];

    // Hero Slides
    const slides = [
        {
            title: "Compassionate Care",
            subtitle: "Honoring Loved Ones",
            description: "Experience dignified and respectful funeral arrangements. Our dedicated team is here to support you during difficult times with grace and compassion.",
            image: "https://plus.unsplash.com/premium_photo-1661544108210-3a11648ecfd9?w=800&auto=format&fit=crop&q=80" },
        {
            title: "Dignified Memorials",
            subtitle: "A Peaceful Farewell",
            description: "Every arrangement is handled with the utmost respect. We provide comprehensive services tailored to honor your family's traditions and wishes.",
            image: "https://images.unsplash.com/photo-1740457029931-ad544487454f?w=800&auto=format&fit=crop&q=80" },
        {
            title: "Ritual Preparation",
            subtitle: "Honoring Tradition",
            description: "Our facilities offer a peaceful sanctuary for you to gather, reflect, and celebrate the life of your loved one.",
            image: "https://images.unsplash.com/photo-1740457026779-4c156694231c?w=800&auto=format&fit=crop&q=80" },
    ];

    // New Services Data
    const services = [
        // Funeral Services
        {
            id: 'f1',
            category: 'Funeral',
            name: 'Memorial Grooming',
            description: 'Respectful final preparation service',
            price: 500,
            image: 'https://images.unsplash.com/photo-1675746435874-e72d846bdca5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            duration: '60 min'
        },
    ];

    const employees = [
        {
            id: 'emp4',
            name: 'Isabella',
            speciality: 'Senior Stylist',
            rating: 4.9,
            image: '',
            categories: ['Funeral']
        }
    ];

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '02:00 PM', '03:00 PM',
        '04:00 PM', '05:00 PM', '06:00 PM',
    ];

    // Gallery Data
    const galleryItems = [
        { id: 1, image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80", category: "floral", title: "Floral Arrangements" },
        { id: 2, image: "https://images.unsplash.com/photo-1497910091122-9f8a7746eb33?w=600&q=80", category: "memorial", title: "Memorial Services" },
        { id: 3, image: "https://images.unsplash.com/photo-1601614660317-1f486481741e?w=600&q=80", category: "chapel", title: "Chapel Setup" },
        { id: 4, image: "https://images.unsplash.com/photo-1544027415-4ba97b47b85e?w=600&q=80", category: "floral", title: "Sympathy Flowers" },
        { id: 5, image: "https://images.unsplash.com/photo-1596706914561-eb05e3a35a60?w=600&q=80", category: "memorial", title: "Dignified Tributes" },
        { id: 6, image: "https://images.unsplash.com/photo-1588636730706-e06917f259dd?w=600&q=80", category: "chapel", title: "Peaceful Sanctuary" },
        { id: 7, image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80", category: "floral", title: "Wreaths" },
        { id: 8, image: "https://images.unsplash.com/photo-1517436073-3b1b1a45d045?w=600&q=80", category: "memorial", title: "Respectful Service" },
    ];

    // Effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Helper Functions
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // New helper functions for booking system
    const getDefaultServices = () => {
        const defaultCategories = ['Funeral'];
        return defaultCategories.map(category =>
            services.find(service => service.category === category)
        ).filter(Boolean);
    };

    const getAvailableCategories = () => {
        // Only return categories available for doorstep
        return ['Funeral'];
    };

    const categories = getAvailableCategories();

    const filteredServices = selectedCategory
        ? services.filter(service => service.category === selectedCategory && categories.includes(service.category))
        : getDefaultServices().filter(service => categories.includes(service.category));

    const availableEmployees = selectedCategory
        ? employees.filter(emp => emp.categories.includes(selectedCategory))
        : employees;

    const handleUsePoints = (value) => {
        const pointsToUse = parseInt(value);
        setUsedPoints(pointsToUse);

        const totalAmount =
            amount ||
            (services?.length
                ? services.reduce((total, service) => {
                    // Support both .price and .amount keys
                    return total + Number(service.price || service.amount || 0);
                }, 0)
                : 0);

        if (isNaN(pointsToUse) || pointsToUse <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Points",
                text: "Enter a valid number of points.",
                confirmButtonColor: "#3B82F6"
            });
            return;
        }

        if (pointsToUse > points) {
            Swal.fire({
                icon: "error",
                title: "Not Enough Points",
                text: `You only have ${points} points.`,
                confirmButtonColor: "#EF4444"
            });
            return;
        }

        // 💰 Each point = ₹0.10
        const discountValue = pointsToUse * 0.10;

        if (discountValue > totalAmount) {
            Swal.fire({
                icon: "error",
                title: "Too Many Points Used",
                text: `You can't use points worth more than your total price (₹${totalAmount}).`,
                confirmButtonColor: "#EF4444"
            });
            return;
        }

        const newPoints = points - pointsToUse;
        const newPrice = totalAmount - discountValue;

        setPoints(newPoints);
        setAmount(newPrice);
        localStorage.setItem("reducedPrice", JSON.stringify(newPrice));

        Swal.fire({
            icon: "success",
            title: "Points Applied 🎉",
            html: `
      <b>${pointsToUse}</b> points used (worth ₹${discountValue.toFixed(2)}).<br/>
      New total: <b>₹${newPrice.toFixed(2)}</b><br/>
      Remaining points: <b>${newPoints}</b>
    `,
            confirmButtonColor: "#237423ff"
        });

        setValue("");
    };


    const handleServiceSelect = (service) => {
        if (!selectedCategory) {
            setSelectedCategory(service.category);
        }

        const isSelected = booking.services.some(s => s.id === service.id);
        if (isSelected) {
            setBooking(prev => ({
                ...prev,
                services: prev.services.filter(s => s.id !== service.id)
            }));
        } else {
            setBooking(prev => ({
                ...prev,
                services: [...prev.services, service]
            }));
        }
    };

    useEffect(() => {
        setAmount(calculateTotal());
    }, [booking.services, booking.location]);

    const calculateTotal = () => {
        const serviceTotal = booking.services.reduce((sum, service) => sum + service.price, 0);
        const doorstepCharge = booking.location === 'Door Step' ? 250 : 0;
        const final = serviceTotal + doorstepCharge;
        return final;
    };

    const isStepValid = (step) => {
        switch (step) {
            case 0: return booking.services.length > 0;
            case 1: return booking.employee !== null;
            case 2: return booking.date !== '' && booking.time !== null;
            case 3:
                const isPhoneValid = booking.customerInfo.phone && /^[\d\s\-\(\)]+$/.test(booking.customerInfo.phone) && booking.customerInfo.phone.replace(/[^\d]/g, '').length >= 10;
                const isEmailValid = booking.customerInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.customerInfo.email);
                return booking.customerInfo.name && isPhoneValid && isEmailValid;
            default: return true;
        }
    };

    const nextStep = () => {
        if (currentStep < 4 && isStepValid(currentStep)) {
            setShowErrors(false);
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setShowErrors(false);
            setCurrentStep(prev => prev - 1);
        }
    };

    const isTimeSlotPassed = (timeSlot, selectedDate) => {
        if (!selectedDate) return false;

        const today = new Date();
        const isToday = selectedDate.toDateString() === today.toDateString();

        if (!isToday) return false;

        // Convert time slot to 24-hour format for comparison
        const [time, period] = timeSlot.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const hour24 = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;

        const slotTime = new Date();
        slotTime.setHours(hour24, minutes, 0, 0);

        return slotTime <= today;
    };

    const stepConfig = [
        { number: 1, title: 'Select Service', icon: User },
        { number: 2, title: 'Choose Specialist', icon: Star },
        { number: 3, title: 'Choose Date & Time', icon: CalendarIcon },
        { number: 4, title: 'Your Details', icon: Phone },
        { number: 5, title: 'Booking Confirmation', icon: CheckCircle }
    ];

    const scrollToBookingApplication = () => {
        const categorySection = document.getElementById('second');
        if (categorySection) {
            categorySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToServices = () => {
        const services = document.getElementById('services');
        if (services) {
            services.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        alert("Message Sent! We'll get back to you within 24 hours.");
    };

    const stats = [
        { icon: Star, value: "4.9", label: "Rating" },
        { icon: Clock, value: "25+", label: "Years" },
        { icon: Award, value: "500+", label: "Happy Clients" },
    ];

    useEffect(() => {
        if (status && paytype) {
            setTimeout(() => {
                if (paytype === "offline") {
                    handleFreeService();
                } else if (paytype === "online") {
                    handlePayupi();
                    // handleRazorpayPayment();
                }
            }, 500);
        }
    }, [status, paytype]);

    const signUp = async () => {
        // Validate input fields
        if (!userData.username || (isNewUser && !userData.phone_number) || !userData.password) {
            setErrorMessage('All fields are required');
            return;
        }

        setLoading(true);

        // Format data for API
        const formattedData = {
            name: userData.username,
            phone_number: userData.phone_number,
            password: userData.password,
            // Add any other required fields from your formattedData object
        };

        try {
            const response = await axios.post(
                "https://api.codingboss.in/kovais/create-customer/",
                // "https://454732e0c81a.ngrok-free.app/kovais/create-customer/",
                formattedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json" } }
            );

            //console.log("Signup Success:", response.data);
            localStorage.setItem("signedUpUser", JSON.stringify(formattedData));
            // Clear form and show success message
            setErrorMessage('');
            // Switch to login tab after successful signup
            setTimeout(() => {
                setIsNewUser(false);
                setLoading(false);

                Swal.fire({
                    icon: "success",
                    title: "Account Created!",
                    text: "Please sign in with your new account" });
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
                text: errorMsg });
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

    // Login Function
    const loginUser = async () => {
        // Validate input fields
        if (!userData.username || !userData.password) {
            setErrorMessage('Username and password are required');
            return;
        }

        setLoading(true);
        setErrorMessage(''); // Clear previous errors

        try {
            const response = await axios.post(
                "https://api.codingboss.in/kovais/customer-login/",
                // "https://454732e0c81a.ngrok-free.app/kovais/customer-login/",
                {
                    username: userData.username,
                    password: userData.password, // Fixed: was using username for password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json" } }
            );

            //console.log("Login Success:", response.data);

            // Save user data to localStorage
            localStorage.setItem("loggedInUser", JSON.stringify(response.data));
            localStorage.setItem("currentUserId", JSON.stringify(response.data.user_id));

            if (response.data.emblem_url || response.data.points) {
                localStorage.setItem("url", JSON.stringify(response.data.emblem_url));
                localStorage.setItem(`points_${response.data.user_id}`, JSON.stringify(response.data.points))
            }

            setUser(response.data);
            setPoints(response.data.points);
            // setUrl(response.data.emblem_url);
            // setAadhar(!!response.data.aadhar); // will be true if aadhar exists, false otherwise

            // Success message and close modal
            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => {
                setErrorMessage('');
                setShowLoginModal(false);
                setShow(false); // Close any parent modal if needed
            }, 500);

        } catch (error) {
            console.error("Login Error:", error);

            const errorMsg = error.response?.data?.login ||
                error.response?.data?.message ||
                "Invalid credentials. Please try again.";

            setErrorMessage(errorMsg);
        } finally {
            setLoading(false);
            // setShowModal(true); 
        }
    };

    // Handle tab switching
    const handleTabSelect = (key) => {
        setIsNewUser(key === 'signup');
        setErrorMessage(''); // Clear error messages on tab switch
    };

    const handleClicked = () => {
        setShowModal(false);
    }

    const handleClose = () => setShow(false);

    const handleFreeService = () => {
        setShowModal(false); // Close the modal
        postRequest()
    };

    const handlePayupi = () => {
        setShowModal(false)
        postRequest()
        setTimeout(() => {
            createPayment()
        }, 3000)
    }

    const handlePayment = () => {
        const loggedInUser = localStorage.getItem("loggedInUser");

        if (!loggedInUser) {
            setShowLoginModal(true);
            setShowModal(false);
            return;
        }

        const user = JSON.parse(loggedInUser);
        setUser(user);
        setShowLoginModal(false);
        setShowDemoPayment(true);
    };

    const handleDemoPaymentSuccess = (result) => {
        setDemoPaymentResult(result);
        setShowDemoPayment(false);
        setStatus("paid");
        setPaytype("online");
        if (result.address) setAddress(result.address);
        postRequest(result.address);
        setTimeout(() => setShowDemoConfirmation(true), 500);
    };

    const handleDemoPaymentFailure = (error) => {
        console.log("Payment failed:", error);
    };

    const handleDemoBookNowPayLater = (info) => {
        setStatus("pending");
        setPaytype("later");
        setShowDemoPayment(false);
        if (info.address) setAddress(info.address);
        postRequest(info.address);
        setTimeout(() => {
            setDemoPaymentResult({ paymentMethod: "offline", amount: amount || selectedAmount });
            setShowDemoConfirmation(true);
        }, 500);
    };

    // ✅ CREATE PAYMENT (React frontend)
    async function createPayment() {
        const url = 'https://api.codingboss.in/kovais/payment/create/';
        const id = localStorage.getItem('funeralId');
        // const fcm_token = JSON.stringify(localStorage.getItem('fcm_token')) || 'demo_fcm_token';

        const payload = {
            amount: amount || selectedServices.reduce((total, service) => total + Number(service.amount || 0), 0),
            order_type: 'saloon',
            order_id: id,
            gateway: 'cashfree',
            fcm_token: 'de985ad4e255a320cda6c55cf79809b4a2c2e7d3' };


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload) });


            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);


            const data = await response.json();
            //console.log('✅ Payment created successfully:', data);


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

        //console.log("🔍 Verifying payment with payload:", payload);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            //console.log("✅ Payment verified successfully:", data);
            // ✅ Handle different statuses (Universal Gateway Response)
            const status = (data.status || "").toUpperCase().trim();

            if (["PAID", "SUCCESS", "COMPLETED", "OK"].includes(status)) {
                //console.log("🎉 Payment Successful!");
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
                //console.log("ℹ️ Unknown payment status:", status);
                // alert(`ℹ️ Unknown Status: ${status}`);
            }

            return data;
        } catch (error) {
            console.error("❌ Error verifying payment:", error.message);
        }
    }

    // 🕒 OPTIONAL: AUTO VERIFY (poll every 10s until status changes)
    async function pollVerify(interval = 10000) {
        //console.log("🔄 Polling payment status every 10s...");
        const check = async () => {
            const result = await verifyPayment();
            if (result && (result.status === "PAID" || result.status === "FAILED")) {
                //console.log("✅ Stopping polling — final status:", result.status);
                return;
            }
            setTimeout(check, interval);
        };
        check();
    }


    const postRequest = async (overrideAddress) => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const finalAddress = overrideAddress || address;
        const data = {
            order_type: booking.location,
            category: selectedCategory,
            services: booking.services.map(service => service.name).join(", "),
            amount: amount || booking.services.reduce((total, service) => total + Number(service.amount || 0), 0),
            date: formattedDate,
            time: booking.time,
            payment_status: status,
            payment_type: paytype,
            customer_id: user.user_id,
            status: bookedStatus,
            points: usedPoints,
            branch: shopLocation,
            phone: booking.customerInfo.phone,
            // Add these new fields
            address: finalAddress,
            latitude: (booking.location === "Door Step" || booking.location === "Memorial Function") && location ? location.lat : null,
            longitude: (booking.location === "Door Step" || booking.location === "Memorial Function") && location ? location.lng : null
        };

        try {
            const response = await axios.post(
                "https://api.codingboss.in/kovais/saloon/orders/",
                // "https://454732e0c81a.ngrok-free.app/kovais/saloon/orders/",
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' } }
            );

            //console.log("Success:", response.data);
            //console.log("Order ID:", response.data.order.id);
            localStorage.setItem("funeralId", JSON.stringify(response.data.order.id));
            // setBarberId(response.data.order.id);
            Swal.fire({
                title: "Success",
                text: "Your booking is confirmed!",
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false });
            // setTimeout(() => {
            //   navigate("/")
            // }, 2000)

        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!" });
        }
    };

    // Preload hero images
    useEffect(() => {
        slides.forEach((slide) => {
            const img = new Image();
            img.src = slide.image;
        });
    }, []);


    return (
        <motion.div
            className="barber-main-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >

            {/* Hero Section */}
            <section id="home" className="hero-banner-area">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="hero-background-layer"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Lazy loaded hero background */}
                        <LazyImage
                            src={slides[currentSlide].image}
                            alt="Hero background"
                            className="hero-image-backdrop"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        <div className="hero-overlay-dark" />
                    </motion.div>
                </AnimatePresence>

                <div className="hero-content-wrapper">
                    <div className="hero-layout-grid">
                        <motion.div
                            className="hero-text-section"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <motion.p
                                        className="hero-subtitle-text"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {slides[currentSlide].subtitle}
                                    </motion.p>
                                    <motion.h1
                                        className="hero-main-title"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {slides[currentSlide].title}
                                    </motion.h1>
                                    <motion.p
                                        className="hero-description-text"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {slides[currentSlide].description}
                                    </motion.p>
                                </motion.div>
                            </AnimatePresence>

                            <motion.div
                                className="hero-action-buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <button className="primary-action-btn" onClick={scrollToBookingApplication}>
                                    Book Appointment
                                </button>
                                <button className="secondary-action-btn" onClick={scrollToServices}>
                                    View Services
                                </button>
                            </motion.div>


                        </motion.div>

                        <motion.div
                            className="hero-controls-panel"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <button
                                className="carousel-prev-btn"
                                onClick={prevSlide}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <div className="carousel-dots-container">
                                {slides.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        className={`carousel-dot-indicator ${index === currentSlide ? "dot-active" : ""}`}
                                        onClick={() => setCurrentSlide(index)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                    />
                                ))}
                            </div>

                            <button
                                className="carousel-next-btn"
                                onClick={nextSlide}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className="mobile-carousel-dots"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`mobile-dot-btn ${index === currentSlide ? "mobile-dot-active" : ""}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </motion.div>
            </section>

            {/* SERVICES SECTION */}
            <section id="services" className="min-vh-100" >
                <div className="container py-5">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-5"
                    >
                        <h2 className="h2 fw-bold mb-5 text-center" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.7rem' }}>
                            Our Premium Services
                        </h2>

                                                {/* Service Location Selection */}
                        <div className="mb-5" id="first">
                            <h3 className="h4 fw-semibold mb-4 text-center" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.7rem' }}>
                                Service Type
                            </h3>
                            <div className="row justify-content-center gap-4">
                                <div className="col-md-5 col-lg-4">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div
                                            className={`funeral-location-card card h-100 text-center cursor-pointer border-0 shadow-sm ${booking.location === 'Door Step' ? 'selected' : ''}`}
                                            onClick={() => setBooking({ ...booking, location: booking.location === 'Door Step' ? '' : 'Door Step' })}
                                            style={{
                                                cursor: 'pointer', overflow: 'hidden', borderRadius: '16px',
                                                border: booking.location === 'Door Step' ? '2px solid #daa520' : '1px solid #333',
                                                background: booking.location === 'Door Step' ? 'linear-gradient(135deg, #fffcf5 0%, #f0ebe1 100%)' : '#ffffff'
                                            }}
                                        >
                                            <div className="card-body p-4">
                                                <Home className="mx-auto mb-3" style={{ width: '48px', height: '48px' }} />
                                                <h4 className="fw-semibold mb-2" >Doorstep Service</h4>
                                                <p className="small mb-2" >Professional service at your location</p>
                                                <p className="fw-bold mb-3" style={{ fontSize: '1.1rem' }}>+ ₹250 Service Charge</p>
                                                <div className="badge bg-success mt-2 mb-3 d-block mx-auto" style={{ width: 'fit-content' }}>
                                                    Currently Available
                                                </div>
                                                <button 
                                                    className="btn btn-sm w-100 fw-bold"
                                                    style={{
                                                        background: booking.location === 'Door Step' ? 'linear-gradient(135deg, #f0c040, #daa520)' : 'transparent',
                                                        color: booking.location === 'Door Step' ? '#faf8f5' : '#daa520', borderRadius: '8px'
                                                    }}
                                                >
                                                    {booking.location === 'Door Step' ? 'Selected' : 'Select'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="col-md-5 col-lg-4">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div
                                            className={`funeral-location-card card h-100 text-center cursor-pointer border-0 shadow-sm ${booking.location === 'Memorial Function' ? 'selected' : ''}`}
                                            onClick={() => setBooking({ ...booking, location: booking.location === 'Memorial Function' ? '' : 'Memorial Function' })}
                                            style={{
                                                cursor: 'pointer', overflow: 'hidden', borderRadius: '16px',
                                                border: booking.location === 'Memorial Function' ? '2px solid #daa520' : '1px solid #333',
                                                background: booking.location === 'Memorial Function' ? 'linear-gradient(135deg, #fffcf5 0%, #f0ebe1 100%)' : '#ffffff'
                                            }}
                                        >
                                            <div className="card-body p-4">
                                                <Users className="mx-auto mb-3" style={{ width: '48px', height: '48px' }} />
                                                <h4 className="fw-semibold mb-2" >Memorial Function</h4>
                                                <p className="small mb-2" >Professional service at memorial site</p>
                                                <p className="fw-bold mb-3" style={{ fontSize: '1.1rem' }}>Standard Pricing</p>
                                                <div className="badge bg-success mt-2 mb-3 d-block mx-auto" style={{ width: 'fit-content' }}>
                                                    Available
                                                </div>
                                                <button 
                                                    className="btn btn-sm w-100 fw-bold"
                                                    style={{
                                                        background: booking.location === 'Memorial Function' ? 'linear-gradient(135deg, #f0c040, #daa520)' : 'transparent',
                                                        color: booking.location === 'Memorial Function' ? '#faf8f5' : '#daa520', borderRadius: '8px'
                                                    }}
                                                >
                                                    {booking.location === 'Memorial Function' ? 'Selected' : 'Select'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <p >
                                    Our professional team will come to your preferred location
                                </p>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5" id="second">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`btn px-4 py-2 ${selectedCategory === category
                                        ? 'btn-danger text-white fw-bold'
                                        : 'btn-outline-danger'
                                        }`}
                                    onClick={() => {
                                        if (booking.services.length === 0) {
                                            setSelectedCategory(category === selectedCategory ? null : category);
                                        }
                                        const serve = document.getElementById('third');
                                        serve.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    disabled={booking.services.length > 0 && selectedCategory !== category}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Services Grid with Lazy Loading */}
                        <div className="row g-4 d-flex justify-content-center" id='third'>
                            {filteredServices.map((service) => (
                                <motion.div
                                    key={service.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ y: -5 }}
                                    className="col-md-6 col-lg-4"
                                >
                                    <div className={`funeral-service-card card h-100 shadow-sm border-0 ${booking.services.some(s => s.id === service.id)
                                        ? 'border-danger border-3 shadow-lg'
                                        : 'border-secondary'
                                        }`}
                                        style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '16px',
                                            transition: 'all 0.3s ease'
                                        }}>
                                        <div className="position-relative overflow-hidden">
                                            {/* Lazy loaded service image */}
                                            <LazyImage
                                                src={service.image}
                                                alt={service.name}
                                                className="card-img-top"
                                                style={{
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    width: '100%'
                                                }}
                                            />
                                            <div className="position-absolute top-0 end-0 m-3">
                                                <span className="badge" >
                                                    {service.duration}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title" >{service.name}</h5>
                                            <p className="card-text flex-grow-1" >
                                                {service.description}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <span className="h4 fw-bold mb-0" >
                                                    ₹ {service.price}
                                                </span>
                                                <span className="badge" >
                                                    {service.category}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleServiceSelect(service)}
                                                className={`btn w-100 ${booking.services.some(s => s.id === service.id)
                                                    ? 'btn-danger text-white fw-bold'
                                                    : 'btn-outline-danger'
                                                    }`}
                                            >
                                                {booking.services.some(s => s.id === service.id) ? 'Selected' : 'Select Service'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* BOOKING SECTION */}
            <section id="booking-sectionn" className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold mb-4" style={{ fontSize: '3.5rem', fontFamily: 'Playfair Display, serif' }}>
                        Book Your Appointment
                    </h1>
                    <p className="lead" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        Reserve your spot with our master barbers. Follow our simple booking process to secure your preferred time and service.
                    </p>
                    <br />
                    <div className="row justify-content-center" >
                        <div className="col-lg-8 col-xl-6" style={{ maxWidth: '900px', width: '100%' }}>
                            <div className="mb-5">
                                <div className="funeral-booking-container card shadow-lg border-0" >
                                    <div className="funeral-booking-header card-header border-0" >
                                        <h4 className="card-title d-flex align-items-center gap-2 mb-0">
                                            <Scissors style={{ width: '24px', height: '24px' }} />
                                            Book Your Appointment
                                        </h4>

                                        {/* Progress Steps - Mobile responsive */}
                                        <div className="row justify-content-center mt-4">
                                            <div className="col-12">
                                                <div className="d-flex align-items-center justify-content-between position-relative">
                                                    {/* Progress Line - Hidden on mobile */}
                                                    <div
                                                        className="position-absolute w-100 d-none d-md-block"
                                                        style={{
                                                            height: '2px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            zIndex: 1,
                                                            backgroundColor: 'rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        <div
                                                            className="h-100"
                                                            style={{ width: `${((currentStep) / 4) * 100}%`,
                                                                transition: 'width 0.3s ease',
                                                                backgroundColor: 'var(--fun-accent-gold)'
                                                            }}
                                                        />
                                                    </div>
                                                    {stepConfig.map((step, index) => {
                                                        const isActive = currentStep >= index;
                                                        return (
                                                            <div key={step.number} className="text-center position-relative" style={{ zIndex: 2 }}>
                                                                <div
                                                                    className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${isActive ? 'active' : ''}`}
                                                                    style={{
                                                                        width: '40px',
                                                                        height: '40px',
                                                                        transition: 'all 0.3s ease'
                                                                    }}
                                                                >
                                                                    <step.icon size={16} />
                                                                </div>
                                                                <div className="d-none d-sm-block">
                                                                    <div
                                                                        className="fw-bold"
                                                                        style={{
                                                                            color: isActive ? 'var(--fun-accent-gold-dark)' : 'var(--fun-text-muted)',
                                                                            fontSize: '0.75rem'
                                                                        }}
                                                                    >
                                                                        Step {step.number}
                                                                    </div>
                                                                    <div
                                                                        style={{ 
                                                                            color: isActive ? 'var(--fun-text-main)' : 'var(--fun-text-muted)',
                                                                            fontSize: '0.7rem'
                                                                        }}
                                                                    >
                                                                        {step.title}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <AnimatePresence mode="wait">
                                            {currentStep === 0 && (
                                                <motion.div
                                                    key="step0"
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -50 }}
                                                >
                                                    <h5 className="fw-semibold mb-4" >
                                                        Selected Services
                                                    </h5>
                                                    {booking.services.length === 0 ? (
                                                        <div className="text-center py-5">
                                                            <Scissors className="mx-auto mb-3" style={{ width: '48px', height: '48px' }} />
                                                            <h6 >No services selected</h6>
                                                            <p className="small" >
                                                                Please select services from the options above to continue
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="mb-4">
                                                            {booking.services.map((service) => (
                                                                <div key={service.id} className="d-flex justify-content-between align-items-center p-3 mb-3 rounded border" >
                                                                    <div>
                                                                        <h6 className="fw-medium mb-1" >{service.name}</h6>
                                                                        <small >{service.duration}</small>
                                                                    </div>
                                                                    <span className="fw-bold" >₹ {service.price}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <div className="text-end">
                                                        <button
                                                            onClick={nextStep}
                                                            disabled={booking.services.length === 0}
                                                            className="btn btn-danger text-white fw-bold px-4"
                                                        >
                                                            Continue
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {currentStep === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -50 }}
                                                >
                                                    <h5 className="fw-semibold mb-4" >
                                                        Choose Your Specialist
                                                    </h5>
                                                    <div className="row g-3 mb-4">
                                                        {availableEmployees.map((employee) => (
                                                            <div key={employee.id} className="col-md-6">
                                                                <div
                                                                    className={`funeral-specialist-card card border-0 shadow-sm cursor-pointer ${booking.employee?.id === employee.id
                                                                        ? 'border-danger border-3 shadow-lg'
                                                                        : 'border-secondary'
                                                                        }`}
                                                                    onClick={() => setBooking(prev => ({ ...prev, employee }))}
                                                                    style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '16px' }}
                                                                >
                                                                    <div className="card-body">
                                                                        <div className="d-flex align-items-center gap-3">
                                                                            <div className="rounded-circle d-flex align-items-center justify-content-center"
                                                                                style={{ width: '64px', height: '64px' }}>
                                                                                <User style={{ width: '32px', height: '32px' }} />
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <h6 className="fw-semibold mb-1" >{employee.name}</h6>
                                                                                <p className="small mb-1" >{employee.speciality}</p>
                                                                                <div className="d-flex align-items-center gap-1">
                                                                                    <Star style={{ width: '16px', height: '16px', fill: '#dc3545' }} />
                                                                                    <small >{employee.rating}</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <button onClick={prevStep} className="btn btn-outline-danger">
                                                            Previous
                                                        </button>
                                                        <button
                                                            onClick={nextStep}
                                                            disabled={!booking.employee}
                                                            className="btn btn-danger text-white fw-bold px-4"
                                                        >
                                                            Continue
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {currentStep === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -50 }}
                                                >
                                                    <h3 className="text-center fw-bold mb-5" style={{ fontSize: '2rem' }}>
                                                        Choose Date & Time
                                                    </h3>

                                                    <div className="row g-5">
                                                        {/* Date Selection */}
                                                        <div className="col-lg-4">
                                                            <h5 className="fw-semibold mb-4" >
                                                                Select Date
                                                            </h5>
                                                            <div className="position-relative">
                                                                <input
                                                                    type="date"
                                                                    className="form-control form-control-lg"
                                                                    value={booking.date}
                                                                    onChange={(e) => setBooking(prev => ({ ...prev, date: e.target.value, time: null }))}
                                                                    min={new Date().toISOString().split('T')[0]}
                                                                    style={{
                                                                        fontSize: '1.1rem',
                                                                        padding: '12px 16px',
                                                                        borderRadius: '8px'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Time Selection */}
                                                        <div className="col-lg-8">
                                                            <h5 className="fw-semibold mb-4" >
                                                                Available Times
                                                            </h5>
                                                            <div className="row g-3">
                                                                {timeSlots.map((time, index) => {
                                                                    const selectedDate = booking.date ? new Date(booking.date) : null;
                                                                    const isPassed = isTimeSlotPassed(time, selectedDate);
                                                                    const isSelected = booking.time === time;

                                                                    return (
                                                                        <div key={time} className="col-4">
                                                                            <button
                                                                                className={`btn w-100 ${isSelected
                                                                                    ? 'text-white fw-semibold'
                                                                                    : isPassed
                                                                                        ? 'btn-outline-secondary disabled opacity-50'
                                                                                        : 'btn-outline-danger'
                                                                                    }`}
                                                                                onClick={() => setBooking(prev => ({ ...prev, time }))}
                                                                                disabled={isPassed}
                                                                                style={{
                                                                                    padding: '12px 16px',
                                                                                    fontSize: '0.95rem',
                                                                                    borderWidth: '2px',
                                                                                    borderRadius: '8px',
                                                                                    backgroundColor: isSelected ? '#dc3545' : 'transparent',
                                                                                    borderColor: isSelected ? '#dc3545' : '#dc3545',
                                                                                    color: isSelected ? '#fff' : '#dc3545',
                                                                                    transition: 'all 0.2s ease'
                                                                                }}
                                                                            >
                                                                                {time}
                                                                            </button>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Navigation Buttons */}
                                                    <div className="d-flex justify-content-between mt-5 pt-4">
                                                        <button
                                                            onClick={prevStep}
                                                            className="btn btn-outline-danger btn-lg px-5"
                                                            style={{
                                                                borderRadius: '8px',
                                                                fontSize: '1.1rem',
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                            Previous
                                                        </button>
                                                        <button
                                                            onClick={nextStep}
                                                            disabled={!booking.date || !booking.time}
                                                            className="btn btn-danger btn-lg px-5 text-white fw-semibold"
                                                            style={{
                                                                borderRadius: '8px',
                                                                fontSize: '1.1rem'
                                                            }}
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {currentStep === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -50 }}
                                                >
                                                    <h5 className="fw-semibold mb-4" >
                                                        Your Details
                                                    </h5>
                                                    <div className="row g-3 mb-4">
                                                        <div className="col-md-6">
                                                            <label htmlFor="name" className="form-label" >Full Name *</label>
                                                            <input
                                                                id="name"
                                                                type="text"
                                                                className={`form-control ${showErrors && !booking.customerInfo.name ? 'is-invalid' : ''}`}
                                                                value={booking.customerInfo.name}
                                                                onChange={(e) => setBooking(prev => ({
                                                                    ...prev,
                                                                    customerInfo: { ...prev.customerInfo, name: e.target.value }
                                                                }))}
                                                                placeholder="Enter your full name"
                                                            />
                                                            {showErrors && !booking.customerInfo.name && (
                                                                <div className="invalid-feedback">Please enter your name.</div>
                                                            )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="phone" className="form-label" >Phone Number *</label>
                                                            <input
                                                                id="phone"
                                                                type="tel"
                                                                className={`form-control ${showErrors && (!booking.customerInfo.phone || !/^[\d\s\-\(\)]+$/.test(booking.customerInfo.phone) || booking.customerInfo.phone.replace(/[^\d]/g, '').length < 10) ? 'is-invalid' : ''}`}
                                                                value={booking.customerInfo.phone}
                                                                onChange={(e) => setBooking(prev => ({
                                                                    ...prev,
                                                                    customerInfo: { ...prev.customerInfo, phone: e.target.value }
                                                                }))}
                                                                placeholder="Enter your phone number"
                                                            />
                                                            {showErrors && (!booking.customerInfo.phone || !/^[\d\s\-\(\)]+$/.test(booking.customerInfo.phone) || booking.customerInfo.phone.replace(/[^\d]/g, '').length < 10) && (
                                                                <div className="invalid-feedback">Please enter a valid phone number.</div>
                                                            )}
                                                        </div>
                                                        <div className="col-12">
                                                            <label htmlFor="email" className="form-label" >Email Address *</label>
                                                            <input
                                                                id="email"
                                                                type="email"
                                                                className={`form-control ${showErrors && (!booking.customerInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.customerInfo.email)) ? 'is-invalid' : ''}`}
                                                                value={booking.customerInfo.email}
                                                                onChange={(e) => setBooking(prev => ({
                                                                    ...prev,
                                                                    customerInfo: { ...prev.customerInfo, email: e.target.value }
                                                                }))}
                                                                placeholder="Enter your email address"
                                                            />
                                                            {showErrors && (!booking.customerInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.customerInfo.email)) && (
                                                                <div className="invalid-feedback">Please enter a valid email address.</div>
                                                            )}
                                                        </div>
                                                        <div className="col-12">
                                                            <label htmlFor="notes" className="form-label" >Special Notes (Optional)</label>
                                                            <textarea
                                                                id="notes"
                                                                className="form-control"
                                                                rows="3"
                                                                value={booking.customerInfo.notes}
                                                                onChange={(e) => setBooking(prev => ({
                                                                    ...prev,
                                                                    customerInfo: { ...prev.customerInfo, notes: e.target.value }
                                                                }))}
                                                                placeholder="Any special requests or notes..."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <button onClick={prevStep} className="btn btn-outline-danger">
                                                            Previous
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (isStepValid(3)) {
                                                                    setShowErrors(false);
                                                                    nextStep();
                                                                } else {
                                                                    setShowErrors(true);
                                                                }
                                                            }}
                                                            className="btn btn-danger text-white fw-bold px-4"
                                                        >
                                                            Review Booking
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {currentStep === 4 && (
                                                <motion.div
                                                    key="step4"
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -50 }}
                                                >
                                                    <h5 className="fw-semibold mb-4 d-flex align-items-center gap-2" >
                                                        <CheckCircle style={{ width: '24px', height: '24px' }} />
                                                        Booking Confirmation
                                                    </h5>

                                                    <div className="row g-4">
                                                        {/* Services Summary */}
                                                        <div className="col-12">
                                                            <h6 className="fw-semibold mb-3" >Selected Services</h6>
                                                            <div className="mb-4">
                                                                {booking.services.map((service) => (
                                                                    <div key={service.id} className="d-flex justify-content-between align-items-center p-3 mb-2 rounded border" >
                                                                        <div>
                                                                            <span className="fw-medium" >{service.name}</span>
                                                                            <small className="ms-2" >({service.duration})</small>
                                                                        </div>
                                                                        <span className="fw-bold" >₹ {service.price}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Appointment Details */}
                                                        <div className="col-md-6">
                                                            <h6 className="fw-semibold mb-3" >Appointment Details</h6>
                                                            <div >
                                                                <p><strong >Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                                                                <p><strong >Time:</strong> {booking.time}</p>
                                                                <p><strong >Location:</strong> {booking.location || 'Not Selected'}</p>
                                                                <p><strong >Specialist:</strong> {booking.employee?.name}</p>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <h6 className="fw-semibold mb-3" >Customer Information</h6>
                                                            <div >
                                                                <p><strong >Name:</strong> {booking.customerInfo.name}</p>
                                                                <p><strong >Phone:</strong> {booking.customerInfo.phone}</p>
                                                                <p><strong >Email:</strong> {booking.customerInfo.email}</p>
                                                                {booking.customerInfo.notes && (
                                                                    <p><strong >Notes:</strong> {booking.customerInfo.notes}</p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Total */}
                                                        <div className="col-12">
                                                            <div className="border-top pt-4">
                                                                <div className="d-flex justify-content-between mb-2">
                                                                    <span >Services Total:</span>
                                                                    <span >
                                                                        ₹ {booking.services.reduce((sum, service) => sum + service.price, 0)}
                                                                    </span>
                                                                </div>
                                                                <div className="d-flex justify-content-between mb-2">
                                                                    <span >Doorstep Service Charge:</span>
                                                                    <span >₹ {booking.location === 'Door Step' ? 250 : 0}</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between h4 fw-bold border-top pt-2">
                                                                    <span >Total Amount:</span>
                                                                    <span >₹ {calculateTotal()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between mt-4">
                                                        <button onClick={prevStep} className="btn btn-outline-danger">
                                                            Previous
                                                        </button>
                                                        <button
                                                            onClick={handlePayment}
                                                            className="btn btn-danger text-white fw-bold px-4"
                                                        >
                                                            Confirm Booking
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Payment Modal */}
            <PaymentPage
                show={showDemoPayment}
                onHide={() => setShowDemoPayment(false)}
                bookingSummary={{
                    services: booking.services,
                    date: booking.date,
                    time: booking.time,
                    amount: amount || calculateTotal(),
                    location: booking.location,
                    specialist: booking.employee?.name }}
                onPaymentSuccess={handleDemoPaymentSuccess}
                onPaymentFailure={handleDemoPaymentFailure}
                onBookNowPayLater={handleDemoBookNowPayLater}
                points={points}
                onUsePoints={(pts, discount) => {
                    setUsedPoints(pts);
                    setPoints((prev) => prev - pts);
                    setAmount((prev) => Math.max(0, prev - discount));
                }}
                showAddressInput={booking.location === 'Door Step' || booking.location === 'Memorial Function'}
            />

            <ConfirmationPage
                show={showDemoConfirmation}
                onHide={() => setShowDemoConfirmation(false)}
                transactionId={demoPaymentResult?.transactionId}
                amount={demoPaymentResult?.amount || amount || calculateTotal()}
                paymentMethod={demoPaymentResult?.paymentMethod}
                bookingSummary={{
                    services: booking.services,
                    date: booking.date,
                    time: booking.time,
                    specialist: booking.employee?.name }}
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
                                <InputGroup.Text className="bg-dark text-white">
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
                                    <InputGroup.Text className="bg-dark text-white">
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
                                <InputGroup.Text className="bg-dark text-white">
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

            {/* Footer */}
            <footer className="footer bg-dark text-white py-4">
                <Container>
                    <Row className="text-center text-md-start">
                        <Col className="mb-3">
                            <iframe
                                src="https://www.google.com/maps?q=097,+SH+15,+Otthakkuthirai,+Gobichettipalayam,+Tamil+Nadu+638455,+India&output=embed"
                                width="100%"
                                height="200"
                                style={{ border: 0, borderRadius: '8px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="KOVAIS BEAUTY PARLOUR Location"
                            />
                            <div className="text-center mt-3">
                                <h5 className="fw-bold">
                                    <FaScissors className="me-2" />
                                    KOVAIS BEAUTY PARLOUR
                                </h5>
                                <p className="mb-0">097, SH 15, Otthakkuthirai gobichettipalayam Tk, DT, Gobichettipalayam, Tamil Nadu 638455</p>
                            </div>
                        </Col>
                    </Row>
                    <hr className="my-3" />
                    <p className="text-center mb-0">
                        &copy; 2024 KOVAIS. All Rights Reserved. | Contact: 9234567891 | Email: info@kovaisbeauty.com
                    </p>
                </Container>
            </footer>
        </motion.div>
    );
};

export default SingleBarberPage;








