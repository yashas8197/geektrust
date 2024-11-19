import { useEffect, useState } from "react";
import "./App.css";
import MembersList from "./components/MembersList";
import PaginationComponent from "./components/PaginationComponent";
import { filter } from "./utils/filter";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [recordsCopy, setRecordsCopy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const fetchData = async () => {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );

    const data = await response.json();

    setData(data);
    setRecordsCopy(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    let { value } = e.target;

    setSearchQuery(value);
  };

  const filteredData = filter(data, searchQuery);

  const indexOfLastRecord = currentPage * dataPerPage;
  const indexOfFirstRecord = indexOfLastRecord - dataPerPage;
  const currentRecord = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectRecords = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedRows((prev) => [...prev, value]);
    } else {
      setSelectedRows((prev) => prev.filter((row) => row !== value));
    }
  };

  const deleteSelected = () => {
    const updatedData = recordsCopy.filter(
      (record) => !selectedRows.includes(record.id)
    );
    setData(updatedData);
    setSelectedRows([]);
  };

  const selectAllRows = (e) => {
    if (e.target.checked) {
      const selectAll = recordsCopy.map((record) => record.id);
      setSelectedRows(selectAll);
    } else {
      const deselectAll = recordsCopy.map((record) => record.id);
      setSelectedRows((prev) => prev.filter((id) => !deselectAll.includes(id)));
    }
  };

  console.log(data);

  return (
    <div className="container">
      <input
        className="SearchBar"
        name="search"
        placeholder="Search by name, email or role"
        onChange={handleSearch}
      />

      <section>
        <div className="table-container">
          <div className="table-header">
            <div className="table-cell">
              <input onChange={selectAllRows} type="checkbox" />
            </div>
            <div className="table-cell">Name</div>
            <div className="table-cell">Email</div>
            <div className="table-cell">Role</div>
            <div className="table-cell">Actions</div>
          </div>
          <MembersList
            data={currentRecord}
            setData={setData}
            recordsCopy={recordsCopy}
            handleSelectRecords={handleSelectRecords}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </div>
        <button
          disabled={selectedRows.length <= 0}
          onClick={deleteSelected}
          className="deleteSelectedBtn"
        >
          Delete Selected
        </button>
        <PaginationComponent
          recordsPerPage={dataPerPage}
          totalRecords={filteredData.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </section>
    </div>
  );
}

export default App;
