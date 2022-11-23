from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(GenericViewSet, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
