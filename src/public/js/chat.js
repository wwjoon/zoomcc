const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName = "";

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};

const refreshTitle = (title) => {
  const h3 = room.querySelector("h3");
  h3.innerText = title;
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("#message input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("#nickname input");
  const value = input.value;
  socket.emit("nickname", value);
  input.value = "";
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  refreshTitle(`Room ${roomName}`);
  const messageForm = room.querySelector("#message");
  const nicknameForm = room.querySelector("#nickname");
  messageForm.addEventListener("submit", handleMessageSubmit);
  nicknameForm.addEventListener("submit", handleNicknameSubmit);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  refreshTitle(`Room ${roomName} (${newCount})`);
  addMessage(`${user} joined!`);
});

socket.on("bye", (user, newCount) => {
  refreshTitle(`Room ${roomName} (${newCount})`);
  addMessage(`${user} left :(`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = ""; // init

  // 열려있는 퍼블릭 룸이 없다면 Return
  if (rooms.length === 0) {
    return;
  }

  // 열려있는 퍼블릭 룸 Append
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});
