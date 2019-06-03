# https://bitbucket.org/account/user/%7B86690619-6ad0-4469-9e21-1110c5104bc5%7D/oauth-consumers#access_token=qSgYshkh9OdInqtGUnR0TsU3MTKpJSDXZtmk0edocmI0vHSjxBpicWgVramUqrbkalTawSFahidUKSQ3bik%3D&scopes=pullrequest+account&expires_in=7200&token_type=bearer
# https://bitbucket.org/account/user/%7B86690619-6ad0-4469-9e21-1110c5104bc5%7D/oauth-consumers?code=9Szr6y3BdHHCC56wnS
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseServerError
import requests, json
from .views import bit_parser, com_filter

token = '7uVRpsEvcZTS8nRKwt-pVlO1K-Elb-bDT95Qshz0W5p9yPn6XHXB1aOPrrio455LD15a0yRG37LKY9NfoQI='

def search(request, un):
    s_resp = requests.get('https://bitbucket.org/!api/2.0/repositories/{un}?sort=-updated_on&access_token={token}'.format(un=un, token=token))
    s_res = dict(s_resp.json())
    if s_resp.status_code == 200:
        s_filtered = bit_parser(s_res)
        s_r = HttpResponse(s_filtered)
        s_r['Content-Type'] = 'application/json; charset=utf-8'
        return s_r
    elif s_resp.status_code == 401:
        r = HttpResponseForbidden(json.dumps({'message': "You must change access token"}))
        r['Content-Type'] = 'application/json; charset=utf-8'
        return r
    else:
        r = HttpResponseServerError(json.dumps({'message': "Something wrong"}))
        r['Content-Type'] = 'application/json; charset=utf-8'
        return r

def commit(request, un, slug):
    resp = requests.get('https://bitbucket.org/!api/2.0/repositories/{un}/{slug}/commits?sort=-updated_on&access_token={token}'.format(un=un, slug=slug, token=token))
    res = dict(resp.json())
    if s_resp.status_code == 200:
        filtered = com_filter(res)
        r = HttpResponse(filtered)
        r['Content-Type'] = 'application/json; charset=utf-8'
        return r
    elif s_resp.status_code == 401:
        r = HttpResponseForbidden(json.dumps({'message': "You must change access token"}))
        r['Content-Type'] = 'application/json; charset=utf-8'
        return r
    else:
        r = HttpResponseServerError(json.dumps({'message': "Something wrong"}))
        r['Content-Type'] = 'application/json; charset=utf-8'
        return r


