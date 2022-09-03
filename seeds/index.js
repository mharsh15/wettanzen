const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://zesterschmid:V8I0tStZaoP6e08V@wettanzen01.baq2ji2.mongodb.net/?retryWrites=true&w=majority',

	{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB mongoDB Prod")
	})
	.catch(error => {
		console.log("Error connecting to mongoDB Prod")
		console.log(error);

	})

//initializing model
const growthTypeModel = require("../model/model").growthTypeModel
const reproductionTypeModel = require("../model/model").plantReproductionTypeModel
const sunlightRequiredModel = require("../model/model").sunlightRequiredModel
//deleting all models
//growthTypeModel.deleteMany({}, () => { console.log("deleted many") })

///inserting data




growthTypeModel.insertMany([

	{ name: "shrubs", description: "Shrubs are medium-sized, woody plants taller than herbs and shorter than a tree. Their height usually ranges from 6m to 10m tall. Their features include bushy, hard, and woody stems with many branches. Although stems are hard, they are flexible but not fragile. The lifespan of these plants usually depends on the species. Rose, jasmine, lemon, tulsi, and henna are some of the common shrubs around us.", url: "" },
	// { name: "creepers", description: "Creepers, as the name suggests, are plants that creep on the ground. They have very fragile, long, thin stems that can neither stand erect nor support all their weight. Examples include watermelon, strawberry, pumpkin and sweet potatoes." },
	// { name: "climbers", description: "Climbers are much more advanced than creepers. Climbers have a very thin, long and weak stem which cannot stand upright, but they can use external support to grow vertically and carry their weight. These types of plants use special structures called tendrils to climb. A few climbers’ plant names include pea plant, grapevine, sweet gourd, money plant, jasmine, runner beans, green peas, etc.", url: "" },
	// { name: "herbs", description: "Herbs are short-sized plants with soft, green, delicate stems without woody tissues. They complete their life cycle within one or two seasons. Generally, they have few branches or are branchless. These can be easily uprooted from the soil.", url: "" },
	// { name: "trees", description: "Trees are big and tall plants. They have very thick, woody and hard stems called the trunk. This single main stem or the trunk gives rise to many branches that bear leaves, flowers and fruits. Some trees are branchless like coconut trees; i.e., they have only one main stem which bears leaves, flowers, and fruits all by itself. The lifespan of a tree is very long. i.e., for several years. Banyan, mango, neem, cashew, teak and oak are some examples of trees.", url: "" },
])

// reproductionTypeModel.insertMany([
// 	{ name: "vegetative propagation ", description: "New plants are developed from a portion of the main plant’s body. It can be reproduced both naturally as well as by the artificial method of vegetative propagation. For example- Onion bulbs are produced by natural propagation. Rose and banana plants are produced by artificial methods of propagation.", url: "" },
// 	{ name: "budding", description: "In this mode of asexual reproduction, new plants grow from an outgrowth or bud in the plant body.", url: "" },
// 	{ name: "fragmentation", description: " New plants are developed from fragments of the parent plant.", url: "" },
// 	{ name: "apomixis", description: "type of asexual reproduction in which seeds are formed, and the embryo is developed without the fusion of male and female gametes. Citrus trees commonly use this method of asexual reproduction by using their seeds.", url: "" },
// 	{ name: "unisexual", description: "A unisexual flower is one in which either the stamens or the carpels are missing, vestigial or otherwise non-functional. Each flower is either staminate (having only functional stamens) and thus male, or carpellate (or pistillate) (having only functional carpels) and thus female.", url: "" },
// 	{ name: "bisexual", description: " The flowers which contain both stamens and pistil are called bisexual flowers.", url: "" },
// ])
// sunlightRequiredModel.insertMany([
// 	{ name: "full Shade", description: "Full shade does not equate to no sun because very few plants, other than mushrooms, can tolerate a complete lack of sunlight. Plants that require full shade are those that can survive with four hours of full sunlight mostly in the morning or late afternoon or a full day of dappled sunlight.", url: "https://www.thespruce.com/what-is-full-sun-partial-shade-1402372" },
// 	{ name: "dappled sun", description: "This is a somewhat rare term, but you might find it used to define the sunlight requirements of a few plants. Dappled sunlight is similar to partial shade where the sunlight filters through the branches and foliage of deciduous trees. Woodland plants, like trillium and solomon's seal as well as understory trees and shrubs, prefer dappled sunlight", url: "https://www.thespruce.com/what-is-full-sun-partial-shade-1402372" },
// 	{ name: "partial sun", description: "four to six hours of sun exposure each day, preferably in the cooler hours of the morning. However, there is a subtle difference", url: "https://www.thespruce.com/what-is-full-sun-partial-shade-1402372" },
// 	{ name: "full sun", description: "For a planting area to be considered a full sun location, on most days the area must receive six to eight hours of direct sunlight mostly between the hours of 10 a.m. and 4 p.m..", url: "https://www.thespruce.com/what-is-full-sun-partial-shade-1402372" },
// ])