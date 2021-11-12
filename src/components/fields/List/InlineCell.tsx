import { forwardRef } from "react";
import { IPopoverInlineCellProps } from "../types";

import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ActionFab from "./ActionFab";
// // import { sanitiseValue } from "./utils";
import { makeStyles } from "@mui/styles";

const Styles = makeStyles({
  buttonDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "40px",
  },
  selectDiv: {
    flexGrow: 1,
    overflow: "hidden",
  },
});

export const InlineListField = forwardRef(function ListField(
  {
    value,
    showPopoverCell,
    disabled,
    row,
    selected,
    column,
    onSubmit,
    ...rest
  }: IPopoverInlineCellProps,
  ref: React.Ref<any>
) {
  const css = Styles();
  (window as any).rest = rest;

  (window as any).ref = ref;

  const sanitiseValue = (value: any) => {
    if (value === undefined || value === null || value === "") return null;
    else if (Array.isArray(value)) return value[0] as string;
    else return value as string;
  };
  (window as any).column = column;
  let display = <></>;
  if (selected != null) {
    // console.log(column.config.displayField);
    console.log(`is this where the error is?`);
    console.log(selected[column.config.displayField]);
    console.log(selected.value);
    display = column.config?.displayField ? (
      <div>{sanitiseValue(selected[column.config.displayField])}</div>
    ) : (
      <div>{selected.value}</div>
    );
    console.log(display);
  } else display = <div>View {column.config.displayField || "Field"}</div>;

  return (
    <Box
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
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ flexGrow: 1, overflow: "hidden" }}>
        {/*{sanitiseValue(value)}*/}
        {display}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <ActionFab
          row={row}
          column={column}
          value={value}
          disabled={disabled}
          onSubmit={onSubmit}
        />
        {!disabled && (
          <ButtonBase onClick={() => showPopoverCell(true)}>
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
          </ButtonBase>
        )}
      </div>
    </Box>
  );
});

export default InlineListField;
