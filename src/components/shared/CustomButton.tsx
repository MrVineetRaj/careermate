import clsx from "clsx";
import React from "react";

const CustomButton = ({
  title,
  isActive = false,
  className,
}: {
  title: string;
  isActive: boolean;
  className?: string;
}) => {
  return (
    <span
      className={clsx(
        `hover:text-grad px-4 py-2 ${className}`,
        isActive ? "text-primary" : "text-white"
      )}
    >
      {title}
    </span>
  );
};

export default CustomButton;
