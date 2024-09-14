## **Create New Exam**

```ts
method: POST
path: `/exam/create`
required: "teacher or admin login"
body: (exam_title, exam_description, course_Id)<string>, exam_total_score<double>, exam_start_time<DATE>, exam_limit<int>
// exam_description, exam_limit - option
```

## **Update Exam**

```ts
method: PUT
id: string
path: `/exam/${id}`
required: "teacher or admin login"
body: (exam_title, exam_description, course_Id)<string>, exam_total_score<double>, exam_start_time<DATE>, exam_limit<int>
// exam_description, exam_limit - option
```

## **Get One Exam**

```ts
method: GET
id: string
path: `/exam/info/${id}`
```

## **Get All Exam**

```ts
method: GET
page: int /* option */
limit: int /* option */
path: `/exam/all?page=${page}&limit=${limit}`
```

## **Delete Exam**

```ts
method: DELETE
id: string
path: `/exam/${id}`
required: "teacher or admin login"
```