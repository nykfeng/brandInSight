// actual mongoose models
const Contact = require("../models/Contact");
const Brand = require("../models/Brand");

module.exports.add = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  const contact = new Contact(req.body.contact);
  brand.contact.push(contact);
  contact.brand = req.params.id;
  await contact.save();
  await brand.save();
  console.log(contact);
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
  req.flash("success", "Successfully updated contact information!");
  res.redirect(`/internal/brands/${id}`);
};

module.exports.deleteContact = async (req, res) => {
  const { id, contactId } = req.params;
  await Brand.findByIdAndUpdate(id, { $pull: { contact: contactId } });
  await Contact.findByIdAndDelete(contactId);
  req.flash("success", "Successfully deleted a contact!");
  res.redirect(`/internal/brands/${id}`);
};
