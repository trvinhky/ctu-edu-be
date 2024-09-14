## **Create New Question Exam**

```ts
method: POST
path: `/question-exam/create`
required: "teacher or admin login"
body: (exam_Id, question_Id)<string>, question_exam_score<double>
```

## **Update Question Exam**

```ts
method: PUT
question: string /* question_Id */ 
exam: string /* exam_Id */
path: `/question-exam/update?exam=${exam}&question=${question}`
required: "teacher or admin login"
body: question_exam_score<double>
```

## **Get All Question Exam**

```ts
method: GET
page: int /* option */
limit: int /* option */
exam: string /* exam_Id - option */
question: string /* question_Id - option */
path: `/question-exam/all?page=${page}&limit=${limit}&exam=${exam}&question=${question}`
```

## **Delete Question Exam**

```ts
method: DELETE
question: string /* question_Id */ 
exam: string /* exam_Id */
path: `/question-exam/delete?exam=${exam}&question=${question}`
required: "teacher or admin login"
```