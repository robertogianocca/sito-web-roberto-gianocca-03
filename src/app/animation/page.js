"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

// Icon data - easily editable schema
const icons = [
  {
    id: "1",
    title: "Design",
    description: "Creative design solutions for modern projects",
    color: "#FF6B6B",
  },
  {
    id: "2",
    title: "Development",
    description: "Building powerful and scalable applications",
    color: "#4ECDC4",
  },
  {
    id: "3",
    title: "Strategy",
    description: "Strategic planning and business insights",
    color: "#45B7D1",
  },
  {
    id: "4",
    title: "Innovation",
    description: "Cutting-edge solutions for tomorrow",
    color: "#FFA07A",
  },
];

export default function AnimationPage() {
  const router = useRouter();
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isEntering, setIsEntering] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const iconRefs = useRef({});

  // Trigger zoom after icons slide in (with longer delay)
  const handleIconsIn = () => {
    setTimeout(() => {
      setIsZoomed(true);
    }, 1500);
  };

  // Handle icon click with entering effect
  const handleIconClick = (icon, event) => {
    const iconElement = iconRefs.current[icon.id];
    if (iconElement) {
      const rect = iconElement.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const iconCenterX = rect.left + rect.width / 2;
      const iconCenterY = rect.top + rect.height / 2;

      // Calculate offset needed to center the icon
      // Account for the parent container's scale (1.2 if zoomed)
      const parentScale = isZoomed ? 1.2 : 1;
      const offsetX = (centerX - iconCenterX) / parentScale;
      const offsetY = (centerY - iconCenterY) / parentScale;

      setIconPosition({ x: offsetX, y: offsetY });
    }

    setSelectedIcon(icon);
    setIsEntering(true);

    // Navigate after animation
    setTimeout(() => {
      router.push(`/animation/${icon.id}`);
    }, 600);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Scaled Container - includes background and content */}
      <motion.div
        className="fixed inset-0 w-full h-full origin-center"
        initial={{ scale: 1 }}
        animate={{ scale: isZoomed ? 1.2 : 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Paper Background - duplicated here so it scales with the container */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover filter brightness-65"
            style={{
              backgroundImage: "url('/textures/texture-background-01.webp')",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-color"
            style={{
              backgroundColor: "#F5F5DC",
              opacity: 0.3,
            }}
          />
        </div>

        {/* Main Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Icons Container */}
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {icons.map((icon, index) => {
              const isSelected = isEntering && selectedIcon?.id === icon.id;
              const shouldHide = isEntering && !isSelected;
              return (
                <motion.div
                  key={icon.id}
                  ref={(el) => (iconRefs.current[icon.id] = el)}
                  className="flex flex-col items-center gap-6 cursor-pointer"
                  initial={{ x: -200, opacity: 0 }}
                  animate={{
                    x: isSelected ? iconPosition.x : 0,
                    y: isSelected ? iconPosition.y : 0,
                    opacity: shouldHide ? 0 : 1,
                    scale: isSelected ? 10 : 1,
                  }}
                  transition={{
                    x: {
                      duration: isSelected ? 0.6 : 0.8,
                      delay: isSelected ? 0 : index * 0.15,
                      ease: isSelected ? "easeIn" : [0.25, 0.46, 0.45, 0.94],
                    },
                    y: {
                      duration: isSelected ? 0.6 : 0,
                      delay: isSelected ? 0 : 0,
                      ease: "easeIn",
                    },
                    opacity: {
                      duration: isSelected ? 0 : shouldHide ? 0.3 : 0.6,
                      delay: isSelected ? 0 : shouldHide ? 0 : index * 0.15,
                    },
                    scale: {
                      duration: isSelected ? 0.6 : 1.2,
                      ease: isSelected ? "easeIn" : "easeInOut",
                    },
                  }}
                  onAnimationComplete={index === icons.length - 1 ? handleIconsIn : undefined}
                  onClick={(e) => !isEntering && handleIconClick(icon, e)}
                  style={{
                    pointerEvents: isEntering ? "none" : "auto",
                    zIndex: isSelected ? 100 : 1,
                  }}
                >
                  {/* Icon Circle */}
                  <motion.div
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: icon.color }}
                    whileHover={!isEntering ? { scale: 1.15 } : {}}
                    whileTap={!isEntering ? { scale: 0.95 } : {}}
                  >
                    <span className="text-white text-2xl md:text-4xl font-bold">{icon.id}</span>
                  </motion.div>

                  {/* Text Below Icon */}
                  <AnimatePresence>
                    {isZoomed && (
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3 + index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
                          {icon.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 max-w-[200px]">
                          {icon.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Entering Overlay Effect */}
      <AnimatePresence>
        {isEntering && selectedIcon && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: selectedIcon.color }}
          >
            <motion.div
              className="text-white text-4xl md:text-6xl font-bold"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedIcon.title}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
