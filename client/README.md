# Conversion Notes

Next JS - PORTING STEPS

## Init

https://nextjs.org/docs/getting-started

`npx create-next-app`

## Local Dev

1. Git clone/checkout
2. `yarn`
3. Copy `.env.sample` to `.env.local`
   1. Set API_HOST to member site

### Just NextJS

1. `yarn dev`

> Rungs nextjs(port 3000)

### Docker Compose

1. `docker-compose up --build`

> If out of memory error, `docker system prune -a`

> Runs Nginx(port 80) => nextjs(port 3000)

- Able to request with Postman
  - unselect auto generated Host header
  - Add Host header at bottom, set to member domain
    - www.aztecappliance.com
    - www.bigsandysuperstore.com
    - huppins.com

**Need to figure out dev/watch mode to update nextjs container**

**Need to figure out how to reliably use chrome**

## Recent Next JS Blog Post

https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation

## TODO

- [ ] header/nav
  - [ ] react-router-hashlink replacement
  - [ ] Links not styled like before
  - [ ] Dropdowns not showing on hover
  - [ ] Not same demensions as legacy alta
  - [ ] not acting sticky
    - [ ] do we still need sticky bits without IE support?
- [ ] use of window/document breaks SSR
  - [ ] inobounce
  - [ ] current-device
  - [ ] externals (acima,zibby)
    - [ ] make sure jquery works for Synchrony
  - [ ] Tried using `next/dynamic`
    - doesn't seem to load client side
- [ ] `@history`
  - [ ] getLocation
  - [ ] routeTo - internal url
  - [ ] navigateTo - external url
    - [ ] `next/router` recomends window.location
      - How to handle for SSR and window undefined error
  - [ ] Hopefully can use all form `next/router`
    - https://nextjs.org/docs/api-reference/next/router
    - [ ] `useRouter` replaces `useHistory` hook
    - [ ] `withRouter` for class components (same as `react-router-dom`)
    - [ ] router.push replaces history.push
- [ ] React Helmet to `next/head`
- [ ] Redux
  - New recommended way is using `getServerSideProps`
    - Haven't figured out how to get /config and base calls work with page calls
    - May need this: https://github.com/kirill-konshin/next-redux-wrapper
- [ ] `yarn build` to force create static assets
  - [ ] make sure Magento servable like current alta
  - [ ] Error: `404`/`404.html`
    - `React.Children.only expected to receive a single React element child.`
- [ ] `yarn start` - Node Server side
  - Way to run without custom server?
    - custom server removes serverless functions and automatic statis
      optimizations
  - [x] Handle dynamic routes from range of memebrs. Examples:
    - [x] Think getting host from request and passing to creating store to set
          for api baseURL
    - https://www.aztecappliance.com/
    - https://www.bigsandysuperstore.com/
    - Current Prerender gets request: http://localhost:3000/
  - [x] ~~Use Nginx reverse proxy like current prerender?~~
    - Request to ngnix: request: "GET /https://www.universityelectric.com"
    - Reqest from nginx to renderer:
      "http://172.24.0.4:3000/https://www.universityelectric.com"
    - **May not work with page routing, may have to get site info from req
      header**
      - req.host, Need to make sure Magento just does normal proxy password
        - no route rewrite
        - proxy the host header
  - [ ] Logging
- [ ] Dynamic per member PWA
  - [ ] app manifest (json)
    - could be custom api route to return dynamic json
    - or if redux store accessable in \_document, can generate there
  - [ ] range of icons(equal dimensions):
    - 72, 9, 128, 144, 152, 192, 384, 512; don't know if all are needed
  - [ ] Service Worker
    - [ ] `next-offline`

## Components

alta: `components`, `features` (maybe move features into components) to
components for next

Remove `@` from imports(store, history, utils, hooks, externals)

> history is temp, will be replaced by next/link

## React Router Dom

Switch to using `next/link`

https://nextjs.org/docs/api-reference/next/link

`import Link from 'next/link'`

Change to => href

`import { useRouter } from 'next/router'`

Chante useHistory => useRouter

> How to convert from react-router-hashlink ?

## Redux

### Actions/Thunks

Add extra to thunk parameters, destructure api, rename magento to api:

```javascript
async (dispatch, getState, extra) => {
  const { api } = extra;

  const { data } = api.get(``);
};
```

## React Helmet

Convert `react-helmet` to `next/head`

> Basically just replace <Helmet> => <Head>

## Use of window or document

https://nextjs.org/docs/advanced-features/dynamic-import

> Don't know if this is for components only or any JS import

Some packages use these, alongside externals, and some components as well

## Routes/Pages

pages will be ported over to nextjs in pages following certain pattern:

    - how to deal with catalog, special, and search all using same layout but custom fetches?

    - how do we handle disabled routes (login in Routes.tsx of current alta)

```

/blog
    /[year]
        /[month]
            index.tsx - blog list for specific month in specific year

        index.tsx - blog list for specific year

    [key].tsx - blog post

    index.tsx - blogs listing page

/brands
    /ct
        [brand].tsx - display dynamic brands page

/catalog
    /sepcial
        /[attribute]
            [value].tsx - special catalog

    /product
        /view
            /id
                [productId].tsx - redirect to `/product/${productId}`

    [key].tsx - normal catalog page

    index.tsx - root catalog page

/checkout
    cart.tsx - cart

    onepage.tsx - checkout

    success.tsx - success page
        need query params for some third party returns

/customer
    /account
        /resetpassword
            index.tsx - reset account password page

    /amazon
        verify.tsx - needs to look at route query params, verifies amazon to existing magento account with same email login

    /account
        index.tsx - route to home page

/gafco - thse may need to be in root as gafco-apply.tsx and gafco-status.tsx if rolled out after
    apply.tsx - gafco apply page

    status.tsx - gafco status page

/paypal
    /express
        return.tsx - get query params in url, save express info and update magento, send to checkout page(?)

        cancel.tsx - redirect to cart, paypal express rejected/canceled

/product
    /[key]
        index.tsx - product page

        reviews.tsx - product reviews page

/search
    [value].tsx - search page using catalog layout

_app.tsx - custom app for redux, material ui, etc
_document.tsx - custom html document, dont know if can get access to redux store(could help with PWA things)

[id].tsx - cms route, bsically exports default import from index.tsx

compare.tsx - compare page

index.tsx - root route('/'), used for cms routes(default = 'home')

promos.tsx - export default import from promotions
promotions.tsx - promotions page

wishlist - wishlist page

// how to handle auto route for index.html to home? id from pages/[id].tsx for cms id = home

```

## History

Current Alta uses a mix of react-router-dom(useHistory, other hooks) and a
utility function in @history

> This will need to be converted over to using next/router. Don't know how
> easily it can be accesed via redux actions like history.push

## Redux SSR fetching

https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation

know getInitiProps works for redux store and having available for app wide call
and page specifics calls - is there a way to hanlde this through
getServerProps(new way of hanlding), think they say more efficient

Have small POC working with getInitialProps working with redux store, not the
cleanest

\_app.tsx - getInitialProps

```
CustomApp.getInitialProps = async (appCtx) => {
  const { Component, ctx, router } = appCtx;

  const reduxStore = initStore();
  const { dispatch } = reduxStore;

  await Promise.all([
    dispatch(fetchConfig()),
    dispatch(fetchBlocks()),
    dispatch(fetchBlock("footer")),
    dispatch(fetchCategories()),
    dispatch(fetchMenus()),
  ]);

  // call page initialProps to update store
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps({ ...ctx, router, store: reduxStore })
    : {};

  const appProps = await App.getInitialProps(appCtx);

  return { ...appProps, pageProps };
};
```

[id].tsx - cms page

```
CmsPage.getInitialProps = async (ctx) => {
  const { store, router } = ctx;
  if (!store) return {};

  const id = router?.query?.id || "home";
  await store.dispatch(fetchPage(id));

  return { initialState: store.getState() };
};
```

## When hosted

    how to handle multi member requests to nextjs (using request header for host)

    Do we build initial files( same as current magento serving), client side only way

## Third Party Integrations / Externals

    how to handle acima, synchrony, paypalobjects, webcollage, zibby

## Phases - WIP

1. Phase 0
   1. POC, get in working state for CMS + blog (this can then start testing CI
      sites)
   2. Host in testing environment, send google bot from testing site to NEXTJS
   3. Try to discover how to handle all testing sites(big sandy, avintel,
      testing) dynamically
2. Phase 1
   1. Catalog, Product, Product Reviews, Brands landing, Promotions
   2. Will need to start handling 3rd party content(product info: cnet, syndigo,
      flix)
   3. Host in prod, point some staging sites towards it
3. Phase 2
   1. Cart, Checkout, Checkout Success
   2. No SSR for these pages
   3. Host in prod, point spa test + staging sites
4. Phase 3
   1. Make sure up to date with current Alta features
   2. Point 1 prod member site
   3. Dial in efficiencies
   4. Dial in logging system

## Examples

> Examples to look at and try to implementation

- https://github.com/vercel/next.js/tree/canary/examples/with-next-offline
- https://github.com/vercel/next.js/tree/canary/examples/with-redux-wrapper
- https://github.com/vercel/next.js/tree/canary/examples/ssr-caching
  - Don't know if this would be needed if static regeneration is working

# Next JS README

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `pages/index.js`. The page
auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.
