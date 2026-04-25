"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";

const bookingTabs = [
  { icon: "✈️", label: "Flight" },
  { icon: "🏨", label: "Hotel" },
  { icon: "🚆", label: "Train" },
  { icon: "🎈", label: "Attraction" },
];

const quickLinks = [
  { label: "Vouchers", sub: "Save money on travel", icon: "🎫" },
  { label: "Currency", sub: "Check before spending", icon: "💱" },
  { label: "Itinerary", sub: "Plan your trip with AI", icon: "📋" },
];

const essentials = ["Visa Card", "SafeTrip", "Airport Lounge", "Travel eSIM", "Arrival Card"];

const flights = [
  { from: "KUL", to: "PEN", airline: "AirAsia", depart: "08:30", arrive: "09:30", price: 89 },
  { from: "KUL", to: "LGK", airline: "Malaysia Airlines", depart: "10:15", arrive: "11:25", price: 159 },
  { from: "KUL", to: "BKI", airline: "AirAsia", depart: "06:00", arrive: "08:30", price: 199 },
  { from: "KUL", to: "KCH", airline: "Batik Air", depart: "14:45", arrive: "16:30", price: 179 },
  { from: "KUL", to: "SZB", airline: "Firefly", depart: "07:00", arrive: "07:45", price: 69 },
  { from: "KUL", to: "JHB", airline: "AirAsia", depart: "18:00", arrive: "18:55", price: 79 },
];

const hotels = [
  { name: "The Datai Langkawi", location: "Langkawi", rating: 4.9, reviews: 2841, price: 1250 },
  { name: "Shangri-La Rasa Ria", location: "Kota Kinabalu", rating: 4.7, reviews: 3102, price: 680 },
  { name: "Eastern & Oriental Hotel", location: "Penang", rating: 4.8, reviews: 1923, price: 520 },
  { name: "The Majestic Hotel", location: "Kuala Lumpur", rating: 4.6, reviews: 4210, price: 450 },
  { name: "Tanjong Jara Resort", location: "Terengganu", rating: 4.8, reviews: 1567, price: 890 },
  { name: "Lexis Hibiscus", location: "Port Dickson", rating: 4.3, reviews: 5621, price: 380 },
];

export default function TravelPage() {
  const [activeTab, setActiveTab] = useState("Flight");

  return (
    <PageShell className="bg-[#f3f5fb]">
      {/* Blue Header */}
      <div className="bg-gradient-to-b from-[#0b66cb] to-[#3b82f6] px-5 pb-8 pt-6 text-white">
        <PageHeader />
        <h1 className="mt-4 text-[28px] font-bold">Travel</h1>
        <p className="text-[14px] text-white/80">Everything you need for your trip</p>

        {/* Voucher breadcrumb */}
        <div className="mt-4 rounded-xl bg-white/10 px-4 py-3">
          <p className="text-[12px] text-white/70">
            Claimed travel vouchers can be found in <strong className="text-white">My Rewards</strong>
          </p>
          <div className="mt-2 flex items-center gap-2 text-[12px]">
            <span className="text-sky-300 font-semibold">Homepage</span>
            <span className="text-white/50">&gt;</span>
            <span className="text-sky-300 font-semibold">GOrewards</span>
            <span className="text-white/50">&gt;</span>
            <span className="text-sky-300 font-semibold">My Rewards</span>
          </div>
        </div>
      </div>

      {/* Book your trip */}
      <div className="bg-white px-5 py-5">
        <h2 className="text-[16px] font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#0b66cb] rounded-full" />
          Book your trip
        </h2>
        <div className="flex justify-around">
          {bookingTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex flex-col items-center gap-1 ${
                activeTab === tab.label ? "text-[#0b66cb]" : "text-slate-500"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                activeTab === tab.label ? "bg-blue-50 border-2 border-[#0b66cb]" : "bg-slate-100"
              }`}>
                {tab.icon}
              </div>
              <span className="text-[12px] font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-r from-sky-100 to-yellow-100 p-4">
        <p className="text-[11px] text-slate-500">agoda · Booking.com · kkday · klook · traveloka · Trip.com</p>
        <p className="mt-2 text-[14px] font-bold text-slate-800">Payday Flash Deal:</p>
        <p className="text-[12px] text-slate-600">Up to <strong className="text-[18px] text-red-500">RM200</strong> OFF your travels</p>
      </div>

      {/* Flight / Hotel Listings */}
      <div className="px-4 mt-4">
        {activeTab === "Flight" && (
          <div className="space-y-3">
            <h3 className="text-[14px] font-bold text-slate-700">Available Flights</h3>
            {flights.map((flight, i) => (
              <div key={i} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-semibold text-[#0b66cb]">{flight.airline}</span>
                  <span className="text-[11px] text-slate-400">One way</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-[18px] font-bold">{flight.from}</p>
                    <p className="text-[12px] text-slate-400">{flight.depart}</p>
                  </div>
                  <div className="flex-1 mx-3 flex items-center">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="mx-2 text-lg">✈️</span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="text-center">
                    <p className="text-[18px] font-bold">{flight.to}</p>
                    <p className="text-[12px] text-slate-400">{flight.arrive}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">from</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[18px] font-bold text-[#0b66cb]">RM{flight.price}</span>
                    <Link
                      href="/secure-pin"
                      className="rounded-full bg-[#0b66cb] px-4 py-2 text-[12px] font-semibold text-white"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Hotel" && (
          <div className="space-y-3">
            <h3 className="text-[14px] font-bold text-slate-700">Popular Hotels in Malaysia</h3>
            {hotels.map((hotel, i) => (
              <div key={i} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold">{hotel.name}</p>
                    <p className="text-[12px] text-slate-400 mt-0.5">📍 {hotel.location}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[12px] font-semibold text-orange-500">⭐ {hotel.rating}</span>
                      <span className="text-[11px] text-slate-400">({hotel.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <p className="text-[11px] text-slate-400">from</p>
                    <p className="text-[18px] font-bold text-[#0b66cb]">RM{hotel.price}</p>
                    <p className="text-[10px] text-slate-400">/night</p>
                  </div>
                </div>
                <Link
                  href="/secure-pin"
                  className="mt-3 block w-full rounded-full bg-[#0b66cb] py-2.5 text-center text-[13px] font-semibold text-white"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        )}

        {(activeTab === "Train" || activeTab === "Attraction") && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-3xl mb-2">{activeTab === "Train" ? "🚆" : "🎈"}</p>
            <p className="text-[14px] text-slate-500">Coming soon</p>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="mt-4 flex gap-3 px-4">
        {quickLinks.map((link) => (
          <div key={link.label} className="flex-1 rounded-xl bg-white p-3 shadow-sm">
            <p className="text-[13px] font-bold">{link.label}</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-[10px] text-slate-400">{link.sub}</p>
              <span className="text-lg">{link.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Travel Essentials */}
      <div className="mt-4 px-4 pb-8">
        <h2 className="text-[16px] font-bold mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#0b66cb] rounded-full" />
          Travel essentials
        </h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {essentials.map((item) => (
            <div key={item} className="min-w-[80px] flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">
                {item === "Visa Card" ? "💳" : item === "SafeTrip" ? "🛡️" : item === "Airport Lounge" ? "🛋️" : item === "Travel eSIM" ? "📶" : "🎫"}
              </div>
              <p className="mt-1 text-center text-[10px] text-slate-600 leading-tight">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
