import { motion } from "framer-motion";

const slideAnimationDown = {
  initial: {
    opacity: 0,
    y: "-200%", // Adjust this value for the initial position from below
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: "-200%", // Adjust this value for the exit position to below
  },
  whileHover: {
    y: [0, 20, 0],
    transition: { duration: 1, repeat: Infinity },
  },
};

const slideAnimationUp = {
  initial: {
    opacity: 0,
    y: "50%", // Adjust this value for the initial position from above
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 2.5 },
  },
  exit: {
    y: "50%", // Adjust this value for the exit position to above
  },
};

const slideAnimationLeftAndVibrate = {
  initial: {
    x: "-150%", // Adjust this value for the initial position from left
  },
  animate: {
    x: 0,
    transition: { duration: 1.5 },
  },
  exit: {
    x: "-150%", // Adjust this value for the exit position to left
  },
};

const slideAnimationRightAndVibrate = {
  initial: {
    x: "150%", // Adjust this value for the initial position from right
  },
  animate: {
    x: 0,
    transition: { duration: 1.5 },
  },
  exit: {
    x: "150%", // Adjust this value for the exit position to right
  },
};

export {
  slideAnimationDown,
  slideAnimationUp,
  slideAnimationLeftAndVibrate,
  slideAnimationRightAndVibrate,
};
