# CertiVerify — Digital Certificate Verification

A professional full-stack web application for uploading, storing and verifying educational certificates using a unique certificate ID.

## Features
- Upload PDF/JPEG/PNG certificates (max 5 MB)
- Automatically generate unique certificate IDs
- Public certificate verification by ID
- Valid / Revoked status management
- Dashboard statistics
- Searchable certificate records
- Original certificate file preview
- MongoDB persistence with Express REST API
- Responsive React UI

## Folder Structure
```text
digital-certificate-verification/
├── backend/
│   ├── config/db.js
│   ├── controllers/certificateController.js
│   ├── models/Certificate.js
│   ├── routes/certificateRoutes.js
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/index.html
│   ├── src/components/Navbar.js
│   ├── src/pages/Dashboard.js
│   ├── src/pages/UploadCertificate.js
│   ├── src/pages/VerifyCertificate.js
│   ├── src/pages/Certificates.js
│   ├── src/config.js
│   ├── src/App.js
│   ├── src/index.css
│   ├── src/index.js
│   ├── .env.example
│   └── package.json
└── .gitignore
```

## Run Locally
### 1. Backend
```bash
cd backend
npm install
copy .env.example .env
```
Update `MONGO_URI` in `.env`, then:
```bash
npm run dev
```
Backend runs on `http://localhost:5000`.

### 2. Frontend
Open a second terminal:
```bash
cd frontend
npm install
copy .env.example .env
npm start
```
Frontend runs on `http://localhost:3000`.

## API Endpoints
- `GET /api/certificates` — list certificates
- `GET /api/certificates/stats` — dashboard statistics
- `GET /api/certificates/verify/:certificateId` — verify certificate
- `POST /api/certificates/upload` — upload certificate
- `PATCH /api/certificates/:certificateId/revoke` — revoke certificate

## Notes
Do not commit real `.env` files or uploaded certificates to GitHub. For production, replace local file storage with secure object storage and add authentication/authorization for administrator actions.
