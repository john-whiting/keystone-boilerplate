# Keystone Boilerplate

## Table of Contents

- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)

## Overview

This repository acts as the structural boilerplate for my keystone projects.

## Getting Started

Note that yarn and a container engine are required for this project.

**If you are using Windows as your main environment, WSL is *strongly* recommended as using the devcontainer is very inconsistent on just Windows.**
**This means to use the `code .` command in WSL. You can read more [here](https://code.visualstudio.com/docs/remote/wsl).**

For a container engine, one of the following is recommended:
- [Rancher Desktop](https://rancherdesktop.io/) (Recommended)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Validated)
- [Podman](https://podman.io/) (Untested)

Here are the steps to use to the boilerplate:

1. Clone the repository
2. Open the repository in VSCode
3. Copy the `.env.example` file to `.env`
3. Run `Dev Containers: Reopen in Container` in the command pallet in VSCode (`CTRL+SHIFT+P` by default)
4. Using the terminal inside of VSCode, run `yarn dev`

Open [http://localhost:8080](http://localhost:8080) with your browser to see the CMS.

## Technology Stack

The following are the notable libraries used in the boilerplate:

- [TypeScript](https://www.typescriptlang.org/)
- [KeystoneJS](https://keystonejs.com/)
  - [Prisma](https://www.prisma.io/) is used by KeystoneJS and is the database engine