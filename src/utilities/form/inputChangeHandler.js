export const inputChangeHandler = ({
  e: {
    target: { name, value },
  },
  formData,
}) => ({ ...formData, [name]: value });
