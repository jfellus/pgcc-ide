Commands = {};

Commands.New = function() {};
Commands.Open = function(file) {
	if(!file) {
		return file_open_dialog(function(f){Commands.Open(f);}, "*.*");
	}
	else {
		WORKBENCH.openView($("<div>Mon code pour " + file + "</div>"), file);
	}
};
Commands.Save = function() {};
Commands.SaveAs = function() {};
Commands.Close = function() {};

Commands.Undo = function() {};
Commands.Redo = function() {};
Commands.Cut = function() {};
Commands.Copy = function() {};
Commands.Paste = function() {};

Commands.CreateModule = function() {};
Commands.CreateLink = function() {};
Commands.Delete = function() {};

Commands.Search = function() {};

Commands.Compile = function() {};
Commands.Start = function() {};
Commands.Stop = function() {};
