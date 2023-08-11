import { Box, BoxProps, styled, useTheme } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export interface LoadingSkeletonProps {
  count?: number;
  width?: string;
}

const BoxWrapper = styled(Box)<BoxProps>(() => {
  return {
    justifyContent: "center",
  };
});

export const LoadingSkeleton = ({
  count = 1,
  width = "80%",
}: LoadingSkeletonProps) => {
  const theme = useTheme();

  return (
    <SkeletonTheme
      baseColor={theme.palette.background.paper}
      highlightColor={theme.palette.primary.main}
    >
      <BoxWrapper width={width}>
        <Skeleton count={count} />
      </BoxWrapper>
    </SkeletonTheme>
  );
};
