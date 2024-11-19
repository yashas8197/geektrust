import { useState } from "react";
import { useCurd } from "../utils/useCurd";

const MembersList = ({
  data,
  setData,
  recordsCopy,
  handleSelectRecords,
  selectedRows,
}) => {
  const [editId, setEditId] = useState(null);
  const { handleEdit, handleDelete, handleSave, handleChange } = useCurd(
    setData,
    setEditId,
    recordsCopy
  );

  return (
    <>
      {data?.map((person) => (
        <div key={person.id} className="table-row">
          <div className="table-cell">
            <input
              type="checkbox"
              value={person.id}
              checked={selectedRows.includes(person.id)}
              onChange={handleSelectRecords}
            />
          </div>
          <div className="table-cell">
            {editId === person.id ? (
              <input
                type="text"
                name="name"
                value={person.name}
                onChange={(e) => handleChange(e, person.id)}
              />
            ) : (
              person.name
            )}
          </div>
          <div className="table-cell">
            {editId === person.id ? (
              <input
                type="text"
                name="email"
                value={person.email}
                onChange={(e) => handleChange(e, person.id)}
              />
            ) : (
              person.email
            )}
          </div>
          <div className="table-cell">
            {editId === person.id ? (
              <input
                type="text"
                name="role"
                value={person.role}
                onChange={(e) => handleChange(e, person.id)}
              />
            ) : (
              person.role
            )}
          </div>
          <div className="table-cell">
            {editId === person.id ? (
              <>
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <button onClick={() => handleEdit(person.id)}>Edit</button>
            )}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default MembersList;
