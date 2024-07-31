import React from "react";
import { ethers } from "ethers";

export default function Buy({ state }) {
  const buyChai = async (e) => {
    e.preventDefault();
    try {
      const { contract } = state;
      const name = document.getElementById("name").value;
      const message = document.getElementById("message").value;
      console.log(name, message, contract);
      const amount = { value: ethers.parseEther("0.001") };
      const tx = await contract.buyChai(name, message, amount);
      await tx.wait();
      console.log("Transaction is done");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyChai}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
}
