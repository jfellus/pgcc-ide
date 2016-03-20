Commands = {};

Commands.New = function() { WORKBENCH.newDocument(); };
Commands.Open = function(file) {
	if(!file) return file_open_dialog(function(f){Commands.Open(f);}, "*.*");
	else WORKBENCH.open(file);
};
Commands.Save = function() { WORKBENCH.save(); };

Commands.SaveAs = function() { WORKBENCH.saveAs(); };
Commands.Close = function() { WORKBENCH.close(); };

Commands.Undo = function() { WORKBENCH.undo(); };
Commands.Redo = function() { WORKBENCH.redo(); };
Commands.Cut = function() {	WORKBENCH.cut();};
Commands.Copy = function() { WORKBENCH.copy();};
Commands.Paste = function() { WORKBENCH.paste();};

Commands.CreateModule = function() {WORKBENCH.createModule();};
Commands.CreateLink = function() { WORKBENCH.createLink();};
Commands.Delete = function() { WORKBENCH.delete();};

Commands.Search = function() {};

Commands.Compile = function() {};
Commands.Start = function() {};
Commands.Stop = function() {};
