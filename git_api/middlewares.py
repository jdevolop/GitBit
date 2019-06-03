from django.http import HttpResponse
import requests, json
from .views import repo_parser, commit_filter, d_filter

def search(request):
    term = request.GET['search_term']
    r = requests.get('https://api.github.com/search/repositories?q={term}&sort=updated&order=desc'.format(term=term))
    a = dict(r.json())['items']
    filtered = repo_parser(a)
    resp = HttpResponse(filtered)
    resp['Content-Type'] = 'application/json; charset=utf-8'
    return resp    

def commit(request, owner, repo):
    r = requests.get('https://api.github.com/repos/{owner}/{repo}/commits'.format(owner=owner, repo=repo))
    s = r.json()[:1][0]
    a = commit_filter(s)
    
    res = dict()
    res['message'] = a['commit']['message']
    res['hash'] = a['sha']
    res['author_date'] = a['commit']['author']['date']
    res['committer_date'] = a['commit']['committer']['date']
    res['url'] = a['html_url']
    required_fields = ['login', 'avatar_url', 'html_url']
    res['author_info'] = d_filter(a['author'], required_fields)
    res['committer_info'] = d_filter(a['committer'], required_fields)

    resp = HttpResponse(json.dumps(res))
    resp['Content-Type'] = 'application/json; charset=utf-8'
    return resp

