import $ from "jquery";

const createAnalytics = () => {
  let clicks = 0;
  const clickHandler = () => clicks++;
  let isDisable = false;

  $(document).on('click', clickHandler);

  const disable =() => {
      isDisable = true;
      clicks = 0;
      $(document).off('click', clickHandler);
  };

  const getClicks = () => !isDisable ? clicks : "Analytics disabled";

  return {
    getClicks,
    disable
  };
};

window.analytics = createAnalytics();
