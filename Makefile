start:
	docker-compose up

stop:
	docker-compose stop

logs:
	docker-compose logs

createsuperuser:
	docker-compose exec backend python manage.py createsuperuser

makemigrations:
	docker-compose exec backend python manage.py makemigrations

migrate:
	docker-compose exec backend python manage.py migrate