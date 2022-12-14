from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import permissions
from .filters import ProjectFilter
from .models import Project, Todo
from .serializers import ProjectModelSerializer, ProjectModelSerializerBase, TodoModelSerializer, TodoModelSerializerBase


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter
    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase


class TodoModelViewSet(ModelViewSet):

    def perform_destroy(self, instance):
        instance.deleted = True
        instance.is_active = False
        instance.save()

    # permission_classes = [permissions.IsAuthenticated]
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoLimitOffsetPagination
    filterset_fields = ['project']

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TodoModelSerializer
        return TodoModelSerializerBase
