## **Create New Type**

```ts
method: POST
path: `/type/create`
required: "admin login"
body: type_name<string>
```

## **Get One Type**

```ts
method: GET
id: string
path: `/type/info/${id}`
required: "admin or teacher login"
```

## **Get All  Type**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/type/all?page=${page}&limit=${limit}`
required: "admin or teacher login"
```