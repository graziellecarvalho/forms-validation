// External imports
import React, { useState, FormEvent } from 'react'
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
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from 'dayjs';

// Internal imports
import './App.css';
import { useFormStore } from './store/formState';
import { FormProps } from './states/form';

function App() {
  const { handleForm } = useFormStore()
  const [isAlertTriggered, setIsAlertTriggered] = useState('')

  // Fields Validation
  const formSchema = z.object({
    name: z.string().min(3, { message: 'At least 3 character(s)' }).max(50),
    email: z.string().email(),
    age: z.coerce.number().positive().gte(18).lte(120),
    phone: z.string().refine((value) => value.replace(/\D/g, '').length === 10, { message: 'Invalid phone' }),
    gender: z.string().refine((value) => ['female', 'male', 'other'].includes(value), { message: 'Please select one of the above options' }),
    type: z.string().refine((value) => value.startsWith('type-'), { message: 'Please select a type' }),
    date: z.string().date(),
    time: z.string().time(),
  })

  const { register, handleSubmit, formState: { errors }, getValues, watch, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 0,
      phone: '',
      gender: '',
      type: '',
      date: '',
      time: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsAlertTriggered('success');
    
    // Fetch values from the form
    const values = getValues() as FormProps;
    
    handleForm(values);
  };

  React.useEffect(() => {
    if (Object.keys(errors).length !== 0)
      setIsAlertTriggered('error');
  
    console.log('Form errors:', errors, getValues()); 
  }, [errors])
  
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway')
      return

    setIsAlertTriggered('');
  };

  return (
    <div className="App">
      <Typography variant="h2">Request meeting</Typography>
      
      <Stack>
        <form className='form-wrapper' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">Personal Information</Typography>
          {/*
            NAME
              Should check if it's at least 3 chars long
          */}
          <FormControl error={!!errors.name}>
            <InputLabel htmlFor="name-input">Inform your name</InputLabel>
            <Input {...register('name')} id="name-input" />
            {errors.name && <FormHelperText id="name-input-error">{errors.name.message}</FormHelperText>}
          </FormControl>

          {/*
            EMAIL
              Should check if email typed is valid
          */}  
          <FormControl error={!!errors.email}>
            <InputLabel htmlFor="email-input">Inform your e-mail</InputLabel>
            <Input {...register('email')} id="email-input" />
            {errors.email && <FormHelperText id="email-input-error">{errors.email.message}</FormHelperText>}
          </FormControl>

          {/*
            AGE
              Should check if w3hat's typed is a number
              Age should be equal or above 18
          */}  
          <FormControl error={!!errors.age}>
            <InputLabel htmlFor="age-input">Inform your age</InputLabel>
            <Input {...register('age')} id="age-input" />
            {errors.age && <FormHelperText id="age-input-error">{errors.age.message}</FormHelperText>}
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
            name="phone"
            value={watch('phone')}
            onValueChange={(values) => {
              const { formattedValue } = values;
              setValue('phone', formattedValue);
            }}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          
          {/*
            GENDER
              Should check if one is selected
          */} 
          <FormControl error={!!errors.gender}>
            <FormLabel id="gender-radio-group">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender-radio-group"
              name="gender-radio-group"
            >
              <FormControlLabel {...register('gender')} value="female" control={<Radio />} label="Female" />
              <FormControlLabel {...register('gender')} value="male" control={<Radio />} label="Male" />
              <FormControlLabel {...register('gender')} value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            {errors.gender && (
              <FormHelperText id="gender-radio-group-error">{errors.gender.message}r</FormHelperText>
            )}
          </FormControl>

          <Divider />

          <Typography variant="h4">Meeting Settings</Typography>

          {/*
            TYPE OF MEETING
              Should select one
          */} 
          <FormControl fullWidth error={!!errors.type}>
            <InputLabel id="type-select-input">Type of Meeting</InputLabel>
            <Select
              labelId="type-select-input"
              id="type"
              name="type"
              {...register('type')}
            >
              <MenuItem value={'type-1'}>Type 1</MenuItem>
              <MenuItem value={'type-2'}>Type 2</MenuItem>
              <MenuItem value={'type-3'}>Type 3</MenuItem>
              <MenuItem value={'type-4'}>Type 4</MenuItem>
              <MenuItem value={'type-5'}>Type 5</MenuItem>
              <MenuItem value={'type-6'}>Type 6</MenuItem>
            </Select>
            {errors.type && (
              <FormHelperText id="type-input-error">
                {errors.type.message}
              </FormHelperText>
            )}
          </FormControl>
    
          {/*
            DATE AND TIME
              Should inform date and time
          */} 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'TimePicker']}>
              {/* Date Picker */}
              <DemoItem label={<span style={{ color: 'gray' }}>Pick Date</span>}>
                <DatePicker
                  name="date-picker"
                  value={watch('date') ? dayjs(watch('date')) : null}  // Convert string to Dayjs object
                  onChange={(newValue) => {
                    setValue('date', newValue ? newValue.format('YYYY-MM-DD') : '');  // Convert Dayjs to YYYY-MM-DD string
                  }}
                  slotProps={{
                    textField: {
                      helperText: errors.date && errors.date.message,
                      error: !!errors.date
                    },
                  }}
                />
              </DemoItem>

              {/* Time Picker */}
              <DemoItem label={<span style={{ color: 'gray' }}>Pick Time</span>}>
                <TimePicker
                  value={watch('time') ? dayjs(watch('time'), 'HH:mm:ss.SSS') : null}  // Convert string to Dayjs object
                  name="time-picker"
                  onChange={(newValue) => {
                    setValue('time', newValue ? newValue.format('HH:mm:ss.SSS') : '');  // Convert Dayjs to HH:mm:ss.SSS string
                  }}
                  slotProps={{
                    textField: {
                      helperText: errors.time && errors.time.message,
                      error: !!errors.time
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

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isAlertTriggered === 'success'}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            The form was submitted!
          </Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isAlertTriggered === 'error'}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Form has errors!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default App;