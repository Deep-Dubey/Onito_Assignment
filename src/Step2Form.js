// Step2Form.js
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
import axios from "axios";
import { useState, useEffect } from "react";

import { addUser } from "./userReducer";

const validationSchema = yup.object({
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().required("Country is required"),
  pincode: yup.number().optional(),
});

function Step2Form() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [countryOptions, setCountryOptions] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountryOptions(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const onSubmit = (data) => {
    dispatch(addUser(data));
    history("/step-1");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            label="Address"
            {...field}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        )}
      />
      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <TextField
            label="State"
            {...field}
            error={!!errors.state}
            helperText={errors.state?.message}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <TextField
            label="City"
            {...field}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Country</InputLabel>
            <Select {...field} error={!!errors.country} displayEmpty>
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              {countryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="pincode"
        control={control}
        render={({ field }) => (
          <TextField
            label="Pincode"
            type="number"
            {...field}
            error={!!errors.pincode}
            helperText={errors.pincode?.message}
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Step2Form;
