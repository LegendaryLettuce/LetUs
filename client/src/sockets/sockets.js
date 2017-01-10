module.exports = (hash) => {
  const eventNameSpace = '/event/';
  const socket = io(eventNameSpace.concat(hash));
};
