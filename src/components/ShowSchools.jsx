'use client';
import React, { useEffect, useState } from 'react';

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {

        const response = await fetch("/api/schools");

        const data = await response.json();

        setSchools(data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 text-black ">

      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 uppercase"><i className="fa-solid fa-school-flag"></i> School List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 xl:px-14 lg:px-8  md:px-6 sm:px-4">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white  rounded shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={`${school.image}`}
              alt={school.name}
              className="w-full h-60 object-cover hover:scale-105"
            />
            <div className="p-4">
              <p className="bg-green-100 py-[1px] px-2 w-[fit-content] rounded-full text-sm text-green-500 uppercase"><i className="fa-solid fa-location-dot me-1"></i>{school.city}</p>
              <h2 className="text-lg font-bold mb-1 text-blue-600">{school.name}</h2>
              <p className="text-sm text-gray-500 ms-1 "><i className="fa-solid fa-map-location-dot me-1 text-yellow-400 "></i> {school.address}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchools;
