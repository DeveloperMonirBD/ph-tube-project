function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

// ** 1-Fetch, Load and show categories on html.
// ** create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// ** create videoCategories
const loadVideos = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// ** create loadCategories
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
    <img src="./assets/icon.png" alt="" />
    <h2 class="text-center text-xl font-bold">
    No Content Here in this Category
    </h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] relative">
        <img
        src=${video.thumbnail}
        class="h-full w-full object-cover"
        alt="Shoes" />
        ${
          video?.others?.posted_date?.length === 0
            ? ""
            : ` <span class="absolute right-2 bottom-2 bg-black text-white rounded p-1 text-xs">${getTimeString(
                video?.others?.posted_date
              )}</span> `
        }
    </figure>

    <div class="px-0 py-2 flex gap-2">
        <div>
            <img class="w-10 h-10 rounded-full object-cover" src=${
              video?.authors[0]?.profile_picture
            } alt="" />
        </div>
        <div>
        <he class= "font-bold">${video.title}</he>
        <div class="flex items-center gap-2">
        <p class= "text-gray-400">${video?.authors[0]?.profile_name}</p>
        ${
          video?.authors[0]?.verified === true
            ? '<img class="w-4" src="https://img.icons8.com/?size=48&id=p9jKUHLk5ejE&format=png" alt="" />'
            : ""
        }
        </div>
        <p></p>
        </div>
    </div>
    `;
    videoContainer.append(card);
  });
};

// ** create displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);

    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
            <button onclick = "loadCategoryVideos(${item.category_id})" class= "btn">
                ${item.category}
            </button>
            `;

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
loadVideos();
