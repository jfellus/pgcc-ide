
function Link(editor, src,dst) {
	this.editor = editor;
	var canvas = editor.canvas;
	this.bAttached = true;
	editor.links.push(this);

	this.src = src;
	this.dst = dst;
	this.p = {
			type:"",
			src:src.p.name, dst:dst.p.name,
			src_pin:"", dst_pin:"",
			text:""
	};

	this.elt = create_link(canvas);
	this.end = create_link_end(canvas, this.elt);
	this.elt.model = this;
	this.end.model = this;

	this.src.add_out(this);
	this.dst.add_in(this);



	this.on_mousedown = function(e) {
		if(!e.shiftKey) editor.unselect_all();
		this.select();
	};
	this.on_mouseup = function(e) {	this.select(); };
	this.on_click = function(e) {	canvas.focus();	};
	this.on_dblclick = function(e) {DBG("DblClicked : " + this.toString());};

	this.update = function() {
		this.p.src = this.src.p.name;
		this.p.dst = this.dst.p.name;
		update_link(this.elt, this.end, this.src.getBBox(), this.dst.getBBox());
	};

	this.toString = function() {return this.p.src + "->" + this.p.dst;};

	this.on_mouseenter = function() {SVG_ADD_CLASS(this.end,"hover");};
	this.on_mouseleave = function() {SVG_REMOVE_CLASS(this.end,"hover");};

	this.select = function() {
		if(!editor.selection.has(this)) {
			editor.add_selection(this);
			SVG_ADD_CLASS(this.elt, "selected");
			SVG_ADD_CLASS(this.end, "selected");
		}
		workbench.on_selection();
	};

	this.unselect = function() {
		editor.selection.remove(this);
		SVG_REMOVE_CLASS(this.elt, "selected");
		SVG_REMOVE_CLASS(this.end, "selected");
	};

	this.detach = function() {
		if(!this.bAttached) return;
		this.unselect();
		this.src.outs.remove(this);
		this.dst.ins.remove(this);
		this.elt.detach();
		this.end.detach();
		editor.links.remove(this);
		this.bAttached = false;
	};

	this.reattach = function() {
		if(this.bAttached) return;
		this.src.outs.push(this);
		this.dst.ins.push(this);
		this.elt.reattach();
		this.end.reattach();
		editor.links.push(this);
		this.bAttached = true;
	};


	this.set_property = function(key, val) {
		editor.add_command(new CommandSetProperty({what:this,key:key,oldval:this.p[key],newval:val}));
		this.apply_property(key, val);
		editor.set_modified(true);
	};

	this.apply_property = function(key, val) {

		if(key=="src") {
			var m = editor.get_module_by_name(val);
			if(m) {
				this.src.outs.remove(this);
				this.src = m; this.p.src = this.src.p.name;
				this.src.add_out(this);
			}
			else {alert("No such module : " + val);	}
		} else if(key=="dst") {
			var m = editor.get_module_by_name(val);
			if(m) {
				this.dst.ins.remove(this);
				this.dst = m; this.p.dst = this.dst.p.name;
				this.dst.add_in(this);
			}
			else {alert("No such module : " + val);}
		}
		else {
			if(!val) delete this.p[key];
			else this.p[key] = val;
		}
		this.update();
	};

	this.update();

}


module.exports = Link;
