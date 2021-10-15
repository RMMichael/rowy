import { forwardRef } from "react";
import { IPopoverInlineCellProps } from "../types";

import { ButtonBase } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// // import { sanitiseValue } from "./utils";

export const List = forwardRef(function List(
  { value, showPopoverCell, disabled }: IPopoverInlineCellProps,
  ref: React.Ref<any>
) {
  let h = 0;
  console.log("HERERE");
  console.log(typeof value);
  console.log(value);
  // let h = JSON.parse(value);

  const sanitiseValue = (value: any) => {
    if (value === undefined || value === null || value === "") return null;
    else if (Array.isArray(value)) return value[0] as string;
    else return value as string;
  };

  return (
    <ButtonBase
      onClick={() => showPopoverCell(true)}
      ref={ref}
      disabled={disabled}
      className="cell-collapse-padding"
      style={{
        padding: "var(--cell-padding)",
        paddingRight: 0,
        height: "100%",

        font: "inherit",
        color: "inherit !important",
        letterSpacing: "inherit",
        textAlign: "inherit",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ flexGrow: 1, overflow: "hidden" }}>
        {/*{sanitiseValue(value)}*/}
        View List
      </div>

      {!disabled && (
        <ArrowDropDownIcon
          className="row-hover-iconButton"
          sx={{
            flexShrink: 0,
            mr: 0.5,
            borderRadius: 1,
            p: (32 - 24) / 2 / 8,
            boxSizing: "content-box",
          }}
        />
      )}
    </ButtonBase>
  );
});

export default List;
