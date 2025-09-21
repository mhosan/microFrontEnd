## Instalar libreria native-federation:
```bash
npm i @angular-architects/native-federation -D
```
## Configurar el proyecto para federación nativa
### Remote. Cuidado con el puerto y el tipo de proyecto

```bash
ng g @angular-architects/native-federation:init --project mfe2 --port 4202 --type remote
```
### Host. Cuidado con el puerto y el tipo de proyecto

```bash
ng g @angular-architects/native-federation:init --project host --port 4200 --type dynamic-host
```

## Arranque local (host + microfrontends)

Pasos mínimos para levantar el entorno de desarrollo en Windows (PowerShell):

1. Instalar dependencias en la raíz y en cada microfrontend (si no están instaladas):

```powershell
cd C:\Users\Usuario\Desktop\desa\angular\microfrontend\host
npm install --legacy-peer-deps
cd ..\mfe1
npm install --legacy-peer-deps
cd ..\mfe2
npm install --legacy-peer-deps
cd ..\mfe3
npm install --legacy-peer-deps
cd ..\mfe4
npm install --legacy-peer-deps
```

2. Iniciar cada aplicación en terminales separados (puertos por convención):

```powershell
# Host
cd C:\Users\Usuario\Desktop\desa\angular\microfrontend\host
ng serve --port 4200

# mfe1
cd ..\mfe1
ng serve --port 4201

# mfe2
cd ..\mfe2
ng serve --port 4202

# mfe3
cd ..\mfe3
ng serve --port 4203

# mfe4
cd ..\mfe4
ng serve --port 4204
```

3. Verificar manifests (remoteEntry.json)

Abre en el navegador o usa PowerShell para comprobar que cada remoto devuelve su manifest:

```powershell
Invoke-RestMethod -Uri http://localhost:4201/remoteEntry.json
Invoke-RestMethod -Uri http://localhost:4202/remoteEntry.json
Invoke-RestMethod -Uri http://localhost:4203/remoteEntry.json
Invoke-RestMethod -Uri http://localhost:4204/remoteEntry.json
```

Comprueba que en todos los manifests las versiones de `@angular/*` coincidan (idealmente la misma versión en host y todos los remotos).

## Problemas comunes y soluciones

- NG0203: "inject() must be called from an injection context"
	- Causa: el remote necesita un EnvironmentInjector del host al usar APIs que emplean `inject()` (standalone components o providers) o hay incompatibilidad entre artefactos/versions.
	- Solución:
		1. Asegúrate de que el host crea componentes remotos pasando el environment injector:
			 - `viewContainerRef.createComponent(remote.App, { environmentInjector: this.environmentInjector })`
		2. Alinea la versión de Angular entre host y remotos (package.json) y vuelve a instalar y reconstruir.
		3. Limpia caché del navegador (Ctrl+F5) para evitar artefactos JS antiguos.

- Versiones mismatched / runtime errors relacionados con shared.strictVersion
	- Causa: los manifests (`remoteEntry.json`) indican `requiredVersion` y `version`; si difieren entre host y remoto con `strictVersion: true` puede fallar en runtime.
	- Solución:
		1. En `package.json` de host y remotos, alinea `@angular/*` a la misma versión (por ejemplo `20.3.1`).
		2. Ejecuta `npm install --legacy-peer-deps` si npm bloquea por peerDependencies.
		3. Rebuild de cada remoto: `ng build` o `ng serve` y vuelve a comprobar `remoteEntry.json`.

- `npm install` falla con ERESOLVE
	- Solución: `npm install --legacy-peer-deps` o limpiar `node_modules` y `package-lock.json` y volver a instalar.

- `remoteEntry.json` vs `remoteEntry.js`
	- En desarrollo el plugin `@angular-architects/native-federation` puede exponer `remoteEntry.json` (manifest) y servir dinámicamente módulos. Si tu host falla al cargar `.js` directo prueba usar `remoteEntry.json` en la configuración de carga mientras desarrollas.

## Scripts y sugerencias útiles

- Para evitar abrir muchas terminales, puedes usar `concurrently` o un script PowerShell que lance los `ng serve` en ventanas separadas.
- Mantén un archivo con los puertos mapeados para referencias rápidas (host:4200, mfe1:4201, mfe2:4202, mfe3:4203, mfe4:4204).

## Contacto y notas

Si aparece un error nuevo, copia la traza completa de la consola del navegador y el log de `ng serve` del microfrontend que falla y pégala aquí para diagnóstico.

En el contexto de @angular-architects/native-federation, el comando ng add se encargará de:

- Instalar el paquete como dependencia
- Configurar los archivos necesarios para native federation
- Establecer la configuración de microfrontend remoto
- Configurar el puerto especificado
- Crear los archivos de configuración necesarios (como federation.config.js)
