import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { addUser } from "./userReducer";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive integer"),
  sex: yup
    .string()
    .required("Sex is required")
    .oneOf(["Male", "Female"], "Invalid sex value"),
  mobile: yup
    .string()
    .required("Mobile is required")
    .matches(/^[6-9]\d{9}$/, "Invalid Indian Mobile Number"),
  govtIdType: yup
    .string()
    .required("Govt ID Type is required")
    .oneOf(["Aadhar", "PAN"], "Invalid Govt ID Type"),
  govtId: yup.string().when("govtIdType", {
    is: "Aadhar",
    then: yup
      .string()
      .required("Aadhar is required")
      .matches(/^\d{12}$/, "Invalid Aadhar Number"),
    otherwise: yup
      .string()
      .required("PAN is required")
      .matches(/^[\w\d]{10}$/, "Invalid PAN Number"),
  }),
});

const Step1Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
        sex: "",
        name: "",
        age: "",
        mobile: "",
        govtIdType: "",
        govtId: ""
      },
  });

  const onSubmit = (data) => {
    dispatch(addUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Name"
            {...field}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField
            label="Age"
            type="number"
            {...field}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
        )}
      />
      <Controller
        name="sex"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Sex</InputLabel>
            <Select {...field} error={!!errors.sex} displayEmpty>
              <MenuItem value="" disabled>
                
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="mobile"
        control={control}
        render={({ field }) => (
          <TextField
            label="Mobile"
            {...field}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />
        )}
      />
      <Controller
        name="govtIdType"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Govt ID Type</InputLabel>
            <Select {...field} error={!!errors.govtIdType} displayEmpty>
              <MenuItem value="" disabled>
                
              </MenuItem>
              <MenuItem value="Aadhar">Aadhar</MenuItem>
              <MenuItem value="PAN">PAN</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="govtId"
        control={control}
        render={({ field }) => (
          <TextField
            label="Govt ID"
            {...field}
            error={!!errors.govtId}
            helperText={errors.govtId?.message}
          />
        )}
      />
      <Button type="submit" onClick={()=>navigate("/step-2")}>Next</Button>
    </form>
  );
};

export default Step1Form;
