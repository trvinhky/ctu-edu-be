## **Create New Review**

```ts
method: POST
path: `/review/create`
required: "login"
body: (review_comment, student_Id, course_Id)<string>, review_rating<float>
```

## **Update Review**

```ts
method: PUT
id: string
path: `/review/${id}`
required: "login"
body: (review_comment, student_Id, course_Id)<string>, review_rating<float>
```

## **Get One Review**

```ts
method: GET
id: string
path: `/review/info/${id}`
```

## **Get All Review**

```ts
method: GET
page: int /* option */
limit: int /* option */
student: string /* option */
course: string /* option */
path: `/review/all?page=${page}&limit=${limit}&student=${student}&course=${course}`
```

## **Delete Review**

```ts
method: DELETE
id: string
path: `/review/${id}`
required: "login"
```