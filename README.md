# Navigator Repo for GitHub and BitBucket  

## Инструкция запуска  

Для начала вам надо клонировать репозиторий в консоли  

```git clone https://github.com/jdevolop/navigator-repo```

затем  

```cd navigator-repo```

после установить необходимые пакеты

```pip install -r requirements.txt```

для запуска сервера введите в консоли

```python manage.py runserver 80```

Веб-Интерфейс работает по принципу SPA(Single Page Application)  
Откройте [эту](http://127.0.0.1/)   ссылку в браузере и можете приступать к работе 
## API Reference

#### host - 127.0.0.1
#### Response type: 'application/json'

### GitHub  
Она вернёт 10 недавно обновлённых репоситориев по названию
- search_term - repository name  
    
```GET /github/api/search/?search_term={String}```

---
Она вернёт последний коммит для этого репозитория по владельцу и названию
- owner - Repository owner {String}
- repo - repository name {String}

```GET /github/api/commit/{owner}/{repo}/```
    
---
Она сгенерирует готовый csv файл по результату поиска по названию 
- search_term - repository name  

```GET /github/api/download/csv?search_term={String}```

### BitBucket  
Она вернёт 10 недавно обновлённых репоситориев по логину
- username - login {String}

```GET /bitbucket/api/search/{username}/repos/```
    
---
Она вернёт последний коммит для этого репозитория по логину и названию
- username - login {String}
- slug - repository name {String}

```GET /bitbucket/api/commit/{username}/{slug}/```
    
---
Она сгенерирует готовый csv файл по результату поиска по логину 
- username - repository name  

```GET /github/api/download/csv?username={String}```
    
    
