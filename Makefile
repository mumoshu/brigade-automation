TAG ?= canary

.PHONY: build
build:
	sh -c 'docker build -t mumoshu/brigade-automation:${TAG} .'

.PHONY: push
push: test
	sh -c 'docker push mumoshu/brigade-automation:${TAG}'

.PHONY: test
test: build
	TAG=$(TAG) ./scripts/ensure-notoken
