## **Create New Question Resource**

```ts
method: POST
path: `/question-resource/create`
required: "teacher or admin login"
body: (question_resource_url, category_Id, question_Id)<string>
```

## **Get One Question Resource**

```ts
method: GET
id: string
path: `/question-resource/info/${id}`
```

## **Get All Question Resource**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/question-resource/all?page=${page}&limit=${limit}`
```

## **Delete Question Resource**

```ts
method: DELETE
id: string
path: `/question-resource/${id}`
required: "teacher or admin login"
```