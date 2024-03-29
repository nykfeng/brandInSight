// actual mongoose models
const Brand = require("../models/Brand");
const User = require("../models/User");
const Contact = require("../models/Contact");
const History = require("../models/History");

const axios = require("axios").default;

// need cloudinary function to delete file on it
const { cloudinary } = require("../cloudinary");

// trending brand list (hard code list now)
const trendingBrands = require("../utils/trending");

// -=-=-=-=-=-==-=-=- API endpoints for data -=-=-=-=-=-=-=-=-=-=-==-

// get a list of trending brands
module.exports.trending = async (req, res) => {
  // some algorithm to determine what brands are trending
  // features for an ideal world scenario

  // setting option for pagination
  const options = {
    page: 1,
    limit: 5,
  };

  // paginate is not built in, using mongoose-paginate-v2 here
  const brands = await Brand.paginate({}, options);
  res.send(brands);
};

// get a list of search result by string
module.exports.searching = async (req, res) => {
  // the query is named term
  const term = req.query.term;
  // using RegEx to set it to /term/i
  // regexp = new RegExp("pattern", "flags");
  // flag i , which stands for 'ignore casing', we can make the expression carry out a case-insensitive search.
  const reg = new RegExp(term, "i");

  // logging activity
  const history = new History({
    user: req.user,
    action: "Searched",
    module: "Search",
    searchTerm: term,
    date: new Date(),
  });

  const options = {
    page: 1,
    limit: 10,
  };

  const searchResults = await Brand.paginate({ name: reg }, options);

  await history.save();

  res.send(searchResults);
};

// Get a list of already subscribed brands from user
module.exports.listOfSubscribedBrands = async (req, res) => {
  // get the list of brand id from req
  const { userId } = req.params; // can just be req.user, already exists
  const user = await User.findById(userId).populate("subscribedBrands");

  let listOfBrands = [];
  // create an array of object, since we only need a handful of data
  user.subscribedBrands.forEach((brand) => {
    listOfBrands.push({
      id: brand._id,
      name: brand.name,
      logo: brand.logo.url,
    });
  });

  res.send(listOfBrands);
};

// Get a list of viewed history brands from user
module.exports.listOfViewedBrands = async (req, res) => {
  // get the list of brand id from req
  const { userId } = req.params; // can just be req.user, already exists
  const user = await User.findById(userId).populate("viewedBrandHistory");

  let listOfBrands = [];
  // create an array of object, since we only need a handful of data
  user.viewedBrandHistory.forEach((brand) => {
    let subscribed = false;
    // determine if the brands on viewed history list are subscribed or not
    if (user.subscribedBrands.length > 0) {
      for (let i = 0; i < user.subscribedBrands.length; i++) {
        if (String(brand._id) === String(user.subscribedBrands[i])) {
          subscribed = true;
        }
      }
    }

    listOfBrands.unshift({
      id: brand._id,
      name: brand.name,
      logo: brand.logo.url,
      subscribed,
    });
  });

  res.send(listOfBrands);
};

// Get ad spending list
module.exports.listOfBrandsWithAdSpending = async (req, res) => {
  const brands = await Brand.find({});

  // sort the ad spend number descending
  brands.sort(function (a, b) {
    return b.highlights.adSpend - a.highlights.adSpend;
  });

  const brandsWithAdSpend = brands.filter(
    (brand) => brand.highlights.adSpend > 0
  );

  let listOfBrands = [];
  // create an array of object, since we only need a handful of data
  brandsWithAdSpend.forEach((brand) => {
    listOfBrands.push({
      id: brand._id,
      name: brand.name,
      logo: brand.logo.url,
      adSpend: brand.highlights.adSpend
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    });
  });

  // number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  // convert 1000000 to 1,000,000

  res.send(listOfBrands);
};

// Get brand logo url by contacts
module.exports.listOfBrandLogoURL = async (req, res) => {
  const contactBrandLogoData = [];

  const contactIdList = req.user.savedContacts;
  for (const contactItem of contactIdList) {
    const contact = await Contact.findById(contactItem._id);
    const brand = await Brand.findById(contact.brand);

    contactBrandLogoData.push({
      contact_id: contactItem._id,
      brand_logo: brand.logo.url,
    });
  }

  res.send(contactBrandLogoData);
};

// Get brand stories and news for the trending list
module.exports.brandStoriesAndNews = async (req, res) => {
  const list = trendingBrands.brandList();

  const newsAPI = process.env.NEWSAPI_KEY;
  let storiesAndNews = {};

  for (let index = 0; index < list.length; index++) {
    // create an property named after the brand
    storiesAndNews[list[index]] = { name: list[index] };
    // create an article array to hold articles
    storiesAndNews[list[index]].articles = [];

    // need an regex expression to search database
    const reg = new RegExp(list[index], "i");
    const getBrandsByName = await Brand.paginate({ name: reg });

    // Get the logo url so it can be worked with later on
    storiesAndNews[list[index]].logoUrl = getBrandsByName.docs[0].logo.url;

    // earch brand gets a list of 3 articles from News API
    await axios
      .get(
        `https://newsapi.org/v2/everything?language=en&q=${list[index]}&apiKey=${newsAPI}`
      )
      .then(function (response) {
        // handle success
        const articles = response.data.articles.slice(0, 3);
        // console.log(articles);
        for (let i = 0; i < 3; i++) {
          storiesAndNews[list[index]].articles.push(articles[i]);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  res.send(storiesAndNews);
};

// Get specific brand news .... for one brand only
module.exports.oneBrandNews = async (req, res) => {
  // get brand name
  const brandName = req.query.brand;

  const newsAPI = process.env.NEWSAPI_KEY;
  let news = [];

  // axios for news API
  await axios
    .get(
      `https://newsapi.org/v2/everything?language=en&q=${brandName}&apiKey=${newsAPI}`
    )
    .then(function (response) {
      // handle success
      news = response.data.articles.slice(0, 3);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  res.send(news);
};

// Get specific brand stock signal .... for one brand only
module.exports.oneStockSignal = async (req, res) => {
  // get brand name
  const stockTicker = req.query.ticker;

  const newsAPI = process.env.NEWSAPI_KEY;
  let news = [];

  // axios for news API
  await axios
    .get(
      `https://newsapi.org/v2/everything?language=en&q=${stockTicker}&apiKey=${newsAPI}`
    )
    .then(function (response) {
      // handle success
      // Showing 6 pieces of news
      news = response.data.articles.slice(0, 6);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  res.send(news);
};

// Get brand stock pricing numbers (Quote)
module.exports.brandStockPricing = async (req, res) => {
  const IEX_API_KEY = process.env.IEX_KEY;
  const ALPHA_VANTAGE_API_KEY = process.env.ALPHAVANTAGE_KEY;
  // get brand stock ticker
  const stockTicker = req.query.term;

  let quote;
  let stats;
  let financials;
  let incomeStatement;
  // get stock quote and pricing
  await axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${stockTicker}/quote?token=${IEX_API_KEY}`
    )
    .then(function (response) {
      // handle success
      quote = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  // get stock stats
  await axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${stockTicker}/stats?token=${IEX_API_KEY}`
    )
    .then(function (response) {
      // handle success
      stats = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  // get stock balance sheet
  await axios
    .get(
      `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${stockTicker}&apikey=${ALPHA_VANTAGE_API_KEY}`
    )
    .then(function (response) {
      // handle success
      financials = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  // get stock income statement
  await axios
    .get(
      `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${stockTicker}&apikey=${ALPHA_VANTAGE_API_KEY}`
    )
    .then(function (response) {
      // handle success
      incomeStatement = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  // return stock pricing info as object to return
  res.send({ quote, stats, financials, incomeStatement });
};



// -=-=-=-=-=-==-=-=- CRUD actions -=-=-=-=-=-=-=-=-=-=-==-

// module.exports.add = async (req, res) => {
//   const brand = new Brand(req.body.brand);

//   if (req.file) {
//     let url = req.file.path;
//     let filename = req.file.filename;

//     const newUrl = url.replace("logo", `brands/${brand._id}/logo`);
//     const newFilename = filename.replace("logo", `brands/${brand._id}/logo`);

//     await cloudinary.uploader.rename(
//       filename,
//       newFilename,
//       function (error, result) {
//         console.log(result, error);
//       }
//     );

//     brand.logo = { url: newUrl, filename: newFilename };

//     // brand.logo = { url: req.file.path, filename: req.file.filename };
//   }

//   await brand.save();
//   req.flash("success", "Successfully created a new brand!");
//   res.redirect(`/internal/brands/${brand._id}`);
// };

// this route will be for client side brand page
module.exports.getById = async (req, res) => {
  const brand = await Brand.findById(req.params.id)
    .populate("contact")
    .populate("leadership");

  // req.user exist, so i can just pull it

  // Add to user viewed history
  if (brand) {
    const user = await User.findById(req.user._id);
    // check if the brand is already on the viewed history list
    // if it is, remove it from the old position on the list
    if (user.viewedBrandHistory.length > 0) {
      for (let i = 0; i < user.viewedBrandHistory.length; i++) {
        // need to use String function to convert the id to string
        // Can't directly compare objects
        if (String(brand._id) === String(user.viewedBrandHistory[i])) {
          // splice, 1st argument, index to remove
          // 2nd argument, number of elments to remove
          user.viewedBrandHistory.splice(i, 1);
        }
      }
    }

    // now check if the view history array has exceeded 100 length
    // 100 is our max here
    const MAX_LENGTH = 100;
    if (user.viewedBrandHistory.length === MAX_LENGTH) {
      user.viewedBrandHistory.shift(); // removes the first element
    }

    // now finally add the brand to the last place of the array
    user.viewedBrandHistory.push(brand);

    await user.save();
  }

  if (!brand) {
    req.flash("error", "Cannot find that brand!");
    return res.redirect("/brands");
  }
  res.render("client/brand", { brand });
};


module.exports.update = async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndUpdate(
    id,
    { ...req.body.brand },
    { runValidators: true }
  );

  if (req.file) {
    if (brand.logo.filename) {
      await cloudinary.uploader.destroy(brand.logo.filename);
    }
    brand.logo = { url: req.file.path, filename: req.file.filename };
    await brand.save();
  }
  req.flash("success", "Successfully updated brand information!");
  res.redirect(`/brands/${brand._id}`);
};

module.exports.deleteBrand = async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (brand.logo.filename) {
    // must delete the logo file before the folder can be deleted
    await cloudinary.uploader.destroy(
      brand.logo.filename,
      function (error, result) {
        console.log("Cloudinary Result: ", result, "Cloudinary Error: ", error);
      }
    );

    // Delete the brand id folder that holds the logo file
    await cloudinary.api.delete_folder(
      `BrandInSight/brands/${id}`,
      function (error, result) {
        console.log("Cloudinary Result: ", result, "Cloudinary Error: ", error);
      }
    );
  }

  await brand.remove();
  req.flash("success", "Successfully deleted a brand!");
  res.redirect(`/brands`);
};
