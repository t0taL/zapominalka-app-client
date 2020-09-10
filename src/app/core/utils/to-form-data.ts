export function toFormData<T>(formValue: T) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(formValue)) {
    if (key === 'imageFile' && value !== null) {
      formData.append(key, value, value.name);
    } else {
      formData.append(key, value);
    }
  }
  return formData;
}
