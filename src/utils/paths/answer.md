## **Create New Answer**

```ts
method: POST
path: `/answer/create`
required: "login"
body: (option_Id, student_Id, question_Id)<string>, answer_correct<boolean>
// answer_correct - option, default: false
```

## **Update Answer**

```ts
method: PUT
id: string
path: `/answer/${id}`
required: "login"
body: (option_Id, student_Id, question_Id)<string>, answer_correct<boolean>
// answer_correct - option, default: false
```

## **Get All Answer**

```ts
method: GET
page: int /* option */
limit: int /* option */
question: string /* question_Id */
student: string /* account_Id */
option: string /* option_Id */
path: `/answer/all?page=${page}&limit=${limit}&question=${question}&student=${student}&option=${option}`
required: "login"
```