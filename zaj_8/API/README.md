# KWAS API - dokumentacja v1.0

### Dostępne zasoby

Pojedyńczy kwas zapisany jest jako dokument w bazie MongoDB. Przykładowy dokument wykorzystujący wszystkie dostępne pola wygląda tak:

```
{
id: <id>
user: <nazwa_urzytkownika>,
source: <link>,
source_type: <typ źródła>,
tag: <tag>

TO DO: pola
}

```
TO DO: opisy pól


---

### Wydobywanie zasobów


Do wydobycia zasobów służy metoda **GET**.

Najbardziej podstawowym zasobem jaki możemy wydobyć jest kolekcja wszystkich kwasów:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy

```

Możemy też wydobyć konkretny kwas z całej kolekcji urzywając id:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy/:id

```
Przykład:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy/:id

```


Możemy też urzyć query params do wydobycia zasobów z polami o konkretnej wartości:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy/?<pole1>=<coś>&<pole2>=<coś>

```
Przykład:

```
GET http://<tutaj_url>:<port>/api/v1/kwasy/?user=Kociamber&tag=kot&source_type=yt

```



---

### Dodawanie zasobów

Do dodawania zasobów służy metoda **POST**.By dodać zasób do wybranej kolekcji wykonujemy:

```
POST http://<tutaj_url>:<port>/api/v1/kwasy
{
  ...co chemy dodać
}
```

Jeśli chcemy dodać nowy kwas którego nikt się nie spodziewa:

```
POST http://<tutaj_url>:<port>/api/v1/collections/users
{
TO DO: uzupełnić
}
```

---

### Edytowanie zasobów

Jeśli chcemty wykonać update zasobu, urzywamy metody PUT:
```
PUT http://<tutaj_url>:<port>/api/v1/kwasy/:id
{
  ...co chemy zmienić
}
```

Dla przykładu, jeśli uwżamy że nasz tag zbyt dużo zdradza, możemy go zmienić:
```
PUT http://<tutaj_url>:<port>/api/v1/kwasy/:id
{
  ...co chemy zmienić
}
```

---
### Usuwanie zasobów

Jeśli chcemy usunąć zasób, urzywamy metody DELETE:

```
DELETE http://<tutaj_url>:<port>/api/v1/kwasy/:id

```




### Testowanie

Jeśli API zawodzi i chcecie się upewnić czy jest to problem wewnatrz waszej aplikacji czy błąd w API, lub chcielibyście podejrzeć co dokładnie jest zwracane, można użyć narzędzi takich jak [postman](https://www.getpostman.com/apps), [httpie](https://httpie.org/), czy curl.

Dobrze jest też obserwować zwracane [kody odpowiedzi HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) które mogą stanowić cenną informacje o tym co poszło nie tak.
