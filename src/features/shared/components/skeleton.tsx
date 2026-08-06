import React from "react";
import "./css/skeleton.css";

export interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = "" }: SkeletonProps): JSX.Element => {
  return (
    <span className={`skeleton-box ${className}`.trim()} aria-hidden="true" />
  );
};

export default Skeleton;
