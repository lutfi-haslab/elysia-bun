import { cors } from '@elysiajs/cors';
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cookieConfig, jwtConfig } from "./config";

import TestRoute from "./controller/test";
import viewRoute from "./view";

export const app = new Elysia()
app.use(cors())
app.use(jwtConfig)
app.use(cookieConfig);
app.use(swagger({
  path: '/doc/v1',
  documentation: {
    info: {
      title: "Haslab Documentation",
      version: '0.3.0'
    }
  }
}))
app.state('version', 1);
app.decorate('getDate', () => Date.now());
app.get('/', (context) => {
  return 'Hello World!'
})

// ROUTE
app.use(TestRoute)
app.use(viewRoute)

app.listen({
  port: 3000,
  hostname: 'localhost'
})

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);