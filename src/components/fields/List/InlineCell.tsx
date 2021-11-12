import { forwardRef } from "react";
import { IPopoverInlineCellProps } from "../types";

import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ActionFab from "./ActionFab";
// // import { sanitiseValue } from "./utils";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Styles = makeStyles({
  buttonDiv: {
    display: "flex",
    // flexFlow: "column wrap",
    alignItems: "center",
    marginLeft: "auto",
    maxHeight: "calc(var(--row-height) - 10px))",
    // gap: "5%",
    flexFlow: "row wrap",
    writingMode: "vertical-lr",
    textOrientation: "upright",
    justifyContent: "space-around",
  },
  selectDiv: {
    flexGrow: 1,
    overflow: "hidden",
  },
  pushList: {
    marginLeft: "auto",
  },
  outerBox: {
    padding: "var(--cell-padding)",
    paddingRight: "0",
    height: "100%",
    font: "inherit",
    color: "inherit !important",
    letterSpacing: "inherit",
    textAlign: "inherit",
    display: "flex",
    justifyContent: "flex-start",
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
  // let display = 'placeholder text';
  return (
    <Box
      ref={ref}
      disabled={disabled}
      className={`cell-collapse-padding ${css.outerBox}`}
    >
      <div className={css.selectDiv}>
        {/*{sanitiseValue(value)}*/}
        {display}
      </div>
      <div className={css.buttonDiv}>
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
