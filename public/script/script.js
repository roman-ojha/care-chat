const username = window.prompt("Enter you username: ");
console.log(username);

const createUser = async () => {
  const res = await fetch("http://localhost:8080/user", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  const body = await res.json();
  console.log(body);
};

createUser();

// var socket = io("http://localhost:8080");

// socket.on("connect", () => {
//   console.log(`you are connected with id: ${socket.id}`);
// });
