
function view_create_console() {
	var v = new View(null, "Console");
	v.update = function(e) {
		e.empty();
		e.addClass("view_console");
		e.html(cur_console);
	};
}
var cur_console = "";


module.exports = ViewConsole;
