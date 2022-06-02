import React from "react";
import stringHash from "string-hash";
import { getAvatarLetters, hsl2rgb, hslCouple } from "../utils";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  name: string;
  size?: number;
  style?: React.CSSProperties | undefined;
}

const GradientAvatar = ({ name, size, style }: IProps) => {
  const hash = stringHash(name);
  const colors = hslCouple(hash % 360, 0.75, 0.5);
  const color1 = hsl2rgb(colors[0][0], colors[0][1], colors[0][2]);
  const color2 = hsl2rgb(colors[1][0], colors[1][1], colors[1][2]);
  const color1str = `rgb(${color1[0]}, ${color1[1]}, ${color1[2]})`;
  const color2str = `rgb(${color2[0]}, ${color2[1]}, ${color2[2]})`;
  const id = uuidv4();

  return (
    <svg
      style={style}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id={id}>
          <stop stop-color={color1str} offset="0%"></stop>
          <stop stop-color={color2str} offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle cx="50" cy="50" r="50" id="circle" fill={`url(#${id})`}></circle>
      </g>
      <text
        x="50%"
        y="50%"
        style={{
          color: "#ffffff",
          lineHeight: 1,
          fontFamily: "Poppins, sans-serif",
          fontSize: "40px",
          fontWeight: "400",
        }}
        alignmentBaseline="middle"
        textAnchor="middle"
        dy=".1em"
        dominant-baseline="middle"
        fill="#ffffff"
      >
        {getAvatarLetters(name)}
      </text>
    </svg>
  );
};

export default GradientAvatar;
