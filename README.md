## ⚠️  About this branch

```zod```

- The ```zod``` branch is dedicated to the implementation of Zod
- This branch was checkout from ```typescript``` branch.

### Main changes made:

- **Form Validation Approach:** using React Hook Form's register method for managing inputs and Zod for schema-based validation, errors are automatically handled via the errors object, which React Hook Form generates based on the Zod schema.
- **Form Field Registration:** fields are registered with React Hook Form using the register function, which ties the input to the form's validation schema and state management.
- **Error handling:** checks for errors using the errors object from React Hook Form (!!errors.name), which simplifies error display and ensures that error messages come from the Zod validation rules.
- **Phone number handling:** the phone number value is controlled by setValue and watch, different from what we see on name, email and age, due to the formatting used by PatternFormat, ensuring consistency across the form.
- **Date and Time Pickers:** integrates the pickers with React Hook Form, using watch to monitor values and setValue to update the form state, different from what we see on name, email and age, due to allowed format from Zod.

### Overall

- Zod offers a simple, declarative syntax for defining complex validation rules for objects and values in JavaScript.
- Zod offers more concise and scalable code, especially for handling form submissions and validations.


---

# Forms validation 

This repository contains a forms validation library aimed at ensuring user inputs meet specific criteria. Below you'll find instructions on how to contribute, test new libraries, and understand the fields to be validated.

### Library Documentation
To start, please refer to the library documentation: [ADD-DOCUMENTATION-HERE]


## Branches

### Creating New Branches for Testing

When testing a new form validation library, follow these steps:

- Checkout from the main branch.
- Name your new branch after the library to be tested.

Example: For testing Zod, checkout from main and create a branch named zod.

### Adding New Fields

If there's a new field that needs to be tested, add it to the main branch.


## Fields

The main branch includes the following fields for validation:

- **Name**: Required. Must have at least 3 characters.
- **Email**: Required. Must include an '@' symbol.
- **Age**: Required. Must be 18 or older.
- **Phone Number**: Required. Must contain 10 digits.
- **Gender**: Required. One radio button must be selected.
- **Type of Meeting**: Required. Must select one option.
- **Date**: Required. Must provide a date.
- **Time**: Required. Must provide a time.

Please do not put the *required* prop on the fields. This is to show the error when pressing the Submit button.

### Screenshots

![alt text](/public/image.png)

Fields will display errors when their values are `undefined`. Please make the necessary changes to accommodate validation requirements for each field.

![alt text](/public/image-1.png)