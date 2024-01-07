# Interactive mode for nps

## Differences From Original Package

-   If you use an `.npmrs` or `.npmrs.json` file, it will load the `nps` config from there.
-   You can now use scripts that require user input.
-   Adding `hiddenFromInteractive: true` hides a script from the menu
-   Adding `pageSize: <number>` sets the number of options shown without scrolling
-   Grouped scripts are divided by a separator
-   Scripts without description don't show 'undefined' anymore
-   In ESM workspaces you can rename package-scripts file to `package-scripts.cjs` (see below).

## Install

```
npm install -D @das.laboratory/nps-i
```

or install it globally

```
npm install -g @das.laboratory/nps-i
```

## ESM projects

If your workspace is set up as `module` (i.e. the nearest parent package.json contains "type": "module"), node will give you an ERR_REQUIRE_ESM error. This means that it refuses to require your `package-scripts.js` file because it assumes that all .js files are ESM modules.

In this case simply rename `package-scripts.js` to `package-scripts.cjs` (note the .cjs file extension). This will tell node that the file is to be treated as a CommonJS module.

## Simple example

**package-scripts.js:**  
See [examples/simple/package-scripts.js](examples/simple/package-scripts.js).

```
? How can I help you today?

 (Use arrow keys or type to search)
❯ server.start        Start the server
  server.restart      Restart the server
  server.stop         Stop the server
  ──────────────
  db.commit           Diffs the local database with current migrations
(Move up and down to reveal more choices)
```

## Fancy example

**package-scripts.js:**  
See [examples/fancy/package-scripts.js](examples/fancy/package-scripts.js).

**Output:**

```
 **************************
 ** SERVER SCRIPTS 3000™ **
 **************************

 Choose wisely...

 (Use arrow keys or type to search)
❯ server.start                  Start the server and insert dummy files into the buckets
  server.restart                Restart the server and insert dummy files into the buckets
  server.stop                   Stop the server
  ──────────────
  backup-db.full.local          Full backup of the local database
  backup-db.full.server1        Full backup of the database on server 1
  backup-db.full.server2        Full backup of the database on server 2
  backup-db.full.all            Full backup of all databases
  ──────────────
  backup-db.schema.local        Schema backup of the local database
  backup-db.schema.server1      Schema backup of the database on server 1
  backup-db.schema.server2      Schema backup of the database on server 2
  backup-db.schema.all          Schema backup of all databases
  ──────────────
  backup-db.data.local          Data backup of the local database
  backup-db.data.server1        Data backup of the database on server 1
  backup-db.data.server2        Data backup of the database on server 2
  backup-db.data.all            Data backup of all databases
  ──────────────
  backup-db.split.local         Separate schema & data backup of the local database
(Move up and down to reveal more choices)
```

## Original Authors

See the following for more:

-   [https://github.com/siddharthkp/nps-i](https://github.com/siddharthkp/nps-i)
-   [https://www.npmjs.com/package/nps-i](https://www.npmjs.com/package/nps-i)
-   [https://github.com/sezna/nps](https://github.com/sezna/nps)
-   [https://www.npmjs.com/package/nps](https://www.npmjs.com/package/nps)

Also includes updates / inspiration from:

-   [https://github.com/nstudio/nps-i](https://github.com/nstudio/nps-i)
-   [https://github.com/nickroberts/nps-i](https://github.com/nickroberts/nps-i)
-   [https://github.com/siddharthkp/nps-i/pull/2](https://github.com/siddharthkp/nps-i/pull/2)

## Original README

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)

<p align="center">
  <img src="https://78.media.tumblr.com/240d51485c042ab5bed754294ad020c6/tumblr_msz10zJc751svwlszo2_500.gif" height="200px"/>
  <br><br>
  <b>Interactive mode for <a target="_blank" href="https://github.com/kentcdodds/nps">nps</a></b>
  <br><br>
  Demo:
  <br><br>
  <a target="_blank" href="https://twitter.com/siddharthkp/status/1007325679543816192"><img src="https://user-images.githubusercontent.com/1863771/41420782-e0549988-7012-11e8-93c5-6f87019d08ef.png" height="300px"/></a>
</p>

&nbsp;

#### install

```
npm install nps-i
```

or install it globally

```
npm install -g nps-i
```

&nbsp;

#### usage

Replace `nps` with `nps-i` in your package.json

```json
{
	"scripts": {
		"start": "nps-i"
	}
}
```

You can also use it with the shorthand `ni` when installed globally.

&nbsp;

#### like it?

:star: this repo

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
