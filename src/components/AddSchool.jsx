"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../app/supabase";
import { redirect } from 'next/navigation'

export default function Home() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();

    formData.set('name', data.name);
    formData.set('address', data.address);
    formData.set('city', data.city);
    formData.set('state', data.state);
    formData.set('contact', data.contact);
    formData.set('email_id', data.email_id);


    if (data.image[0]) {
      const file = data.image[0];
      const filePath = `images/${Date.now()}_${file.name}`;

      setIsUploading(true);
      setUploadingStatus("Uploading image...");

      try {

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file, {
            onUploadProgress: (progressEvent) => {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadingStatus(`Uploading... ${percent}%`);
            }
          });

        if (uploadError) throw uploadError;

        // const imageUrl = supabase.storage
        //   .from("images")
        //   .getPublicUrl(filePath).publicURL;
        const imageUrl = `https://mzyyrmmebvjssdfksgqi.supabase.co/storage/v1/object/public/images/${filePath}`;

        // console.log("Image uploaded successfully, Image URL:", imageUrl); 

        formData.set('image_url', imageUrl);
        setIsUploading(false);
        setUploadingStatus("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error.message);
        alert("Error uploading image");
        setIsUploading(false);
        return;
      }
    }


    if (!isUploading) {
      // console.log("Form data :", formData); 

      let result = await fetch("api/schools", {
        method: "POST",
        body: formData,
      });

      result = await result.json();
      console.log(result);

      if (result.success) {
        alert("File uploaded and data saved successfully");
        redirect('/');
      } else {
        alert("Error saving data.");
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600 uppercase"><i className="fa-solid fa-plus me-1"></i>Add School</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">School Name</label>
            <input
              type="text"
              {...register('name', { required: 'School Name is required' })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              {...register('address', { required: 'Address is required' })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              {...register('city', { required: 'City is required' })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              type="text"
              {...register('state', { required: 'State is required' })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Contact</label>
            <input
              type="text"
              {...register('contact', {
                required: 'Contact is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Contact must be a 10-digit number'
                }
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register('email_id', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address'
                }
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email_id && <p className="text-red-500 text-sm mt-1">{errors.email_id.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input
              type="file"
              {...register('image', { required: 'Image is required' })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          {isUploading && <p className="text-blue-500 text-sm mt-2">{uploadingStatus}</p>}

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add School
          </button>
        </form>
      </div>
    </main>
  );
}
