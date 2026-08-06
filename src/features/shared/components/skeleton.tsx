import React from "react";
import "./css/skeleton.css";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const formatDimension = (value?: string | number): string | undefined => {
  if (typeof value === "number") {
    return `${value}px`;
  }
  return value;
};

const Skeleton = ({
  width,
  height,
  className = "",
}: SkeletonProps): JSX.Element => {
  const customStyle = {
    ...(width !== undefined && { "--skeleton-width": formatDimension(width) }),
    ...(height !== undefined && {
      "--skeleton-height": formatDimension(height),
    }),
  } as React.CSSProperties;

  return (
    <span
      className={`skeleton-box ${className}`.trim()}
      style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
