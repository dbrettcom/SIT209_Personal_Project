// User's login details and their respective console pages
var users =
[
    { username: 'username', password: 'password', page: "/daniel" },
    { username: 'tim', password: 'pass2', page: "/tim" },
    { username: 'sarah', password: 'pass3', page: "/sarah" }
];

var button = document.getElementById('login');

// Loops through the users to check if the password matches the username
// entered, and if correct, redirects them to their unique console page
button.onclick = function()
{
   var username = document.getElementById('username').value;
   var password = document.getElementById('password').value;

   for (var i = 0; i < users.length; i++)
   {
      if(username == users[i].username && password == users[i].password)
      {
         window.location.href = users[i].page;
         return false;
      }
      else
      {
         window.alert("You have entered incorrect login details")
      }
   }
}
