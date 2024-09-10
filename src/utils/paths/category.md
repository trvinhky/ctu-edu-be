## **Create New Category**

```ts
method: POST
path: `/category/create`
required: "admin login"
body: category_name<string>
```

## **Get One Category**

```ts
method: GET
id: string
path: `/category/info/${id}`
required: "teacher login"
```

## **Get All Category**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/category/all?page=${page}&limit=${limit}`
required: "teacher login"
```