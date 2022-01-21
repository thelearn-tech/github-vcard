    // getting the searched user name ?user=thelearn-tech
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    var searchedUser = 'user',
        userNameSearched = getUrlParameter(searchedUser);
        
      // if there is no use name searched then set the username to be thelearn-tech  

        if (getUrlParameter(searchedUser) == "") {
          userNameSearched = "thelearn-tech";
        } else {
          userNameSearched = getUrlParameter(searchedUser);
        }
      

      
      // sending request to see if searced user is valid or not
       var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/users/' + userNameSearched);
  xhr.onload = function () {
  
  if (xhr.status == "200") { // if user is valid (found)
    $.getJSON("https://api.github.com/users/" + userNameSearched,
    function(data) {
    document.getElementById("avatarSrc").src = data.avatar_url;
    document.getElementById("GithubUserName").innerHTML = data.login;
    if (data.name == null) {
      document.getElementById("userName").innerHTML = null;
    } else {
      document.getElementById("userName").innerHTML = data.name;
    }

    if (data.company == null) {
      document.getElementById("userCompany").innerHTML = null;
    } else {
      document.getElementById("userCompany").innerHTML = data.company;
    }
     
    if (data.email == null) {
      document.getElementById("userMail").innerHTML = null;

    } else {
       document.getElementById("userMail").innerHTML = data.email;
    }

    if (userNameSearched == "thelearn-tech") {
      document.getElementById("userMail").innerHTML = "pb.thelearn.tech@gmail.com";
    } 
    
    
    if (data.blog == "") {
      document.getElementById("userBlog").innerHTML = null;
    } else {
      document.getElementById("userBlog").innerHTML = data.blog;
    }
    document.getElementById("userFollowers").innerHTML = data.followers;
    if (data.location == null) {
      document.getElementById("userLocation").innerHTML = null;
    } else {
      document.getElementById("userLocation").innerHTML = data.location;
    }
    
    if (data.twitter_username == null) { // if there is no twitter then remove twitter icon
       var twitterLink = document.getElementById("userTwitter");
       twitterLink.remove();
     } else {
       document.getElementById("userTwitter").href = "https://twitter.com/" + data.twitter_username;
     }
     if (userNameSearched == "thelearn-tech") {
         // do nothing
     } else {
      var myInsta = document.getElementById("myInstagram");
       myInsta.remove();
     }
      

    document.getElementById("userGithub").href = "https://github.com/" + data.login;
    })
   } else { // if user not found (not valid)
    document.getElementById("avatarSrc").src = "https://i.ibb.co/R3yj1tH/404-freepik.com.jpg"; // 404 Image from freepik.com 
    document.getElementById("userName").innerHTML = " Not Found";
    document.getElementById("GithubUserName").innerHTML = null;
    document.getElementById("userCompany").innerHTML = null;
    document.getElementById("userMail").innerHTML = null;
    document.getElementById("userBlog").innerHTML = null;
    document.getElementById("userFollowers").innerHTML = null;
    document.getElementById("userLocation").innerHTML = null;
    var twitterLink = document.getElementById("userTwitter");
       twitterLink.remove();
    var githubLink = document.getElementById("userGithub");
        githubLink.remove();
   }
   
};
  
     xhr.send();
    