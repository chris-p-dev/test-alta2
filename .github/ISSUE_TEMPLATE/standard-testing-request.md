---
name: Standard Testing Request
about: Test report document required for deployment
title: v_._._ [Pre/Post]-Release Regression Test Request
labels: Alta - General, Status - Needs Work
assignees: bdmason42

---

## Page Load Testing
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Category Landing pages should load in less than 4 sec |
|  |  | Cached Category Product pages should load in less than 7 sec |
|  |  | Product Detail pages should load initial content in less than 4 sec |
|  |  | Searches should load in less than 7 sec |
|  |  | Blog Feed should load in less than 4 sec |
|  |  | Blog Posts should load in less than 3 sec |

## Functionality Testing
### Alta General
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Favicon is present |
|  |  | Breadcrumb navigation |
|  |  | Add-To-Cart notifications |
|  |  | Wishlist notifications |
|  |  | Compare notifications |

### Header
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Logo: Clicking it goes to home page. |
|  |  | Utility nav: Each link works correctly. |
|  |  | Utility nav: For LG/XL, if device supports touch: Mobile hamburger menu button should show. |
|  |  | Main nav: Categories and menu items show up, where applicable. |
|  |  | Search bar: It can type in and search results correctly. |
|  |  | Search bar: On Search Page, when page is refreshed: It should keep the search term. |

### Mobile Menu
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Menu: It can scroll via sliding (touch screen), mouse wheel (desktop) and browser scrollbar (desktop).  |
|  |  | Menu: It has the utility nav on top and main nav below. |
|  |  | Utility nav: Each link works correctly. |
|  |  | Main nav: Categories and menu items show up, where applicable. |
|  |  | Main nav: Clicking on the caret arrow works, for all levels. |
|  |  | Main nav: While at Level 1, "Main Menu" button goes back to the Main Menu. |
|  |  | Main nav: Clicking on any nav link closes the mobile menu automatically.  |

### Category Page
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Categories at Level 1 should be Landing pages |
|  |  | Categories at Level 2 should be Landing pages |
|  |  | Categories at Level 3 should be Product pages |
|  |  | Special Catalog (POSM) carousel |
|  |  | Filters |
|  |  | Sorting |
|  |  | Grid display mode |
|  |  | List display mode |
|  |  | "0 Product" does not show up when refreshing page or clicking on filters |
|  |  | PoSM Carousel is present
|  |  | PoSM carousel product data matches network/linked product data |

### Product Detail Page
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Image zoom |
|  |  | Image gallery |
|  |  | Addon products |
|  |  | Custom columns |
|  |  | Corner flag |
|  |  | Side flags |
|  |  | Image flag |
|  |  | CTA (Banner) flag |
|  |  | Related products are present |
|  |  | Related product page matches netwrok/linked product data |
|  |  | Upsell products |
|  |  | Upsell product page matches netwrok/linked product data
|  |  | Default spec content |
|  |  | [WebCollage spec content](http://altastaging.avbportal.com/product/bosch-front-load-washer-wat28402uc) |
|  |  | [Flix spec content](http://altastaging.avbportal.com/product/lg-studio-36-gas-cooktop-black-stainless-steel-lscg367bd-165019) |
|  |  | [CNET spec content ](http://altastaging.avbportal.com/product/sony-49-bravia-4k-ultra-hd-tv-with-hdr-xbr49x900f-149253)|
|  |  | Estimated shipping (no shipping restrictions) |
|  |  | Estimated shipping (w/ shipping restrictions) |
|  |  | Estimated shipping options should not be selectable |

### Reviews
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Review stars are present on the category/catalog pages |
|  |  | Review stars link to reviews page from catatalog/category pages |
|  |  | Review stars are present on the product detail page |
|  |  | Review stars on the product detail page do not directly link to anything |
|  |  | Review stars on the product detail page show a pop under when moused over  |
|  |  | "See all reviews" in reviews pop under links to reviews page |

### Cart Page
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | "No items" view |
|  |  | Addons |
|  |  | Quantity update |
|  |  | Remove from cart |
|  |  | Synchrony buttons |
|  |  | Amazon Login button |
|  |  | Valid Promo Code |
|  |  | Invalid Promo Code |
|  |  | Estimated shipping (no shipping restrictions) |
|  |  | Estimated shipping (w/ shipping restrictions) |
|  |  | Estimated shipping options should be selectable and selection carry over to Checkout |

### Checkout Page
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | "No items" redirect to Cart page |
|  |  | Address form blocks delivery method selection |
|  |  | Delivery method selection blocks payment method selection |
|  |  | Payment method selection blocks order placement |
|  |  | Synchrony auto place order on success |
|  |  | Zibby auto place order on success |
|  |  | PayPal payment method |
|  |  | Authorize.net payment method |
|  |  | Heartland payment method |
|  |  | Cybersource payment method |
|  |  | Place order |
|  |  | Amazon Login button |
|  |  | Amazon Pay button |
|  |  | Amazon address widget (when logged in w/ Amazon account)
|  |  | Amazon wallet widget (when logged in w/ Amazon account)
|  |  | Valid Promo Code |
|  |  | Invalid Promo Code |

### Account
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Create account |
|  |  | Login |
|  |  | Check for wishlist items |
|  |  | Logout |
|  |  | Amazon Login button |
|  |  | Amazon + Magento account reconciliation/association |

### Wishlist
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Add items |
|  |  | Remove items |
|  |  | "Add To Cart" from Wishlist |

### Compare
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Add items |
|  |  | Remove items |
|  |  | "Add To Cart" from Compare |
|  |  | Spec display for each item |

### Promotions
| Desktop Pass/Fail | Mobile Pass/Fail | Description |
|----|----|-------------------------------------------|
|  |  | Tiles: They show up. |
|  |  | "Load More" button: Clicking on it shows more tiles. |
|  |  | "Load More" button: It should disappear if there are no more tiles to show. |

### Blog
|Desktop Pass/Fail|MobilePass/Fail|Description|
|----|----|-------------------------------------------|
|  |  |Tiles: They show up|
|  |  |Like/Dislike and comment buttons work when logged in|
|  |  |Like/Dislike and comment buttons have a tooltip if not logged in|
|  |  |Images don't look too large or too small|

