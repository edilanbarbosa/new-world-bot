const { connect } = require("./utils/connection");
const { load } = require("./utils/loader");

async function start() {
  const socket = await connect();

  load(socket);
}

start();
