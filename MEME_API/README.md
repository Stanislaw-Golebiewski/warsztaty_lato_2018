# MEME API - dokumentacja v1.1

data edycji: **08.06.2018**

---

### Endpoints

##### Bazowy adres

```
http://<url>:<port>/api/v1/
```

| ścieżka             | metoda | wymagane body | opis                                          |
| ------------------- | ------ | ------------- | --------------------------------------------- |
| /memes              | GET    | nie           | zwraca **wszystkie** memy wraz komentarzami   |
| /memes              | POST   | tak           | dodaje nowyego mema                           |
| /memes/:id          | GET    | nie           | zwraca mema o zadanym id                      |
| /memes/:id          | PATCH  | tak           | edytuje i zwraca mema o zadanym id            |
| /memes/:id          | DELETE | nie           | usuwa i zwraca mema o zadanym id              |
| /memes/:id/comments | POST   | tak           | dodaje nowy komentarz do mema o zadanym id    |
| /memes/comments/:id | DELETE | nie           | usuwa komentarz o zadanym id (id komentarza!) |

### Zasoby

Tak wygląda typowy zasób:

```
{
    "__v": 0,
    "_id": <id>,
    "comments": [<tablica z komentarzami],
    "date": <data>,
    "rating": <ocena>,
    "source": <link do obrazka>,
    "title": <tytuł>,
    "user": <użytkownik>,
}
```

### Uwagi

*   pola **\_id** oraz **data** są generowane automatycznie

*   przy dodawaniu mema wymagane są pola: **user**, **title**, **soruce**, reszta, jeśli nie została podana, wypełni się automatycznie domyślnymi wartościami
