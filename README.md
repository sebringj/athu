# athu
authentication microservice

athu only cares about identifying a user and sending a JWT back to the consuming website, focusing on simple configuration over programming so that adding a new provider is just a matter of
installing a passport compatible npm package then adding it to the config directory.

See the config directory for a list of the expected configuration values.

The querystring "?referrer=SOMEWEBSITE" is used to redirect back to the consuming app in a config lookup, see EXAMPLE_ENV for env var settings.

1. The consuming website or app links to a configured provider such as https://athu.yourwebsite.com/auth/google?referrer=mywebsite
2. Auth saves your referrer in session then directs to the configured provider
3. When auth gets called back from the provider, it then redirects to your referrer lookup with a jwt var on the querystring.

It's probably a good idea to keep everything SSL.
Have a todo to tokenize the JWT with a reverse proxy.

## Setup

- npm install [passport compatible npm package]
- Go to config/default.js
- add in provider details according to the passport-compabile npm package
- view EXAMPLE_ENV to set your environment variables
- npm start
- consuming app needs to call http(s)://[athu host]/auth/[provider name]

When a provider is added to "/config/default.js", the provider name is used to make the routes.

For example, if you configured "google" and "facebook" as providers, your consuming app would link to either:
https://[athu host]/auth/google
or
https://[athu host]/auth/facebook

##

## Tech stack
Node v4.1.1

## Passport Providers pre-installed

* Google
