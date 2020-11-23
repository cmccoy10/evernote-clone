# API Endpoints

* /api/auth (GET)
	* Checks if the user is authenticated and returns a object with the user else it returns 401
* /api/auth/login (POST)
	* Logs the user in and returns the user object else returns 401
* /api/auth/logout (GET)
	* Logs out the user
* /api/auth/signup (POST)
	* Creates a new user and returns user object or any errors
* /api/auth/unauthorized (GET)
	* Returns unauthorized error
* /api/notes (GET)
	* Returns all of the user's notes(includes notebook and tags associated), Notebooks, and Tags
* /api/notes (POST)
	* Creates a new note pertaining to a notebook and returns that note object
* /api/notes/:noteId (PUT)
	* Updates a note based off it's id and returns that note object
* /api/notes/:noteId (DELETE)
	* Deletes a note based off it's id
* /api/notebooks (GET)
	* Get all notebooks associated to the current user
* /api/notebooks (POST)
	* Creates a new notebook and returns that notebook object
* /api/notebooks/:notebookId (PUT)
	* Updates a notebook based off it's id and returns that notebook object
* /api/notebooks/:notebookId (DELETE)
	* Deletes a notebook based off it's id and also cascade down and delete notes associated
* /api/tags (GET)
	* Gets all the tags and relationships with notes
* /api/tags (POST)
	* Creates a new tag if it doesn't already exist and returns that tag object
* /api/tags/:id (PUT)
	* Edits a tag based off it's id
* /api/tags/:id (DELETE)
	* Deletes a tag based off it's id (cascades to the NoteTag join table)
* /api/notes/:noteId/tags (POST)
	* Creates a new tag if it doesn't already exist and returns the tag with the note object
* /api/notes/:noteId/tags/tagId (DELETE)
	* Removes the relationship between the note and the tag based off the id
