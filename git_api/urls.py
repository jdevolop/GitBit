from django.urls import path
from django.conf.urls import url
from .middlewares import search, commit, download_as_csv

urlpatterns = [
    path('search/', search, name='search'),
    url(r'^commit/(?P<owner>.+)/(?P<repo>.+)/$', commit, name='commit'),
    path('download/csv', download_as_csv, name='download')
]
