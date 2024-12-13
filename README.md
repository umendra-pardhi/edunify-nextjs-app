# Edunify Next.js APP Reno Assignment

Live URL: https://edunify-nextjs.netlify.app/


It allows users to:
- Add school details, including an image URL stored in Supabase.
- Retrieve a list of all schools stored in the MySQL database.

---

## Database Setup

### MySQL Table Schema
Run the following query to create the `schools` table in your MySQL database:
```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  email_id TEXT NOT NULL,
  image TEXT NOT NULL
);

```

## Environment Variables

Set up the following environment variables in your .env file:
```env
DATABASE_HOST=your_database_host
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=your_database_name

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace with your actual configuration details.

## Project Setup

### Prerequisites
- Node.js installed.
- MySQL database setup.
- Supabase account created.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/umendra-pardhi/edunify-nextjs-app.git
   cd edunify-nextjs-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file and add the variables listed above.
4. Start the development server:
   ```bash
   npm run dev
   ```

---
