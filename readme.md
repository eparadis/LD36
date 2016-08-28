# Ludum Dare 36 Entry

NoTrueSpaceman (eparadis)

[Live Demo](https://eparadis.github.io/LD36/)

# Theme

Ancient Technology

# Brainstorming

- programming game with _ancient_ programming language
- the most _ancient_ technologies
 - fire
 - wheels
 - pottery
 - agriculture
- tech tree, like Civ
 - each tech tree item applies an upgrade when built (the first time?)
 - upgrades have canHandle() for different events and modify another object if they can
 - prereqs
  - other tree items
  - game events
  - game value thresholds

# Building

- `sudo apt-get install nodejs npm`
- `npm install -g typescript`
- `sudo npm install -g gulp`
- `npm install` (uses `packages.json` for config)
- `gulp` (uses `gulpfile.js` for config)
- `webpack`
 - troubles? you might try:
  - `npm install -g npm-upgrade`
  - `npm-upgrade` (to get some newer stuff)


# Deploying

- `gulp deploy`

