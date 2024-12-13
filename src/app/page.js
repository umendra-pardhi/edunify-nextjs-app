'use client';

import ShowSchools from "@/components/ShowSchools";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <div className="p-3  bg-blue-500 text-white flex justify-between">
        <h1 className="text-2xl uppercase font-bold "><i className="fa-solid fa-graduation-cap"></i> Edunify</h1>
        <Link href={'/add-school'}>
          <button className="uppercase bg-white text-blue-600 text-sm p-2 rounded-lg hover:bg-blue-100 font-bold"><i className="fa-solid fa-plus me-1"></i> Add School</button>
        </Link>
      </div>

      <ShowSchools />

      <p className="my-3 font-mono text-center">Developed by Umendra Pardhi</p>
    </div>
  );
}
