import { IPopoverCellProps } from "../types";
import MultiSelect_ from "@rowy/multiselect";
import { useState } from "react";

// import { sanitiseValue } from "./utils";
import ListField from "./ListField";
export default function ListPopoverCell({
  value,
  onSubmit,
  column,
  parentRef,
  showPopoverCell,
  disabled,
  row,
  setSelected,
}: IPopoverCellProps) {
  const config = column.config ?? {};
  (window as any).col = column;
  return (
    <ListField
      setSelected={setSelected}
      row={row}
      value={value}
      onSubmit={onSubmit}
      column={column}
      parentRef={parentRef} // IPopoverCellProps on List ?
      showPopoverCell={showPopoverCell}
      disabled={disabled}
    />
  );
}
