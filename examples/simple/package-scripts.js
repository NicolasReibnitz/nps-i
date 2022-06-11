module.exports = {
	// Set a custom message for the prompt. Default is 'Which script would you like to run?\n\n'.
	message: 'How can I help you today?\n\n',
	// Set the page size for the autocomplete prompt. Default is 15.
	pageSize: 5,
	scripts: {
		server: {
			start: {
				description: 'Start the server',
				script: 'supabase start'
			},
			restart: {
				description: 'Restart the server',
				script: 'supabase stop && supabase start'
			},
			stop: {
				description: 'Stop the server',
				script: 'supabase stop'
			},
			reset: {
				// This option will not be visible in the interactive prompt (hiddenFromInteractive: true).
				description: 'Resets the local database',
				script: 'supabase db reset',
				hiddenFromInteractive: true
			}
		},
		db: {
			commit: {
				description: 'Diffs the local database with current migrations, writing it as a new migration',
				script: 'supabase db commit'
			},
			changes: {
				description: 'Diffs the local database with current migrations, then print the diff to standard output',
				script: 'supabase db changes'
			}
		}
	}
};
