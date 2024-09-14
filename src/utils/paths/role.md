## **Create New Role**

```ts
method: POST
path: `/role/create`
required: "admin login"
body: role_name<string>
```

## **Get One Role By Id**

```ts
method: GET
id: string
path: `/role/info/${id}`
required: "admin login"
```

## **Get One Role By Name**

```ts
method: GET
name: string
path: `/role/name/${name}`
required: "admin login"
```

## **Get All Role**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/role/all?page=${page}&limit=${limit}`
required: "admin login"
```

## **Update Role**

```ts
method: PUT
id: string
path: `/role/${id}`
required: "admin login"
body: role_name<string>
```