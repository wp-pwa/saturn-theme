# Worona Package Development

You can use this repository to start developing a Worona package.

## Installation

[**Install Node**](https://nodejs.org/en/) if you haven't installed it yet. We recommend v4.

----

**Update NPM** if you haven't updated it yet. You need at least version 3.

```
npm -g install npm@3
```

Use `sudo` if needed.

----

Fork this repo on [GitHub](https://github.com/worona/package-development-worona) or [download the zip file](https://github.com/worona/package-development-worona/archive/master.zip).

Then add this repository as upstream so you can keep up with the changes.

```bash
git init
git remote add upstream https://github.com/worona/package-development-worona.git
```

----

Run `npm install` to install dependencies. It may take quite a while so you can go play some ping pong 🏓

```bash
npm install
```

## Development

Run the client.

```bash
npm start
```

The first time, it will ask you for your details like package name, description, github repository and so on. Then it will ask you for the service you want to run.

---

## Publish

Once you have finished, publish the package to npm:

```bash
npm publish
```
