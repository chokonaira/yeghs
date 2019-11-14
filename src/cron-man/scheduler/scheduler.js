const scheduler = (timer, action) => {
  setInterval(action, timer);
};

process.nextTick(() => scheduler);

export default scheduler;
