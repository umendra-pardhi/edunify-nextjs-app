import { NextResponse } from "next/server";
import { createConnection } from '../../db/connection';

export async function POST(req) {
  try {
    const data = await req.formData();

    console.log(data);

    const name = data.get('name');
    const address = data.get('address');
    const city = data.get('city');
    const state = data.get('state');
    const contact = data.get('contact');
    const email_id = data.get('email_id');

    const imageUrl = data.get('image_url');

    if (!imageUrl) {
      return NextResponse.json({ message: "No image URL found", success: false });
    }

    const formData = {
      name,
      address,
      city,
      state,
      contact,
      email_id,
      imageUrl
    };

    const db = await createConnection();

    const sql = `
      INSERT INTO schools (name, address, city, state, contact, email_id, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      formData.name,
      formData.address,
      formData.city,
      formData.state,
      formData.contact,
      formData.email_id,
      formData.imageUrl
    ];

    await db.query(sql, values);

    return NextResponse.json({
      message: "Data saved successfully",
      success: true,
      data: formData
    });

  } catch (error) {
    console.error("Error handling form data and saving to database", error);
    return NextResponse.json({ message: "Data insertion failed", success: false });
  }
}


export async function GET(req) {
  try {
    const db = await createConnection();

    const sql = 'SELECT * FROM schools';
    const [schools] = await db.query(sql);

    return NextResponse.json(schools, { status: 200 });
  } catch (error) {
    console.error('Error fetching schools:', error);

    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}
