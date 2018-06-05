# MEME API - dokumentacja v1.0

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
| /memes/:id          | PUT    | tak           | edytuje i zwraca mema o zadanym id            |
| /memes/:id          | DELETE | nie           | usuwa i zwraca mema o zadanym id              |
| /memes/:id/comments | POST   | tak           | dodaje nowy komentarz do mema o zadanym id    |
| /memes/comments/:id | DELETE | nie           | usuwa komentarz o zadanym id (id komentarza!) |
