function view_create_properties() {
	var v2 = new View(null, "Properties");
	v2.update = function(e) {
		e.empty();
		if(cur_editor && cur_editor.has_selection()) {
			var o = cur_editor.selection[0];
			if(o.outs) {
				e.addClass("view_properties");

				e.append("<h3>Properties</h3>");
				var t = create_table_from_data({type:o.p.type,name:o.p.name,x:o.p.x,y:o.p.y},  function(key, val) { cur_editor.set_selection_property(key, val);});
				t.css("position", "relative");
				e.append(t);
				var b = $("<button class='browse_script'>...</button>");
				b.css("top",0);
				b.css("left", t.width()-20);
				b.click(function() {file_open_dialog(function(filename) { t.find("td:first-child:contains('type')").next().text("$"+filename); cur_editor.set_selection_property("type", "$"+filename);}, "*.script");});
				t.append(b);

				e.append("<h3>Params</h3>");
				e.append(create_table_from_data_plus(o.p, function(key, val) { cur_editor.set_selection_property(key, val);}, ["x", "y", "name", "type", "targets", "bTargetModePositive"]));

				var h = $("<h3>Targets<button class='on allow'>allow</button><button class='on deny'>deny</button></h3>");
				e.append(h);
				h.children("button").click(function() {
					if($(this).hasClass("on")) return;
					h.children("button").toggleClass("on");
					cur_editor.set_selection_property("bTargetModePositive", h.children("button.allow").hasClass("on"));
					if(o.p.bTargetModePositive) ul_targets.addClass("allow"); else ul_targets.removeClass("allow");
				});
				if(o.p.bTargetModePositive) h.children("button.deny").removeClass("on"); else h.children("button.allow").removeClass("on");

				var ul_targets = create_editable_list_editable(o.p.targets).change(function(data){ cur_editor.set_selection_property("targets", data);});
				ul_targets.addClass("targets");
				if(o.p.bTargetModePositive) ul_targets.addClass("allow");
				e.append(ul_targets);
			} else {
				e.append(create_table_from_data_plus(o.p, function(key, val) { cur_editor.set_selection_property(key, val);}));
			}
		}
	};
}

module.exports = ViewProperties;
