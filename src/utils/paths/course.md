## **Create New Course**

```ts
method: POST
path: `/course/create`
required: "teacher or admin login"
body: (course_name, course_content, course_image, teacher_Id, subject_Id)<string>
// course_image - option
```

## **Update Course**

```ts
method: PUT
id: string
path: `/course/${id}`
required: "teacher or admin login"
body: (course_name, course_content, course_image, teacher_Id, subject_Id)<string>
// course_image - option
```

## **Get One Course**

```ts
method: GET
id: string
path: `/course/info/${id}`
```

## **Get All Course**

```ts
method: GET
page: int /* option */
limit: int /* option */
title: string /* option */
subject: string /* subject_Id */
path: `/course/all?page=${page}&limit=${limit}&title=${title}&subject=${subject}`
```