function Validation(values, mode) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  // Signup-specific validation (only validate name if it's a signup)
  if (mode === 'signup') {
    if (values.name === "") {
      error.name = "Name should not be empty";
    } else {
      error.name = "";
    }
  }

  // Email validation for both login and signup
  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email format is incorrect";
  } else {
    error.email = "";
  }

  // Password validation for both login and signup
  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;
