# CarMind Front

## Production Deployment

Para deployar a producción usando Docker:

### 1. Construir la imagen Docker para producción
```bash
docker build --build-arg SCRIPT=build-prod -t fonzeca/carmind-front:legacy .
```

### 2. Subir la imagen al registry
```bash
docker push fonzeca/carmind-front:legacy
```
