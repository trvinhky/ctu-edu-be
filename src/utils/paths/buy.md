## **Create New Buy**

```ts
method: POST
path: `/buy/create`
required: "login"
body: (resource_Id, student_Id)<string>
```

## **Get All Buy**

```ts
method: GET
page: int /* option */
limit: int /* option */
resource: string /* resource_Id */
student: string /* account_Id */
path: `/buy/all?page=${page}&limit=${limit}&resource=${resource}&student=${student}`
required: "login"
```