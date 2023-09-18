import { Elysia, t } from "elysia";
import { cookieConfig, jwtConfig } from "../config";

const TestRoute = new Elysia({ prefix: "/test" })
.use(jwtConfig)
.use(cookieConfig);

TestRoute.get("/", (context) => {
  context.set.status = 200;
  const version = (context as MyContext).store.version;
  const date = (context as MyContext).getDate?.();

  return `Hello Test with version ${version} ${date}`;
});

TestRoute.get("/:id", (context) => context.params.id);

TestRoute.post("/single", ({ body: { file } }) => file, {
  body: t.Object({
    file: t.File(),
  }),
});

TestRoute.get('/sign/:name', async ({ jwt, cookie, setCookie, params }) => {
  setCookie('auth', await jwt.sign(params), {
    httpOnly: true,
    maxAge: 7 * 86400,
  })

  return `Sign in as ${cookie.auth}`
}, {
  detail: {
    tags: ['auth']
  }
})

TestRoute.get('/profile', async ({ jwt, set, cookie: { auth } }) => {
  const profile = await jwt.verify(auth)

  if (!profile) {
    set.status = 401
    return 'Unauthorized'
  }

  return `Hello ${profile.name}`
})

export default TestRoute;
