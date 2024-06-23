"use client"; // Add this line at the top

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      const initData = window.Telegram.WebApp.initDataUnsafe;
      if (initData && initData.user) {
        setUser(initData.user);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wasteType = e.target.wasteType.value;
    const quantity = e.target.quantity.value;
    const material = e.target.material.value;

    const data = {
      user_id: user.id,
      wasteType,
      quantity,
      material,
      timestamp: new Date().toISOString(),
    };

    await axios.post('/api/submit-waste', data);
    alert('Waste data submitted');
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Waste Management</h1>
        {user && (
            <div className="profile">
              <img src={user.photo_url} alt="User Photo" className="w-16 h-16 rounded-full" />
              <p>{user.first_name}</p>
            </div>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <label htmlFor="wasteType">Type of Waste:</label>
          <input type="text" id="wasteType" name="wasteType" required className="input" />

          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" required className="input" />

          <label htmlFor="material">Material:</label>
          <input type="text" id="material" name="material" required className="input" />

          <button type="submit" className="btn mt-2">Submit</button>
        </form>
      </div>
  );
}
