const bodyEl = document.querySelector("body");

const currentBrand = brand;

const open = function (module) {
  if (module === "Contact") {
    bodyEl.insertAdjacentHTML("beforeend", renderAddContactHTML());
    cancelListener();
  } else if (module === "Leadership") {
    bodyEl.insertAdjacentHTML("beforeend", renderAddLeadershipHTML());
    cancelListener();
  }
};

const cancelListener = function () {
  // const closeModalBtn = document.querySelector('.modal-cancel');
  // closeModalBtn.addEventListener('click', function() {
  //     const modalEl = document.querySelector('.modal-background');
  //     modalEl.remove();
  // })

  bodyEl.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("modal-background") ||
      e.target.classList.contains("modal-cancel")
    ) {
      const modalEl = document.querySelector(".modal-background");
      if (modalEl) modalEl.remove();
    }
  });
};

function renderAddContactHTML() {
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

function renderAddLeadershipHTML() {
  const html = `
    <div class="modal-background">
    <div class="internal-brand-leadership--add">

    <div class="modal-title-bar">
    <h1>Add New Leadership:</h1>
    </div>

    <form class="brand-leadership-item-form flex-column">

    <div class="input-group flex">
        <label for="leadership-name">Name</label>
        <input type="text" id="leadership-name" name="leadership-name" value="">
    </div>

    <div class="input-group flex">
        <label for="leadership-position">Position</label>
        <input type="text" id="leadership-position" name="leadership-position" value="">
    </div>

    <!-- Leadership profile picture upload -->
    <div class="input-group flex">
        <label for="leadership-profile-picture">Choose a New Picture File to Upload:</label>
        <input type="file" id="leadership-profile-picture" name="leadership-profile-picture"
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

export default {
  open,
};
