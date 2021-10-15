import { lazy } from "react";
import { IFieldConfig, FieldType } from "@src/components/fields/types";
import withBasicCell from "../_withTableCell/withBasicCell";
import withPopoverCell from "../_withTableCell/withPopoverCell";

import ListIcon from "@src/assets/icons/List";
import BasicCell from "../_BasicCell/BasicCellNull";
import withSideDrawerEditor2 from "./withSideDrawerEditor2";
import TextEditor from "components/Table/editors/TextEditor";
import NullEditor from "@src/components/Table/editors/NullEditor";
// import withPopoverCell from "@src/components/fields/_withTableCell/withPopoverCell";
// import InlineCell from "@src/components/fields/SingleSelect/InlineCell";
import InlineCell from "./InlineCell";

const PopoverCell = lazy(
  () =>
    import("./PopoverCell" /* webpackChunkName: "PopoverCell-SingleSelect" */)
);
const SideDrawerField = lazy(
  () =>
    import("./SideDrawerField" /* webpackChunkName: "SideDrawerField-Json" */)
);

const Settings = lazy(
  () => import("./Settings" /* webpackChunkName: "Settings-Json" */)
);

export const config: IFieldConfig = {
  type: FieldType.list,
  name: "List",
  group: "Array",
  dataType: "object",
  initialValue: undefined,
  initializable: true,
  icon: <ListIcon />,
  description: "Object edited with a visual JSON editor.",
  TableCell: withPopoverCell(BasicCell, InlineCell, PopoverCell, {
    anchorOrigin: { horizontal: "left", vertical: "bottom" },
    transparent: true,
  }),
  TableEditor: NullEditor as any,
  csvImportParser: (value) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  },
  SideDrawerField,
  settings: Settings,
};
export default config;
