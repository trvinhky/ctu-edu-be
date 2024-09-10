## **Create New Result**

```ts
method: POST
path: `/result/create`
required: "login"
body: (student_Id, exam_Id)<string>, result_score<double>, result_completed<DATE>
```

## **Get All Students Of Exam**

```ts
method: GET
page: int /* option */
limit: int /* option */
exam: string /* exam_Id */
student: string /* account_Id */
path: `/result/all?page=${page}&limit=${limit}&exam=${exam}&student=${student}`
required: "login"
```