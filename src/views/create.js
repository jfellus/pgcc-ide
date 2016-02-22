
function view_create_create() {
	var v = new View(null, "Create");
	v.update = function(e) {
		if(!cur_editor) return;
		if(cur_editor.bDontUpdateDeps) return;
		e.empty();
		e.addClass("view_create");
		var list = $("<ul></ul>");
		e.append(list);

		list.declare_module = function(project, module, decl) {
			var li = $("<li><b>"+module+"</b><p>(in "+project+")</p><pre>"+decl+"</pre></li>");
			li.click(function() {workbench.start_creator(new ModuleCreator(module));});
			list.append(li);
		};

		list.add_module = function(project, module) {
			exec_async("pgcc_module " + project + " " + module, function(err,stdout,stderr){
				list.declare_module(project, module, stdout.toString());
			});
		};

		list.add_project = function(project) {
			exec_async("pgcc_project_modules " + project, function(err,stdout,stderr){
				var modules = stdout.toString().split("\n");
				for(var j = 0; j<modules.length; j++) {
					if(modules[j].trim()) list.add_module(project, modules[j]);
				}
			});
		};

		list.declare_module("core", "FOR");
		list.declare_module("core", "ENDFOR");
		list.declare_module("core", "In");
		list.declare_module("core", "Out");

		var projects = cur_editor.script.p.depends;
		for(var i = 0; i<projects.length; i++) list.add_project(projects[i]);

		cur_editor.bDontUpdateDeps = true;
	};
}


module.exports = ViewCreate;
