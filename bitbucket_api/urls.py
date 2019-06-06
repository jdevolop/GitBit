from django.conf.urls import url

from .middlewares import search, commit, download_as_csv



urlpatterns = [
    url(r'^search/(?P<un>.+)/repos/$', search, name='bit_search'),
    url(r'^commit/(?P<un>.+)/(?P<slug>.+)/$', commit, name='last_commit'), 
    url(r'^download/csv', download_as_csv, name='download'),  
]

