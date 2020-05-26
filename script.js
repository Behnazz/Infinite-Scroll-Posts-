const postContainer = document.getElementById('post-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');


let limit = 3;
let page = 1;

//fetch  post  from api
const getPosts = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const data = await res.json();
  return data;
}

//show post in DOM

const showPost = async () => {
  const posts = await getPosts();
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post')
    postEl.innerHTML = `
    <div class="number">
    ${post.id}
    </div>
    <div class="post-info">
    <h2 class="post-title"> ${post.title}</h2>
    <p class="post-body">${post.body}</p>
    </div>
    `;
    postContainer.appendChild(postEl)
  })
};

//show the loader and fetch more posts

const showLoading = () => {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showPost()
    }, 300)
  }, 1000)
}

//filter post

const filterPosts = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    };
  });
};

//Show initial posts
showPost();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);