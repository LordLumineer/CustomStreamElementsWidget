var widget_width = document.querySelector(".WidgetWrap").clientWidth * 0.95;
var CSS_Variables = document.querySelector(":root");

// Defining useful global variables
let provider;
let reachedDonothon, totalDonothon, percent, ratio;
let currencySymbol;
//Differents types of events
let events = {
  cheer: {
    enabled: false,
    min: 1,
    class: "cheer",
  },
  tip: {
    enabled: false,
    min: 1,
    currency: "$",
    class: "tip",
  },
  sub: {
    enabled: false,
    class: "sub",
  },
  resub: {
    enabled: false,
    class: "resub",
  },
  gift: {
    enabled: false,
    class: "gift",
  },
  direct: {
    enabled: false,
    class: "direct",
  },
};
let customAccent;
let theme = "gold";
let colors = {
  txt_color: "rgb(0, 0, 0)",
  bg_color: "rgb(0, 0, 0)",
  primary_color: "rgb(0, 0, 0)",
  secondary_color: "rgb(0, 0, 0)",
  accent_color: "rgb(0, 0, 0)",
};

// Initial setup on widget startup
window.addEventListener("onWidgetLoad", function (obj) {
  reachedDonothon = 0;
  amount = 0;
  //console.log(widget_width)
  currencySymbol = obj.detail.currency.symbol;

  // Grabbing chat settings from fields
  const fieldData = obj.detail.fieldData;

  displayLine = fieldData.displayLine;
  lineWidth = fieldData.lineWidth;

  totalDonothon = fieldData.totalDonothon;

  events.cheer.factor = 1 / fieldData.cheerFactor;
  events.tip.factor = fieldData.tipFactor;
  events.sub.factor = fieldData.subFactor;

  //console.log($(".main-container"))

  //Color
  theme = fieldData.theme;
  customAccent = fieldData.customAccent;

  // Grabbing the service used for chatbox (Twitch, YouTube, Mixer)
  fetch(
    "https://api.streamelements.com/kappa/v2/channels/" +
      obj.detail.channel.id +
      "/"
  )
    .then((response) => response.json())
    .then((profile) => {
      provider = profile.provider;
    });

  adjustColor();
  DonothonCounter(amount);
});

// Listen for StreamElements events
window.addEventListener("onEventReceived", function (obj) {
  amount = 0;
  if (obj.detail.event.listener === "widget-button") {
    if (obj.detail.event.field === "reset") {
      reachedDonothon = 0;
      adjustColor();
      DonothonCounter(amount);
      return;
    }
  }

  if (obj.detail.listener === "cheer-latest") {
    let _amount = obj.detail.event.amount;
    amount = _amount * events.cheer.factor;
  }
  if (obj.detail.listener === "tip-latest") {
    let _amount = obj.detail.event.amount;
    amount = _amount * events.tip.factor;
  }
  if (obj.detail.listener === "subscriber-latest") {
    let event = obj.detail.event;
    //temp amount counters
    let _amount = event.amount;

    // deal with gifts from here onwards
    let gift = event.gifted;

    // idk what community gifts do, so i'm not gonna bother
    if (event.isCommunityGift) {
      return;
    }

    // i'm honestly extremely confused why they have 3 different gift fields Smoge
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
    amount = _amount * events.sub.factor;
  }

  console.log(obj.detail.listener);
  DonothonCounter(amount);
  adjustColor();
  return;
});

// Diff functions for each event type

function DonothonCounter(amount) {
  reachedDonothon += amount;
  ratio = reachedDonothon / totalDonothon;
  percent = parseInt(ratio * 100);
  leftWidth = widget_width * ratio;
  
  //if (leftWidth < 50) {
  //  leftWidth = "50px";
  //} else {
  //  leftWidth = String(percent) + "%";
  //}

  if (displayLine == true) {
    line_Width = lineWidth;
    Line_color = colors.accent_color;
  } else {
    line_Width = 0;
    Line_color = "rgba(0,0,0,0)";
  }

  CSS_Variables.style.setProperty("--lineWidth", line_Width+"px");
  CSS_Variables.style.setProperty("--lineColor", Line_color);

  CSS_Variables.style.setProperty("--MoneycountWidth", String(percent) + "%");

  CSS_Variables.style.setProperty("--txt_color", colors.txt_color);
  CSS_Variables.style.setProperty("--bg_color", colors.bg_color);
  CSS_Variables.style.setProperty("--primary_color", colors.primary_color);
  CSS_Variables.style.setProperty("--secondary_color", colors.secondary_color);
  CSS_Variables.style.setProperty("--accent_color", colors.accent_color);

  document.getElementById("RatioID").innerHTML = `${String(percent)} %`;
  document.getElementById("AmountID").innerHTML = `${currencySymbol} ${String(reachedDonothon)}`;
  document.getElementById("TotalID").innerHTML = `${currencySymbol} ${String(totalDonothon)}`;
}

// Useful functions
function adjustColor() {
  reg_color = { h: 260, s: 18, l: 47 };
  theme_Color = { h: 260, s: 18, l: 47 };
  switch (theme) {
    case "gold":
      theme_Color = { h: 35, s: 90, l: 70 };
      break;
    case "lavender":
      theme_Color = { h: 267, s: 90, l: 80 };
      break;
    case "peach":
      theme_Color = { h: 0, s: 100, l: 82 };
      break;
    case "own":
      const [r, g, b, a] = customAccent.match(/\d+/g).map(Number);
      let hue_accent = rgb2hsl(r, g, b);
      //console.log(r,g,b)
      //console.log(hue_accent)
      theme_Color = hue_accent;
      break;
  }
  if (theme_Color.l < 50) {
    txtluminance = 90;
  } else {
    txtluminance = 10;
  }
  colors.txt_color = "hsla(" + theme_Color.h + ", " +    theme_Color.s + "%, " + txtluminance + "%, 1)";
  colors.bg_color = "hsla(" + theme_Color.h + ", " + theme_Color.s + "%, " + (theme_Color.l + 10) + "%, 0.25)";
  colors.primary_color = "hsla(" + theme_Color.h + ", " + theme_Color.s + "%, " + (theme_Color.l - 10) + "%, 0.7)";
  colors.secondary_color = "hsla(" + theme_Color.h + ", " + theme_Color.s + "%, " + theme_Color.l + "%, 1)";
  colors.accent_color = "hsla(" + theme_Color.h + ", " + theme_Color.s + "%, 50%, 1)";
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
