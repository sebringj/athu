# athu
authentication microservice

athu only cares about identifying a user and sending a JWT back to the consuming website, focusing on simple configuration over programming so that adding a new provider is just a matter of
installing a passport compatible npm package then adding it to the config directory.

See the config directory for a list of the expected configuration values.

## Tech stack
Node v4.1.1

## Passport Providers pre-installed

* Google
* Facebook
* Twitter
* GitHub
* Reddit
* Dropbox
* Instragram
* LinkedIn
