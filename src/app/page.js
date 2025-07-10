"use client";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [registration, setRegistration] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (
      !name.trim() ||
      !phone.trim() ||
      !registration.trim() ||
      !selectedDate
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/^[a-zA-Z ]+$/.test(name.trim())) {
      alert("Name should only contain letters and spaces.");
      return;
    }
    if (!/^[0-9]{7,15}$/.test(phone.trim())) {
      alert("Phone number should be digits only (7-15 digits).");
      return;
    }
    // Optionally, add more validation for registration if needed
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Registration:", registration);
    console.log("Selected date:", selectedDate);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setPhone("");
    setRegistration("");
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-4 gap-4 md:gap-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">
              Highfield Garage
            </span>
          </div>
          <nav className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-end">
            <Link href="#how-it-works" className="hover:underline">
              How it Works
            </Link>
            <Link href="#services" className="hover:underline">
              Services
            </Link>
            <Link href="#testimonials" className="hover:underline">
              Reviews
            </Link>
            <Link href="#contact" className="hover:underline">
              Contact
            </Link>
            <Link
              href="/admin"
              className="bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
            >
              Admin Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-50 py-10 md:py-16 border-b border-blue-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-8">
          <motion.div
            className="flex-1 text-center md:text-left mb-8 md:mb-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Book Your Car Service or MOT Online
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-blue-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Fast, reliable auto repair and MOT booking. Reserve your
              appointment online in seconds!
            </motion.p>
            <form
              className="flex flex-col gap-3 sm:gap-2 sm:flex-row flex-wrap max-w-xl mx-auto md:mx-0"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded border border-blue-200 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded border border-blue-200 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Car registration"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded border border-blue-200 focus:outline-none"
              />
              <div className="w-full sm:w-auto flex-1">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full px-4 py-2 rounded border border-blue-200 focus:outline-none"
                  placeholderText="Select date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded hover:bg-yellow-300 transition"
              >
                Book Now
              </button>
            </form>
            <motion.div
              className="flex items-center justify-center md:justify-start gap-2 mt-4 text-sm text-blue-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <span>Excellent</span>
              <span className="font-bold">4.6/5</span>
              <span>on</span>
              <span className="font-bold">Trustpilot</span>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="w-60 h-40 sm:w-72 sm:h-56 rounded-lg flex items-center justify-center text-blue-900 text-2xl font-bold">
              <Image src="/car.jpg" alt="Car" width={300} height={400} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
            <div className="flex-1 bg-blue-50 rounded-lg p-6 shadow text-center mb-4 md:mb-0">
              <div className="text-4xl mb-2">📝</div>
              <h3 className="font-semibold text-lg mb-2">Book Online</h3>
              <p>
                Fill out our simple online form to reserve your service or MOT
                slot.
              </p>
            </div>
            <div className="flex-1 bg-blue-50 rounded-lg p-6 shadow text-center mb-4 md:mb-0">
              <div className="text-4xl mb-2">📞</div>
              <h3 className="font-semibold text-lg mb-2">Confirmation</h3>
              <p>We’ll contact you to confirm your booking and details.</p>
            </div>
            <div className="flex-1 bg-blue-50 rounded-lg p-6 shadow text-center">
              <div className="text-4xl mb-2">🚗</div>
              <h3 className="font-semibold text-lg mb-2">Visit Garage</h3>
              <p>
                Bring your car in at your chosen time and we’ll take care of the
                rest!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-10 md:py-12 bg-blue-50 border-t border-blue-100"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🛠️",
                title: "MOT",
                desc: "Book your annual MOT test with trusted local experts.",
              },
              {
                icon: "🚗",
                title: "Car Service",
                desc: "Full, interim, and major servicing for all makes and models.",
              },
              {
                icon: "🔧",
                title: "Repairs",
                desc: "From brakes to exhausts, book repairs with confidence.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-white rounded-lg shadow p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.7 }}
              >
                <div className="text-3xl mb-2">{card.icon}</div>
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
            {[
              {
                quote:
                  "“Booking my MOT online was so easy and saved me money!”",
                name: "- Sarah J.",
              },
              {
                quote:
                  "“I booked my service online and the team was super helpful.”",
                name: "- Mike T.",
              },
              {
                quote:
                  "“Great service, transparent prices, and friendly staff!”",
                name: "- Priya S.",
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                className="flex-1 bg-blue-50 rounded-lg p-6 shadow text-center mb-4 md:mb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.7 }}
              >
                <p className="italic mb-2">{t.quote}</p>
                <div className="font-semibold">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-2">
            Contact us at:{" "}
            <a href="mailto:info@highfieldgarage.com" className="underline">
              info@highfieldgarage.com
            </a>{" "}
            | (123) 456-7890
          </div>
          <div className="mb-2">123 Main Street, Your City, UK</div>
          <div className="text-sm">
            © 2025 Highfield Garage. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modal for Booking Confirmed */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Booking Confirmed!
            </h2>
            <p className="mb-6">
              Thank you for booking with Highfield Garage.
              <br />
              We look forward to seeing you!
            </p>
            <button
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
