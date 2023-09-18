import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
const viewRoute = new Elysia({ prefix: "/view" });
viewRoute.use(html());

viewRoute.get(
  "/html",
  () => `
  <html lang="en">
      <head>
          <title>Hello World</title>
      </head>
      <body>
          <h1>Hello World</h1>
      </body>
  </html>  `
);

viewRoute.get("/jsx", () => (
  <html lang="en">
    <head>
      <title>Hello World</title>
    </head>
    <body>
      <h1>Hello World</h1>
    </body>
  </html>
));

export default viewRoute;