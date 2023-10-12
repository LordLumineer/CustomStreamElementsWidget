/* JS */

/* HTML Blocks */
/* Goal List */
const goal_list = document.getElementById("goal-list");
/* Progress Bar */
const progress_bar = document.getElementById("progress-bar");
const ratio_txt = document.getElementById("ratio-txt");
const progress_amount_txt = document.getElementById("progress-amount-txt");
const remaining_total_txt = document.getElementById("remaining-total-txt");

/* Settings */
const toggle_settings_wrap = document.getElementById("toggle-settings-wrap");
const debug = document.getElementById("debug");
const toggle_debug_goal_list = document.getElementById(
  "toggle-debug-goal-list"
);
const debug_goal_list = document.getElementById("debug-goal-list");
/* Ctrl Settings */
const toggle_ctrl_settings = document.getElementById("toggle-ctrl-settings");
const ctrl_settings = document.getElementById("ctrl-settings");
const input_goal_description = document.getElementById("goal-description");
const input_goal_amount = document.getElementById("goal-amount");
const button_add_goal = document.getElementById("add-goal");

const button_remove_last = document.getElementById("remove-last");
const button_remove_bottom = document.getElementById("remove-bottom");
const button_remove_top = document.getElementById("remove-top");
const button_remove_all = document.getElementById("remove-all");

const input_total = document.getElementById("total");
const button_applyTotal = document.getElementById("apply-total");
const input_offset = document.getElementById("offset");
const button_apply_offset = document.getElementById("apply-offset");

const button_reset = document.getElementById("reset");

/* Event Settings */
const toggle_event_settings = document.getElementById("toggle-event-settings");
const events_settings = document.getElementById("events-settings");
const toggle_subs = document.getElementById("toggle-subs");
const input_sub_factor = document.getElementById("sub-factor");
const toggle_bits = document.getElementById("toggle-bits");
const input_bits_factor = document.getElementById("bits-factor");
const toggle_tips = document.getElementById("toggle-tips");
const input_tips_factor = document.getElementById("tips-factor");
const toggle_throne = document.getElementById("toggle-throne");
const input_throne_username = document.getElementById("throne-username");
const input_throne_factor = document.getElementById("throne-factor");

/* Customization */
const toggle_customization = document.getElementById("toggle-customization");
const ctrl_customization = document.getElementById("ctrl-customization");
const toggle_goals = document.getElementById("toggle-goals");
const toggle_progress = document.getElementById("toggle-progress");
const input_nb_goals = document.getElementById("nb-goals");
const selector_goal_alignment = document.getElementById(
  "selector-goal-alignment"
);
const selector_themes = document.getElementById("selector-themes");
const custom_accent = document.getElementById("custom-accent");
const toggle_animation = document.getElementById("toggle-animation");

/* Color Picker */
const colorPreview = document.querySelector(".color-preview");
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
const redValue = document.getElementById("red-value");
const greenValue = document.getElementById("green-value");
const blueValue = document.getElementById("blue-value");

const CSS_Variables = document.querySelector(":root");

/* Variables */
let currencySymbol = "$";
let twitchID = "";

let totalAmount = 100;
let reachedAmount = 0;

let goals = {};
let goalCount = 0;

/* Parameters */
let state_toggle_settings_wrap = true;
toggle_settings_wrap.classList.toggle("active", true);
debug.style.display = "flex";
let state_toggle_debug_goal_list = true;
toggle_debug_goal_list.classList.toggle("active", true);
debug_goal_list.style.display = "flex";

let state_toggle_ctrl_settings = true;
toggle_ctrl_settings.classList.toggle("active", true);
ctrl_settings.style.display = "flex";

/* Event Settings */
let state_toggle_event_settings = false;
toggle_event_settings.classList.toggle("active", false);
events_settings.style.display = "none";
let state_toggle_subs = true;
toggle_subs.classList.toggle("active", true);
let sub_factor = 5;
input_sub_factor.value = 5;
let state_toggle_bits = true;
toggle_bits.classList.toggle("active", true);
let bits_factor = 250;
input_bits_factor.value = 250;
let state_toggle_tips = true;
toggle_tips.classList.toggle("active", true);
let tips_factor = 1;
input_tips_factor.value = 1;
let state_toggle_throne = false;
toggle_throne.classList.toggle("active", false);
let throne_username = "";
let throne_factor = 1;
input_throne_factor.value = 1;

/* Customization */
let state_toggle_customization = false;
toggle_animation.classList.toggle("active", false);
ctrl_customization.style.display = "none";

let state_toggle_goals = true;
toggle_goals.classList.toggle("active", true);
let state_toggle_progress = true;
toggle_progress.classList.toggle("active", true);
let selected_goal_alignment = "TL";
selector_goal_alignment.value = "TL";
let selected_themes = "lavender";
selector_themes.value = "lavender";
custom_accent.style.display = "none";
let color_custom_accent = "rgb(133, 176, 232)";
redSlider.value = 133;
greenSlider.value = 176;
blueSlider.value = 232;

let state_toggle_animation = true;
toggle_animation.classList.toggle("active", true);
CSS_Variables.style.setProperty("--animation", "7s");

let nbGoals = 7;
input_nb_goals.value = 7;

const emptyGoal = {
  amount: 0,
  description: "",
  reached: false,
};
let colors = {
  txt_color: "rgb(0, 0, 0)",
  bg_color: "rgb(168, 168, 168)",
  primary_color: "rgb(128, 128, 255)",
  secondary_color: "rgb(0, 128, 255)",
  accent_color: "rgb(0, 0, 128)",
  tertiary_color: "rgb(0, 0, 255)",
};

let intervalIdx;
const clearIt = () => {
  if (intervalIdx !== undefined) clearInterval(intervalIdx);
  intervalIdx = undefined;
};
const setIt = () => {
  refresher();
  if (intervalIdx !== undefined) clearInterval(intervalIdx);
  intervalIdx = setInterval(() => refresher(), 900000); // 15 minutes

};
const startingTime = 1680998400000;

// Initial setup on widget startup
window.addEventListener("onWidgetLoad", function (obj) {
  currencySymbol = obj.detail.currency.symbol;
  twitchID = obj.detail.channel.providerId;
  adjustColor();
  DonationCounter(0);
});
// Listen for StreamElements events
window.addEventListener("onEventReceived", function (obj) {
  if (obj.detail.listener === "event") {
    return;
  }
  if (obj.detail.listener === "cheer-latest" && state_toggle_bits) {
    let _amount = obj.detail.event.amount;
    amount = _amount / bits_factor;
  }
  if (obj.detail.listener === "tip-latest" && state_toggle_tips) {
    let _amount = obj.detail.event.amount;
    amount = _amount * tips_factor;
  }
  if (obj.detail.listener === "subscriber-latest" && state_toggle_subs) {
    let event = obj.detail.event;
    //temp amount counters
    let _amount = event.amount;

    // deal with gifts from here onwards
    let gift = event.gifted;

    // idk what community gifts do, so i'm not gonna bother
    if (event.isCommunityGift) {
      return;
    }

    // i'm honestly extremely confused why they have 3 different gift fields
    let bulk = event.bulkGifted;

    if (bulk) {
      _amount = _amount;
    } else if (gift) {
      _amount = 1;
    } else if (amount > 1) {
      _amount = _amount;
    } else {
      _amount = 1;
    }
    //math on the sub amount
    amount = _amount * sub_factor;
  }
  DonationCounter(amount);
  adjustColor();
  return;
});

window.addEventListener("DOMContentLoaded", function () {
  function isFormValid() {
    return (
      input_goal_description.value.trim() !== "" &&
      input_goal_amount.value.trim() !== ""
    );
  }
  function isOffsetEntered() {
    return input_offset.value.trim() !== "";
  }
  function isTotalEntered() {
    return input_total.value.trim() !== "";
  }
  function toggleSwitch(button, state) {
    state = !state;
    button.classList.toggle("active", state);
    return state;
  }
  function isThroneEntered() {
    return input_throne_username.value.trim() !== "";
  }

  // Add event listeners to the input fields
  toggle_settings_wrap.addEventListener("click", function () {
    if (state_toggle_settings_wrap) {
      debug.style.display = "none";
    } else {
      debug.style.display = "flex";
    }
    state_toggle_settings_wrap = toggleSwitch(toggle_settings_wrap, state_toggle_settings_wrap);
  });
  toggle_debug_goal_list.addEventListener("click", function () {
    if (state_toggle_debug_goal_list) {
      debug_goal_list.style.display = "none";
    } else {
      debug_goal_list.style.display = "flex";
    }
    state_toggle_debug_goal_list = toggleSwitch(
      toggle_debug_goal_list,
      state_toggle_debug_goal_list
    );
  });
  toggle_ctrl_settings.addEventListener("click", function () {
    if (state_toggle_ctrl_settings) {
      ctrl_settings.style.display = "none";
    } else {
      ctrl_settings.style.display = "flex";
    }
    state_toggle_ctrl_settings = toggleSwitch(
      toggle_ctrl_settings,
      state_toggle_ctrl_settings
    );
  });
  /* Goal Panel */
  input_goal_description.addEventListener("input", function () {
    button_add_goal.disabled = !isFormValid();
  });
  input_goal_amount.addEventListener("input", function () {
    button_add_goal.disabled = !isFormValid();
  });
  button_add_goal.addEventListener("click", function () {
    // Check if both fields are filled
    if (isFormValid()) {
      goalCount++;
      // Add Goal to the list
      const description = input_goal_description.value;
      const amount = input_goal_amount.value;

      goals[goalCount] = {
        description: description,
        amount: amount,
        reached: false,
      };

      // Clear the input fields
      input_goal_description.value = "";
      input_goal_amount.value = "";

      // Disable the "Add Goal" button after adding a goal
      button_add_goal.disabled = true;
    }
    adjustColor();
    DonationCounter(0);
  });
  button_remove_last.addEventListener("click", function () {
    delete goals[Object.keys(goals).length];
    adjustColor();
    DonationCounter(0);
  });
  button_remove_bottom.addEventListener("click", function () {
    // Find the entry with the smallest "amount"
    let minAmount = Infinity;
    let keyToDelete = null;
    for (const key in goals) {
      if (goals[key].amount < minAmount) {
        minAmount = goals[key].amount;
        keyToDelete = key;
      }
    }
    // Delete the entry with the smallest "amount"
    if (keyToDelete) {
      delete goals[keyToDelete];
    }
    adjustColor();
    DonationCounter(0);
  });
  button_remove_top.addEventListener("click", function () {
    // Find the entry with the smallest "amount"
    let maxAmount = 0;
    let keyToDelete = null;
    for (const key in goals) {
      if (goals[key].amount > maxAmount) {
        maxAmount = goals[key].amount;
        keyToDelete = key;
      }
    }
    // Delete the entry with the smallest "amount"
    if (keyToDelete) {
      delete goals[keyToDelete];
    }
    adjustColor();
    DonationCounter(0);
  });
  button_remove_all.addEventListener("click", function () {
    goals = {};
    adjustColor();
    DonationCounter(0);
  });

  /* Amount Panel */
  input_total.addEventListener("input", function () {
    button_applyTotal.disabled = !isTotalEntered();
  });
  button_applyTotal.addEventListener("click", function () {
    const total = parseInt(input_total.value);
    totalAmount = total;

    adjustColor();
    DonationCounter(0);
  });

  input_offset.addEventListener("input", function () {
    button_apply_offset.disabled = !isOffsetEntered();
  });
  button_apply_offset.addEventListener("click", function () {
    const offset = parseInt(input_offset.value);

    adjustColor();
    DonationCounter(offset);
  });

  button_reset.addEventListener("click", function () {
    goals = {};
    goalCount = 0;
    reachedAmount = 0;
    adjustColor();
    DonationCounter(0);
  });

  /* Event Panel */
  toggle_event_settings.addEventListener("click", function () {
    if (state_toggle_event_settings) {
      events_settings.style.display = "none";
    } else {
      events_settings.style.display = "flex";
    }
    state_toggle_event_settings = toggleSwitch(
      toggle_event_settings,
      state_toggle_event_settings
    );
  });
  toggle_subs.addEventListener("click", function () {
    state_toggle_subs = toggleSwitch(toggle_subs, state_toggle_subs);
  });
  input_sub_factor.addEventListener("input", function () {
    sub_factor = parseFloat(input_sub_factor.value);
  });
  toggle_bits.addEventListener("click", function () {
    state_toggle_bits = toggleSwitch(toggle_bits, state_toggle_bits);
  });
  input_bits_factor.addEventListener("input", function () {
    bits_factor = parseFloat(input_bits_factor.value);
  });
  toggle_tips.addEventListener("click", function () {
    state_toggle_tips = toggleSwitch(toggle_tips, state_toggle_tips);
  });
  input_tips_factor.addEventListener("input", function () {
    tips_factor = parseFloat(input_tips_factor.value);//parseInt(input_tips_factor.value);
  });
  toggle_throne.addEventListener("click", function () {
    if (isThroneEntered()) {
      if (state_toggle_throne) {
        clearIt();
      } else {
        setIt();
      }
      state_toggle_throne = toggleSwitch(toggle_throne, state_toggle_throne);
    }
  });
  input_throne_factor.addEventListener("input", function () {
    throne_factor = parseFloat(input_throne_factor.value);
  });

  /* Customization Panel */
  toggle_customization.addEventListener("click", function () {
    if (state_toggle_customization) {
      ctrl_customization.style.display = "none";
    } else {
      ctrl_customization.style.display = "flex";
    }
    state_toggle_customization = toggleSwitch(
      toggle_customization,
      state_toggle_customization
    );
  });
  toggle_goals.addEventListener("click", function () {
    if (state_toggle_goals) {
      goal_list.style.display = "none";
    } else {
      goal_list.style.display = "flex";
    }
    state_toggle_goals = toggleSwitch(toggle_goals, state_toggle_goals);
  });
  toggle_progress.addEventListener("click", function () {
    if (state_toggle_progress) {
      progress_bar.style.display = "none";
    } else {
      progress_bar.style.display = "flex";
    }
    state_toggle_progress = toggleSwitch(
      toggle_progress,
      state_toggle_progress
    );
  });
  input_nb_goals.addEventListener("input", function () {
    nbGoals = parseInt(input_nb_goals.value);
  });
  selector_goal_alignment.addEventListener("input", function () {
    selected_goal_alignment = selector_goal_alignment.value;
    DonationCounter(0);
  });
  selector_themes.addEventListener("input", function () {
    selected_themes = selector_themes.value;
    if (selected_themes == "custom") {
      custom_accent.style.display = "flex";
    } else {
      custom_accent.style.display = "none";
    }
    adjustColor();
    DonationCounter(0);
  });
  toggle_animation.addEventListener("click", function () {
    if (state_toggle_animation) {
      CSS_Variables.style.setProperty("--animation", "0s");
    } else {
      CSS_Variables.style.setProperty("--animation", "7s");
    }
    state_toggle_animation = toggleSwitch(
      toggle_animation,
      state_toggle_animation
    );
  });

  /* Color Picker */
  redSlider.addEventListener("input", updateColor);
  greenSlider.addEventListener("input", updateColor);
  blueSlider.addEventListener("input", updateColor);
  redValue.addEventListener("input", updateSliderFromInput);
  greenValue.addEventListener("input", updateSliderFromInput);
  blueValue.addEventListener("input", updateSliderFromInput);

  function updateColor() {
    const red = redSlider.value;
    const green = greenSlider.value;
    const blue = blueSlider.value;
    color_custom_accent = `rgb(${red}, ${green}, ${blue})`;
    colorPreview.style.backgroundColor = color_custom_accent;
    redValue.value = red;
    greenValue.value = green;
    blueValue.value = blue;
    adjustColor();
    DonationCounter(0);
  }

  function updateSliderFromInput(event) {
    const input = event.target;
    const slider = document.getElementById(input.id.replace("-value", ""));
    slider.value = input.value;
    updateColor();
  }
  adjustColor();
  DonationCounter(0);
});

// Diff functions for each event type
function DonationCounter(amount) {
  reachedAmount += amount;
  const ratio = reachedAmount / totalAmount;
  const percent = parseInt(ratio * 100);

  checkingBoxes();

  CSS_Variables.style.setProperty("--Progress", String(percent) + "%");
  CSS_Variables.style.setProperty("--Remaining", String(100 - percent) + "%");

  CSS_Variables.style.setProperty("--txt_color", colors.txt_color);
  CSS_Variables.style.setProperty("--bg_color", colors.bg_color);
  CSS_Variables.style.setProperty("--primary_color", colors.primary_color);
  CSS_Variables.style.setProperty("--secondary_color", colors.secondary_color);
  CSS_Variables.style.setProperty("--accent_color", colors.accent_color);
  CSS_Variables.style.setProperty("--tertiary_color", colors.tertiary_color);

  if (selected_goal_alignment == "TR" || selected_goal_alignment == "BR") {
    CSS_Variables.style.setProperty("--alignGoalsHor", "flex-end");
  } else if (
    selected_goal_alignment == "TL" ||
    selected_goal_alignment == "BL"
  ) {
    CSS_Variables.style.setProperty("--alignGoalsHor", "flex-start");
  } else {
    CSS_Variables.style.setProperty("--alignGoalsHor", "center");
  }

  if (
    selected_goal_alignment == "TL" ||
    selected_goal_alignment == "TR" ||
    selected_goal_alignment == "TC"
  ) {
    CSS_Variables.style.setProperty("--alignGoalsVer", "column");
  } else {
    CSS_Variables.style.setProperty("--alignGoalsVer", "column-reverse");
  }

  ratio_txt.innerHTML = `${String(percent)} %`;
  progress_amount_txt.innerHTML = `${currencySymbol} ${String(reachedAmount)}`;
  remaining_total_txt.innerHTML = `${currencySymbol} ${String(totalAmount)}`;

  if (Object.keys(goals).length > 0) {
    debug_goal_list.innerHTML = "";
    Object.keys(goals).forEach((key) => {
      const goal = goals[key];
      const elementDiv2 = document.createElement("div");
      elementDiv2.classList.add("debug-goal-container");
      elementDiv2.innerHTML = `Reached: ${goal.reached} - Description: ${goal.description} - Amount: ${goal.amount}`;
      debug_goal_list.appendChild(elementDiv2);
    });

    if (state_toggle_goals) {
      var goalsToDisplay = [];

      const reachedGoals = Object.values(goals).filter((goal) => goal.reached);
      if (reachedGoals.length > 0) {
        // Filter goals where "reached" is true and find the highest one
        const highestReachedGoal = Object.values(goals)
          .filter((goal) => goal.reached)
          .reduce((highest, current) =>
            parseInt(current.amount) > parseInt(highest.amount)
              ? current
              : highest
          );

        // Filter goals where "reached" is false, sort them by "amount" in ascending order, and take the lowest nbGoals
        const lowestUnreachedGoals = Object.values(goals)
          .filter((goal) => !goal.reached)
          .sort((a, b) => parseInt(a.amount) - parseInt(b.amount))
          .slice(0, nbGoals);

        // Create an array to display the selected goals
        goalsToDisplay = [highestReachedGoal, ...lowestUnreachedGoals];
      } else {
        // Filter goals where "reached" is false, sort them by "amount" in ascending order, and take the lowest nbGoals
        const lowestUnreachedGoals = Object.values(goals)
          .filter((goal) => !goal.reached)
          .sort((a, b) => parseInt(a.amount) - parseInt(b.amount))
          .slice(0, nbGoals);

        // Create an array to display the selected goals
        goalsToDisplay = [...lowestUnreachedGoals];
      }

      goal_list.innerHTML = "";
      // Display the goals
      HTML_Checked_Block = `
      <div class = "V" >
        <svg fill="none">
          <path d="M16.9016 0.513193L7.38658 10.6365L3.06884 6.0112C2.34921 5.22577 1.2298 5.31304 0.510174 6.0112C-0.20945 6.79663 -0.129492 8.01841 0.510174 8.80384L5.6275 14.2146C6.10725 14.7382 6.74692 15 7.38658 15C8.02625 15 8.66592 14.7382 9.14567 14.2146L19.4603 3.3931C20.1799 2.60767 20.1799 1.38589 19.4603 0.600462C18.7407 -0.184968 17.6212 -0.184966 16.9016 0.513193Z" 
          fill="${colors.accent_color}" />
        </svg>
      </div>
      `;
      HTML_UnChecked_Block = `
      <div class = "V" >
        <svg fill="none">
          <path d="M16.9016 0.513193L7.38658 10.6365L3.06884 6.0112C2.34921 5.22577 1.2298 5.31304 0.510174 6.0112C-0.20945 6.79663 -0.129492 8.01841 0.510174 8.80384L5.6275 14.2146C6.10725 14.7382 6.74692 15 7.38658 15C8.02625 15 8.66592 14.7382 9.14567 14.2146L19.4603 3.3931C20.1799 2.60767 20.1799 1.38589 19.4603 0.600462C18.7407 -0.184968 17.6212 -0.184966 16.9016 0.513193Z" 
          fill="none"/>
        </svg>
      </div>
      `;

      goalsToDisplay.forEach((goal) => {
        if (goal.reached) {
          HTML_CHECK = HTML_Checked_Block;
        } else {
          HTML_CHECK = HTML_UnChecked_Block;
        }
        const elementDiv = document.createElement("div");
        elementDiv.classList.add("goal-container");
        elementDiv.innerHTML = `
      <div class="check">${HTML_CHECK}</div>
      <div class="goalMsg">
      ${
        goal.description +
        " - " +
        currencySymbol +
        " " +
        String(goal.amount) +
        ""
      }
      </div>
      `;
        goal_list.appendChild(elementDiv);
      });
    }
  }
}

function checkingBoxes() {
  for (const key in goals) {
    if (reachedAmount >= goals[key].amount) {
      if (!goals[key].reached) {
        goals[key].reached = true;
        goals[key].description = goals[key].description.strike() + " - Reached";
      }
    } else {
      goals[key].reached = false;
    }
  }
}

// Useful functions
function adjustColor() {
  reg_color = { h: 260, s: 18, l: 47 };
  theme_Color = { h: 260, s: 18, l: 47 };
  switch (selected_themes) {
    case "gold":
      theme_Color = { h: 35, s: 90, l: 70 };
      break;
    case "lavender":
      theme_Color = { h: 267, s: 90, l: 80 };
      break;
    case "peach":
      theme_Color = { h: 0, s: 100, l: 82 };
      break;
    case "custom":
      const [r, g, b, a] = color_custom_accent.match(/\d+/g).map(Number);
      let hue_accent = rgb2hsl(r, g, b);
      theme_Color = hue_accent;
      break;
  }
  if (theme_Color.l < 50) {
    txtluminance = 90;
  } else {
    txtluminance = 10;
  }
  colors.txt_color =
    "hsla(" +
    theme_Color.h +
    ", " +
    theme_Color.s +
    "%, " +
    txtluminance +
    "%, 1)";
  colors.bg_color =
    "hsla(" +
    theme_Color.h +
    ", " +
    theme_Color.s +
    "%, " +
    (theme_Color.l + 10) +
    "%, 0.25)";
  colors.primary_color =
    "hsla(" +
    theme_Color.h +
    ", " +
    theme_Color.s +
    "%, " +
    (theme_Color.l - 10) +
    "%, 0.7)";
  colors.secondary_color =
    "hsla(" +
    theme_Color.h +
    ", " +
    theme_Color.s +
    "%, " +
    theme_Color.l +
    "%, 1)";
  colors.accent_color =
    "hsla(" + theme_Color.h + ", " + theme_Color.s + "%, 50%, 1)";

  colors.tertiary_color =
    "hsla(" +
    theme_Color.h +
    ", " +
    theme_Color.s +
    "%," +
    (theme_Color.l - 15) +
    "%, 1)";
}

function rgb2hsv(r, g, b) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
  diffc = (c) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num) => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100),
  };
}

function rgb2hsl(r, g, b) {
  // Make r, g, and b fractions of 1
  (r /= 255), (g /= 255), (b /= 255);
  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return {
    h: h,
    s: s,
    l: l,
  };
}
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

/* THRONE */
/*
MIT License

Copyright (c) 2023 Oliver Cole (github -- ojcole)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * @typedef Price
 * @type {object}
 * @property {number} fees
 * @property {number} total
 * @property {number} shipping
 * @property {number} price
 * @property {number} extras
 * @property {string} currency
 * @property {number} tax
 * @property {number} subTotal
 */

/**
 * @typedef Customer
 * @type {object}
 * @property {string} customerMessage
 * @property {string} customerUsername
 */

/**
 * @typedef Customizations
 * @type {object}
 * @property {Customer[]} customers
 */

/**
 * @typedef Item
 * @type {object}
 * @property {string} link
 * @property {Price} total
 * @property {Price} totalUsd
 * @property {string} name
 * @property {number} purchasedAt
 * @property {Customizations | null} customizations
 * @property {string} id
 */

const strPriceFormatter = (price) => {
  return `$${(price / 100).toFixed(2)}`;
};
const priceFormatter = (price) => {
  return (price / 100).toFixed(2);
}

/**
 *
 * @param {Customer | null} customer
 * @returns {string}
 */
const getPerson = (customer) => {
  if (customer === null || customer.customerUsername === null) {
    return "Anonymous";
  }
  return customer.customerUsername;
};

/**
 * @param {Customizations | null} customizations
 */
const byPerson = (customizations) => {
  if (customizations === null || customizations.customers.length === 0) {
    return "Anonymous";
  }
  return customizations.customers.map(getPerson).join(", ");
};

/**
 * @param {number} time
 * @returns {string}
 */
const byTime = (time) => {
  return new Date(time).toString();
};

/**
 * @type {Set<string>}
 */
const items = new Set();

/** @returns {Promise<Item[]>} */
const loadData = async () => {
  const contents = await fetch(
    "https://lycvypuyjp6lnj2hvwrjnvlddi0czlsz.lambda-url.eu-north-1.on.aws/?" +
      new URLSearchParams({ username: input_throne_username.value }),
    {
      method: "GET",
    }
  );

  return JSON.parse(await contents.text());
};

let old_Total = 0;
let firstRun = true;
const refresher = async () => {
  console.log("Refreshing Throne amount")
  const data = await loadData();
  const previousFallback = data.props.pageProps.fallback;
  const fallbackKeys = Object.keys(previousFallback).filter((key) =>
    key.startsWith("public/wishlist/usePreviousGifts")
  );
  if (fallbackKeys.length === 0) return;
  const previous = previousFallback[fallbackKeys[0]];
  const filtered = previous
    .filter((item) => item.purchasedAt > startingTime)
    .sort((a, b) => a.purchasedAt - b.purchasedAt);
  const totalSinceStart = filtered
    .map((item) => item.totalUsd.total)
    .reduce((a, b) => a + b, 0);
  for (const item of filtered) {
    const itemId = item.id;
    if (!items.has(itemId)) {
      items.add(itemId);
      // trigger event here
      //console.log(
      //  `[NEW ITEM] [${byTime(item.purchasedAt)}] ${item.name} ${priceFormatter(
      //    item.totalUsd.total
      //  )} -- ${byPerson(item.customizations)}`
      //);
    }
  }
  if (firstRun) {
    old_Total = priceFormatter(totalSinceStart);
    console.log("initial throne total:", old_Total);
    firstRun = false;
    return;
  } else {
    if (priceFormatter(totalSinceStart) > old_Total) {
      console.log("new donation");
      DonationCounter(
        (priceFormatter(totalSinceStart) - old_Total) * throne_factor
      );
      old_Total = priceFormatter(totalSinceStart);
    }
  }
};
