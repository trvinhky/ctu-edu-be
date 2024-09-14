## **Create New Option**

```ts
method: POST
path: `/option/create`
required: "teacher or admin login"
body: (option_content, question_Id)<string>, option_is_correct<boolean>
// option_is_correct - option, default: false
```

## **Update Option**

```ts
method: PUT
id: string
path: `/option/${id}`
required: "teacher or admin login"
body: (option_content, question_Id)<string>, option_is_correct<boolean>
// option_is_correct - option, default: false
```

## **Get One Option**

```ts
method: GET
id: string
path: `/option/info/${id}`
required: "login"
```

## **Get All Option**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/option/all?page=${page}&limit=${limit}`
required: "login"
```

## **Delete Option**

```ts
method: DELETE
id: string
path: `/option/${id}`
required: "teacher or admin login"
```