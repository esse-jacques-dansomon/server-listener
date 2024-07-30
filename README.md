# Script to Listner to Server

## Table of Contents

- [Script to Listner to Server](#script-to-listner-to-server)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)

## Introduction

This script is a simple node.js script that listens to a server and sends emails to notify the administrator of the server.

## Installation

To install this script, you need to have node.js installed on your system.

You can install node.js from the official website: https://nodejs.org/en/

Once you have node.js installed, you can install the script by running the following command:



## Usage

clone the repository:

```
git clone https://github.com/esse-jacques-dansomon/server-listener.git

cd server-listener
```


copy the .env.example file to .env and fill in the required values.

```
cp .env.example .env
```

```env
SERVERS=http://jacques-dansomon.com,http://essejacques.co,http://backoffice-preprod.axone-sn.com/
CRON_SCHEDULE=*/5 * * * * # Toutes les 5 minutes
MAIL_TO=
MAIL_HOST=
MAIL_PORT=
MAILER_SECURE=
MAILER_TLS=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=
```

then run the script:

```
node app.js
```

## License

This project is licensed under the MIT License 