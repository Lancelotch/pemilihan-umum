const form = document.getElementById("vote-form");

form.addEventListener("submit", e => {
  const choose = document.querySelector("input[name=location]:checked").value;
  const payload = { location: choose };
  fetch("http://localhost:5000/polling", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  e.preventDefault();
});
