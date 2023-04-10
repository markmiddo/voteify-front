const isFile = file => file instanceof File || file instanceof Blob;
const getFileName = file => file.name || 'image.jpg';

export function serializeToFormData(data) {
  const form = new FormData();
  const keys = [...data.keys()];
  keys.forEach((key) => {
    const item = data.get(key);
    if (isFile(item)) {
      return form.append(`resource[${key}]`, item, getFileName(item));
    }
    return form.append(`resource[${key}]`, item);
  });
  return { data: form };
}
