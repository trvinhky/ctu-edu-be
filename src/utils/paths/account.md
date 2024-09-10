## **Create New Account**

```ts
method: POST
path: `/account/create`
body: (password, email, name, role)<string> /* role - option */
```

## **Login**

```ts
method: POST
path: `/account/login`
body: (password, email)<string>
```

## **Update Access Token**

```ts
method: GET
path: `/account/token`
body: token<string>
```

## **Logout**

```ts
method: DELETE
path: `/account/logout`
required: "login"
```

## **Get Info Account**

```ts
method: GET
path: `/account/info`
required: "login"
```

## **Get All Account**

```ts
method: GET
page: int /* option */
limit: int /* option */
role: string /* role_Id */
path: `/account/all?page=${page}&limit=${limit}&role=${role}`
required: "admin login"
```