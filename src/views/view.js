
function View(icon_cls, title, flags) {
	this.icon_cls = icon_cls;
	this.title = title;
	this.flags = flags;
	var _this = this;
	if(flags && flags.tab=="right") workbench.add_rtab(title, icon_cls, title, "", function(elt) {_this.update(elt);});
	else workbench.add_ltab(title, icon_cls, title, "", function(elt) {_this.update(elt);});
}


module.exports = View;
