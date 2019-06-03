from django.urls import path
from django.conf.urls import url
from .middlewares import search, commit

urlpatterns = [
    path('search/', search, name='search'),
    url(r'^commit/(?P<owner>\w+)/(?P<repo>\w+)/$', commit, name='commit')
]
