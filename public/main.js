const form = document.getElementById("vote-form");

form.addEventListener("submit", e => {
  const choose = document.querySelector("input[name=location]:checked").value;
  const payload = { location: choose };
  fetch("https://monggo-voting.herokuapp.com/polling", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.log(error));
  e.preventDefault();
});

fetch("https://monggo-voting.herokuapp.com/polling")
  .then(response => response.json())
  .then(data => {
    const votes = data.votes;
    //const totalVotes = votes.length;
    let voteCounts = {
      Pulau : 0,
      Gunung: 0,
      Pantai: 0,
      Taman: 0
    }
    voteCounts = votes.reduce((acc, vote) => {
      //console.log("acc", acc);
      //equal with return acc[vote.location] = (acc[vote.location] || 0) + parseInt(vote.points), acc
      return acc[vote.location] = (acc[vote.location] || 0) + parseInt(vote.points), acc
    }, {...voteCounts});

    let dataPoints = [
      { label: "Pulau", y: voteCounts.Pulau },
      { label: "Gunung", y: voteCounts.Gunung },
      { label: "Pantai", y: voteCounts.Pantai },
      { label: "Taman", y: voteCounts.Taman }
    ];

    const chartContainer = document.querySelector("#chart-container");
    if (chartContainer) {
      const chart = new CanvasJS.Chart("chart-container", {
        animationEnabled: true,
        theme: "theme1",
        title: {
          text: `Real Time Voting`
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
      Pusher.logToConsole = false;

      var pusher = new Pusher("a7f4319adef7c6a424fb", {
        cluster: "mt1",
        forceTLS: true
      });

      var channel = pusher.subscribe("monggo-polling");
      channel.bind("monggo-vote", function(data) {
        dataPoints = dataPoints.map(point => {
          if (point.label === data.location) {
            point.y += data.points;
            return point;
          } else {
            return point;
          }
        });
        chart.render();
      });
    }
  });
