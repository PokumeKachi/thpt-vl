all:
	firebase emulators:start

build:
	firebase deploy
	git add --all
	git commit -a
	git push
