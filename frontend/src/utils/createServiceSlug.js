export const createServiceSlug = (name) => {
  return name?.toLowerCase().replace(/\s+/g, "-");
};
