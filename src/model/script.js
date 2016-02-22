
function Script(filename) {
	this.filename = filename;
	this.p = {name:file_basename(filename).replace("\\..*", ""), depends:[]};

	this.set_property = function(key, val) {
		cur_editor.add_command(new CommandSetProperty({what:this,key:key,oldval:this.p[key],newval:val}));
		this.apply_property(key, val);
	};

	this.apply_property = function(key, val) {
		if(!val) delete this.p[key];
		else this.p[key] = val;
		if(key=="depends") {
			cur_editor.update_all_svg();
			cur_editor.bDontUpdateDeps = false;
		}
		this.update();
	};

	this.update = function() {
		cur_editor.set_modified(true);
	};

	this.resolve_dep_project = function(project) {
		var f = execSync("pgcc_resolve_project "+project);
		if(!f) throw "Can't resolve project " + project;
		return ""+f;
	};

	this.resolve = function(file) {
		for(var i=0; i<this.p.depends.length; i++) {
			var dep = this.p.depends[i];
			if(!file_exists(dep)) dep = this.resolve_dep_project(dep);
			var f = file_dirname(dep) + "/" + file;
			if(file_exists(f)) return f;
		}
		return null;
	};
}

module.exports = Script;
