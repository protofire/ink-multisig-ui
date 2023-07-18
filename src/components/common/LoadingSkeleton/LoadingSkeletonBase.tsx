import React from "react";

import styles from "./LoadingSkeleton.module.scss";

export interface LoadingSkeletonProps {
  highlightColor: string;
  baseColor: string;
  count: number;
  width: string;
}

export const LoadingSkeletonBase = ({
  highlightColor,
  baseColor,
  count,
  width,
}: LoadingSkeletonProps) => {
  const skeletons = [...Array(count)].map((_, index) => (
    <div key={index} className={styles.skeleton}></div>
  ));

  return (
    <div
      className={styles.skeletonWrapper}
      style={{
        background: `-webkit-gradient(linear, 100% 0, 0 0, from(${baseColor}), color-stop(0.5, ${highlightColor}), to(${baseColor}))`,
      }}
    >
      {skeletons}
    </div>
  );
};
