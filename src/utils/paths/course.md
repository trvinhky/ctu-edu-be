## **Create New Course**

```ts
method: POST
path: `/course/create`
required: "teacher login"
body: (course_name, course_content, course_image, course_required, teacher_Id, field_Id)<string>, course_total<int> 
// course_image, course_required - option
```

## **Update Course**

```ts
method: PUT
id: string
path: `/course/${id}`
required: "teacher login"
body: (course_name, course_content, course_image, course_required, teacher_Id, field_Id)<string>, course_total<int> 
// course_image, course_required - option
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
field: string /* field_Id */
path: `/course/all?page=${page}&limit=${limit}&title=${title}&field=${field}`
```