# Intro for myself

* Jovan Papalazoski
* Indeks: 173070
* Proektot e izraboten samostojno vo domasna okolina.

# Description
This application was made to be used at least at local level. That means that not only Krusevska-Odaja can use it, but other 
restaurants too. All it needs to be done is change logo and the products/ingredients that the restaurant is offering.
The application offers: 
* Ordering
* Reservation
* Register an account 
* Create/edit/delete product (for ingredient is implemented but not used)
* ...

# Guide for the application
When you start the back-end first type in browser http://localhost:8080/api/products/populateDB
to fill the local database with ingredients and products. After this step you are ready to start the front-end application.

Application has two previously registered user accounts for test:

1. Email: jovan.gppapi@hotmail.com; UserName: JuniorPapi Password: dd; Role: Admin

2. Email: jovan.papi@hotmail.com; UserName: Papi; Password: aa; Role: User

You can log in either with the email or the username.

If you want to use all features of the application (the ones that are currently implemented) like view suggested products; create/delete/edit product etc. then log in with the first account. Otherwise, login with the second account (try both for testing).

If you dont login, then you can only use the basic features of the application like home page, menu to search products only, voice assistant and about us page.

Either way, the use of the actions are restricted by the roles of the user or if user is not logged in. Message will be shown only if you are not logged in and you use actions like profile and reservation.

There are validation that can be tried to test the input data for: login; register; edit; change-password; edit product; reservation etc.

For everything else, use the application and discover its features.

# Voice assistant

First click the button, and while the red dot blinks in the browser site tab, then say:

1. Hello
2. Open profile page
3. Redirect to register page

...

You can also construct complex phrases like:

1. Please open menu salad/grill... for me.
2. Can you redirect me to home page ?
3. How about you open about us page ?

...

# When opening menu action, please click twice to open the drop down list

# User transaction

The transaction is processed via Stripe. You can make a transaction only if you have products in your cart. 
Then you type URL /my-cart or click the button View my cart via /menu/(salads;grill;drinks e.g.).
The rest is shown in the checkout modal which will appear after clicking the "Pay with card" button.
