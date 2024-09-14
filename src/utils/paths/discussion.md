## **Create New Discussion**

```ts
method: POST
path: `/discussion/create`
required: "login"
body: (discussion_comment, lesson_Id, account_Id, parent_Id)<string>
```

## **Update Discussion**

```ts
method: PUT
id: string
path: `/discussion/${id}`
required: "login"
body: (discussion_comment, lesson_Id, account_Id, parent_Id)<string>
```

## **Get One Discussion**

```ts
method: GET
id: string
path: `/discussion/info/${id}`
```

## **Get All Discussion**

```ts
method: GET
page: int /* option */
limit: int /* option */
id: string /* lesson_Id */
path: `/discussion/all?page=${page}&limit=${limit}&id=${id}`
```