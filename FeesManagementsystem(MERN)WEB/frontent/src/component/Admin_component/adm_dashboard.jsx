import React, { useEffect, useState } from "react";
import AdminNavbar from "./adm_nav";
import axios from "axios";

export default function Admindashboard() {
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [feelist, setFeelist] = useState([]);
  const [selectdata, setSelectdata] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token not available");
      return;
    }

    axios
      .get("http://localhost:4000/admin/getadmindata", {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        const admindata = res.data;
        setAdmin(admindata);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/feedetail/feelist/${selectdata}`);
      setFeelist(res.data);
    } catch (err) {
      console.log("Fetching error", err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div style={styles.container}>
        {admin.name ? (
          <>
            <h1 style={styles.heading}>Hi! {admin.name}</h1>
            <select style={styles.select} onChange={(e) => setSelectdata(e.target.value)}>
              <option value="">Select</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="Bcom">Bcom</option>
              <option value="Msc">Msc</option>
              <option value="Bsc">Bsc</option>
            </select>
            <button style={styles.button} onClick={() => fetchData()}>
              Fetch Data
            </button>

            {feelist.length > 0 ? (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Fee Type</th>
                    <th style={styles.tableHeader}>Fee Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {feelist.map((fee) => (
                    <tr key={fee._id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{fee.feetype}</td>
                      <td style={styles.tableCell}>{fee.feeamount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={styles.noDataMsg}>No fee details available for the selected course.</p>
            )}
          </>
        ) : (
          <p style={styles.noDataMsg}>Admin data not available</p>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",

  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  select: {
    marginBottom: "10px",
    padding: "8px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  table: {
    borderCollapse: "collapse",
    width: "80%",
    marginTop: "20px",
    marginLeft:"140px",

  },
  tableHeader: {
    background: "#4CAF50",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
  },
  noDataMsg: {
    marginTop: "20px",
    color: "#888",
  },
};
