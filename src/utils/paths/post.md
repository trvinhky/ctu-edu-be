## **Create New Post**

```ts
method: POST
path: `/post/create`
required: "login"
body: (post_title, post_content, subject_Id, auth_Id)<string>
```

## **Update Post**

```ts
method: PUT
id: string
path: `/post/auth/${id}`
required: "login"
body: (post_title, post_content, subject_Id)<string>
```

## **Update Status Post**

```ts
method: PUT
id: string
path: `/post/status/${id}`
required: "admin login"
body: status_Id<string>
```

## **Get One Post**

```ts
method: GET
id: string
path: `/post/info/${id}`
```

## **Get All Post**

```ts
method: GET
page: int /* option */
limit: int /* option */
status: string /* option */
auth: string /* account_Id */
path: `/post/all?page=${page}&limit=${limit}&auth=${auth}&status=${status}`
```

## **Delete Post**

```ts
method: DELETE
id: string /* post_Id */
status: string /* status_Id */
path: `/post/delete?id=${id}&status=${status}`
required: "login"
```