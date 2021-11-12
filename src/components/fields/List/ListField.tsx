import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, {
  autocompleteClasses,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import { forwardRef } from "react";
import { useTheme, styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";

const filter = createFilterOptions();

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === "light" ? " #eaecef" : "#30363d"
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

const Styles = makeStyles({
  listItem: {
    flexDirection: "column",
  },
  smallTxt: {
    overflow: "hidden",
    display: "inline-block",
    fontSize: `.75em`,
    color: `gray`,
  },
});

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <>{<StyledAutocompletePopper {...other} />}</>;
}
// TODO in file TypeChange.tsx track the process

const sanitiseValue = (value: any) => {
  if (value === undefined || value === null || value === "") return null;
  else if (Array.isArray(value)) return value[0] as string;
  else return value as string;
};

export const ListField = function ListField(props: any) {
  const {
    value: list,
    onSubmit,
    column,
    parentRef,
    showPopoverCell,
    disabled,
    row,
    setSelected,
  } = props;
  (window as any).row = row;
  const [value, setValue] = useState({});
  const [dialogOpen, toggleDialogOpen] = useState(false);
  const [acOpen, setAcOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null as any);
  let displayField = column.config.displayField;
  let key = displayField ? displayField : "value";

  const css = Styles();
  (window as any).col = column;
  // let keys = new Set();
  let keyCheck = {};
  let keyObj = {};
  let types = {};
  let unique_key_arr = [];
  if (displayField) {
    for (let val of list) {
      for (let [k, v] of Object.entries(val)) {
        if (!keyCheck[k]) {
          keyCheck[k] = true;
          unique_key_arr.push(k);
          types[k] = typeof v === "number" ? "number" : "string";
        }
      }
    }
  } else {
    unique_key_arr.push("value");
  }
  for (let val of unique_key_arr) keyObj[val] = "";
  const [dialogValue, setDialogValue] = useState(keyObj);

  const handleDialogClose = () => {
    setDialogValue(keyObj);
    toggleDialogOpen(false);
  };

  const handleClose = () => {
    setAcOpen(false);
    showPopoverCell(false);
    handleDialogClose();
  };
  const onSubmitWrap = (e) => {
    e.preventDefault();
    let toAdd = {};
    for (let [k, v] of Object.entries(dialogValue))
      if (types[k] === "number") toAdd[k] = Number(v);
      else toAdd[k] = v;

    if (displayField) list.push(toAdd);
    else list.push(toAdd.value);
    setSelected({ [key]: toAdd });
    onSubmit(list);
    handleClose();
  };
  console.log("display field");
  console.log(displayField);
  return (
    <div id="auto-box">
      <Autocomplete
        value={value}
        open={acOpen}
        PopperComponent={PopperComponent}
        onChange={(event, newValue: any, reason) => {
          console.log({ event });
          if (reason === "createOption") {
            // pressing 'enter' for new option
            setTimeout(() => {
              toggleDialogOpen(true);
              setDialogValue({ ...dialogValue, [key]: newValue.inputValue });
            });
          } else if (
            reason === "selectOption" &&
            newValue &&
            newValue.inputValue
          ) {
            console.log("enter pressed");
            // selecting `add new option`
            toggleDialogOpen(true);
            setDialogValue({ ...dialogValue, [key]: newValue.inputValue });
          } else {
            // else click/enter and close - no event
            if (displayField) {
              setSelected(newValue);
            } else {
              let sani = sanitiseValue(newValue);
              setSelected({ [key]: sani });
            }
            setValue(newValue);
            handleClose();
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              [key]: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="autocomplete"
        openOnFocus
        options={list}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input

          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return String(option.inputValue.toString());
          }
          return option[key]?.toString() || "";
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => {
          const smallText =
            typeof option === "object" &&
            [...Object.entries(option as object)]
              .filter(([k, v]) => k !== key)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ");
          //console.log(`is this where the error is? (renderOption)`);
          //console.log({key, option, smallText});
          return (
            <li {...props}>
              <div>
                {option[key] || option}
                {smallText && (
                  <>
                    <br />
                    <span className={css.smallTxt}>{smallText}</span>
                  </>
                )}
              </div>
            </li>
          );
        }}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) =>
          acOpen ? (
            <TextField autoFocus {...params} label="Select Item" />
          ) : (
            <></>
          )
        }
      />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <form onSubmit={onSubmitWrap}>
          <DialogTitle>Add a new cell</DialogTitle>
          <DialogContent>
            <DialogContentText>Add content. Not found</DialogContentText>

            {unique_key_arr.map((val) => {
              return (
                <TextField
                  autoFocus
                  margin="dense"
                  id={val}
                  key={val}
                  value={dialogValue[val]}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      [val]: event.target.value,
                    })
                  }
                  label={val}
                  type="text"
                  variant="standard"
                />
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ListField;
