// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to apply the theme
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// Function to handle theme change
function changeTheme(theme) {
  setCookie('theme', theme, 7); // Set cookie for 7 days
  applyTheme(theme);
}

// Apply the saved theme when the page loads
window.onload = function() {
  var savedTheme = getCookie('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }
};

// Example of changing the theme
document.getElementById('theme-selector').addEventListener('change', function() {
  changeTheme(this.value);
});