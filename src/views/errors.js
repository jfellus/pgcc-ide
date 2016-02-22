function view_create_errors() {
	var v = new View(null, "Errors");
	v.update = function(e) {
		e.empty();
		e.addClass("view_errors");
		e.html('<pre>'+cur_compilation_errors+'</pre>');
		if(!cur_compilation_errors) { e.html("Everything went fine !"); e.addClass("compilation_ok"); e.removeClass("compilation_failed");}
		else {e.addClass("compilation_failed"); e.removeClass("compilation_ok");}
	};
}
var cur_compilation_errors = "";



module.exports = ViewErrors;
