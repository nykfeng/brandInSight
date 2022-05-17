// actual mongoose models
const Brand = require("../models/Brand");
const User = require("../models/User");
const Contact = require("../models/Contact");
const History = require("../models/History");

// need cloudinary function to delete file on it
const { cloudinary } = require("../cloudinary");

// -=-=-=-=-=-==-=-=- These can be deleted -=-=-=-=-=-=-=-=-=-=-==-

// module.exports.index = async (req, res) => {
//   const brands = await Brand.find({});
//   res.render("client/brands", { brands });
// };

// module.exports.renderAddForm = async (req, res) => {
//   res.render("internal/brands/new");
// };

// -=-=-=-=-=-==-=-=- These can be deleted -=-=-=-=-=-=-=-=-=-=-==-

// get a list of trending brands
module.exports.trending = async (req, res) => {
  // some algorithm to determine trending
  // TODO

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

// CRUD --------------------------------------------
// -------------------------------------------------
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

    // now check if the view history array has exceeded 100 lenght
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

//----------------------- No longer needed, need review -------------------------------

// module.exports.renderEditForm = async (req, res) => {
//   const { id } = req.params;
//   const brand = await Brand.findById(id);
//   if (!brand) {
//     req.flash("error", "Cannot find that brand!");
//     return res.redirect("/brands");
//   }
//   res.render("internal/brands/edit", { brand });
// };

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
