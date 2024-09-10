## **Create New Resource**

```ts
method: POST
path: `/resource/create`
required: "teacher login"
body: (resource_url, lesson_Id, resource_type)<string>
```

## **Update Resource**

```ts
method: PUT
id: string
path: `/resource/${id}`
body: (resource_url, lesson_Id, resource_type)<string>
required: "teacher login"
```

## **Get One Resource**

```ts
method: GET
id: string
path: `/resource/info/${id}`
required: "login"
```

## **Get All Resource**

```ts
method: GET
page: int /* option */
limit: int /* option */
type: string /* lesson_Id */
path: `/resource/all?page=${page}&limit=${limit}&type=${type}`
required: "login"
```