import { Box, BoxProps, SkeletonProps } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export interface LoadingSkeletonProps extends SkeletonProps {
  count?: number;
  widthContainer?: string;
  props?: SkeletonProps;
}

const BoxWrapper = styled(Box)<BoxProps>(() => {
  return {
    justifyContent: "center",
  };
});

export const LoadingSkeleton = ({
  count = 1,
  width = "80%",
  props,
}: LoadingSkeletonProps) => {
  return (
    <BoxWrapper width={width}>
      <MySkeleton count={count} {...props} />
    </BoxWrapper>
  );
};

export function MySkeleton(props: SkeletonProps & { count?: number }) {
  const theme = useTheme();

  return (
    <SkeletonTheme
      baseColor={theme.palette.background.paper}
      highlightColor={theme.palette.primary.main}
    >
      <Skeleton sx={{ bgcolor: "grey.100" }} {...props} />
    </SkeletonTheme>
  );
}
