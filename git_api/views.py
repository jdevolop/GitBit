import json

def dict_filter(my_dict, keys=['full_name', 'html_url', 'description', 'updated_at', 'language', 'stargazers_count']):
    result = dict()
    for k, v in my_dict.items():
        for e in keys:
            if k == e:
                result[e] = v
    return result            

def commit_filter(my_dict, keys=['html_url', 'commit', 'committer', 'author', 'sha']):
    result = dict()
    for k, v in my_dict.items():
        for e in keys:
            if k == e:
                result[e] = v
    return result            
 
def d_filter(d, keys=[]):
    result = dict()
    for k, v in d.items():
        for e in keys:
            if k == e:
                result[e] = v
    return result  

def repo_parser(response):
    trunced = response[:10]
    go = dict()
    go['data'] = list(map(dict_filter, trunced))
    return json.dumps(go)


