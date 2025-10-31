import React from 'react'
import './Features.css'
import { useEffect, useRef } from "react";

const features = [
  {
    title: "Easy Complaint Submission",
    description: "Submit complaints with text, or categories in just a few clicks.",
    icon: "📝",
  },
  {
    title: "Real-time Tracking",
    description: "Track the status of your complaints instantly from submission to resolution.",
    icon: "⏱️",
  },
  {
    title: "Notifications & Alerts",
    description: "Get instant notifications when your complaint is updated or resolved.",
    icon: "🔔",
  },
  {
     title: "Hostel Notices",
    description: "Stay updated with the latest hostel announcements.",
    icon: "📢",
  },
//   {
//     title: "Feedback System",
//     description: "Rate the resolution of your complaint to improve services.",
//     icon: "⭐",
//   },
];
const Features = () => {
  const featureRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show"); // reset so it animates again
          }
        });
      },
      { threshold: 0.6 }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="features" className="py-16 bg-gray-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">✨ Features</h2>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-25">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center 
                         transform transition duration-500 hover:scale-105 hover:shadow-2xl 
                         slide-left"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Features
