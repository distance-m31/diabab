# A simple web application for calculating insuline dosages, for demo only, not for treatment decisions of any kind!

This simple web app calculates insuline dosages based on current measured blood glucose level (mmol/l), carbohydrate intake (grams), personal insuline sensitivity factor and carbohydate factor (insuline to carb ratio). It stores previously used values to a PostgresSQL database. The app is currently meant to either run in development mode locally or from [render.com](https://diabapp-v1-0.onrender.com/). Note that the render.com version runs in the smalles possible instance and the spin up after inactivity can take up to a minute!

Currently there exists a CI/CD pipeline implemented with GitHub Actions workflow from GitHub to render.com.
It uses a docker container, which is build by the pipeline and pushed to [GitHub registry](https://ghcr.io).
The container is fetched by the render.com when a new container becomes available. The folowing environment variables need to be configured for the GitHub secrets for the pipeline to work:

- PROD_DATABASE_URL, this refers to the database running in the container, for example "postgresql://postgres:postgrespassword@db:5432/diabapp?schema=public"
- SECRET, this is the web token secret, for example "dfsalkhgdsf_23p0"
- PORT, this is the server listening port, for example: 8080
- VITE_API_URL, this is the url the client tries to connect to and needs to be available also in the client .env file, it needs the /api part, for example "https://myserver.com/api"

The Render.com deployment also needs RENDER_API_KEY and RENDER_DEPLOY_HOOK variables to be defined.

The frontend (see figure 1) has been coded with Typescript, Tailwind CSS, React, while using some additional packages for form handling, such as React Hook Form and Yup. State management is impelemted with the help of Zustand. The backend has been coded with Typescript and Node.js. Prisma ORM is used to connect to the PostgreSQL database. The app uses basic password authentication.

<br>

<figure>
  <img src="images/diabapp.png" width="70%">
  <figcaption>Figure 1. DiabApp UI</figcaption>
</figure>

<br>

# Current limitations

- The data display history scrolling needs enchancements.
- Data display enhancements for smaller display are needed.
- Updating tests pending.
