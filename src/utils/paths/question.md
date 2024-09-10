## **Create New Question**

```ts
method: POST
path: `/question/create`
required: "teacher login"
body: (question_content, category_Id, auth_Id)<string>
```

## **Update Question**

```ts
method: PUT
id: string
path: `/question/${id}`
required: "teacher login"
body: (question_content, category_Id, auth_Id)<string>
```

## **Get One Question**

```ts
method: GET
id: string
path: `/question/info/${id}`
required: "login"
```

## **Get All Question**

```ts
method: GET
page: int /* option */
limit: int /* option */
id: string /* account_Id */
path: `/question/all?page=${page}&limit=${limit}&id=${id}`
required: "login"
```

## **Delete Question**

```ts
method: DELETE
id: string
path: `/question/${id}`
required: "teacher login"
```