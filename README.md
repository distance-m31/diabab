# Web application for calculating insuling dosages, for demo only, not for treatment descision of any kind!

This simple web app calculates insuline dosages based on current measured blood glucose level (mmol/l), carbohydrate intake (grams), personal insuline sensitivity factor and carbohydate factor (insuline to carb ratio). It stores previously used values to a PostgresSQL database. The app is currently meant to either run in development mode locally or from a pair of Docker containers for the server and the Postgresql (see: https://cygnusx1.mywire.org). A docker compose file is used to set up the service with both containers. This way of running PostgreSQL is of course meant for a small scale demo app only and not for real production use.

The front end (see figure 1) has been coded with Typescript, Tailwind CSS, React, while using some additional packages for form handling, such as React Hook Form and Yup. State management is impelemted with the help of Zustand. The back end has been coded with Typescript and Node.js. Prisma ORM is used to connect to the PostgreSQL database. The app uses basic password authentication.

<br>

<figure>
  <img src="images/diabapp.png" width="70%">
  <figcaption>Figure 1. DiabApp UI</figcaption>
</figure>

<br>

# Current limitations

- The data display history scrolling has not been implemented yet.
- The initialization of the table structure of the database currenly requires one
  to run <code>npx prisma migrate deploy</code> from within the server container,
  the automation of this step is pending.
- More tests are required.
