import React, { useState, useEffect } from "react";

const OfflineFormApp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [offlineData, setOfflineData] = useState([]);

  useEffect(() => {
    window.addEventListener("online", submitOfflineData);
    const storedOfflineData =
      JSON.parse(localStorage.getItem("offlineData")) || [];
    setOfflineData(storedOfflineData);

    return () => {
      window.removeEventListener("online", submitOfflineData);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (navigator.onLine) {
      submitData({ name, email });
    } else {
      const updatedOfflineData = [...offlineData, { name, email }];
      localStorage.setItem("offlineData", JSON.stringify(updatedOfflineData));
      setOfflineData(updatedOfflineData);
      setName("");
      setEmail("");
    }
  };

  const submitData = (data) => {
    // Simulate data submission logic here
    console.log("Submitting data:", data);
  };

  const submitOfflineData = () => {
    if (offlineData.length > 0) {
      offlineData.forEach((data) => {
        submitData(data);
      });

      localStorage.removeItem("offlineData");
      setOfflineData([]);
    }
  };

  return (
    <div>
      <h1>Offline Form App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {offlineData.length > 0 && (
        <div>
          <h2>Offline Data Queue</h2>
          <ul>
            {offlineData.map((data, index) => (
              <li key={index}>
                {data.name} - {data.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OfflineFormApp;
