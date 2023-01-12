from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, SlugRelatedField
from .models import Project, Todo
from users.models import User
from users.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'url', 'link', 'users']

class ProjectModelSerializerBase(ModelSerializer):
    users = SlugRelatedField(
        many=True,
        slug_field='id',
        queryset= User.objects.all()
    )
    class Meta:
        model = Project
        fields = ['id', 'name', 'url', 'link', 'users']


class TodoModelSerializerBase(ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'note', 'description',
                  'created_at', 'updated_at', 'is_active', 'project', 'user', 'deleted']

class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()

    class Meta:
        model = Todo
        fields = ['id', 'note', 'description',
                  'created_at', 'updated_at', 'is_active', 'project', 'user', 'deleted']
