## **Create New Field**

```ts
method: POST
path: `/field/create`
required: "admin login"
body: (field_name, field_description)<string> // field_description - option
```

## **Update Field**

```ts
method: PUT
id: string
path: `/field/${id}`
required: "admin login"
body: (field_name, field_description)<string> // field_description - option
```

## **Get One Field**

```ts
method: GET
id: string
path: `/field/info/${id}`
```

## **Get All Field**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/field/all?page=${page}&limit=${limit}`
```