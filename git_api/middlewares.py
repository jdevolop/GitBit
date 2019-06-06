from django.http import HttpResponse, HttpResponseNotFound
import requests, json, datetime, csv
from .views import repo_parser, commit_filter

def search(request):
    term = request.GET['search_term']
    r = requests.get('https://api.github.com/search/repositories?q={term}&sort=updated&order=desc'.format(term=term))
    a = dict(r.json())['items']
    filtered = repo_parser(a)
    resp = HttpResponse(filtered)
    resp['Content-Type'] = 'application/json; charset=utf-8'
    resp['Access-Control-Allow-Origin'] = '*'
    return resp    

def commit(request, owner, repo):
    r = requests.get('https://api.github.com/repos/{owner}/{repo}/commits'.format(owner=owner, repo=repo))
    
    
    if (isinstance(r.json(), dict) == True):
        a = commit_filter(empty=True)
    else:
        s = r.json()[:1][0]
        a = commit_filter(s)

    resp = HttpResponse(json.dumps(a))
    resp['Content-Type'] = 'application/json; charset=utf-8'
    resp['Access-Control-Allow-Origin'] = '*'
    return resp

def download_as_csv(request):
    search_term = request.GET.get('search_term')
    req = requests.get('http://127.0.0.1/github/api/search/?search_term='+str(search_term))
    
    if req.status_code == 200:        
        data = req.json()['data']
        resp = HttpResponse(content_type='text/csv')
        resp['Content-Disposition'] = f'attachment; filename="result_github_{datetime.datetime.now():%Y-%m-%d}.csv"'

        w = csv.writer(resp)
        w.writerow(['full_name', 'html_url', 'description', 'updated_at', 'stargazers_count', 'language'])

        for repo in data:
            w.writerow([repo['full_name'], repo['html_url'], repo['description'], repo['updated_at'], repo['stargazers_count'], repo['language']])

        return resp
    else:
        return HttpResponseNotFound('Not Found')