/**
 * The main file to start the store.
 * A very basic store that laysout the folios in a grid.
 */
$(document).ready(function() {
	function init() {
		console.debug("init");
		// Sort the folios descending.

		var html  = "<div id='status' name='status'>Status Message</div>";

		// Use inline styles to keep this simple.
		this.$el = $(html);

		// Add the element to the body.
		$("body").append(this.$el);
	}

	function db_example() {
		var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
		var msg;
		db.transaction(function (tx) {
		  tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
		  tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
		  tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
		  msg = '<p>Log message created and row inserted.</p>';
		  document.querySelector('#status').innerHTML =  msg;
		});

		db.transaction(function (tx) {
		  tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
		   var len = results.rows.length, i;
		   msg = "<p>Found rows: " + len + "</p>";
		   document.querySelector('#status').innerHTML +=  msg;
		   for (i = 0; i < len; i++){
		     msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
		     document.querySelector('#status').innerHTML +=  msg;
		   }
		 }, null);
		});
	}

	function goto_library() {
		var html  = "<div id='goto_library'>";
			html += "	<a href='goto://ApplicationViewState/Library'>Goto Library</a>";
			html += "</div>";

		// Use inline styles to keep this simple.
		this.$el = $(html);

		// Add the element to the body.
		$("body").append(this.$el);
	}

	init();
	db_example();
	goto_library();
});
