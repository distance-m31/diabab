#0 building with "default" instance using docker driver

#1 [server internal] load build definition from Dockerfile.prod
#1 transferring dockerfile: 1.34kB done
#1 DONE 0.0s

#2 [server auth] library/node:pull token for registry-1.docker.io
#2 DONE 0.0s

#3 [server internal] load metadata for docker.io/library/node:21
#3 DONE 5.7s

#4 [server internal] load .dockerignore
#4 transferring context: 2B done
#4 DONE 0.0s

#5 [server build-stage 1/9] FROM docker.io/library/node:21@sha256:fa5e7e628c8fe0ebfd13239b0103de36df36903fc7fee18da9755d022b2b910f
#5 DONE 0.0s

#6 [server internal] load build context
#6 transferring context: 1.74MB 0.3s done
#6 DONE 0.3s

#7 [server build-stage 2/9] WORKDIR /usr/src/app
#7 CACHED

#8 [server build-stage 3/9] COPY . .
#8 DONE 1.0s

#9 [server build-stage 4/9] WORKDIR /usr/src/app/client
#9 DONE 0.1s

#10 [server build-stage 5/9] RUN npm ci
#10 CANCELED
