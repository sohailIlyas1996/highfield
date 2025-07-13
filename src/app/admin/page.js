"use client";
import React, { useEffect, useState } from "react";
import { rtdb, auth } from "../../firebase";
import { ref as dbRef, onValue } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Auth guard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch bookings data
  useEffect(() => {
    if (checkingAuth) return;
    const bookingsRef = dbRef(rtdb, "bookings");
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        // Sort by createdAt ascending (oldest first)
        arr.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
        setBookings(arr);
      } else {
        setBookings([]);
      }
    });
    return () => unsubscribe();
  }, [checkingAuth]);

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white/90 py-8 px-4 shadow-lg flex flex-col md:flex-row items-center justify-between border-b border-blue-200 gap-4">
        <div className="flex flex-col items-center  md:items-start">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-blue-900 mb-2 uppercase drop-shadow-lg">
            Highfield Garage
          </h1>
          <div className="text-lg md:text-2xl font-semibold text-blue-700 tracking-wide">
            Admin Bookings Dashboard
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/uploadpost")}
            className="bg-blue-900 text-yellow-400 font-semibold px-6 py-2 rounded hover:bg-blue-700 hover:text-yellow-300 transition shadow"
          >
            Upload Post
          </button>
          <button
            onClick={handleLogout}
            className="bg-blue-900 text-yellow-400 font-semibold px-6 py-2 rounded hover:bg-blue-700 hover:text-yellow-300 transition shadow"
          >
            Logout
          </button>
        </div>
      </header>
      {/* Bookings Table */}
      <main className="flex-1 flex flex-col items-center py-10 px-2 md:px-0 overflow-y-auto">
        <div className="w-full max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
              Bookings
            </h2>
            <span className="text-yellow-500 text-lg font-semibold bg-blue-100 px-4 py-1 rounded-full shadow">
              {bookings.length} total
            </span>
          </div>
          {bookings.length === 0 ? (
            <div className="text-blue-600 text-center text-lg mt-20">
              No bookings yet.
            </div>
          ) : (
            <div className="overflow-x-auto animate-fade-in">
              <table className="min-w-full bg-white rounded-xl shadow-lg border border-blue-100">
                <thead>
                  <tr className="bg-blue-100 text-blue-900">
                    <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">
                      Registration
                    </th>
                    <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">
                      Booked at
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, idx) => (
                    <tr
                      key={booking.id}
                      className={`transition-all duration-200 ease-in-out hover:bg-yellow-50/80 ${idx % 2 === 0 ? "bg-white" : "bg-blue-50"} animate-fade-in`}
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      <td className="py-3 px-4 font-bold text-blue-900 whitespace-nowrap">
                        {booking.name}
                      </td>
                      <td className="py-3 px-4 text-blue-700 whitespace-nowrap">
                        {booking.date
                          ? new Date(booking.date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-3 px-4 text-blue-700 whitespace-nowrap">
                        {booking.registration}
                      </td>
                      <td className="py-3 px-4 text-blue-700 whitespace-nowrap">
                        {booking.phone}
                      </td>
                      <td className="py-3 px-4 text-blue-500 font-mono whitespace-nowrap">
                        {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </div>
  );
}
