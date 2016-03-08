Commands = {};

Commands.New = function() { WORKBENCH.newDocument(); };
Commands.Open = function(file) {
	if(!file) return file_open_dialog(function(f){Commands.Open(f);}, "*.*");
	else WORKBENCH.open(file);
};
Commands.Save = function() { WORKBENCH.save(); };

Commands.SaveAs = function() { WORKBENCH.saveAs(); };
Commands.Close = function() { WORKBENCH.close(); };

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
