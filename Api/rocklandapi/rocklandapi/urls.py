"""
URL configuration for rocklandapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.ok, name='landingpage'),
    path('login/', views.login),
    path('createuser/', views.createuser),
    path('home/', views.home),
    path('quiz/', views.quiz),
    path('submitquiz/', views.submitquiz),
    path('aboutus/', views.aboutus),
    path('articles/', views.articles),
    path('rockinfo/', views.rockinfo),
    path('signup/', views.signup),
    path('admin/', admin.site.urls),
    path('api/accounts/', views.account_list),
    path('api/accounts/<str:username>', views.account_detail),
    path('api/login', views.login),
    path('api/signup', views.signup),
    path('api/test_token', views.test_token)

]
