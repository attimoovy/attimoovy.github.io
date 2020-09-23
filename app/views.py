from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
import datetime
import json
from django.forms.models import model_to_dict
from django.core import serializers

# Create your views here.

app = (__name__)

def index(request):
    return render(request, "app/index.html")

def quiz(request):
    return render(request, "app/quiz.html")

def stats(request):
    return render(request, "app/stats.html")

def learn(request):
    return render(request, "app/learn.html")