## Instalar libreria native-federation:
```bash
npm i @angular-architects/native-federation
```
## Configurar el proyecto para federación nativa
En este caso es un remote, por lo tanto ponerlo en la cofiguración. Cuidado con el puerto.
```bash
ng g @angular-architects/native-federation:init --project mfe2 --port 4202 --type remote
```
En el caso del host:
```bash
ng g @angular-architects/native-federation:init --project host --port 4200 --type dynamic-host
```
