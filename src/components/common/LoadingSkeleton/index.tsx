import { useTheme } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { LoadingSkeletonProps } from "./LoadingSkeletonBase";

type Props = Partial<LoadingSkeletonProps>;

export const LoadingSkeleton = ({ count = 1 }: Props) => {
  const theme = useTheme();

  return (
    <SkeletonTheme
      baseColor={theme.palette.background.default}
      highlightColor={theme.palette.primary.main}
    >
      <p>
        <Skeleton count={count} />
      </p>
    </SkeletonTheme>
  );
};
