from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
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
