import { useTheme } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export interface LoadingSkeletonProps {
  count?: number;
}

export const LoadingSkeleton = ({ count = 1 }: LoadingSkeletonProps) => {
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
