export function checkValue(value) {
  const stringValue = String(value);

  if (stringValue.trim() === '') {
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

export function validatePhoneNumber(phoneNumber) {
  // Check if phoneNumber is empty
  if (!phoneNumber)
    return false

  const digits = phoneNumber.replace(/\D/g, '');
    
  if (digits.length !== 10)
    return true
  else
    return false;
}

export function validateForm(formData) {
  const hasUndefined = Object.values(formData).some(value => value === undefined);

    // Set isAlertTriggered state based on the presence of undefined values
    if (hasUndefined || validatePhoneNumber(formData.phone) || checkValue(formData.age)) {
      return 'error'
    } else {
      return 'success'
    }

}