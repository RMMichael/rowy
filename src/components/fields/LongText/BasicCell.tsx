import { IBasicCellProps } from "../types";

import { useTheme } from "@mui/material";

export default function LongText({ value }: IBasicCellProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        width: "100%",
        maxHeight: "100%",
        padding: theme.spacing(3 / 8, 0),

        whiteSpace: "pre-line",
        lineHeight: theme.typography.body2.lineHeight,
      }}
    >
      {String(value)}
    </div>
  );
}
