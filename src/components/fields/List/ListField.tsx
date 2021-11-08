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
import { IPopoverCellProps } from "@src/components/fields/types";
import Popper from "@mui/material/Popper";
import { forwardRef } from "react";
import { useTheme, styled } from "@mui/material/styles";

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

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  // const { disablePortal, anchorEl, ...other } = props;
  return <>{<StyledAutocompletePopper {...other} />}</>;
  // <Popper {...props} anchorEl={anchorEl} placement="bottom-start" />
  // return <Popper {...other}/>;
}

// TODO Find where isActionScript is being assigned and change false to true
// TODO in file TypeChange.tsx track the process

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
  // (window as any).rest = rest;
  const [value, setValue] = useState({});
  const [dialogOpen, toggleDialogOpen] = useState(false);
  const [acOpen, setAcOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null as any);
  let displayField = column.config.displayField;
  (window as any).col = column;
  let keys = new Set();

  if (displayField) {
    for (let v of Object.values(list)) {
      for (let key of Object.keys(v)) keys.add(key);
    }
  } else {
    for (let v of Object.values(list)) {
      if (typeof v !== "object") keys.add(v.toString());
    }
  }
  let arr = [];
  for (let k of keys) {
    arr.push({ [k]: "" });
  }
  console.log(arr);
  const handleDialogClose = () => {
    setDialogValue(Object.assign({}, arr));

    toggleDialogOpen(false);
  };

  const handleClose = () => {
    setAcOpen(false);
    showPopoverCell(false);
    handleDialogClose();
  };

  const [dialogValue, setDialogValue] = useState(Object.assign({}, arr));

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue(
      Object.assign(
        {},
        arr.map((val) => {
          return { [val.keys()[0]]: dialogValue[val.keys()[0]] };
        })
      )
    );

    handleDialogClose();
  };

  // if (!showPopoverCell) return <></>;

  return (
    <div id="10">
      <Autocomplete
        value={value}
        open={acOpen}
        PopperComponent={PopperComponent}
        onChange={(event, newValue: any) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleDialogOpen(true);
              setDialogValue(
                Object.assign(
                  {},
                  arr.map((val) => {
                    let currKey = val.keys()[0];
                    if (val.keys()[0] === displayField)
                      return { [currKey]: newValue };
                    else return { [currKey]: "" };
                  })
                )
                // title: newValue,
              );
            });
          } else if (newValue && newValue.inputValue) {
            toggleDialogOpen(true);
            setDialogValue(
              Object.assign(
                {},
                arr.map((val) => {
                  let currKey = val.keys()[0];
                  if (currKey === displayField)
                    return { [currKey]: newValue.inputValue };
                  else return { [currKey]: "" };
                })
              )
              // title: newValue.inputValue,
            );
          } else if (newValue) {
            setValue(newValue);
            setSelected(newValue);
            handleClose();
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              [displayField]: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={list}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name || "unknown";
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props}>{option[column.config.displayField]}</li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) =>
          acOpen ? <TextField {...params} label="Select Item" /> : <></>
        }
      />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new cell</DialogTitle>
          <DialogContent>
            <DialogContentText>Add content not found</DialogContentText>

            {arr.map((val) => {
              console.log(Object.keys(val)[0]);
              let key = Object.keys(val)[0];
              return (
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={dialogValue[key]}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      [key]: event.target.value,
                    })
                  }
                  label={key}
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
