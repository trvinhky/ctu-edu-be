## **Create New Question Resource**

```ts
method: POST
path: `/question-resource/create`
required: "teacher login"
body: (question_resource_url, resource_type, question_Id)<string>
```

## **Update Question Resource**

```ts
method: PUT
id: string
path: `/question-resource/${id}`
required: "teacher login"
body: (question_resource_url, resource_type, question_Id)<string>
```

## **Get One Question Resource**

```ts
method: GET
id: string
path: `/question-resource/info/${id}`
required: "login"
```

## **Get All Question Resource**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/question-resource/all?page=${page}&limit=${limit}`
required: "login"
```

## **Delete Question Resource**

```ts
method: DELETE
id: string
path: `/question-resource/${id}`
required: "teacher login"
```