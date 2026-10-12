# UrbanFit Sports Center Management Platform (ea7737u202422549)

## Overview
Web application for UrbanFit Sports Centers to manage reservations, check the current weather of each sports center and follow the occupancy of its facilities.

## Authorship
- Author: Jorge Mateo León Naupari
- Student code: u202422549
- Repository: https://github.com/mateool10/ea7737u202422549

## Features
- Toolbar with the UrbanFit logo, the application title and EN / ES language buttons.
- Sidenav with Home and New Reservation options.
- Home view with the My Sports Centers section, showing the reservations, Total Participants and Available Capacity of each center.
- New Reservation form with activity type, participant name and participants, using the current temperature from Open-Meteo.
- Capacity validation before creating a reservation.
- Page not found view for unsupported routes.
- English and Spanish translations.

## Stack
- Angular 22.2.2
- Angular Material
- TypeScript
- Angular Signals
- NGX-Translate
- json-server 0.17.4
- Open-Meteo Weather API

## Configuration
1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the fake API:
   ```bash
   cd server
   json-server --watch db.json
   ```
3. In another terminal, start the application:
   ```bash
   ng serve
   ```
4. Open `http://localhost:4200/home`.

The API URLs are configured in `src/environments/environment.development.ts` and `src/environments/environment.ts`.
