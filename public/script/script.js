var messages = [];

const checkUser = async () => {
  // Check user
  const username = localStorage.getItem("username");
  if (!username) return false;
  const res = await fetch(`${apiBaseUrl}/api/user/check/${username}`, {
    method: "GET",
  });
  if (res.status != 200) return false;
  const user = await res.json();
  console.log(user);
  return true;
};

checkUser();

const createUser = async () => {
  try {
    const username = window.prompt("Enter you username: ");
    const res = await fetch(`${apiBaseUrl}/api/user`, {
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

const getAndRenderMessage = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/message`, {
      method: "GET",
    });
    messages = await res.json();
    if (res.status == 200) {
      const chatViewElm = document.getElementById("chat-view");
      const username = localStorage.getItem("username");
      console.log(username);
      let chats = "";
      messages.forEach((value, key) => {
        console.log(value);
        chats += `
          <div class="single-chat" ${
            value.user.username == username ? 'data-type="user"' : ""
          }>
            <p>${value.user.username}</p>
            <div>
              <p>${value.desc}</p>
            </div>
          </div>
        `;
      });
      chatViewElm.innerHTML = chats;
    }
  } catch (err) {
    console.log(err);
  }
};

// getAndRenderMessage();

// if (createUser()) {
//   var socket = io(`${apiBaseUrl}`);
//   socket.on("connect", () => {
//     console.log(`you are connected with id: ${socket.id}`);
//   });
// }

async function sendMessage(event) {
  event.preventDefault();
  const inputField = document.getElementById("chat-input-field");
  console.log(inputField.value);
  try {
  } catch (err) {}
  inputField.value = "";
}
