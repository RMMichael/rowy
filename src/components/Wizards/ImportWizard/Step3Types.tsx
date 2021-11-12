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

const useStyles = makeStyles((theme) =>
  createStyles({
    typeSelectRow: { marginBottom: theme.spacing(3) },

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

export default function Step3Types({ config, updateConfig, isXs }: IStepProps) {
  const classes = useStyles();

  const [fieldToEdit, setFieldToEdit] = useState(Object.keys(config)[0]);

  const handleChange = (v) => updateConfig({ [fieldToEdit]: { type: v } });

  const { tableState } = useProjectContext();

  const onTypeClick = (e) => {
    console.log("on focus");
    console.log({ e });
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
