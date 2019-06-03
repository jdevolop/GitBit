import json

def bit_filter(item):
    result = dict()
    result['name'] = item['name']
    result['html_url'] = item['links']['html']['href']
    result['description'] = item['description']
    result['language'] = item['language']
    result['updated_at'] = item['updated_on']
    result['is_private'] = item['is_private']
    return result

def com_filter(res):
    trun = res['values'][:1]
    result = dict()
    result['message'] = trun['rendered']['message']['raw']
    result['hash'] = trun['hash']
    result['html_url'] = trun['links']['html']['href']
    result['author_name'] = trun['author']['user']['display_name']
    result['author_img'] = trun['author']['user']['links']['avatar']['href']
    
    return json.dumps(result)

def bit_parser(response):
    res = response['values'][:10]
    data = dict()
    data['data'] = list(map(bit_filter, res))
    return json.dumps(data)



