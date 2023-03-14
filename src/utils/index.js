export const sendEmail = async (staffEmail, staffName, type) => {
  try {
    const response = await fetch(
      `https://us-central1-orsrs-9de02.cloudfunctions.net/sendEmail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          staffEmail,
          staffName,
          type,
        }),
      }
    );

    // const resData = await response.json();
    // console.log("sE", resData);
  } catch (err) {
    console.log("sendEmailErr", err.message);
    throw err;
  }
};

export const checkValidity = (value, rules, id, passwordValue) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.min != null && +value < rules.min) {
    isValid = false;
  }
  if (rules.max != null && +value > rules.max) {
    isValid = false;
  }

  if (id === "confirmPassword" && value !== passwordValue) {
    isValid = false;
  }

  return isValid;
};
