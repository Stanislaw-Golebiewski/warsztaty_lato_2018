run: install_deps
	docker-compose up -d

install_deps:
	npm install

logs:
	docker-compose logs --tail=40 --follow app

stop:
	docker-compose down
