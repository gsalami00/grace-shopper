# Grace Shopper - Fullstack 1806
By: Andrew Drummond, Matt Krepp, and Geraldine Salamat
=======
# Livestockr

Since time immemorial, farmers have toiled under a system of livestock distribution that forced them to travel great distances to obtain livestock of dubious quality. Long have they yearned for a new regime; a regime under which they could view and obtain a healthy herd from the comfort of their own homes.

*Those days are through.*

Livestockr is an e-commerce site for buying livestock. We stock a wide variety of cattle, ungulates, rodents, and birds, and we deliver the animals right to your door within 2 days, absolutely free. Using our painless online portal, you will be presented with a diverse variety of animals. Our service is in no way exclusive to farmers; we're more than happy to deliver your llama to Williamsburg (city regulations be damned).

Livestockr also supports cryptocurrency payments using a bitpay integration, so you can purchase livestock with a degree of privacy and anonymity unheard of in legal circles. Looking for 200 head of cattle without Uncle Sam breathing down your neck? We're your guy.


### Technical Details
The core boilerplate of this app was made using [Boilermaker](https://github.com/FullstackAcademy/boilermaker) Using React and Redux, the site maintains a store shared by all components. To ensure a seamless shopping experience across the site, it handles guest and logged in users differently. Using localStorage, Livestockr implements a persistent cart for guest users. Logged in users' carts are stored on the backend database.

The app integrates with several third party providers. Using the Google login API, we have made it easier than ever to creat an account. On the payment end, the app integrates with Stripe and bitpay.


### Installation
Using npm:
```
npm i
npm run seed
npm start
```

Or, just visit the [deployed version](https://salty-earth-17929.herokuapp.com/checkout) of the site!
