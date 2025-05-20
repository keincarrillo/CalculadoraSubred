import React from "react";
import { type HeaderProps } from "@/types/types";

const Card: React.FC<HeaderProps> = ({ title }) => {
  return <h1 className="text-center text-4xl p-8">{title}</h1>;
};

export default Card;
