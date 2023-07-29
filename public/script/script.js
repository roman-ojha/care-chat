var messages = [];
var username = localStorage.getItem("username");
var socket = io(`${apiBaseUrl}`);
var chats = "";
const chatViewElm = document.getElementById("chat-view");

const checkUser = async () => {
  // Check user
  if (!username) return false;
  const res = await fetch(`${apiBaseUrl}/api/user/check/${username}`, {
    method: "GET",
  });
  if (res.status != 200) return false;
  const user = await res.json();
  return true;
};

const createUser = async () => {
  try {
    const uname = window.prompt("Enter you username: ");
    const res = await fetch(`${apiBaseUrl}/api/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: uname }),
    });
    const body = await res.json();
    if (res.status == 200) {
      localStorage.setItem("username", body.username);
      username = body.username;
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

(async () => {
  if (!(await checkUser())) {
    createUser();
    return;
  }
})();

socket.on("connect", () => {
  console.log(`you are connected with id: ${socket.id}`);
});
// const category_name = "group";
// socket.emit("join-room", category_name, (message) => {
//   console.log(message);
// });
socket.on("send-message-client", (data) => {
  chats += `
          <div class="single-chat">
            <p>${data.username}</p>
            <div>
              <p>${data.message}</p>
            </div>
          </div>
          `;
  chatViewElm.innerHTML = chats;
  chatViewElm.scrollTop = chatViewElm.scrollHeight;
});

const getAndRenderMessage = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/message`, {
      method: "GET",
    });
    messages = await res.json();
    messages.reverse();
    if (res.status == 200) {
      messages.forEach((value, key) => {
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
      chatViewElm.scrollTop = chatViewElm.scrollHeight;
    }
  } catch (err) {
    console.log(err);
  }
};

getAndRenderMessage();

async function sendMessage() {
  const inputField = document.getElementById("chat-input-field");
  const message = inputField.value;
  if (message !== "") {
    try {
      console.log("Username: ", username);
      socket.emit("send-message", { username, message }, (res) => {
        if (res.success) {
          chats += `
          <div class="single-chat" data-type="user">
            <p>${username}</p>
            <div>
              <p>${message}</p>
            </div>
          </div>
          `;
          chatViewElm.innerHTML = chats;
          chatViewElm.scrollTop = chatViewElm.scrollHeight;
        }
      });
    } catch (err) {}
  }
  inputField.value = "";
}

function submitMessage(event) {
  event.preventDefault();
  sendMessage();
}
