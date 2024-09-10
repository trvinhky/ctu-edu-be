## **Get Profile**

```ts
method: GET
id: string
path: `/profile/${id}`
required: "login"
```

## **Update Profile**

```ts
method: PUT
id: string
path: `/profile/${id}`
body: (profile_name, profile_address, profile_phone, profile_avatar, profile_info)<string>, profile_birthday<DATE>
/* profile_name - required */
required: "login"
```