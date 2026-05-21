# What I Watched Today

> A Hollywood-themed movie log where every film you watch gets its own spotlight, poster, rating, and review.

## Lights. Camera. Log.

Welcome to **What I Watched Today**: a cinematic watch journal built with **Node.js, Express, EJS, PostgreSQL, and [OMDb](https://omdbapi.com/)**. It’s designed like a backstage pass to your personal film archive, where every entry gets a poster reveal and a spot on the marquee.

## What This App Does

- Add a new movie to your watch list
- Automatically fetch a poster from OMDb when available
- Store the date watched, rating, and your notes in PostgreSQL
- Edit existing entries
- Delete entries with password confirmation
- Display your watch history in a clean, date-grouped timeline

## Trailer

When the app opens, you land on your personal screening room:

- The home page shows your movie log
- The add form lets you enter a title, watch date, rating, notes, and admin password
- The edit screen pre-fills an existing entry for quick updates
- The delete confirmation screen adds one last security checkpoint before an entry disappears from the lineup

## Cast And Crew

- **Runtime:** Node.js + Express
- **Template engine:** EJS
- **Database:** PostgreSQL
- **Poster lookup:** OMDb API
- **Middleware:** body-parser, dotenv
- **HTTP client:** axios

## Scene Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Prepare Environment Variables

Create a `.env` file in the project root using the same keys as `.env.example`:

```env
OMDB_API_KEY=your_api_key_here
PASSWORD=your_secure_password_here
```

### 3. Create The Database

This app expects a PostgreSQL database named `Movies` and a `movies` table.

Example schema:

```sql
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    watch_date DATE NOT NULL,
    rating INTEGER NOT NULL,
    review TEXT,
    poster TEXT
);
```

### 4. Update Database Credentials If Needed

The database connection lives in [index.js](index.js). If your local PostgreSQL setup uses different credentials, update them there or refactor the connection to use environment variables.

### 5. Start The Show

```bash
node index.js
```

Then open:

```text
http://localhost:3000
```

## Script Notes

The current `package.json` includes only a placeholder test script.

- Start the app with `node index.js`
- Add your own `dev` or `start` script later if you want a smoother production flow

## Routes On The Bill

- `GET /` - Show the full watch log
- `GET /add` - Open the add movie form
- `POST /add` - Save a new movie entry
- `GET /edit/:id` - Open the edit form for one movie
- `POST /edit/:id` - Update an existing entry
- `GET /delete-confirm/:id` - Show the delete confirmation screen
- `POST /delete` - Remove a movie after password confirmation

## File Map

- [index.js](index.js) - Express app, database access, and route logic
- [views/index.ejs](views/index.ejs) - Main movie log page
- [views/add.ejs](views/add.ejs) - Add movie form
- [views/edit.ejs](views/edit.ejs) - Edit movie form
- [views/delete-confirm.ejs](views/delete-confirm.ejs) - Delete confirmation screen
- [public/static/main.css](public/static/main.css) - App styling

## Production Tips

- Keep your `.env` file private
- Replace hardcoded database credentials in [index.js](index.js) with environment variables before deployment
- Make sure PostgreSQL is running before you launch the app
- If OMDb returns no poster, the app falls back to a placeholder image

## Credits

- Built by **Mridul Jha**
- Movie poster data powered by [OMDb](https://omdbapi.com/)
- Crafted as a personal movie log inspired by classic premiere-night energy

## Final Frame

This project is basically your personal awards-night archive: every movie gets a record, a rating, and a little red-carpet treatment.

If you want, the next upgrade could be a sharper `npm start` script, a deployment section, or a more dramatic README badge layout.