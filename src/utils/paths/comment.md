## **Create New Comment**

```ts
method: POST
path: `/comment/create`
required: "login"
body: (comment_content, post_Id, account_Id, parent_Id)<string>
```

## **Update Comment**

```ts
method: PUT
id: string
path: `/comment/${id}`
required: "login"
body: comment_content<string>
```

## **Get One Comment**

```ts
method: GET
id: string
path: `/comment/info/${id}`
```

## **Get All Comment**

```ts
method: GET
page: int /* option */
limit: int /* option */
id: string /* post_Id */
path: `/comment/all?page=${page}&limit=${limit}&id=${id}`
```