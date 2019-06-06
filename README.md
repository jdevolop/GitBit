# Navigator Repo for GitHub and BitBucket  

## Инструкция запуска  

Для начала вам надо клонировать репозиторий в консоли  

    `git clone https://github.com/jdevolop/navigator-repo`

затем  

    `cd navigator-repo`  

для запуска сервера введите  

    `python manage.py runserver 80`

Откройте [эту](http://127.0.0.1/)   ссылку в браузере и можете приступать к работе 

## API Reference

#### host - 127.0.0.1
#### Response type: 'application/json'

### GitHub  
Она вернёт 10 недавно обновлённых репоситориев
- search_term - repository name  
    
    `GET /github/api/search/?search_term={String}`

---
Она вернёт последний коммит для этого репозитория
- owner - Repository owner {String}
- repo - repository name {String}

    `GET /github/api/commit/{owner}/{repo}/`
    
---
Она вернёт готовый csv файл
- search_term - repository name  

    `GET /github/api/download/csv?search_term={String}`    

### BitBucket  
Она вернёт 10 недавно обновлённых репоситориев
- username - login {String}

    `GET /bitbucket/api/search/{username}/repos/`
    
---
Она вернёт последний коммит для этого репозитория
- username - login {String}
- slug - repository name {String}

    `GET /bitbucket/api/commit/{username}/{slug}/`
    
---
Она вернёт готовый csv файл
- username - repository name  

    `GET /github/api/download/csv?username={String}`
    
    
