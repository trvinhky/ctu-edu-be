## **Get Code By Email**

```ts
method: POST
path: `/account/code`
body: email<string>
```

## **Get Captcha**

```ts
method: GET
path: `/account/captcha`
```

## **Create New Account**

```ts
method: POST
path: `/account/create`
body: (password, email, name, role, code)<string> /* role - option */
```

## **Login**

```ts
method: POST
path: `/account/login`
body: (password, email, captcha)<string>
```

## **Get One By Email**

```ts
method: POST
path: `/account/email`
body: email<string>
```

## **Update Access Token**

```ts
method: GET
path: `/account/token`
```

## **Update Password**

```ts
method: PUT
body: (password, code)<string>
path: `/account/password`
required: "login"
```

## **Forgot Password**

```ts
method: PUT
body: (password, code, email)<string>
path: `/account/forgot`
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