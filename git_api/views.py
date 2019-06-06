import json

def dict_filter(my_dict, keys=['full_name', 'html_url', 'description', 'updated_at', 'language', 'stargazers_count']):
    result = dict()
    for k, v in my_dict.items():
        for e in keys:
            if k == e:
                result[e] = v
    return result            

def commit_filter(my_dict={}, empty=False):
    result = dict()
    if empty == False:
        result['url'] = my_dict['html_url']
        result['message'] = my_dict['commit']['message']
        result['hash'] = my_dict['sha']
        result['committer_date'] = my_dict['commit']['committer']['date']
        if my_dict['committer'] != None:
            result['login'] = my_dict['committer']['login']
            result['avatar_url'] = my_dict['committer']['avatar_url']
            result['html_url'] = my_dict['committer']['html_url']
        else:
            result['login'] = ''
            result['avatar_url'] = ''
            result['html_url'] = ''
    elif empty == True:
        result['url'] = ''
        result['message'] = ''
        result['hash'] = ''
        result['committer_date'] = ''
        result['login'] = ''
        result['avatar_url'] = ''
        result['html_url'] = ''

    return result            
 

def repo_parser(response):
    trunced = response[:10]
    go = dict()
    go['data'] = list(map(dict_filter, trunced))
    return json.dumps(go)


