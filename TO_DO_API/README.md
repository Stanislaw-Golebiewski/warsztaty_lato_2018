# TO DO API - dokumentacja v1.0

---

### Endpoints

##### Bazowy adres

```
http://<url>:<port>/api/v1/to_do
```

| ścieżka      | metoda | wymagane body | opis                                                     |
| ------------ | ------ | ------------- | -------------------------------------------------------- |
| /tasks       | GET    | nie           | zwraca **wszystkie** zadania                             |
| /tasks       | POST   | tak           | dodaje nowe zadanie                                      |
| /users       | GET    | nie           | zwraca wszystkich użytkowników                           |
| /:user/tasks | GET    | nie           | zwraca wszystkie zadania przypisane do użytkownika :user |
| /tasks/:id   | GET    | nie           | zwraca zadanie o zadanym id                              |
| /tasks/:id   | PUT    | tak           | edytuje i zwraca zadanie o zadanym id                    |
| /tasks/:id   | DELETE | nie           | usuwa i zwraca zadanie o zadanym id                      |
