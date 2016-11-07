# Worona Package Development

Download or clone this repository to start developing a Worona package.

## Installation

[**Install Node**](https://nodejs.org/en/) if you haven't installed it yet. We recommend v4.

----

**Update NPM** if you haven't updated it yet. We recommend v3.

```
npm -g install npm@3
```

Use `sudo` if needed.

----

Clone this repo or [download the zip file from Github](https://github.com/worona/package-development-worona/archive/master.zip).

```bash
mkdir my-worona-package
git clone https://github.com/worona/package-development-worona.git my-worona-package
cd my-worona-package
```

----

Run `npm install` to install dependencies. It may take quite a while. Don't despair.

```bash
npm install
```

## Development

Run the dashboard client.

```bash
npm start
```

The first time, it will ask you for your details like package name, description, github repository and so on.

---

## Publish

Once you have finished, publish the package to npm:

```bash
npm publish
```
