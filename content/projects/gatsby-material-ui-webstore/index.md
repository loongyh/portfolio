---
title: Gatsby Material-UI Webstore
description: Serverless eCommerce webstore based on Gatsby.js, Material-UI, Google Apps.
thumbnail: icon-512x512.png
start: 2020-01-01T18:42:38.976Z
end: 2020-04-01T18:42:38.989Z
---
## Intro

There are many options nowadays to set-up a webstore. Small business owners usually contract a freelancer or web development firm to do it for them. [Shopify](https://www.shopify.com/) and [WooCommerce](https://woocommerce.com/) are two of the most popular platforms deployed. Such projects are usually a one-off thing and once the site is up, unless there is a maintenance contract, the system is handed over to the business owner to manage.

A client approached me to build a webstore to list their products online and take orders. **Budget** and **ease-of-use** were their primary concerns. Their requirements were for it to have a fast, modern and user-friendly interface, be mobile responsive, SEO-optimised, and easy to self-manage the product listings.

## Problem

Self-hosted sites like WooCommerce, which is based on WordPress, usually have an always-running backend that connects to a database to build each requested page on demand. We call such sites “dynamically-generated” sites. On budget hosting plans, this usually **results in a very slow browsing experience** for customers.

The presence of an exposed backend and database also presents a **risk of breach of customer data**, since most clients will not have the technical know-how to keep the WordPress packages [up-to-date](https://kinsta.com/blog/is-wordpress-secure/) against the latest security vulnerabilities.

## Solution

Upon learning about the benefits of static sites and the [JAMStack](https://jamstack.org/) concept, I took to addressing the above concerns and wrote a statically-generated webstore and opensourced it as [gatsby-mui-webstore](https://github.com/gatsbymuiwebstore/gatsby-mui-webstore). Check out the live [demo](https://gmws.netlify.app/).

![Products page](1.png "Products Page")

I have wrote the website frontend with [GatsbyJS](https://www.gatsbyjs.com/) + [Material-UI](https://material-ui.com/), and the order processing backend with [Node.js](https://nodejs.org/en/) [serverless lambda functions](https://www.netlify.com/products/functions/). Google Apps such as Drive, Docs, Sheets and Gmail are used to manage the products listings and orders, as such there are **no unfamiliar UIs** for the client to learn.

![Products database](2.png "Products Database")

Changes to the product listings can be made directly on the Google Sheets database, and after clicking on the deploy button it will then trigger the site to rebuild.

During every build process, all the products data and images are pulled from Google Sheets and Drive. All site pages are then pre-compiled and ready to be served directly to browsers. This eliminates the need for an always-running backend and database and results in **blazing-fast** page load times. Running costs are also **kept to a minimum** as most static site hosters have free tiers.



//The entire shopping process from browsing and adding items to cart; calculation of order totals with discounts and promos; filling up the ordering form. On submission, the entire order is then sent to a serverless lambda function, with the order details being sent out via email on successful verification.

![](3.png)

The entire shopping process from first visit, checkout, to confirmation of order and payment is all done using JavaScript in the browser in a snappy app-like experience.