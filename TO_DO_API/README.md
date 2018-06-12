# TO DO API - dokumentacja v1.1

data ostatniej edycji: **12.06.2018**

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

### Zasoby

Tak wygląda typowy task:

```
{
  __v: 0
  _id: "5b15bc89792e1c0011f68d32",
  date: "2018-06-04T22:26:17.838Z",
  urgency: 0,
  done: false,
  description: "-",
  user: "Szumimajster",
  title: "pograć w Wiedźmina",
}
```

| pole    | typ    | wymagane przy dodawaniu? | domyślna wartość         |
| ------- | ------ | ------------------------ | ------------------------ |
| \_id    | ID     | nie                      | generowane automatycznie |
| date    | Date   | nie                      | generowane automatycznie |
| urgency | Number | nie                      | 0                        |
| done    | Bool   | nie                      | false                    |
| user    | String | tak                      | -                        |
| title   | String | tak                      | -                        |
