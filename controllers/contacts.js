// actual mongoose models
const Contact = require("../models/Contact");
const Brand = require("../models/Brand");
const History = require("../models/History");

module.exports.add = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  const contact = new Contact(req.body.contact);
  brand.contact.push(contact);
  contact.brand = req.params.id;
  await contact.save();
  await brand.save();

  // after the contact is saved, write it to history
  const history = new History({
    user: req.user,
    action: "Added",
    module: "Contact",
    contact,
    date: new Date(),
  });
  await history.save();

  req.flash("success", "Successfully created a new contact!");
  res.redirect(`/internal/brands/${brand._id}`);
};

module.exports.edit = async (req, res) => {
  const { id, contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { ...req.body.contact },
    { runValidators: true }
  );

  await contact.save();

  // after the contact is saved, write it to history
  const history = new History({
    user: req.user,
    action: "Edited",
    module: "Contact",
    contact,
    date: new Date(),
  });
  await history.save();

  req.flash("success", "Successfully updated contact information!");
  res.redirect(`/internal/brands/${id}`);
};

module.exports.deleteContact = async (req, res) => {
  const { id, contactId } = req.params;
  await Brand.findByIdAndUpdate(id, { $pull: { contact: contactId } });

  // for storing to history
  const contact = await Contact.findById(contactId);

  // before the contact is removed and saved, write it to history
  const history = new History({
    user: req.user,
    action: "Removed",
    module: "Contact",
    contact,
    date: new Date(),
  });
  await history.save();

  await Contact.findByIdAndDelete(contactId);
  req.flash("success", "Successfully deleted a contact!");
};
