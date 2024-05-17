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
$ http POST https://next-typescript-sample-mu.vercel.app/api/auth id=test@test.com password=admin
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 394
Content-Type: application/json; charset=utf-8
Date: Fri, 17 May 2024 10:26:00 GMT
Etag: "18a-x4l081GYDVrqx/UH227LxZgHrtA"
Server: Vercel
Set-Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY1NDYzNTksInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNzE1OTQxNTU5fQ._OeD5BwM7k0E4lhgzAnpIep0kqTrnyRrBTx9rRPBNa0; Max-Age=604800; Path=/; HttpOnly; Secure; SameSite=Strict
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/auth
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::85jjz-1715941559211-57d1cef7e138

{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY1NDYzNTksInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNzE1OTQxNTU5fQ._OeD5BwM7k0E4lhgzAnpIep0kqTrnyRrBTx9rRPBNa0",
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5NDE1NTksInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNzE1OTQxNTU5fQ.Ii8VUWPLQGxhZb26EmE9r18uqzc7WuRyYnH-tgA4cTo"
}
```

#### Sign Out

```
$ http POST https://next-typescript-sample-mu.vercel.app/api/auth/signout
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Fri, 03 May 2024 06:12:08 GMT
Etag: "f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/auth/signout
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::br6x2-1714716727836-bfedf344625d

{
    "status": "ok"
}
```

#### Session Check

```
% http POST https://next-typescript-sample-mu.vercel.app/api/auth/refreshTokenCheck X-REFRESH-TOKEN:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY1NDYzNTksInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNzE1OTQxNTU5fQ._OeD5BwM7k0E4lhgzAnpIep0kqTrnyRrBTx9rRPBNa0
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 154
Content-Type: application/json; charset=utf-8
Date: Fri, 17 May 2024 10:28:15 GMT
Etag: "9a-dQ193s2mrbh5ro8+rR+pyxZo+44"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/auth/refreshTokenCheck
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::fkcr4-1715941694783-94e18dfe9de3

{
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5NDE2OTUsImlhdCI6MTcxNTk0MTY5NX0.WL2chDFOEBpPga2kHbNWpfwpBJAE7sfhzR62rrMtbSc"
}
```

#### Change Password

```
% http POST https://next-typescript-sample-mu.vercel.app/api/password/change password=after
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Fri, 03 May 2024 06:13:10 GMT
Etag: "f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/password/change
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::j5fx9-1714716788641-e755a81c1a61

{
    "status": "ok"
}
```

#### Verify Code

```
% http POST https://next-typescript-sample-mu.vercel.app/api/code/verify code=123456
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Fri, 03 May 2024 06:13:30 GMT
Etag: "f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/code/verify
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::6k79d-1714716809333-a4060fa9e579

{
    "status": "ok"
}
```

### Product

#### Get

- find

```
% http 'https://next-typescript-sample-mu.vercel.app/api/products/get?id=1'
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Origin: *
Age: 0
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 102
Content-Type: application/json; charset=utf-8
Date: Thu, 16 May 2024 07:23:57 GMT
Etag: "66-iuGdBZkk9ljc2lvh62laBFM7VG0"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/products/get
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::8k486-1715844236791-775576aaa494

{
    "description": "16oz package of fresh organic strawberries",
    "id": 1,
    "name": "Strawberries",
    "quantity": 1
}
```

- findAll

```
% http 'https://next-typescript-sample-mu.vercel.app/api/products?page=0&rows=5'
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Age: 0
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 418
Content-Type: application/json; charset=utf-8
Date: Fri, 03 May 2024 06:13:57 GMT
Etag: "1a2-U2ohMMGmi3qNYLxR2flXsEJkdWk"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/products
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::8t9hx-1714716836152-7bf5ffb09cc2

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
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 62
Content-Type: application/json; charset=utf-8
Date: Fri, 03 May 2024 06:14:16 GMT
Etag: "3e-SJ+M8/k3jxQdby1x+z6RjeOr0dE"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/products/post
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::n7ql2-1714716855844-e25133f6efaf

{
    "description": "hoge",
    "id": 271,
    "name": "hoge",
    "quantity": "777"
}
```

#### Put

```
% http PUT 'https://next-typescript-sample-mu.vercel.app/api/products/put?id=4' name=hoge description=hoge quantity=777
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: PUT, OPTIONS
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 60
Content-Type: application/json; charset=utf-8
Date: Fri, 03 May 2024 06:14:32 GMT
Etag: "3c-n6NUU6qGGHwu3q1V68ShspQ8AVw"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/products/put
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::nmxkp-1714716871883-0f2b15f0fc5f

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
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: DELETE, OPTIONS
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 2
Content-Type: application/json; charset=utf-8
Date: Fri, 03 May 2024 06:14:47 GMT
Etag: "2-vyGp6PvFo4RvsFtPoIWeCReyIC8"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /api/products/delete
X-Vercel-Cache: MISS
X-Vercel-Id: hnd1::iad1::9pswr-1714716887230-788f7428ecbe

{}
```
