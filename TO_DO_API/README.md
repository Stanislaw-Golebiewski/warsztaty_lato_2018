# KWAS API - dokumentacja v1.0

---
[Dostępne zasoby](#dostępne-zasoby)

[Wydobywanie zasobów](#wydobywanie-zasobów)

[Dodawanie zasobów](#dodawanie-zasobów)

[Edytowanie zasobów](#edytowanie-zasobów)

[Usuwanie zasobów](#usuwanie-zasobów)

[Testowanie](#testowanie)

---

### Dostępne zasoby

Pojedyńczy kwas zapisany jest jako dokument w bazie MongoDB. Przykładowy dokument wykorzystujący wszystkie dostępne pola wygląda tak:

```
{
  id: <id>,
  date: <data>,
  user: <nazwa użytkownika>,
  title: <nazwa kwasu>,
  source: <link>,
  source_type: <typ źródła>,
  tag: <tag>
}
```

**id** : id automatycznie nadawane przez baze danych </br>
**date**: data automatycznie nadawana przez baze danych </br>
**user**: nazwa użytkownika, to pole musi być zdefiniowane </br>
**title**: nazwa kwasu, to pole musi być zdefinowane </br>
**source**: link do kwasu, to pole musi być zdefinowane </br>
**source_type**: typ źródła, np. yt, 9gag, uam, domyślna wartość - "none" </br>
**tag**: opcjonalny tag, domyślna wartość - "none"

---

### Wydobywanie zasobów

Do wydobycia zasobów służy metoda **GET**.

Najbardziej podstawowym zasobem jaki możemy wydobyć jest kolekcja wszystkich kwasów:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy
```

</br></br>
Możemy też wydobyć konkretny kwas z całej kolekcji używając id:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy/<id>
```

Przykład:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy/5af6f5b20892ba00116e62d7
```

</br></br>
Możemy też użyć [query string](https://en.wikipedia.org/wiki/Query_string) do wydobycia zasobów z polami o konkretnej wartości:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy/?<pole1>=<coś>&<pole2>=<coś>
```

Przykład:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy/?user=Kociamber
```

---

### Dodawanie zasobów

Do dodawania zasobów służy metoda **POST**. By dodać zasób do wybranej kolekcji wykonujemy:

```
POST http://<tutaj_url>:<port>/api/v1/kwasy
{
  ...co chemy dodać
}
```

</br></br>
Jeśli chcemy dodać nowy kwas którego nikt się nie spodziewa:

```
POST http://<tutaj_url>:<port>/api/v1/kwasy
{
  user: "Kociamber",
  source: "https://www.youtube.com/watch?v=sAn7baRbhx4",
  title: "Hiszpańska Inkwizycja",
  tag: "unexpected"
}
```

W odpowiedzi powinniśmy dostać dodany zasób:

```
{
    "data": {
        "__v": 0,
        "_id": "5af9eb89800ee00011832a5c",
        "date": "2018-05-14T20:03:21.265Z",
        "source": "https://www.youtube.com/watch?v=sAn7baRbhx4",
        "source_type": "none",
        "tag": "unexpected",
        "title": "Hiszpańska Inkwizycja",
        "user": "Kociamber"
    },
    "status": "success"
}
```
</br></br>
Powinniśmy pamiętać że pola __user__, __title__ oraz __source__ są obowiązkowe,
tzn. POST o takiej treści:
```
POST http://<tutaj_url>:<port>/api/v1/kwasy
{
  source: "https://www.youtube.com/watch?v=sAn7baRbhx4",
  tag: "unexpected"
}
```
nie doda nowego zasobu, wiadomośćią zwrotną będzie następujący komunikat:
```
{
    "error": "Acid validation failed: title: Path `title` is required., user: Path `user` is required.",
    "status": "failed"
}
```
---
### Edytowanie zasobów

Jeśli chcemty wykonać update zasobu, używamy metody PUT:
```

PUT http://<tutaj_url>:<port>/api/v1/kwasy/<id>
{
...co chemy zmienić
}

```
Dla przykładu, jeśli uwżamy że nasz tag zbyt dużo zdradza, możemy go zmienić:
```

PUT http://<tutaj_url>:<port>/api/v1/kwasy/5af9eb89800ee00011832a5c
{
  title: "Śmieszny kotek"
}

```
w wiadomości zwrotnej dostaniemy uaktualniony zasób:

```
{
    "data": {
        "__v": 0,
        "_id": "5af9eb89800ee00011832a5c",
        "date": "2018-05-14T20:03:21.265Z",
        "source": "https://www.youtube.com/watch?v=sAn7baRbhx4",
        "source_type": "none",
        "tag": "unexpected",
        "title": "Śmieszny kotek",
        "user": "Kociamber"
    },
    "status": "success"
}

```
---

### Usuwanie zasobów

Jeśli chcemy usunąć zasób, używamy metody DELETE:
```

DELETE http://<tutaj_url>:<port>/api/v1/kwasy/<id>

```
---
### Testowanie

Jeśli API zawodzi i chcecie się upewnić czy jest to problem wewnatrz waszej aplikacji czy błąd w API, lub chcielibyście podejrzeć co dokładnie jest zwracane, można użyć narzędzi takich jak [postman](https://www.getpostman.com/apps), [httpie](https://httpie.org/), czy curl.

Dobrze jest też obserwować zwracane [kody odpowiedzi HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) które mogą stanowić cenną informacje o tym co poszło nie tak.
