# Consent Location Sharing

A privacy-first web application for location sharing with explicit user consent. Users must approve location access before any GPS information is captured or shared.

## Overview

This project includes:

- user registration and login
- consent-based geolocation capture
- trusted contact management
- dashboard for monitoring location history
- stop-sharing controls
- session-based authentication

## Why this project exists

This application is designed for lawful, consent-based location sharing only. It does not collect location silently and does not track a user without clear permission.

## Features

- Secure account creation and login
- Location sharing only after explicit approval
- Trusted contact list with name, phone, and email fields
- Dashboard with summary statistics
- Location history display
- Manual stop-sharing option
- Simple local storage backend for demonstration use

## Tech stack

- Node.js
- Express
- Express Session
- bcryptjs
- HTML, CSS, and JavaScript

## Project structure

```text
consent-location-sharing/
├── public/
│   ├── app.js
│   ├── dashboard.html
│   ├── index.html
│   ├── styles.css
├── data/
│   └── store.json
├── .gitignore
├── package.json
├── README.md
├── server.js
└──
```

## Installation

1. Clone the repository.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

## Run the app

```bash
npm start
```

Then open this URL in your browser:

```text
http://localhost:3000
```

## Usage

1. Create an account or log in.
2. Go to the dashboard.
3. Add trusted contacts if needed.
4. Click the consent button to enable location sharing.
5. Approve the browser location permission when prompted.
6. Stop sharing at any time using the stop-sharing button.

## Important notice

This project is intended for lawful and transparent usage only. Users must consent before their location is collected, and the app should be used only with clear permission and compliance with local privacy laws.

## License

This project is distributed without a formal license declaration.
