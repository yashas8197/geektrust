export const useCurd = (setData, setEditId, data) => {
  let recordsCopy = [...data];
  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleDelete = (id) => {
    const filterPerson = recordsCopy.filter((person) => person.id !== id);
    setData(filterPerson);
  };

  const handleSave = () => {
    setEditId(null);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;

    const editData = recordsCopy.map((person) =>
      person.id === id ? { ...person, [name]: value } : person
    );
    setData(editData);
  };

  return { handleEdit, handleDelete, handleSave, handleChange };
};
