import { lazy } from "react";
import { IFieldConfig, FieldType } from "@src/components/fields/types";
import withBasicCell from "../_withTableCell/withBasicCell";

import ListIcon from "@src/assets/icons/List";
import BasicCell from "./BasicCell";
import withSideDrawerEditor from "@src/components/Table/editors/withSideDrawerEditor";

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
  TableCell: withBasicCell(BasicCell),
  TableEditor: withSideDrawerEditor(BasicCell),
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
