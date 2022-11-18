from email.policy import default
from django.db import models

from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=32)
    link = models.CharField(max_length=64, null=True, blank=True)
    users = models.ManyToManyField(User)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    note = models.CharField(max_length=32)
    description = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True, editable=False)
    updated_at = models.DateField(auto_now=True, editable=False)
    is_active = models.BooleanField(default=True)
