## **Create New Status**

```ts
method: POST
path: `/status/create`
required: "admin login"
body: status_name<string>
```

## **Get One Status**

```ts
method: GET
id: string
path: `/status/info/${id}`
```

## **Get All  Status**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/status/all?page=${page}&limit=${limit}`
```