import jsonFormat from "json-format";
import { IBasicCellProps } from "../types";

import { useTheme } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import React from "react";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      border: "3px solid yellow",
      height: "100%",
      width: "100%",
    },
    sel: {
      border: "3px solid green",
      height: "70%",
      width: "100%",
    },
  })
);

export default function List({ value }: IBasicCellProps) {
  const theme = useTheme();
  const classes = useStyles();

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  if (!value) return null;

  const formattedJson = jsonFormat(value, {
    type: "space",
    char: " ",
    size: 2,
  });

  const format = (val) =>
    jsonFormat(val, {
      type: "space",
      char: " ",
      size: 2,
    });

  const dig = (val) => {};

  // if value is not an array return <div>'expected array'</div>

  const arr = value;

  return (
    <div
      className={classes.div}
      style={{
        width: "100%",
        maxHeight: "100%",
        padding: theme.spacing(3 / 8, 0),

        whiteSpace: "pre-wrap",
        lineHeight: theme.typography.body2.lineHeight,
        fontFamily: theme.typography.fontFamilyMono,
        wordBreak: "break-word",
      }}
    >
      {/*<div className={classes.div}>*/}
      <Select
        className={classes.sel}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        {arr.map((val) => {
          return <MenuItem value={val}>{format(val)}</MenuItem>;
        })}
        {/*<MenuItem value={10}>Ten</MenuItem>*/}
        {/*<MenuItem value={20}>Twenty</MenuItem>*/}
        {/*<MenuItem value={30}>Thirty</MenuItem>*/}
      </Select>
      {/*</div>*/}
      {/*{formattedJson}*/}
    </div>
  );
}
