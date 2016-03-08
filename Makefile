all: bin/pgcc-ide.nw


bin/:
	mkdir -p bin/

bin/pgcc-ide.nw: bin/ src/* src/*/* src/package.json
	cd src; npm install
	cd src; bower install
	cd src; zip -r ../bin/pgcc-ide.nw .


install: bin/pgcc-ide.nw
	@sudo rm -f /usr/local/bin/pgcc-ide
	@ln -s `pwd`/pgcc-ide /usr/local/bin/pgcc-ide
	@cp resources/pgcc-ide.desktop /usr/share/applications/
	@chmod a+wrx /usr/share/applications/pgcc-ide.desktop
	@cp resources/mime*.xml /usr/share/mime/packages/
	@cp resources/pgcc-ide-48x48.png /usr/share/icons/hicolor/48x48/apps/
	@update-mime-database /usr/share/mime

watch:
	./watch.sh
