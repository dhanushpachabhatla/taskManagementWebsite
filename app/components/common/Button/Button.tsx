import React from "react";

interface ButtonProps {
  text: string;
  color?: string; // Custom background color
  textColor?: string; // Custom text color
}

const Button: React.FC<ButtonProps> = ({ text, color = "bg-blue-500", textColor = "text-white" }) => {
  return (
    <button
      className={`${color} ${textColor}} py-3 px-6 rounded-full font-semibold text-sm capitalize cursor-pointer transition-all duration-300 min-w-[80px] mt-5`}
    >
      {text}
    </button>
  );
};

export default Button;
