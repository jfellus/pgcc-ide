
function Module(editor, x,y,type, name, targets) {
	var canvas = editor.canvas;
	this.bAttached = true;
	editor.modules.push(this);

	this.outs = [];
	this.ins = [];
	this.p = {x:x,y:y,name:name,type:type};

	this.elt = create_node(canvas, x,y,type,name);
	this.elt.model = this;
//	this.elt.decorate(10,-10,_SVG("circle").attr("r", 4).attr("fill","red"));

	this.is_script = function() {return this.p.type.charAt(0)=='$';}

	this.add_out = function(link) { this.outs.push(link); };
	this.add_in = function(link) { this.ins.push(link); };

	this.on_move = function(x,y) {
		this.p.x = x;
		this.p.y = y;
		for(var i=0; i<this.outs.length; i++) this.outs[i].update();
		for(var i=0; i<this.ins.length; i++) this.ins[i].update();
	};

	this.on_mousedown = function(e){
		if(!this.is_selected() && !e.shiftKey) editor.unselect_all();
		this.select();
	};

	this.on_mouseup = function(e) {
		this.select();
		if(this.elt.hasMoved) { editor.on_selection_moved(); this.elt.hasMoved=false;}
	};

	this.on_click = function(e) {canvas.focus();};
	this.on_dblclick = function(e){
		if(this.is_script()) workbench.open(this.p.type.substr(1));
		e.preventDefault(); e.stopPropagation();
	};

	this.update = function() {
		for(var i=0; i<this.outs.length; i++) this.outs[i].update();
		for(var i=0; i<this.ins.length; i++) this.ins[i].update();
	};

	this.getBBox = function() {
		var bb = this.elt.children()[0].getBBox();
		bb.x += this.p.x; bb.y += this.p.y;
		return bb;
	};

	this.is_in = function(x,y,w,h) {
		var bb = this.getBBox();
		return bb.x >= x && bb.y >= y && bb.x+bb.width <= x+w && bb.y+bb.height <= y+h;
	};

	this.is_selected = function() {return editor.selection.has(this);}

	this.select = function() {
		if(!this.is_selected()) {
			editor.add_selection(this);
			SVG_ADD_CLASS(this.elt, "selected");
		}
		workbench.on_selection();
	};

	this.unselect = function() {
		editor.selection.remove(this);
		SVG_REMOVE_CLASS(this.elt, "selected");
	};

	this.detach = function() {
		if(!this.bAttached) return;
		this.unselect();
		this.detached_outs = this.outs.slice();
		this.detached_ins = this.ins.slice();
		while(this.outs.length>0) this.outs[0].detach();
		while(this.ins.length>0) this.ins[0].detach();
		this.elt.detach();
		editor.modules.remove(this);
		this.bAttached = false;
	};

	this.reattach = function() {
		if(this.bAttached) return;
		for(var i=0; i<this.detached_outs.length; i++) this.detached_outs[i].reattach();
		for(var i=0; i<this.detached_ins.length; i++) this.detached_ins[i].reattach();
		this.elt.reattach();
		editor.modules.push(this);
		this.bAttached = true;
	};

	this.set_pos = function(x,y) {this.elt.set_pos(x,y);};

	this.set_property = function(key,val) {
		editor.add_command(new CommandSetProperty({what:this,key:key,oldval:this.p[key],newval:val}));
		this.apply_property(key, val);
		editor.set_modified(true);
	};

	this.apply_property = function(key, val) {
		if(key=="x") this.set_pos(parseFloat(val), this.p.y);
		else if(key=="y") this.set_pos(this.p.x,parseFloat(val));
		else if(key=="name") this.elt.set_text(this.p.name = val);
		else if(key=="type") this.elt.update_svg(this.p.type = val);
		else {
			if(!val) delete this.p[key];
			else this.p[key] = val;
		}
	};

	this.toString = function() { return "Node " + this.p.name; };

	if(ISDEF(targets) && targets.length) {
		this.p.bTargetModePositive = (targets[0].charAt(0)=='+');
		targets[0] = targets[0].substr(1);
		this.apply_property("targets", targets.slice());
	}
}


module.exports = Module;
