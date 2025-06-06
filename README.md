# Star Weather Service

Microservicio serverless en Node.js/NestJS que fusiona datos meteorológicos reales con planetas de Star Wars, usando Clean Architecture y DynamoDB.

---

## Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Flujo Principal](#flujo-principal)
- [Endpoints API](#endpoints-api)
- [Paginación](#paginación)
- [DynamoDB](#dynamodb)
- [Variables de Entorno](#variables-de-entorno)
- [Desarrollo Local](#desarrollo-local)
- [Deploy](#deploy)
- [Notas](#notas)

---

## Arquitectura

El proyecto sigue los principios de Clean Architecture:

- `domain/`: Entidades y contratos de dominio.
- `application/`: Casos de uso y DTOs.
- `infrastructure/`: Implementaciones concretas (servicios, repositorios, clientes HTTP, persistencia).
- `presentation/`: Controladores HTTP (NestJS).

---

## Estructura de Carpetas

```bash
src/
  modules/
    weather/
      domain/
        planet-weather.entity.ts
      application/
        dto/
          planet-weather-create.dto.ts
          planet-weather.dto.ts
          planet-weather-list.dto.ts
        use-cases/
          get-all-planet-weather.use-case.ts
      infrastructure/
        http/
          swapi.client.ts
          weather.client.ts
        persistence/
          planet-weather.repository.ts
          dynamodb.config.ts
        services/
          planet-weather.service.ts
      presentation/
        controllers/
          planet-weather.controller.ts
  shared/
    location.util.ts
app.module.ts
main.ts
```

---

## Flujo Principal

1. El controlador recibe la petición HTTP.
2. El caso de uso orquesta la lógica y llama al servicio.
3. El servicio fusiona datos meteorológicos y planetarios, y persiste el resultado.
4. El repositorio guarda y consulta datos en DynamoDB.
5. La respuesta se devuelve al cliente, con soporte de paginación.

---

## Endpoints API

### `GET /planet-weather`

Obtiene una lista paginada de registros de clima fusionados.

**Query Params:**
- `autogenerated` (boolean): Filtra por registros generados automáticamente (true/false).
- `limit` (number): Cantidad máxima de resultados por página.
- `lastKey` (string): Cursor de paginación (base64).

**Ejemplo:**

```
GET /planet-weather?autogenerated=true&limit=10
```

**Respuesta:**

```json
{
  "items": [
    {
      "id": "uuid",
      "timestamp": 1717280000000,
      "location": "64.14, -21.97",
      "temperature": 20,
      "humidity": 60,
      "planetName": "Tatooine",
      "planetClimate": "arid",
      "matchScore": 95,
      "autogenerated": 1
    }
  ],
  "lastKey": "eyJpZCI6ICJ1dWlkIiwgImF1dG9nZW5lcmF0ZWQiOiAxIH0=" // base64
}
```

---

### `POST /planet-weather`

Crea un nuevo registro de clima fusionado.

**Body:**

```json
{
  "location": "64.14, -21.97",
  "temperature": 20,
  "humidity": 60,
  "planetName": "Tatooine",
  "planetClimate": "arid"
}
```

---

## Paginación

- El campo `lastKey` en la respuesta es un string codificado en base64.
- Para obtener la siguiente página, pásalo como query param.
- El backend lo decodifica y lo usa como `ExclusiveStartKey` en DynamoDB.

---

## DynamoDB

**Tabla:** `${self:service}-${opt:stage, self:provider.stage}`  
**Clave primaria:** `id (S)`  
**Índice secundario global:** `autogenerated-index`

**Partition Key del índice:** `autogenerated (N)`  

**Ejemplo en `serverless.yml`:**

```yaml
resources:
  Resources:
    PlanetWeatherTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:provider.environment.DYNAMODB_TABLE}
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
          - AttributeName: autogenerated
            AttributeType: N
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        GlobalSecondaryIndexes:
          - IndexName: autogenerated-index
            KeySchema:
              - AttributeName: autogenerated
                KeyType: HASH
            Projection:
              ProjectionType: ALL
        BillingMode: PAY_PER_REQUEST
```

---

## Variables de Entorno

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `DYNAMODB_TABLE`

---

## Desarrollo Local

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar DynamoDB local (si usas `serverless-offline`).

3. Levantar el servicio:

```bash
npx serverless offline
```

4. Correr los tests:

```bash
npm run test
npm run test:e2e
```

---

## Deploy

```bash
npx serverless deploy
```

---

## Notas

- El campo `autogenerated` debe ser 0 o 1 (tipo N) para funcionar con el índice.
- El paginado usa `lastKey` codificado en base64.
- El controlador decodifica `lastKey` antes de pasarlo al repositorio.

**Clean Architecture:**
- Controllers → `presentation/`
- Casos de uso y DTOs → `application/`
- Servicios, repositorios, clientes → `infrastructure/`
- Entidades → `domain/`

---

### Ejemplo de paginación (cliente JS)

```ts
// Para la siguiente página:
const lastKeyObj = { id: "uuid", autogenerated: 1 };
const lastKeyParam = btoa(JSON.stringify(lastKeyObj));
fetch(`/planet-weather?autogenerated=true&limit=10&lastKey=${encodeURIComponent(lastKeyParam)}`);
```

## Probar los Endpoints

Puedes probar los endpoints directamente desde **API Gateway** en la siguiente URL base: https://284cnk28di.execute-api.us-east-2.amazonaws.com/dev/

### Auth

#### Signup (Registro) - `POST /auth/signup`

**URL:**  
`https://284cnk28di.execute-api.us-east-2.amazonaws.com/dev/auth/signup`

**Body:**
```json
{
  "name": "Israel",
  "lastName": "Matias",
  "email": "israelmatiasl@gmail.com",
  "password": "123456789"
}
```

#### Signin (Login) - `POST /auth/signin
**URL:**  
`https://284cnk28di.execute-api.us-east-2.amazonaws.com/dev/auth/signin`

**Body:**
```json
{
  "email": "israelmatiasl@gmail.com",
  "password": "123456789"
}
```

### Weather

#### Fusionado (Sin autenticación) - `GET /planet-weather/autogenerated`

**URL:**  
`https://284cnk28di.execute-api.us-east-2.amazonaws.com/dev/planet-weather/autogenerated`


#### Creación (Con autorización) - `POST /planet-weather`

**URL:**  
`https://284cnk28di.execute-api.us-east-2.amazonaws.com/dev/planet-weather`

**Body:**
```json
{
  "location": "30.40, 31.41",
  "temperature": 22.1,
  "humidity": 66,
  "planet_name": "Naboo",
  "planet_climate": "temperate"
}
```


#### Historial fusionado (Con autorización) - `GET /planet-weather?lastKey=<valor_base64>`

**URL:**  
`https://284cnk28di.execute-api.us-east-2.amazonaws.com/dev/planet-weather`

Si la respuesta incluye un campo `lastKey`, puedes enviarlo como query param en la siguiente petición para obtener la página siguiente:
