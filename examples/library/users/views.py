from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins, generics
from .models import User
from .serializers import UserModelSerializer, UserModeFulllSerializer


class UserModelViewSet(GenericViewSet, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == "0.2":
            return UserModeFulllSerializer
        return UserModelSerializer
