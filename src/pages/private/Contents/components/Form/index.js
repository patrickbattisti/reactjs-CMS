import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Actions from "../../../../../components/Table/components/Actions";
import api from "../../../../../services/api";
import InputFile from "../../../../../components/InputFile";

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
  const [roles, setRoles] = useState([]);
  const { errors, register, setValue, handleSubmit } = useForm({
    defaultValues,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("roles");

        setRoles(response.data);
      } catch (e) {}
    };

    fetch();
  }, []);

  useEffect(() => {
    register({ name: "role" }, { required: true });
    register({ name: "background" }, { required: true });
  }, [register]);

  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        inputRef={register({ required: true })}
        error={!!errors.title}
        name="title"
        label="Title"
        variant="outlined"
      />
      <TextField
        inputRef={register({ required: true })}
        error={!!errors.description}
        name="description"
        label="Description"
        multiline
        rows={6}
        variant="outlined"
      />

      <FormControl variant="outlined" className={classes.select}>
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          error={!!errors.role}
          defaultValue={defaultValues?.role?._id}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Role"
        >
          {roles.map((role) => (
            <MenuItem
              key={role._id}
              value={role._id}
              onClick={() => setValue("role", role._id)}
            >
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <InputFile
        error={!!errors.background}
        placeholder="Background Image"
        defaultValue={defaultValues?.background}
        accept="image/*"
        setValue={(imageId) => setValue("background", imageId)}
      />

      <Actions {...{ onClose, confirmTitle }} loading={loading} />
    </form>
  );
};

export default Form;
