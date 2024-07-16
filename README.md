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