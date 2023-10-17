import { Box, CardHeader, SxProps, Typography } from "@mui/material";

import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { SummaryCardStyled, TextSummary } from "./styled";

export interface SummaryCardProps {
  captionTitle: string;
  caption?: string;
  captionComponent?: React.ReactNode;
  isLoading?: boolean;
  widthSkeleton?: string;
  styles?: SxProps;
}

export const SummaryCard = ({
  captionTitle,
  caption,
  captionComponent,
  isLoading,
  widthSkeleton,
  styles,
}: SummaryCardProps) => {
  const _captionComponent = isLoading ? (
    <LoadingSkeleton count={2} width={widthSkeleton} />
  ) : (
    captionComponent
  );

  return (
    <SummaryCardStyled border={false} sx={styles}>
      {_captionComponent && !caption ? (
        _captionComponent
      ) : (
        <Box justifyContent="center">
          <TextSummary>{caption}</TextSummary>
        </Box>
      )}
      {captionTitle && (
        <CardHeader
          sx={{ paddingBottom: 0 }}
          title={
            <Typography variant="h4" color="white">
              {captionTitle}
            </Typography>
          }
        />
      )}
    </SummaryCardStyled>
  );
};
