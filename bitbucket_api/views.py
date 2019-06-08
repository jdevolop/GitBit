import requests

def bit_filter(item):
    result = dict()
    result['full_name'] = item['full_name']
    result['html_url'] = item['links']['html']['href']
    result['description'] = item['description']
    result['language'] = item['language']
    result['updated_at'] = item['updated_on']
    result['is_private'] = item['is_private']
    return result

def com_filter(res):
    result = dict()

    if len(res['values']) > 0:
        trun = res['values'][0]
        result['message'] = trun['rendered']['message']['raw']
        result['hash'] = trun['hash']
        result['html_url'] = trun['links']['html']['href']
        result['author_name'] = trun['author']['user']['display_name']
        result['author_img'] = trun['author']['user']['links']['avatar']['href']
        result['author_url'] = trun['author']['user']['links']['html']['href']
        result['updated_at'] = trun['date']
    else:
        result['error'] = 'Not Found'

    return result

def bit_parser(response):
    res = response['values'][:10]
    data = dict()
    data['data'] = list(map(bit_filter, res))
    return data


def update_access():
    k = 'nVjyhTRVL9sRE5DfKK'
    s = 'k4usw7VDDaRW8KeWScQjhxGb7jbfA7fw'
    header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = {
        "grant_type": "client_credentials"
    }
    token = requests.post(f'https://{k}:{s}@bitbucket.org/site/oauth2/access_token', headers=header, data=data)
    if token.status_code == 200:
        with open('-.txt', 'w') as f:
            f.write(token.json()['access_token'])
    else:
        return 'error'

def get_token():
    with open('-.txt', 'r') as f:
        return f.read()