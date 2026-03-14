# Firebase

In their
[documentation for monorepos](https://firebase.google.com/docs/functions/organize-functions?gen=2nd#managing_multiple_source_packages_monorepo),
Firebase recommends putting all configurations in the root of the monorepo. This
makes it possible to deploy all packages at once and easily start the emulators
shared between all packages.

## Demo Project

Throughout this repository, we use a Firebase demo project called `demo-mono-ts`.
A demo project allows you to run emulators for the different components, like
database without creating a Firebase project with resources. To make this work,
pass the `--project` flag when starting the emulator, and use a name that begins
with `demo-`.

When passing configuration to initializeApp, you can use any non-empty string for
the API keys, as you can see in
[apps/web/.env.development](https://github.com/0x80/typescript-monorepo/blob/main/apps/web/.env.development).

## Deploying

Firebase does not natively support monorepos where packages use shared code from
other packages. The Firebase deploy pipeline wants to upload a self-contained
package that can be treated similarly to an NPM package, so that it can run an
install and execute the main entry from the manifest.

To support shared packages, this repo uses
[firestore-tools-with-isolate](https://github.com/0x80/firebase-tools-with-isolate),
which is a firebase-tools fork I created to integrate
[isolate-package](https://github.com/0x80/isolate-package/). I wrote an
[article](https://thijs-koerselman.medium.com/deploy-to-firebase-without-the-hacks-e685de39025e)
explaining what it does and why it is needed.

This demo can be run using only the emulators, but if you would like to see the
deployment to Firebase is working; you can execute
`npx firebase deploy --project your-project-name` the root of the monorepo.

You might notice `@google-cloud/functions-framework` as a dependency in the
service package even though it is not being used in code imports. It is currently
required for Firebase to be able to deploy a PNPM workspace. Without it, you will
get an error asking you to install the dependency. I don't understand how the two
are related, but it works.

## Running Emulators

With the Firebase config in the root of the monorepo, you can configure and start
the emulators for all packages at once with `pnpm emulate`.

I have stored these in `.env` files in the respective service packages. Normally,
you would want to store them in a file that is not part of the repository, like
`.env.local`, but by placing them in `.env,` I prevent having to give
instructions for setting them up just for running the demo.

### Secrets

The api service uses a secret for DEMO_API_KEY. To make secrets work with the
emulator, you currently have to add the secret to `.secret.local` and also a
`.env` or `.env.local` file. See
[this issue](https://github.com/firebase/firebase-tools/issues/5520) for more
info. I have placed it in `.env,` which is part of the repo, so you don't have to
set anything up, but .env.local is the proper location, probably because that
file is not checked into git.
