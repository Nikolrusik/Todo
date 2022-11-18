from email.policy import default
from django.db import models

from users.models import User


class Project(models.Model):
    name = models.CharField(max_lenght=32)
    link = models.CharField(null=True, blank=True)
    users = models.ManyToManyField(User)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    note = models.CharField(max_lenght=32)
    description = models.CharField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True, editable=False)
    updated_at = models.DateField(auto_now=True, editable=False)
    is_active = models.BooleanField(default=True)

    # 2. Добавить модель Project. Это проект, для которого записаны TODO. У него есть название,
    # может быть ссылка на репозиторий и набор пользователей, которые работают с этим
    # проектом. Создать модель, выбрать подходящие типы полей и связей с другими моделями.
    # 3. Добавить модель TODO. Это заметка. У ToDo есть проект, в котором сделана заметка, текст
    # заметки, дата создания и обновления, пользователь, создавший заметку. Содержится и
    # признак — активно TODO или закрыто. Выбрать подходящие типы полей и связей с другими
    # моделями.
    # 4. Создать API для моделей Projects и ToDo. Пока можно использовать ViewSets по аналогии с
    # моделью User.
    # 5. При сериализации моделей выбрать нужный вид для связанных моделей.
