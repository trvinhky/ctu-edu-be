## **Create New Subject**

```ts
method: POST
path: `/subject/create`
required: "admin or teacher login"
body: subject_name<string>
```

## **Update Subject**

```ts
method: PUT
id: string
path: `/subject/${id}`
required: "admin or teacher login"
body: subject_name<string> 
```

## **Get One Subject**

```ts
method: GET
id: string
path: `/subject/info/${id}`
```

## **Get All Subject**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/subject/all?page=${page}&limit=${limit}`
```