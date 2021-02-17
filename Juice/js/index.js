// selection of dom elements
const postList = document.querySelector('.postListing');
const searchBar = document.getElementById('search');
let iteration = 0;
let array = [];
// functions
iterate = () => {
  iteration += 4;
};

modal = ({ name, profileImage, image, date, caption, likes }) => {
  const modalDoc = document.createElement('div');
  modalDoc.innerHTML =
    '<div class="darken"></div>\
    <div class="relContainer">\
    <div class="modalContainer">\
      <img \
      class="modalImage"\
      src="' +
    image +
    '" />\
      <div class="modalUser">\
      <div class="nameDateProf">\
      <img src="' +
    profileImage +
    '" \
      class="modalProfile" />\
        <div class="modalNameAndDate">\
        <p class="modalName">' +
    name +
    '</p>\
        <p class="modalDate">' +
    date +
    '</p></div></div>\
 <p class="modalCaption">' +
    caption +
    '</p> \
    <p style="display:flex"> <img src="/icons/heart.svg">' +
    likes +
    '</p>\
    </div>\
    <a style="margin-left:9vw;">X</a>\
    <img src="/icons/instagram-logo.svg" style=" margin-top:3rem; width:1rem; height:1rem;">\
    </div>\
    </div>';
  postList.appendChild(modalDoc);
  let anchor = document.getElementsByTagName('a')[0];
  anchor.onclick = function() {
    postList.removeChild(modalDoc);
  };
};
//Fetch Function
fetchFromAPI = async () => {
  let myReq = new Request('../data.json');
  if (array.length === 0) {
    await fetch(myReq)
      .then(res => res.json())
      .then(data => {
        data.forEach(post => {
          array.push(post);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  iterate();
  postList.innerHTML = '';
  if (iteration >= array.length) {
    document.querySelector('.button').style.visibility = 'hidden';
  }
  let sliced = array.slice(0, iteration);

  sliced.forEach(post => {
    const postsDiv = document.createElement('div');
    let date = new Date(post.date);
    let dateStr = date.toString().slice(3, 15);
    let caption = '';
    if (post.caption.length > 200) {
      caption = post.caption.slice(1, 130);
      caption += '...';
    } else {
      caption = post.caption;
    }
    postsDiv.innerHTML =
      '<div class="postContainer" ><div class="postContent"> <div class="user"><div class="grouped"><img class="profileImage" src=' +
      post.profile_image +
      '><div class="nameDate"> <h3 class="name">' +
      post.name +
      '</h3>   <p class="date"> ' +
      dateStr +
      '</p></div ></div><img src="/icons/instagram-logo.svg"></div><img class="postImage" src="' +
      post.image +
      '"/><h5 class="postCaption">' +
      caption +
      '</h5> <hr/><div class="likeSystem"><img src="/icons/heart.svg"><h5 class="likes"> ' +
      post.likes +
      '</h5></div></div></div>';
    postsDiv.onclick = function() {
      modal({
        name: post.name,
        image: post.image,
        date: dateStr,
        profileImage: post.profile_image,
        caption: post.caption,
        likes: post.likes,
      });
    };
    postList.appendChild(postsDiv);
  });
};
fetchFromAPI();

//events
