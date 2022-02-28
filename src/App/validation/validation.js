const validation = {
  firstName: {
    required: "First name is requied",
    max: "Max length is 100 characters",
    placeholder: "Input first name",
  },
  lastName: {
    required: "Last name is requied",
    max: "Max length is 100 characters",
    placeholder: "Input last name",
  },
  email: {
    required: "Email is requied",
    placeholder: "Input email",
    invalid: "Invalid email address",
  },
  password: {
    required: "Password is requied",
    placeholder: "Input password",
    max: "Max length is 16 characters",
    min: "Min length is 8 characters",
  },
  confirmPassword: {
    required: "Confirm password is requied",
    placeholder: "Input confirm password",
    match: "Passwords does not match"
  }
};

export default validation;
