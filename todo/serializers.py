from attr import field
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()

    class Meta:
        model = Todo
        fields = "__all__"
