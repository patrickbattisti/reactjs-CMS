import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Actions from "../../../../components/Table/components/Actions";
import { useForm } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import api from "../../../../services/api";

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

export default function Form({
  onClose,
  onConfirm,
  confirmTitle,
  onSubmit,
  defaultValues,
}) {
  const [roles, setRoles] = useState([]);
  const { errors, register, handleSubmit } = useForm({
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

  const classes = useStyles();

  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        inputRef={register({ required: true })}
        error={errors.firstName}
        name="firstName"
        label="First Name"
        variant="outlined"
      />
      <TextField
        inputRef={register({ required: true })}
        error={errors.lastName}
        name="lastName"
        label="Last Name"
        variant="outlined"
      />
      <TextField
        inputRef={register({ required: true })}
        error={errors.email}
        name="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        inputRef={register({ required: true })}
        error={errors.password}
        name="password"
        label="Password"
        variant="outlined"
        type="password"
      />

      <FormControl variant="outlined" className={classes.select}>
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          error={errors.role}
          defaultValue={defaultValues?.role?._id}
          inputProps={{
            name: "role",

            inputRef: (ref) => {
              register({ name: "role", value: ref?.value }, { required: true });
            },
          }}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Role"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {roles.map((role) => (
            <MenuItem key={role._id} value={role._id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Actions {...{ onClose, onConfirm, confirmTitle }} />
    </form>
  );
}
