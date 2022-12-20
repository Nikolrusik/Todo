import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate,APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from users.models import User 
from .views import ProjectModelViewSet
from .models import Project

# 1. APIRequestFactory.
class TestProjectsViewSet(TestCase):
    def test_get_list(self):
        ### Test check get list projects
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get':'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_guest(self):
        ### Test check post-request for unauthorized user
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name': 'Project 1'}, format="json")
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        ### Test check post-request for authorized admin user
        factory = APIRequestFactory()
        admin = User.objects.create_superuser('admin', 'admin@admin.ru', 'admin12345')
        request = factory.post('/api/projects/', {'name': 'Project 1', 'users': ["http://localhost:8000/api/users/1/"]}, format='json')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

# 2. APIClient.
    def test_get_detail(self):
        ### Test check get-request for detail page
        user = User.objects.create(username='user', email='user@user.ru', password='user12345')
        project = Project.objects.create(name='Project 1')
        project.users.set([user])
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_edit_quest(self):
        ### Test check put-request for unauthorized user
        user = User.objects.create(username='user', email='user@user.ru', password='user12345')
        project = Project.objects.create(name='Project 1')
        project.users.set([user])
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/', {'name': 'Project 2'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        ### Test check put-request for admin
        admin = User.objects.create_superuser(username='admin', email='admin@admin.ru', password='admin12345')
        client = APIClient()
        client.login(username='admin', password='admin12345')
        project = Project.objects.create(name='Project 1')
        project.users.set([admin])
        response = client.put(f'/api/projects/{project.id}/', {'name':'Project 2', 'users': ["http://localhost:8000/api/users/1/"]}, format='json')
        project = Project.objects.get(id=project.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(project.name, 'Project 2')
        client.logout()
        
# 3. APITestCase.
