# templates/spa

This template leverages [Remix SPA Mode](https://remix.run/docs/en/main/guides/spa-mode) and the [Remix Vite Plugin](https://remix.run/docs/en/main/guides/vite) to build your app as a Single-Page Application using [Client Data](https://remix.run/docs/en/main/guides/client-data) for all of your data loads and mutations.

## Setup

```shellscript
npx create-remix@latest --template remix-run/remix/templates/spa
```

## Development

You can develop your SPA app just like you would a normal Remix app, via:

```shellscript
npm run dev
```

## Production

When you are ready to build a production version of your app, `npm run build` will generate your assets and an `index.html` for the SPA.

```shellscript
npm run build
```

### Preview

You can preview the build locally with [vite preview](https://vitejs.dev/guide/cli#vite-preview) to serve all routes via the single `index.html` file:

```shellscript
npm run preview
```

> [!IMPORTANT]
>
> `vite preview` is not designed for use as a production server

### Deployment

You can then serve your app from any HTTP server of your choosing. The server should be configured to serve multiple paths from a single root `/index.html` file (commonly called "SPA fallback"). Other steps may be required if the server doesn't directly support this functionality.

For a simple example, you could use [sirv-cli](https://www.npmjs.com/package/sirv-cli):

```shellscript
npx sirv-cli build/client/ --single
```

## Sample Api

> Api Call by httpie

### Auth

#### Login

```
% http POST https://next-typescript-sample-mu.vercel.app/api/auth id=test@test.com password=admin
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 201
Content-Type: application/json; charset=utf-8
Date: Mon, 23 Aug 2021 23:29:25 GMT
ETag: "c9-6kjwixFGqj2C2hgCqf35OBK/l+Y"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk3NjQ5NjQsInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNjI5NzYxMzY0fQ.3M5XsLvIfiCcUcux6Ygs5X1GTksMtopwXPjf-cJdhr0"
}
```

#### Sign Out

```
% http POST https://next-typescript-sample-mu.vercel.app/api/auth/signout
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Thu, 19 Aug 2021 08:58:59 GMT
ETag: "f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok"
}
```

#### Session Check

```
% http POST https://next-typescript-sample-mu.vercel.app/api/auth/check "authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjc3OTk3ODgsInBheWxvYWQiOnsidXNlciI6ImFkbWluIn0sImlhdCI6MTYyNzc5NjE4OH0.vkZzymb3hyftl2pb75wuLKaavfnZV5ZlR88aISIQOBQ"
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 154
Content-Type: application/json; charset=utf-8
Date: Sun, 01 Aug 2021 05:37:18 GMT
ETag: "9a-WG2wB4ewrnriUOAqysn9WZKtyC4"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjc3OTk4MzgsImlhdCI6MTYyNzc5NjIzOH0.r7KYW3z8md7ZqN94TEuWRKoLRGB8Up6dAGkQrF7J9CE"
}
```

#### Change Password

```
% http POST https://next-typescript-sample-mu.vercel.app/api/password/change password=after
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Wed, 18 Aug 2021 05:47:58 GMT
ETag: "f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok"
}
```

#### Verify Code

```
% http POST https://next-typescript-sample-mu.vercel.app/api/code/verify code=123456
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Wed, 18 Aug 2021 05:49:36 GMT
ETag: "f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok"
}
```

### Product

#### Get

- findAll

```
% http 'https://next-typescript-sample-mu.vercel.app/api/products?page=0&rows=5'
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 418
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Jul 2021 06:28:56 GMT
ETag: "1a2-U2ohMMGmi3qNYLxR2flXsEJkdWk"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "count": 16,
    "data": [
        {
            "description": "16oz package of fresh organic strawberries",
            "id": 1,
            "name": "Strawberries",
            "quantity": 1
        },
        {
            "description": "Loaf of fresh sliced wheat bread",
            "id": 2,
            "name": "Sliced bread",
            "quantity": 2
        },
        {
            "description": "Bag of 7 fresh McIntosh apples",
            "id": 3,
            "name": "Apples",
            "quantity": 3
        },
        {
            "description": "no.4",
            "id": 4,
            "name": "Item4",
            "quantity": 4
        },
        {
            "description": "no.5",
            "id": 5,
            "name": "Item5",
            "quantity": 5
        }
    ]
}
```

#### Post

```
% http POST https://next-typescript-sample-mu.vercel.app/api/products/post name=hoge description=hoge quantity=777
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 62
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Jul 2021 06:26:47 GMT
ETag: "3e-jwZIwKhCJX29WAxEMJMPwUd7Hgk"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "description": "hoge",
    "id": 936,
    "name": "hoge",
    "quantity": "777"
}
```

#### Put

```
% http PUT 'https://next-typescript-sample-mu.vercel.app/api/products/put?id=4' name=hoge description=hoge quantity=777
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 60
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Jul 2021 06:30:16 GMT
ETag: "3c-n6NUU6qGGHwu3q1V68ShspQ8AVw"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "description": "hoge",
    "id": 4,
    "name": "hoge",
    "quantity": "777"
}
```

#### Delete

```
% http DELETE 'https://next-typescript-sample-mu.vercel.app/api/products/delete?id=4'
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Jul 2021 06:30:55 GMT
ETag: "2-vyGp6PvFo4RvsFtPoIWeCReyIC8"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{}
```
