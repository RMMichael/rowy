import { useState } from "react";

import { makeStyles, createStyles } from "@mui/styles";
import { Grid, Typography, Divider, ButtonBase } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { IStepProps } from ".";
import FadeList from "../ScrollableList";
import Column from "../Column";
import Cell from "../Cell";
import FieldsDropdown from "components/Table/ColumnMenu/FieldsDropdown";

import { useProjectContext } from "contexts/ProjectContext";
import { FieldType } from "constants/fields";
import { SELECTABLE_TYPES } from "./utils";

import ListSelect from "../../fields/List/ListSelect";

const useStyles = makeStyles((theme) =>
  createStyles({
    typeSelectRow: {
      marginBottom: theme.spacing(3),
    },

    buttonBase: {
      width: "100%",
      textAlign: "left",
    },
    typeHeading: { margin: theme.spacing(52 / 8, 0, 1) },

    previewDivider: { marginBottom: theme.spacing(2) },
    previewSpacer: { width: theme.spacing(3) },
    cellContainer: { overflow: "hidden" },
  })
);

export default function Step3Types({
  config,
  updateConfig,
  isXs,
  ...rest
}: IStepProps) {
  const classes = useStyles();
  const [fieldToEdit, setFieldToEdit] = useState(Object.keys(config)[0]);
  const [displayFields, setDisplayFields] = useState({});
  const [selectedType, setSelectedType] = useState("");

  const { tableState } = useProjectContext();

  const handleChange = (v) => {
    setSelectedType(v);
    if (v === "LIST" && !displayFields[fieldToEdit]) {
      let set = new Set();
      console.log({ v });
      let rows = tableState?.rows || [];
      if (rows.length > 0 && typeof rows[0] === "object") {
        for (let row of rows) {
          let list = row[fieldToEdit] || [];
          for (let val of list) {
            if (val !== Object(val)) continue; // is not an object
            for (let k of Object.keys(val)) set.add(k);
          }
        }
      }
      const keys = set.size > 0 ? ["", ...set] : ["No keys available"];
      console.log("in handle");
      console.log({ keys });
      setDisplayFields({ ...displayFields, [fieldToEdit]: keys });
    }
    console.log({ v });
    updateConfig({ [fieldToEdit]: { type: v } });
  };

  return (
    <div>
      <Grid container spacing={2} className={classes.typeSelectRow}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" gutterBottom component="h2">
            Table columns
          </Typography>
          <Divider />

          <FadeList>
            {Object.entries(config).map(([field, { name, type }]) => (
              <li key={field}>
                <ButtonBase
                  className={classes.buttonBase}
                  onClick={() => setFieldToEdit(field)}
                  aria-label={`Edit column ${field}`}
                  focusRipple
                >
                  <Column
                    label={name}
                    type={type}
                    active={field === fieldToEdit}
                    secondaryItem={
                      field === fieldToEdit && <ChevronRightIcon />
                    }
                  />
                </ButtonBase>
              </li>
            ))}
          </FadeList>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle2"
            noWrap
            component="h2"
            className={classes.typeHeading}
          >
            Column type: {config[fieldToEdit].name}
          </Typography>

          <FieldsDropdown
            value={config[fieldToEdit].type}
            onChange={handleChange}
            hideLabel
            options={SELECTABLE_TYPES}
          />
          {selectedType === "LIST" ? (
            <ListSelect
              options={displayFields[fieldToEdit]}
              updateConfig={updateConfig}
              fieldName={fieldToEdit}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {!isXs && (
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom component="h2">
              Raw data
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" gutterBottom component="h2">
            Column preview
          </Typography>
        </Grid>
      </Grid>

      <Divider className={classes.previewDivider} />

      <Grid container spacing={3}>
        {!isXs && (
          <Grid item xs={12} sm={6}>
            <Column label={fieldToEdit} />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Column
            label={config[fieldToEdit].name}
            type={config[fieldToEdit].type}
          />
        </Grid>
      </Grid>

      <FadeList listSx={{ pt: 0 }}>
        {tableState!.rows!.slice(0, 20).map((row) => (
          <Grid container key={row.id} wrap="nowrap">
            {!isXs && (
              <Grid item xs className={classes.cellContainer}>
                <Cell
                  field={fieldToEdit}
                  value={(JSON.stringify(row[fieldToEdit]) || "")
                    .replace(/^"/, "")
                    .replace(/"$/, "")}
                  type={FieldType.shortText}
                />
              </Grid>
            )}

            {!isXs && <Grid item className={classes.previewSpacer} />}

            <Grid item xs className={classes.cellContainer}>
              {/*{ (selectedType === 'LIST')*/}
              {/*    ?*/}
              {/*    : */}
              {/*}*/}
              <Cell
                field={fieldToEdit}
                value={row[fieldToEdit]}
                type={config[fieldToEdit].type}
                name={config[fieldToEdit].name}
              />
            </Grid>
          </Grid>
        ))}
      </FadeList>
    </div>
  );
}
