import React, { useState } from "react";

const AmountRequest = () => {
  const [requestedAmount, setRequestedAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (parseFloat(requestedAmount) >= 100) {
      try {
        const response = await fetch("https://example.com/api/endpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestedAmount }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Handle the response here if needed
        console.log("Data sent successfully");
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        // Handle errors here
      }
    } else {
      setErrorMessage("Minimum amount should be $100");
    }
  };
  return (
    <div className="bg-white p-5 m-5">
     
      <div className="grid grid-cols-6 mt-5">
        <div className="text-center border">
          <h5 className="bg-[#E8F9E0] py-2">Earning Amount</h5>
          <p className="py-2">$0.46</p>
        </div>
        <div className="text-center border">
          <h5 className="bg-[#E8F9E0] py-2">Commission Amount</h5>
          <p className="py-2">$0.46</p>
        </div>
        <div className="text-center border">
          <h5 className="bg-[#E8F9E0] py-2">Child Earning Amount</h5>
          <p className="py-2">$0.46</p>
        </div>
        <div className="text-center border">
          <h5 className="bg-[#E8F9E0] py-2">Approved Amount</h5>
          <p className="py-2">$0.46</p>
        </div>
        <div className="text-center border">
          <h5 className="bg-[#E8F9E0] py-2">Requested Amount</h5>
          <p className="py-2">$0.46</p>
        </div>
        <div className="text-center border">
          <h5 className="bg-[#E8F9E0] py-2">Available Amount</h5>
          <p className="py-2">$0.46</p>
        </div>
      </div>
      <div className="mt-5">
        <h5 className="mb-2">Request Amount *</h5>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={requestedAmount}
              onChange={(e) => setRequestedAmount(e.target.value)}
              placeholder="Requested Amount"
              className="input input-bordered w-full max-w-xs"
            />
            <button type="submit" className="resust-submit-btn">
              Submit
            </button>
          </form>
          <p className="minimum-balance">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default AmountRequest;
