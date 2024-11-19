export const filter = (data, searchQuery) => {
  const dataCopy = [...data];
  return (
    dataCopy.filter(
      (info) =>
        info.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        info.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        info.role.toLowerCase().includes(searchQuery.toLowerCase())
    ) || dataCopy
  );
};
