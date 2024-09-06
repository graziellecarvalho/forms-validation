// External imports
import React, { useEffect, FormEvent } from 'react'
import {
  FormControl,
  InputLabel, 
  Input,
  FormHelperText,
  Select,
  MenuItem,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Stack,
  TextField,
  Divider,
  Button,
  FormControlLabel,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { PatternFormat } from 'react-number-format';

// Internal imports
import './App.css';
import { useFormStore } from './store/formState';
import { FormProps } from './states/form';

function checkValue(value: string) {
  if (value?.trim() === '') {
    return false; // No error for an empty field
  }

  let number = parseInt(value);  // Convert to an integer
  if (!isNaN(number)) {
      if (number >= 18) {
          return false;
      } else {
          return 'You should be 18 or older';
      }
  } else {
      return 'Not a number';
  }
}

function App() {
  const { form, tempType, handleTypeSelect, handleForm } = useFormStore()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const formProps: FormProps = {
      name: (form.elements.namedItem('name-input') as HTMLInputElement)?.value || undefined,
      email: (form.elements.namedItem('email-input') as HTMLInputElement)?.value || undefined,
      age: (form.elements.namedItem('age-input') as HTMLInputElement)?.value || undefined,
      phoneNumber: (form.elements.namedItem('phone-input') as HTMLInputElement)?.value || undefined,
      gender: (form.elements.namedItem('gender-radio-input') as RadioNodeList)?.value || undefined,
      type: (form.elements.namedItem('type-select-input') as HTMLSelectElement)?.value || undefined,
      date: (form.elements.namedItem('date-picker') as HTMLInputElement)?.value || undefined,
      time: (form.elements.namedItem('time-picker') as HTMLInputElement)?.value || undefined,
    };

    handleForm(formProps)

    console.log('Form submitted:', formProps);
  }

  useEffect(() => {
    console.log('form', form)
  }, [form])

  return (
    <div className="App">
      <Typography variant="h2">Request meeting</Typography>
      
      <Stack>
        <form className='form-wrapper' onSubmit={handleSubmit}>
          <Typography variant="h4">Personal Information</Typography>
          {/*
            NAME
              Should check if it's at least 3 chars long
          */}
          <FormControl error={form.name === undefined}>
            <InputLabel htmlFor="name-input">Inform your name</InputLabel>
              <Input id="name-input" />
              {form.name === undefined && <FormHelperText id="name-input-error">Name should be at least 3 characters long</FormHelperText>}
          </FormControl>

          {/*
            EMAIL
              Should check if email typed is valid
          */}  
          <FormControl error={form.email === undefined}>
            <InputLabel htmlFor="email-input">Inform your e-mail</InputLabel>
              <Input id="email-input" />
              {form.email === undefined && <FormHelperText id="email-input-error">Invalid e-mail</FormHelperText>}
          </FormControl>

          {/*
            AGE
              Should check if w3hat's typed is a number
              Age should be equal or above 18
          */}  
          <FormControl error={!!checkValue(form.age)}>
            <InputLabel htmlFor="age-input">Inform your age</InputLabel>
              <Input id="age-input" />
              {!!checkValue(form.age) && <FormHelperText id="age-input-error">{checkValue(form.age)}</FormHelperText>}
          </FormControl>

          {/*
            PHONE NUMBER
              Should check if it has 10 chars
          */} 
          <PatternFormat
            customInput={TextField}
            format="(###) ###-####"
            mask="_"
            label="Phone Number"
            variant="outlined"
            name="phone-input"
            error={form.phoneNumber === undefined}
            helperText={form.phoneNumber === undefined && <FormHelperText id="phone-input-error">Your phone number should be 10 characters long</FormHelperText>}
          />
          
          {/*
            GENDER
              Should check if one is selected
          */} 
          <FormControl error={form.gender === undefined}>
            <FormLabel id="gender-radio-group">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender-radio-group"
              name="gender-radio-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            {form.gender === undefined && (
              <FormHelperText id="gender-radio-group-error">Please select one gender</FormHelperText>
            )}
          </FormControl>

          <Divider />

          <Typography variant="h4">Meeting Settings</Typography>

          {/*
            TYPE OF MEETING
              Should select one
          */} 
          <FormControl fullWidth error={form.type === undefined}>
            <InputLabel id="type-select-input">Type of Meeting</InputLabel>
            <Select
              labelId="type-select-input"
              id="type-select-input"
              name="type-select-input"
              value={tempType}
              onChange={(e) => handleTypeSelect(e.target.value)}
            >
              <MenuItem value={'type-1'}>Type 1</MenuItem>
              <MenuItem value={'type-2'}>Type 2</MenuItem>
              <MenuItem value={'type-3'}>Type 3</MenuItem>
              <MenuItem value={'type-4'}>Type 4</MenuItem>
              <MenuItem value={'type-5'}>Type 5</MenuItem>
              <MenuItem value={'type-6'}>Type 6</MenuItem>
            </Select>
              {form.type === undefined && (
                <FormHelperText id="type-input-error">
                  Pick a type
                </FormHelperText>
              )}
          </FormControl>
    
          {/*
            DATE AND TIME
              Should inform date and time
          */} 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={[ 'DatePicker', 'TimePicker' ]}>
              <DemoItem label={<Typography variant='body1' sx={{ color: 'gray' }}>Pick Date</Typography>}>
                <DatePicker
                  // id="date-picker"
                  name="date-picker"
                  slotProps={{
                    textField: {
                      helperText: 'Inform date',
                      error: form.date === undefined
                    },
                  }}
                />
              </DemoItem>
              <DemoItem label={<Typography variant='body1' sx={{ color: 'gray' }}>Pick Time</Typography>}>
                <TimePicker
                  // id="time-picker"
                  name="time-picker"
                  slotProps={{
                    textField: {
                      helperText: 'Inform time',
                      error: form.time === undefined
                    },
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Stack>
    </div>
  );
}

export default App;