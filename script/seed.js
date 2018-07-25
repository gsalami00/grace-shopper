'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Animal} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({
      firstName: "Andrew",
      lastName: "Drummond",
      email: "andrew@drummond.com",
      password: "password",
      address: "123 Alpaca Lane, Llama City, CA 27723"
    }),
    User.create({
      firstName: "Matt",
      lastName: "Krepp",
      email: "matt@krepp.com",
      password: "password",
      address: "456 Sheep Avenue, Wool City, FL 64532"
    }),
    User.create({
      firstName: "Gini",
      lastName: "Salamat",
      email: "gini@salamat.com",
      password: "password",
      address: "789 Chinchilla Road, Fluffy City, NY 97564"
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const animals = await Promise.all([
    Animal.create({
      species: "Llama",
      imageUrl: "http://www.publicdomainpictures.net/pictures/220000/velka/llama-1496506182gy7.jpg",
      price: 21895.11,
      description: "Craft beer activated charcoal taxidermy cray. Af cronut celiac microdosing, PBR&B banh mi distillery freegan you probably haven't heard of them seitan. Ugh tilde austin, leggings whatever twee letterpress polaroid butcher marfa pop-up gochujang raclette. Locavore pickled viral unicorn neutra butcher yuccie palo santo."
    }),
    Animal.create({
      species: "Mountain Goat",
      imageUrl: "https://www.nps.gov/common/uploads/stories/images/nri/20161004/articles/B2091E24-1DD8-B71B-0B39299C92809B35/B2091E24-1DD8-B71B-0B39299C92809B35.jpg",
      price: 16796.93,
      description: "Tacos stumptown bicycle rights forage iPhone, put a bird on it hella shabby chic keffiyeh celiac. Keytar flannel synth, whatever kickstarter vexillologist wolf adaptogen. Scenester kogi green juice, leggings chicharrones tousled meggings offal microdosing helvetica gastropub fanny pack cloud bread. Af shoreditch DIY, adaptogen umami snackwave distillery heirloom tote bag photo booth viral shabby chic."
    }),
    Animal.create({
      species: "Highland Cattle",
      imageUrl: "https://countrysidenetwork.com/wp-content/uploads/GettyImages-845355220.jpg",
      price: 18959.59,
      description: "Semiotics enamel pin mustache blog, migas ramps fam. Tbh green juice etsy cloud bread roof party, vinyl skateboard selvage iceland. Scenester kale chips brooklyn lyft, four loko YOLO food truck williamsburg mlkshk swag snackwave gluten-free tacos. Intelligentsia VHS hella pok pok man bun you probably haven't heard of them try-hard locavore occupy thundercats post-ironic enamel pin chia. Meh bitters selvage raclette cliche stumptown iceland echo park poutine tumeric."
    }),
    Animal.create({
      species: "Domestic Sheep",
      imageUrl: "https://www.thefactsite.com/wp-content/uploads/2012/12/sheep-facts.jpg",
      price: 14957.44,
      description: "Fingerstache tofu keffiyeh messenger bag af craft beer scenester heirloom cronut put a bird on it deep v farm-to-table. Salvia before they sold out tbh meditation, neutra thundercats plaid kitsch green juice. Godard ethical locavore, austin narwhal selfies ennui keytar deep v meh. Salvia 90's venmo flexitarian. VHS narwhal flannel irony try-hard master cleanse lo-fi deep v meh."
    }),
    Animal.create({
      species: "Domestic Pig",
      imageUrl: "https://img00.deviantart.net/d68a/i/2012/148/b/5/fat_pig_by_emberwood_stables-d51flog.jpg",
      price: 14957.44,
      description: "Vegan lo-fi kitsch, semiotics truffaut prism chicharrones glossier tattooed cliche microdosing post-ironic fixie. Poke vinyl franzen beard pour-over tattooed semiotics austin leggings PBR&B chillwave trust fund locavore lumbersexual. Edison bulb prism cornhole brooklyn vaporware. Banjo green juice migas try-hard kogi drinking vinegar vegan plaid bespoke flannel literally cred. Salvia cronut flexitarian woke. Vexillologist leggings man bun pickled truffaut before they sold out, af edison bulb. Green juice kombucha locavore poke godard everyday carry swag bitters."
    }),
    Animal.create({
      species: "Australorp",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl2oPs90teRHtzLXmjzFEO6Db9_FR_G1kvIOUlA1IAdrz2phPnoA",
      price: 9801.25,
      description: "Meggings migas neutra intelligentsia, normcore slow-carb selfies art party edison bulb quinoa venmo fanny pack tousled bushwick truffaut. Forage seitan VHS pug portland pitchfork irony mixtape asymmetrical edison bulb mumblecore flannel. Readymade actually palo santo unicorn. Kombucha food truck poke pitchfork humblebrag hella helvetica lomo. Subway tile truffaut williamsburg banh mi brooklyn copper mug narwhal bitters pickled tilde taiyaki. Sriracha chia humblebrag succulents cred trust fund pinterest copper mug."
    }),
    Animal.create({
      species: "Eastern Wild Turkey",
      imageUrl: "http://www.kyforward.com/wp-content/uploads/2017/02/Eastern-Wild-Turkey-4.jpg",
      price: 7521.09,
      description: "Selfies celiac actually, ugh you probably haven't heard of them 3 wolf moon prism aesthetic four loko four dollar toast pok pok. Whatever sustainable hoodie kitsch schlitz. Hell of blue bottle food truck selfies air plant. Celiac dreamcatcher letterpress, tofu iceland kickstarter roof party try-hard pitchfork."
    }),
    Animal.create({
      species: "American Fuzzy Lop Rabbit",
      imageUrl: "https://i.pinimg.com/736x/f3/0b/03/f30b039590434fd3e1051157749f2830--the-salon-rabbit-hole.jpg",
      price: 11321.67,
      description: "YOLO hammock man bun poke chia PBR&B. Echo park marfa 8-bit dreamcatcher glossier wayfarers hella. Marfa hexagon cray squid, polaroid actually af wolf woke green juice williamsburg pinterest food truck. Kogi woke irony, edison bulb four dollar toast cloud bread everyday carry lomo flannel. Paleo fashion axe vegan tilde 3 wolf moon hot chicken literally hammock prism, fingerstache tattooed distillery."
    }),
    Animal.create({
      species: "Alpaca",
      imageUrl: "http://www.facts-about.info/wp-content/uploads/2014/10/Alpacas-in-the-Andes.jpg",
      price: 19427.66,
      description: "Put a bird on it flexitarian tumeric XOXO. Whatever hoodie cliche, palo santo mumblecore pok pok scenester 8-bit. Flexitarian poke drinking vinegar hella, yr messenger bag sartorial. Ennui hell of migas VHS narwhal cloud bread hot chicken locavore food truck man braid."
    }),
    Animal.create({
      species: "Holstein Cow",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/1200px-Cow_female_black_white.jpg",
      price: 24775.51,
      description: "Pickled hoodie chambray, activated charcoal neutra brunch edison bulb kitsch you probably haven't heard of them yr. Authentic ugh austin, live-edge asymmetrical wolf fashion axe cardigan hoodie everyday carry flannel. VHS tumeric hot chicken semiotics. Whatever wayfarers gluten-free fingerstache fanny pack. La croix kogi deep v taiyaki hammock cray. Vice four dollar toast austin kickstarter, cardigan hoodie portland everyday carry."
    }),

  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${animals.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
