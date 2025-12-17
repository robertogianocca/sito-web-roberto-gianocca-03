"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import Background from "@/components/Background/Background";

// Content data schema - easily editable
const contentData = {
  1: {
    title: "Design",
    subtitle: "Creative Solutions",
    color: "#FF6B6B",
    content: [
      {
        heading: "Visual Identity",
        text: "Creating compelling visual identities that resonate with your audience and communicate your brand's essence effectively.",
      },
      {
        heading: "User Experience",
        text: "Designing intuitive and engaging user experiences that make complex interactions feel simple and natural.",
      },
      {
        heading: "Brand Strategy",
        text: "Developing comprehensive brand strategies that align with your business goals and market positioning.",
      },
    ],
  },
  2: {
    title: "Development",
    subtitle: "Technical Excellence",
    color: "#4ECDC4",
    content: [
      {
        heading: "Web Applications",
        text: "Building robust and scalable web applications using modern technologies and best practices.",
      },
      {
        heading: "Mobile Solutions",
        text: "Developing native and cross-platform mobile applications that deliver exceptional performance.",
      },
      {
        heading: "API Integration",
        text: "Creating seamless integrations between systems and services to enhance functionality and efficiency.",
      },
    ],
  },
  3: {
    title: "Strategy",
    subtitle: "Business Insights",
    color: "#45B7D1",
    content: [
      {
        heading: "Market Analysis",
        text: "Conducting thorough market research and analysis to identify opportunities and competitive advantages.",
      },
      {
        heading: "Growth Planning",
        text: "Developing strategic growth plans that align with your vision and drive sustainable business expansion.",
      },
      {
        heading: "Performance Metrics",
        text: "Establishing key performance indicators and tracking systems to measure success and optimize outcomes.",
      },
    ],
  },
  4: {
    title: "Innovation",
    subtitle: "Future Forward",
    color: "#FFA07A",
    content: [
      {
        heading: "Emerging Technologies",
        text: "Exploring and implementing cutting-edge technologies to stay ahead of industry trends and innovations.",
      },
      {
        heading: "Creative Problem Solving",
        text: "Approaching challenges with innovative thinking and creative solutions that break conventional boundaries.",
      },
      {
        heading: "Digital Transformation",
        text: "Guiding organizations through digital transformation journeys that modernize operations and enhance capabilities.",
      },
    ],
  },
};

export default function AnimationDetailPage({ params }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    // Handle async params in Next.js 15+
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
      setMounted(true);
    };
    getParams();
  }, [params]);

  if (!mounted || !id) {
    return null;
  }

  const data = contentData[id];

  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-600">Content not found</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Paper Background */}
      <Background color="#F5F5DC" />

      {/* Back Button */}
      <motion.button
        className="fixed top-8 left-8 z-40 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg text-gray-800 font-semibold hover:bg-white transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => router.push("/animation")}
      >
        ← Back
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-8 py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ color: data.color }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {data.title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {data.subtitle}
          </motion.p>
        </motion.div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {data.content.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8 + index * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: data.color }}>
                {item.heading}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
