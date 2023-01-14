from email.policy import default
import graphene
from graphene_django import DjangoObjectType
from todo.models import Project, Todo, User

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = "__all__"

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    all_projects = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todo_by_id = graphene.Field(TodoType, id=graphene.Int(required=True))

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None
    
    def resolve_rodo_by_id(self, info, id):
        try:
            return Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return None

    def resolve_all_todo(root,info):
        return Todo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()
schema = graphene.Schema(query=Query)