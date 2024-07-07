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
    transition: { duration: 0.5 },
  },
  exit: {
    y: "50%", // Adjust this value for the exit position to above
  },
};

const slideAnimationLeftAndVibrate = {
  initial: {
    x: "-200%", // Adjust this value for the initial position from left
  },
  animate: {
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    x: "-200%", // Adjust this value for the exit position to left
  },
  whileHover: {
    x: [-20, 20],
    transition: { duration: 0.5, repeat: Infinity },
  },
};

const slideAnimationRightAndVibrate = {
  initial: {
    x: "200%", // Adjust this value for the initial position from right
  },
  animate: {
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    x: "200%", // Adjust this value for the exit position to right
  },
  whileHover: {
    x: [-20, 20],
    transition: { duration: 0.5, repeat: Infinity },
  },
};

export {
  slideAnimationDown,
  slideAnimationUp,
  slideAnimationLeftAndVibrate,
  slideAnimationRightAndVibrate,
};
