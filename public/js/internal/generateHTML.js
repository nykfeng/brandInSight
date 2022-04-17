function newBrandModal() {
  const html = `<div class="modal-background">
  <div class="internal-brand-leadership--add">

  <div class="modal-title-bar">
  <h1>Add New Brand:</h1>
  </div>

  <form action="/brands" method="POST" class="new-brand-form flex-column" enctype="multipart/form-data">

  <div class="input-group flex">
        <label for="name">Name</label>
        <input type="text" id="name" name="brand[name]">
  </div>

  <div class="input-group flex">
        <label for="headquarters">Headquarters</label>
        <input type="text" id="headquarters" name="brand[headquarters]" size="50">
  </div>

  <div class="input-group flex">
         <label for="website">Website</label>
        <input type="url" id="website" name="brand[website]" size="50" placeholder="https://example.com"
                    pattern="https://.*">
    </div>

    <div class="input-group flex">
        <label for="employee">Employee number</label>
        <input type="number" id="employee" name="brand[employee]">
    </div>

  <div class="input-group flex">
        <label for="description">Description</label>
        <textarea name="brand[description]" id="description" cols="50" rows="10"></textarea>
  </div>


  <div class="input-group flex">
        <label for="logo">Logo</label>
        <input type="file" name="logo" id="">
  </div>

  <div class="internal-brand-btn-group flex">
        <button class="modal-cancel internal-btn internal-btn-cancel flex">Cancel</button>
        <button type="submit" class="internal-btn internal-btn-add flex">Submit</button>
  </div>
</form>

  </div>
  </div>
  `;
  return html;
}

function newLeadershipModal() {
  const html = `
      <div class="modal-background">
      <div class="internal-brand-leadership--add">
  
      <div class="modal-title-bar">
      <h1>Add New Leadership:</h1>
      </div>
  
      <form action="/brands/${brand._id}/leadership" method="POST" class="brand-leadership-item-form flex-column" enctype="multipart/form-data">
  
      <div class="input-group flex">
          <label for="leadership-name">Name</label>
          <input type="text" id="leadership-name" name="leadership[name]" value="">
      </div>
  
      <div class="input-group flex">
          <label for="leadership-position">Position</label>
          <input type="text" id="leadership-position" name="leadership[position]" value="">
      </div>
  
      <!-- Leadership profile picture upload -->
      <div class="input-group flex">
          <label for="profilePicture">Choose a New Picture File to Upload:</label>
          <input type="file" id="leadership-profile-picture" name="profilePicture"
              accept="image/png, image/jpeg, image/jpg, image/gif">
      </div>
  
      <div class="leadership-btn-group flex ">
      <button class="modal-cancel internal-btn internal-btn-cancel flex">Cancel</button>
      <button class="leadership-new internal-btn internal-btn-add flex">Add Leadership</button>
      </div>
  </form>
      </div>
      </div>
  `;
  return html;
}

function newContactModal(currentBrand) {
  const html = `
    <div class="modal-background">
      <div class="internal-brand-contacts--add">
  
      <div class="modal-title-bar">
      <h1>Add New Contact:</h1>
      </div>
  
      <form action="/brands/${currentBrand._id}/contact" method="POST"  class="internal-contacts-form flex-column">
      <div class="contacts-personal-detail flex">
      <div class="internal-contacts-form-group flex-column">
          <div class="input-group flex">
              <label for="contacts-name">Name </label>
              <input type="text" id="contacts-name" name="contact[name]" value="" class="short-input-field">
          </div>
          <div class="input-group flex">
              <label for="contacts-rank">Rank </label>
              <input type="text" id="contacts-rank" name="contact[rank]" value="" class="short-input-field">
          </div>
          <div class="input-group flex">
              <label for="contacts-name" >Position</label>
              <input type="text" id="contacts-name" name="contact[position]" value="" class="short-input-field">
          </div>
      </div>
  
      <div class="internal-contacts-form-group flex-column">
          <div class="input-group flex">
              <label for="contacts-email">Email </label>
              <input type="text" id="contacts-email" name="contact[email]" value="">
          </div>
          <div class="input-group flex">
              <label for="contacts-rank">Location </label>
              <input type="text" id="contacts-rank" name="contact[location]" value="">
          </div>
          <div class="input-group flex">
              <label for="contacts-name">Phone</label>
              <input type="text" id="contacts-name" name="contact[phoneNumber]" value="">
          </div>
      </div>
  </div>
  
  <div class="contacts-submit-container flex">
      <div class="contacts-linkedin-handle flex">
          <label for="contacts-linkedin-handle"><i
                  class="fa-brands fa-linkedin"></i></label>
          <input type="text" id="contacts-linkedin-handle" name="contact[linkedin]" value=""
              class="short-input-field">
      </div>
  
      <div class="leadership-btn-group flex ">
          <button class="modal-cancel internal-btn internal-btn-cancel flex">Cancel</button>
          <button class="contacts-new internal-btn internal-btn-add flex">Add Contact</button>
      </div>
  </div>
      </form>
      </div>
      </div>
      `;
  return html;
}

function listOfContacts(brand, contact) {
  const html = `<form action="/brands/${brand._id}/contact/${contact._id}?_method=PUT" method="POST" class="internal-contacts-form flex-column">
    <div class="contacts-personal-detail flex">
        <div class="internal-contacts-form-group flex-column">
            <div class="input-group flex">
                <label for="contacts-name">Name </label>
                <input type="text" id="contacts-name" name="contact[name]" value="${contact.name}" class="short-input-field">
            </div>
            <div class="input-group flex">
                <label for="contacts-rank">Rank </label>
                <input type="text" id="contacts-rank" name="contact[rank]" value="${contact.rank}" class="short-input-field">
            </div>
            <div class="input-group flex">
                <label for="contacts-position">Position</label>
                <input type="text" id="contacts-position" name="contact[position]" value="${contact.position}" class="short-input-field">
            </div>
        </div>

        <div class="internal-contacts-form-group flex-column">
            <div class="input-group flex">
                <label for="contacts-email">Email </label>
                <input type="text" id="contacts-email" name="contact[email]" value="${contact.email}">
            </div>
            <div class="input-group flex">
                <label for="contacts-location">Location </label>
                <input type="text" id="contacts-location" name="contact[location]" value="${contact.location}">
            </div>
            <div class="input-group flex">
                <label for="contacts-phone">Phone</label>
                <input type="text" id="contacts-phone" name="contact[phoneNumber]" value="${contact.phoneNumber}">
            </div>
        </div>
    </div>

    <div class="contacts-submit-container flex">
        <div class="contacts-linkedin-handle flex">
            <label for="contacts-linkedin-handle"><i
                    class="fa-brands fa-linkedin"></i></label>
            <input type="text" id="contacts-linkedin-handle" name="contact[linkedin]" value="${contact.linkedin}"
                class="short-input-field">
        </div>

        <div class="internal-contacts-btn-group flex ">

            <button class="contacts-delete internal-btn internal-btn-delete flex" data-id="${contact._id}">Delete
                Contact</button>


            <button type="submit" class="contacts-submit internal-btn internal-btn-save flex">Save
                Changes</button>
        </div>
    </div>

</form>
    `;
  return html;
}

function listOfLeaderships(brand, leadership) {
    const html = `
    <form action="/brands/${brand._id}/leadership/${leadership._id}?_method=PUT" method="POST" class="internal-contacts-form flex-column">
                                <img src="${leadership.profilePicture.url}" alt="${leadership.name} profile picture"
                                    class="brand-leadership-profile">

                                <div class="input-group flex">
                                    <label for="leadership-name">Name</label>
                                    <input type="text" id="leadership-name" name="leadership[name]" value="${leadership.name}">
                                </div>

                                <div class="input-group flex">
                                    <label for="leadership-position">Position</label>
                                    <input type="text" id="leadership-position" name="leadership[position]" value="${leadership.position}">
                                </div>

                                <div class="input-group flex">
                                    <label for="profilePicture">Choose a New Picture File to Upload:</label>
                                    <input type="file" id="leadership-profile-picture" name="profilePicture"
                                        accept="image/png, image/jpeg, image/jpg, image/gif">
                                </div>

                                <div class="leadership-btn-group flex ">
                                    <button class="leadership-delete internal-btn internal-btn-delete flex" data-id="${leadership._id}">Delete
                                        Person</button>
                                    <button class="leadership-submit internal-btn internal-btn-save flex">Save
                                        Changes</button>
                                </div>
                            </form>
    `;
    return html;
}

export default {
  newBrandModal,
  newLeadershipModal,
  newContactModal,
  listOfContacts,
  listOfLeaderships
};
