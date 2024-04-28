## Friend-Connections
This is the backend of the friend connections application

### Technologies
- TypeScript
- Node.js
- Express
- pnpm

### Running the App
- Clone the repo
- Copy the `.env.example` file and provide any environment variables required
- Run `pnpm dev` to start the development server

### Database
- If you're running a local database, run `npx prisma migrate dev` to run migrations
- Run `npx prisma generate`
- Run `pnpm seed` to add users to your database
- Alternatively, you can stick to the deployed database with url in the `.env.example` file

### Postman Collection
Basic API documentation has been done via Postman. View the collection below:
[Friends-Connect-APIs](https://templehs.postman.co/workspace/TempleHS~f6d83fb7-d1df-414e-a02c-53fcd444fa05/collection/5824922-fbdcb0a9-7b00-458c-9d9d-28b6b2595d13?action=share&creator=5824922)
