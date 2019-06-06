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

- search_term - repository name  
    
    `GET /github/api/search/?search_term={String}`

---

- owner - Repository owner
- repo - repository name

    `GET /github/api/commit/{owner}/{repo}/`
    
    
