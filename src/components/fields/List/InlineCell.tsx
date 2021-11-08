import { forwardRef } from "react";
import { IPopoverInlineCellProps } from "../types";

import { ButtonBase } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// // import { sanitiseValue } from "./utils";

export const InlineListField = forwardRef(function ListField(
  {
    value,
    showPopoverCell,
    disabled,
    row,
    selected,
    column,
  }: IPopoverInlineCellProps,
  ref: React.Ref<any>
) {
  // (window as any).rest = rest;

  (window as any).ref = ref;

  const sanitiseValue = (value: any) => {
    if (value === undefined || value === null || value === "") return null;
    else if (Array.isArray(value)) return value[0] as string;
    else return value as string;
  };
  (window as any).column = column;
  let display = <></>;
  if (selected != "") {
    // console.log(column.config.displayField);
    display = <div>{selected[column.config.displayField]}</div>;
  } else display = <div>View List</div>;

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
        {display}
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

export default InlineListField;
