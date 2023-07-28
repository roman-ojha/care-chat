const createUser = async () => {
  try {
    const username = window.prompt("Enter you username: ");
    const res = await fetch(`${apiBaseUrl}/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const body = await res.json();
    if (res.status == 200) {
      localStorage.setItem("username", body.username);
      return true;
    } else {
      if (body.msg) {
        window.alert(body.msg);
        createUser();
      }
      // console.log(body);
      return false;
    }
  } catch (err) {
    return false;
  }
};

if (createUser()) {
  var socket = io(`${apiBaseUrl}`);
  socket.on("connect", () => {
    console.log(`you are connected with id: ${socket.id}`);
  });
}
