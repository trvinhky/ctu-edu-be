## **Create New Category**

```ts
method: POST
path: `/category/create`
required: "admin or teacher login"
body: (category_name, category_accept, category_description)<string>
```

## **Get One Category**

```ts
method: GET
id: string
path: `/category/info/${id}`
required: "admin or teacher login"
```

## **Update Category**

```ts
method: PUT
id: string
path: `/category/${id}`
required: "admin or teacher login"
body: (category_name, category_accept, category_description)<string>
```

## **Get All Category**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/category/all?page=${page}&limit=${limit}`
required: "admin or teacher login"
```