document.addEventListener("DOMContentLoaded", () => {
  displayAddToyForm();

  fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(toys => renderToys(toys))
});

function displayAddToyForm() {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector("#add-toy-form");

  let addToy = false;

  addBtn.addEventListener("click", () => {
      addToy = !addToy;
      if (addToy) {
      toyFormContainer.style.display = "block";
      } else {
      toyFormContainer.style.display = "none";
      }
  });

  toyForm.addEventListener("submit", (e) => {
      e.preventDefault()
      addNewToy()

      fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(toys => toys.forEach((toy) => createToyCard(toy)))

      toyForm.reset()
  })
}

function createToyCard(toy) {
  const toyCard = document.createElement("div")
  const toyCollection = document.getElementById("toy-collection")
  const toyName = document.createElement("h2")
  const toyImg = document.createElement("img")
  const toyLikes = document.createElement("p")
  const likeButton = document.createElement("button")

  toyCard.className = "card"
  toyName.innerText = toy.name
  toyImg.src = toy.image
  toyImg.className = "toy-avatar"
  toyLikes.innerText = `Likes: ${toy.likes}`
  likeButton.className = "like-btn"
  likeButton.innerText = "Like ❤️"
  likeButton.id = toy.id

  toyCard.append(toyName, toyImg, toyLikes, likeButton)
  toyCollection.append(toyCard)
}

function addNewToy(toyInfo) {
const newToy = {
      "name": document.getElementById("new-name").value,
      "image": document.getElementById("new-image").value,
      "likes": 0
  }

  fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
      'content-type': 'application/json'
      },
      body: JSON.stringify(newToy)
  })
  
      .then(res => res.json())
      .then(toy => createToyCard(toy))
}

function likeBtnListener(id, likes) {
  const likeBtn = document.getElementById(id);

  likeBtn.addEventListener("click", (e) => incrementLikes(id, likes));
}

function incrementLikes(id, likes) {

  const updatedLikes = ++likes;

  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({"likes": updatedLikes})
  })
}