import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Actions from "../../../../../components/Table/components/Actions";

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    display: "flex",
    "& .MuiTextField-root": {
      width: 450,
      margin: "8px 0",
    },
  },
  select: {
    margin: "8px 0",
  },
});

const Form = ({ onClose, confirmTitle, onSubmit, defaultValues, loading }) => {
  const classes = useStyles();
  const { errors, register, setValue, handleSubmit } = useForm({
    defaultValues,
  });

  useEffect(() => {
    register({ name: "level" }, { required: true });
  }, [register]);

  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        inputRef={register({ required: true })}
        error={!!errors.name}
        name="name"
        label="Name"
        variant="outlined"
      />
      <FormControl variant="outlined" className={classes.select}>
        <InputLabel id="demo-simple-select-outlined-label">Level</InputLabel>
        <Select
          error={!!errors.level}
          defaultValue={defaultValues?.level}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Level"
        >
          {[1, 2, 3, 4, 5].map((level) => (
            <MenuItem
              key={level}
              value={level}
              onClick={() => setValue("level", level)}
            >
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Actions {...{ onClose, confirmTitle }} loading={loading} />
    </form>
  );
};

export default Form;
