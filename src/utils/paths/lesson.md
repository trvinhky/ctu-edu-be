## **Create New Lesson**

```ts
method: POST
path: `/lesson/create`
required: "teacher or admin login"
body: (lesson_title, lesson_content, course_Id)<string>
// lesson_content - option
```

## **Update Lesson**

```ts
method: PUT
id: string
path: `/lesson/${id}`
required: "teacher or admin login"
body: (lesson_title, lesson_content, course_Id)<string>
// lesson_content - option
```

## **Get One Lesson**

```ts
method: GET
id: string
path: `/lesson/info/${id}`
```

## **Get All Lesson**

```ts
method: GET
page: int /* option */
limit: int /* option */
id: string /* option */
path: `/lesson/all?page=${page}&limit=${limit}&id=${id}`
```

## **Delete Lesson**

```ts
method: DELETE
id: string
path: `/lesson/${id}`
required: "teacher or admin login"
```