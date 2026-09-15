export const matchGlobalSearch = (item, term) => {
  const query = String(term ?? "").trim().toLowerCase();
  if (query === "") return true;

  return Object.values(item).some((value) => {
    if (value === null || value === undefined) return false;
    return String(value).toLowerCase().includes(query);
  });
};