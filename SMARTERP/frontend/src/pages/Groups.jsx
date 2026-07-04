import { useEffect, useState } from "react";
import axios from "axios";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    group_name: "",
    group_type: "Assets",
    parent_group: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/groups");
      setGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/groups/${editingId}`,
          form
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/groups",
          form
        );
      }

      setForm({
        group_name: "",
        group_type: "Assets",
        parent_group: "",
        description: "",
      });

      setEditingId(null);

      fetchGroups();
    } catch (err) {
      console.log(err);
    }
  };

  const editGroup = (group) => {
    setEditingId(group.id);

    setForm({
      group_name: group.group_name,
      group_type: group.group_type,
      parent_group: "",
      description: group.description || "",
    });
  };

  const deleteGroup = async (id) => {
    if (!window.confirm("Delete this group?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/groups/${id}`);
      fetchGroups();
    } catch (err) {
      console.log(err);
    }
  };

  const searchGroup = async (keyword) => {
    if (keyword === "") {
      fetchGroups();
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/groups/search/${keyword}`
    );

    setGroups(res.data);
  };

  return (
    <div className="page-container">

      <div className="page-title">
        <h2>Group Management</h2>
        <p>Create and Manage Accounting Groups</p>
      </div>

      <div className="form-card">

        <h3>{editingId ? "Update Group" : "Create Group"}</h3>

        <form
          className="erp-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="group_name"
            placeholder="Group Name"
            value={form.group_name}
            onChange={handleChange}
            required
          />

          <select
            name="group_type"
            value={form.group_type}
            onChange={handleChange}
          >
            <option>Assets</option>
            <option>Liabilities</option>
            <option>Income</option>
            <option>Expenses</option>
          </select>

          <select
            name="parent_group"
            value={form.parent_group}
            onChange={handleChange}
          >
            <option value="">No Parent Group</option>

            {groups.map((g) => (
              <option
                key={g.id}
                value={g.id}
              >
                {g.group_name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <button className="btn btn-primary">
            {editingId ? "Update Group" : "Save Group"}
          </button>

        </form>

      </div>

      <div className="table-card">

        <div className="table-header">

          <h3>Group List</h3>

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchGroup(e.target.value);
            }}
          />

        </div>

        <table className="erp-table">

          <thead>

            <tr>

              <th>Group Name</th>

              <th>Type</th>

              <th>Parent Group</th>

              <th>Description</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {groups.map((group) => (

              <tr key={group.id}>

                <td>{group.group_name}</td>

                <td>{group.group_type}</td>

                <td>{group.parent_group || "--"}</td>

                <td>{group.description || "--"}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => editGroup(group)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteGroup(group.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Groups;