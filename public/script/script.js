var messages = [];
var username = localStorage.getItem("username");
var socket = io(`${apiBaseUrl}`);

const checkUser = async () => {
  // Check user
  if (!username) return false;
  const res = await fetch(`${apiBaseUrl}/api/user/check/${username}`, {
    method: "GET",
  });
  if (res.status != 200) return false;
  const user = await res.json();
  console.log(user);
  return true;
};

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
  }
})();

const getAndRenderMessage = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/message`, {
      method: "GET",
    });
    messages = await res.json();
    if (res.status == 200) {
      const chatViewElm = document.getElementById("chat-view");
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
getAndRenderMessage();

async function sendMessage(event) {
  event.preventDefault();
  const inputField = document.getElementById("chat-input-field");
  console.log(inputField.value);
  try {
    socket.on("connect", () => {
      console.log(`you are connected with id: ${socket.id}`);
    });
  } catch (err) {}
  inputField.value = "";
}
