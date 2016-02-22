
function view_create_script() {
	var v = new View(null, "Script");
	v.update = function(e) {
		e.empty();
		if(!cur_editor) return;
		e.addClass("view_script");
		e.append("<h3>Properties</h3>");
		e.append(create_table_from_data(cur_editor.script.p, function(key, val) { cur_editor.script.set_property(key, val);}, ["depends"]));

		e.append("<h3>Depends</h3>");
		var dep = create_editable_list(pgcc_get_projects(), cur_editor.script.p.depends);
		dep.change(function(){
			cur_editor.script.set_property("depends", dep.get_selected_items());
		});
		e.append(dep);
	};
}

module.exports = ViewScript;
