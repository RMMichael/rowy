import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  fieldDisplay: {
    fontSize: "0.875rem",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: "4px",
    boxShadow:
      "0 0 0 1px rgba(255, 255, 255, 0.08) inset,0 -1px 0 0 rgba(255, 255, 255, 0.5) inset",
    height: "35px",
    padding: "6px 12px",
    fontFamily: "Inter,system-ui,sans-serif",
    width: "100%",
    transition: "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    overflow: "hidden",
    "&:hover": {
      boxShadow:
        "0 0 0 1px rgba(255, 255, 255, 0.08) inset,0 -1px 0 0 #fff inset",
      // borderBottom: "2px solid hsl(235, 95%, 84%)",
      // transition: "0 0 0 1px rgba(255, 255, 255, 0.08) inset,0 -1px 0 0 #fff inset;",
      // transform: "scaleX(0)"
    },
    "&:after": {
      transition: "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      width: "calc(100% - 8px)",
      left: "4px",
    },
    "&:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.7)",
    },
  },
});

export default function ListSelect(props) {
  const { options, updateConfig, fieldName } = props;

  const classes = useStyles();

  const changeConfig = (e) => {
    let key = e.target.value;
    if (key === "No keys available")
      updateConfig({ [fieldName]: { config: { displayField: "" } } });
    else updateConfig({ [fieldName]: { config: { displayField: key } } });
  };
  return (
    <Select
      variant="standard"
      className={classes.fieldDisplay}
      labelId="display-field"
      id="display-field"
      // value={config.displayField ?? ""}
      onChange={changeConfig}
      label="Field"
      // MenuProps={menuProps}
    >
      {options &&
        options.map((val) => {
          return <MenuItem value={val}>{val}</MenuItem>;
        })}
    </Select>
  );
}
