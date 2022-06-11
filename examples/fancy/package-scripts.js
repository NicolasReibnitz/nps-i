const npsUtils = require('nps-utils');

// We use nps-utils to combine some of the scripts and run them either concurrently or in series.
// https://github.com/kentcdodds/nps-utils

// Here we overcomplicate things to build a fancy header.
const hr = '**************************';
const title = '** SERVER SCRIPTS 3000™ **';
const message = 'Choose wisely...';
const fancyHeader = `\n\n ${hr}\n ${title}\n ${hr}\n\n ${message}\n\n`;

module.exports = {
	// Set a custom message for the prompt. Default is 'Which script would you like to run?\n\n'. We'll use our fancy header instead.
	message: fancyHeader,
	// Set the page size for the autocomplete prompt. Default is 15.
	pageSize: 20,
	scripts: {
		server: {
			start: {
				description: 'Start the server and insert dummy files into the buckets',
				script: npsUtils.series.nps('server.startSimple', 'server.insertDummyFiles')
			},
			restart: {
				description: 'Restart the server and insert dummy files into the buckets',
				script: npsUtils.series.nps('server.stop', 'server.start')
			},
			stop: {
				description: 'Stop the server',
				script: 'supabase stop'
			},
			startSimple: {
				// This option will not be visible in the interactive prompt (hiddenFromInteractive: true).
				description: 'Simply start the server',
				script: 'supabase start',
				hiddenFromInteractive: true
			},
			insertDummyFiles: {
				// This option will also be hidden (hiddenFromInteractive: true).
				description: 'Insert dummy files into the buckets',
				script: 'node ./_scripts/upload-file-to-storage.js',
				hiddenFromInteractive: true
			}
		},
		'backup-db': {
			full: {
				local: {
					script: `pg_dump --clean --if-exists --quote-all-identifiers -h localhost -p 54322 -U postgres > ./_backups/local/dump-local-full.sql`,
					description: 'Full backup of the local database'
				},
				server1: {
					script: `pg_dump --clean --if-exists --quote-all-identifiers -h db.abc.supabase.co -U postgres > ./_backups/server1/dump-server1-full.sql`,
					description: 'Full backup of the database on server 1'
				},
				server2: {
					script: `pg_dump --clean --if-exists --quote-all-identifiers -h db.xyz.supabase.co -U postgres > ./_backups/server2/dump-server2-full.sql`,
					description: 'Full backup of the database on server 2'
				},
				all: {
					script: npsUtils.concurrent.nps('backup-db.db.local', 'backup-db.db.server1', 'backup-db.db.server2'),
					description: 'Full backup of all databases'
				}
			},
			schema: {
				local: {
					script: `pg_dump --clean --schema-only --if-exists --quote-all-identifiers -h localhost -p 54322 -U postgres > ./_backups/local/dump-local-schema.sql`,
					description: 'Schema backup of the local database'
				},
				server1: {
					script: `pg_dump --clean --schema-only --if-exists --quote-all-identifiers -h db.abc.supabase.co -U postgres > ./_backups/server1/dump-server1-schema.sql`,
					description: 'Schema backup of the database on server 1'
				},
				server2: {
					script: `pg_dump --clean --schema-only --if-exists --quote-all-identifiers -h db.xyz.supabase.co -U postgres > ./_backups/server2/dump-server2-schema.sql`,
					description: 'Schema backup of the database on server 2'
				},
				all: {
					script: npsUtils.concurrent.nps('backup-db.schema.local', 'backup-db.schema.server1', 'backup-db.schema.server2'),
					description: 'Schema backup of all databases'
				}
			},
			data: {
				local: {
					script: `pg_dump --data-only --quote-all-identifiers -h localhost -p 54322 -U postgres > ./_backups/local/dump-local-data.sql`,
					description: 'Data backup of the local database'
				},
				server1: {
					script: `pg_dump --data-only --quote-all-identifiers -h db.abc.supabase.co -U postgres > ./_backups/server1/dump-server1-data.sql`,
					description: 'Data backup of the database on server 1'
				},
				server2: {
					script: `pg_dump --data-only --quote-all-identifiers -h db.xyz.supabase.co -U postgres > ./_backups/server2/dump-server2-data.sql`,
					description: 'Data backup of the database on server 2'
				},
				all: {
					script: npsUtils.concurrent.nps('backup-db.data.local', 'backup-db.data.server1', 'backup-db.data.server2'),
					description: 'Data backup of all databases'
				}
			},
			split: {
				local: {
					script: npsUtils.series.nps('backup-db.schema.local', 'backup-db.data.local'),
					description: 'Separate schema & data backup of the local database'
				},
				server1: {
					script: npsUtils.series.nps('backup-db.schema.server1', 'backup-db.data.server1'),
					description: 'Separate schema & data backup of the database on server 1'
				},
				server2: {
					script: npsUtils.series.nps('backup-db.schema.server2', 'backup-db.data.server2'),
					description: 'Separate schema & data backup of the database on server 2'
				},
				all: {
					script: npsUtils.concurrent.nps('backup-db.split.local', 'backup-db.split.server1', 'backup-db.split.server2'),
					description: 'Separate schema & data backup of all databases'
				}
			}
		}
	}
};
