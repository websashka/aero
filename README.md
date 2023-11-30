# Introduction

Test task for ERP.AERO

# Getting started

## Step 1: Configuration
```
# copy .env.example to .env
```

## Step 2.1: Scripts - pre-requisites


```sh
# set node version
$ nvm use
# installation of the dependencies
$ yarn install
# generate swagger documentation
$ yarn swagger:gen
```

## Step 2.2: Scripts - local development

```sh
# start server
$ yarn dev
```

## Step 2.2: Scripts - container based development

```shell
# start the server component as a docker container
$ docker-compose up
```
