import React, { useState, useEffect } from "react";

export default function Memos({ state }) {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const getMemos = async () => {
      try {
        const memos = await contract.getMemos();
        console.log("Memos", memos[0].timestamp);
        setMemos(memos);
      } catch (error) {
        console.log(error);
      }
    };
    contract && getMemos();
  }, [contract]);

  return (
    <>
      <p style={{ textAlign: "center", marginTop: "20px" }}>Messages</p>
      {memos.map((memo, index) => {
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={index}
          >
            <table
              style={{
                marginBottom: "10px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",
                    }}
                  >
                    {memo.name}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                    }}
                  >
                    {new Date(String(memo.timestamp) * 1000).toLocaleString()}
                    {/* {String(memo.timestamp)} */}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo.message}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                    }}
                  >
                    {memo.from}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
