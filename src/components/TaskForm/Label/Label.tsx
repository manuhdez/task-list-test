import React from "react";

interface LabelProps {
  text: string;
  htmlFor?: string;
}

export default function Label({ text, htmlFor = "" }: LabelProps) {
  if (!text) return null;

  return (
    <label htmlFor={htmlFor}>
      <h3>{text}</h3>
    </label>
  );
}
