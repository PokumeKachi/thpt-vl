all:
	firebase emulators:start

build:
	firebase deploy
	git add .
	git commit -a
	git push
