import { Box, CardHeader, Typography } from "@mui/material";

import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { SummaryCardStyled, TextSummary } from "./styled";

export interface SummaryCardProps {
  captionTitle: string;
  caption?: string;
  captionComponent?: React.ReactNode;
  isLoading?: boolean;
  widthSkeleton?: string;
}

export const SummaryCard = ({
  captionTitle,
  caption,
  captionComponent,
  isLoading,
  widthSkeleton,
}: SummaryCardProps) => {
  const _captionComponent = isLoading ? (
    <LoadingSkeleton count={2} width={widthSkeleton} />
  ) : (
    captionComponent
  );

  return (
    <SummaryCardStyled border={false}>
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
