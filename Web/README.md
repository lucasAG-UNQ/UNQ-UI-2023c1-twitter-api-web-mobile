# UNQ - UI
# TP2 - Web
## Twitter

Enunciado: <https://github.com/unq-ui/material/blob/master/TPs/2023s1/TP2-Web.md>

### Configuración

Establecer la baseURL para Axios en `./src/components/services.js`

```
axios.defaults.baseURL = 'http://localhost:7070';
```

### Cambios realizados en el backend

- Se habilitó CORS para cualquier host, y se exponen los headers.
- Se cambiaron algunos mensajes de error para hacerlos más descriptivos.
- Se devuelven ordenadas por fecha los tweets del usuario.
