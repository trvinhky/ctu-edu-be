## **Create New Resource**

```ts
method: POST
path: `/resource/create`
required: "teacher or admin login"
body: (resource_url, lesson_Id, category_Id)<string>
```

## **Update Resource**

```ts
method: PUT
id: string
path: `/resource/${id}`
body: (resource_url, lesson_Id, category_Id)<string>
required: "teacher or admin login"
```

## **Get One Resource**

```ts
method: GET
id: string
path: `/resource/info/${id}`
```

## **Get All Resource**

```ts
method: GET
page: int /* option */
limit: int /* option */
lesson: string /* lesson_Id */
category: string /* category_Id */
path: `/resource/all?page=${page}&limit=${limit}&lesson=${lesson}&category=${category}`
```

## **Delete Resource**

```ts
method: DELETE
id: string
path: `/resource/${id}`
required: "teacher or admin login"
```