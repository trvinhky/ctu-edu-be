## **Create New Format**

```ts
method: POST
path: `/category/create`
required: "admin or teacher login"
body: (category_name, category_accept, category_description)<string>
```

## **Get One Format**

```ts
method: GET
id: string
path: `/category/info/${id}`
required: "admin or teacher login"
```

## **Update Format**

```ts
method: PUT
id: string
path: `/category/${id}`
required: "admin or teacher login"
body: (category_name, category_accept, category_description)<string>
```

## **Get All Format**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/category/all?page=${page}&limit=${limit}`
required: "admin or teacher login"
```