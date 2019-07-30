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

let dataPoints = [
  { label: "Pulau", y: 0 },
  { label: "Gunung", y: 0 },
  { label: "Pantai", y: 0 },
  { label: "Taman", y: 0 }
];

const chartContainer = document.querySelector("#chart-container");
if (chartContainer) {
  const chart = new CanvasJS.Chart("chart-container", {
    animationEnabled: true,
    theme: "theme1",
    title: {
      text: "Voting Result"
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  var pusher = new Pusher('a7f4319adef7c6a424fb', {
    cluster: 'mt1',
    forceTLS: true
  });

  var channel = pusher.subscribe('monggo-polling');
  channel.bind('monggo-vote', function(data) {
    dataPoints = dataPoints.map(point=> {
        if(point.label === data.location){
            point.y += data.points;
            return point;
        }else{
            return point;
        }
    });
    chart.render();
  });
}
