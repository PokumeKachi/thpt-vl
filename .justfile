_default:
    @just --choose

run:
    firebase emulators:start

deploy:
    firebase deploy

todo:
    taskwarrior-tui --taskdata .task

git:
    gitui
