from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 1


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filterset_fields = ['user']
    pagination_class = TodoLimitOffsetPagination
