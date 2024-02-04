import React, { useState, useEffect } from "react";
import Skeletion from "./skeletion";
import CardList from "./CardList";

const OfflineFormApp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productList, SetProductList] = useState([]);
  const [offlineData, setOfflineData] = useState([]);

  useEffect(() => {
    window.addEventListener("online", submitOfflineData);
    const storedOfflineData =
      JSON.parse(localStorage.getItem("offlineData")) || [];
    setOfflineData(storedOfflineData);
    const productOfflineData =
      JSON.parse(localStorage.getItem("offlineProductData")) || [];
    SetProductList(productOfflineData);

    return () => {
      window.removeEventListener("online", submitOfflineData);
    };
  }, []);

  useEffect(() => {
    if (navigator.onLine) {
      return submitData(offlineData);
    }
  }, [offlineData]);

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
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        setIsLoading(false);

        return res.json();
      })
      .then((json) => {
        localStorage.setItem("offlineProductData", JSON.stringify(json));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
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
    <div className="flex flex-col justify-center items-center h-full w-full gap-12 p-24">
      <h1 className="text-[50px] font-bold uppercase">PWA App</h1>
      {isLoading ? (
        <Skeletion />
      ) : (
        <form
          className="flex justify-center items-center flex-col gap-8 w-[400px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 w-full">
            <label>Name:</label>
            <input
              className="rounded-[5px] h-[30px] px-2 py-4"
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Email:</label>
            <input
              className="rounded-[5px] h-[30px] px-2 py-4"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="border border-black bg-blue-950 w-[100px] text-white rounded-[5px] h-[40px]"
            type="submit"
          >
            {isLoading ? (
              <svg
                class="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      )}
      {!navigator.onLine && offlineData.length > 0 && (
        <div className="flex flex-col justify-center items-center w-full">
          <h2>Offline Data Queue</h2>
          <ul>
            {offlineData.map((data, index) => (
              <li key={index}>
                {data.name} - {data.email}
              </li>
            ))}
          </ul>
          <CardList products={productList} />
        </div>
      )}
    </div>
  );
};

export default OfflineFormApp;
