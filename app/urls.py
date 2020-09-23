from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("quiz", views.quiz, name="quiz"),
    path("stats", views.stats, name="stats"),
    path("learn", views.learn, name="learn")
]