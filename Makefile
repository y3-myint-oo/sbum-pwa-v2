tag = "latest"

help:
		@echo "Makefile for Standard PWA"
		@echo "Usage: make [ build | run ] " 
		@echo ""

build:
		@echo "==== Building React Project ===="
		npm run build
		docker build -t $(name):$(tag) .
		@echo ""

run:	
		@echo "==== Running React Project ===="
		docker run --rm -d -p $(port):3000 $(name):$(tag)
		@echo ""	

push:	
		@echo "==== Pushing to DockerHub ===="
		docker push $(name):$(name)

clean:
		@echo "==== Clean ===="
		rm -rf build/
		@echo "todo - docker rmi imageid"