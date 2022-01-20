export const convertObjectToFormData = ({ modelName, data }) => {
  const fd = new FormData();
  Object.entries(data).forEach(([k, v]) => fd.append(k, v));
  return fd;
};
