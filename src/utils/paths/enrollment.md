## **Create New Enrollment**

```ts
method: POST
path: `/enrollment/create`
required: "login"
body: (course_Id, student_Id)<string>
```

## **Get All Enrollment**

```ts
method: GET
page: int /* option */
limit: int /* option */
student: string /* account_Id */
course: string /* course_Id */
path: `/enrollment/all?page=${page}&limit=${limit}&student=${student}&course=${course}`
required: "login"
```