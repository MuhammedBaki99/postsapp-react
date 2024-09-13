import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './App.css'

const RouterContext = createContext(null);
const PostContext = createContext(null);


const routes = [
  {
    id: crypto.randomUUID(),
    name: 'Home',
    url: '#/',
    element: <Home />,
  },
  {
    id: crypto.randomUUID(),
    name: 'About',
    url: '#/about',
    element: <About />,
  },
  {
    id: crypto.randomUUID(),
    name: 'Posts',
    url: '#/posts',
    element: <Posts />,
  },
  {
    id: crypto.randomUUID(),
    name: 'Contact',
    url: '#/contact',
    element: <Contact />,
  },
];

const notFound = {
  name: 'Page not found',
  element: <NotFound />,
  // url: '',
}

function getRoute(routeUrl) {
  const route = routes.find(x => x.url === routeUrl);
  return route ?? notFound;
}

const title = "App";

function setTitle(pageTitle) {
  document.title = `${pageTitle} - ${title}`;
}

function App() {
  // const [route, setRoute] = useState(location.hash.length < 2 ? '#/' : location.hash);
  // const [route, setRoute] = useState(location.hash.length < 2 ? routes[0] : getRoute(location.hash));
  const [route, setRoute] = useState(
    () => {
      if (location.hash.length < 2) {
        return routes[0];
      }

      return getRoute(location.hash);
    }
  );

  useEffect(() => {
    setTitle(route.name);
  }, [route]);

  useEffect(() => {
    window.addEventListener('hashchange', function () {
      setRoute(getRoute(location.hash));
    });
  }, []);

  return (
    <div className="container">
      <RouterContext.Provider value={route}>
        {location.hash === "#/" ? "" : <Header />}
        <Main />
        <Footer />
      </RouterContext.Provider>
    </div>
  )
}

function Main() {
  const [postId, setPostId] = useState(null);
  const dialogRef = useRef({});
  function handleClick() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  return (
    <div className="main">
      <PostContext.Provider value={{ postId, setPostId, dialogRef, handleClick }}>
        <Content />
        <Sidebar />
      </PostContext.Provider>
    </div>
  )
}

function Header() {
  return (
    <div className="header">
      <a href="#/" className='logo' >Posts App</a>
      <Nav />
    </div>
  )
}

function Nav() {
  const route = useContext(RouterContext);

  return (
    <ul className="nav">
      {routes.map(x =>
        <li key={x.id}>
          <a href={x.url} className={route.url === x.url ? 'selected' : ''}>{x.name}</a>
        </li>)}
    </ul>
  )
}

function Content() {
  const route = useContext(RouterContext);

  return (
    <div className="content">
      {route.element}
    </div>
  )
}

function Footer() {
  return (
    <div className="footer">Muhammet Baki Çağlayan &copy; 2024</div>
  )
}

function Sidebar() {
  const { dialogRef, handleClick } = useContext(PostContext);

  console.log(location.hash)
  return (
    <div className="sidebar" style={{ display: `${location.hash === "#/posts" ? "block" : "none"}` }}>

      <dialog ref={(e) => (dialogRef.current = e)}>
        <div className="dialogheader">
          <h2 style={{ textAlign: "center" }}>Comments</h2>
          <svg onClick={() =>
            dialogRef.current.close()} fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel2</title> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g></svg>


        </div>
        <hr />


        <div className="dialogContainer">
          <PostDetail />
        </div>
      </dialog>
    </div>
  )
}

function Home() {
  return (
    <div className="home">
      <h1>HOME</h1>
      <a href="#/contact" className="contact">
        <h1>Contact</h1>
      </a>
      <a href="#/posts" className="posts">
        <h1>POSTS</h1>
      </a>
      <a href='#/about' className="about">
        <h1>ABOUT</h1>
      </a>
    </div>
  );
}

function About() {
  return (
    <div className="aboutContainer">
      <div className="aboutHead">
        <h1>ABOUT</h1>
      </div>
      <div className="aboutText">
        <h1>ABOUT</h1>
        <p>This web application offers a dynamic platform featuring posts across various categories. Users can browse the latest content, read engaging articles, and interact with posts that cater to their interests. Each post is carefully curated to provide value and relevance, with an emphasis on easy access and a seamless user experience. <br />

          Our goal is to deliver a rich knowledge base while enhancing the process of discovery and learning. With an intuitive interface and smooth navigation, we aim to create a user-friendly environment for all.
        </p>
      </div>
    </div>
  );
}

function Contact() {
  const [password, setPassword] = useState(false);


  return (
    <div className="contact">
      <div className="contactContainer">
        <div className="contactHead">
          <h1>Contact Form</h1>
        </div>
        <form className='contactForm'>
          <h1>Contact-Form</h1>
          <input type="text" placeholder='Firstname' />
          <input type="text" placeholder='Lastname' />
          <input type="email" placeholder='Email' />
          <div className="password">
            <input type={password ? "password" : "text"} placeholder='Password' />
            {!password ? <> <svg viewBox="0 0 24 24" width={30} onClick={() => setPassword(true)} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.76406 5.29519C10.4664 5.10724 11.2123 5 12 5C18.3636 5 22 12 22 12C22 12 21.171 13.5958 19.612 15.2635M4.34912 8.77822C2.8152 10.4307 2 12 2 12C2 12 5.63636 19 12 19C12.8021 19 13.5608 18.8888 14.2744 18.6944M11.5 14.9585C10.4158 14.7766 9.52883 14.0132 9.17071 13M12.5 9.04148C13.7563 9.25224 14.7478 10.2437 14.9585 11.5M3 3L21 21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> </>
              :
              <>
                <svg width={30} onClick={() => setPassword(false)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-whiteidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 12 5.63636 5 12 5C18.3636 5 22 12 22 12C22 12 18.3636 19 12 19C5.63636 19 2 12 2 12Z" stroke="white" stroke-whiteidth="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-whiteidth="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></>
            }
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

function Posts() {
  return (
    <>
      <PostList />
    </>
  )
}

function PostList() {
  const { setPostId, dialogRef, handleClick } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);


  useEffect(() => {
    const skip = (page - 1) * limit;

    fetch('https://dummyjson.com/posts?limit=' + limit + "&skip=" + skip)
      .then(r => r.json())
      .then(r => {
        setPosts(r.posts);
        setTotal(r.total);
      });
  }, [limit, page]);

  function changePage(pageNumber) {
    setPage(pageNumber);
  }

  const pageCount = Math.ceil(total / limit);

  function PageLimit(e) {
    setLimit(e.target.value);
  }


  console.log(total)
  return (
    <div className='postContainer'>
      <button className='uparrow' onClick={() => document.documentElement.scrollTop = 0}><svg fill="#ECAF92" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M505.749,304.918L271.083,70.251c-8.341-8.341-21.824-8.341-30.165,0L6.251,304.918C2.24,308.907,0,314.326,0,320.001 v106.667c0,8.619,5.184,16.427,13.163,19.712c7.979,3.307,17.152,1.472,23.253-4.629L256,222.166L475.584,441.75 c4.075,4.075,9.536,6.251,15.083,6.251c2.752,0,5.525-0.512,8.171-1.621c7.979-3.285,13.163-11.093,13.163-19.712V320.001 C512,314.326,509.76,308.907,505.749,304.918z"></path> </g> </g> </g></svg></button>

      <div className="posthead">
        <h1>POSTS</h1>
        <div className='showPost'>
          <h3>Post Sayısı =</h3>
          <select onClick={PageLimit} style={{
            width: 40
          }}>
            <option value="5" >5</option>
            <option value="10" >10</option>
            <option value="25" >25</option>
          </select></div>
      </div>

      <div className="postList">
        {posts.map(x =>
          <div key={x.id} className='postItem'>
            <div className="posthead">
              <svg width={50} fill="#161d30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M80,71.2V74c0,3.3-2.7,6-6,6H26c-3.3,0-6-2.7-6-6v-2.8c0-7.3,8.5-11.7,16.5-15.2c0.3-0.1,0.5-0.2,0.8-0.4 c0.6-0.3,1.3-0.3,1.9,0.1C42.4,57.8,46.1,59,50,59c3.9,0,7.6-1.2,10.8-3.2c0.6-0.4,1.3-0.4,1.9-0.1c0.3,0.1,0.5,0.2,0.8,0.4 C71.5,59.5,80,63.9,80,71.2z"></path> </g> <g> <ellipse cx="50" cy="36.5" rx="14.9" ry="16.5"></ellipse> </g> </g> </g></svg>
              <h2>{x.title} </h2>
            </div>
            <h5>{x.body}</h5>
            <a
              href={'#/posts/' + x.id}
              onClick={e => { e.preventDefault(); setPostId(x.id); handleClick(); }}
            >
              <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.38204 10.234C7.96783 10.234 7.63204 10.5698 7.63204 10.984C7.63204 11.3982 7.96783 11.734 8.38204 11.734V10.234ZM14.147 11.734C14.5613 11.734 14.897 11.3982 14.897 10.984C14.897 10.5698 14.5613 10.234 14.147 10.234V11.734ZM9.10004 12.342C8.68583 12.342 8.35004 12.6778 8.35004 13.092C8.35004 13.5062 8.68583 13.842 9.10004 13.842V12.342ZM13.426 13.842C13.8403 13.842 14.176 13.5062 14.176 13.092C14.176 12.6778 13.8403 12.342 13.426 12.342V13.842ZM7.89534 6.77227C7.4868 6.84059 7.211 7.22716 7.27932 7.6357C7.34764 8.04424 7.73421 8.32005 8.14275 8.25173L7.89534 6.77227ZM8.51904 7.471L8.5175 8.221H8.51904V7.471ZM14.019 7.471L14.0247 6.721H14.019V7.471ZM17.035 10.532L16.285 10.5265V10.532H17.035ZM17.035 14.248L16.285 14.248L16.285 14.2489L17.035 14.248ZM16.2486 14.666C16.1762 15.0739 16.4482 15.4631 16.8561 15.5355C17.2639 15.6078 17.6532 15.3358 17.7255 14.928L16.2486 14.666ZM8.1494 8.25058C8.55731 8.17859 8.82962 7.78955 8.75763 7.38164C8.68563 6.97373 8.29659 6.70142 7.88869 6.77342L8.1494 8.25058ZM5.50004 10.531L6.25006 10.531L6.25003 10.527L5.50004 10.531ZM5.50004 19H4.75004C4.75004 19.2663 4.89121 19.5126 5.12096 19.6471C5.35071 19.7817 5.63459 19.7844 5.86683 19.6542L5.50004 19ZM8.51604 17.309V16.559C8.38759 16.559 8.2613 16.592 8.14926 16.6548L8.51604 17.309ZM14.016 17.309V18.059L14.021 18.059L14.016 17.309ZM17.7199 14.9289C17.7911 14.5209 17.518 14.1324 17.11 14.0612C16.7019 13.99 16.3134 14.263 16.2422 14.6711L17.7199 14.9289ZM7.28008 7.38379C7.20928 7.79191 7.48272 8.18016 7.89084 8.25096C8.29896 8.32177 8.6872 8.04832 8.75801 7.64021L7.28008 7.38379ZM10.987 5V4.24999L10.9827 4.25001L10.987 5ZM16.487 5L16.4934 4.25H16.487V5ZM19.5 8.061L18.75 8.05554V8.061H19.5ZM19.5 11.777H18.75L18.7501 11.782L19.5 11.777ZM16.8507 14.0614C16.4428 14.1334 16.1705 14.5224 16.2425 14.9304C16.3145 15.3383 16.7035 15.6106 17.1114 15.5386L16.8507 14.0614ZM8.38204 11.734H14.147V10.234H8.38204V11.734ZM9.10004 13.842H13.426V12.342H9.10004V13.842ZM8.14275 8.25173C8.26659 8.23102 8.39194 8.22074 8.5175 8.221L8.52059 6.721C8.31111 6.72057 8.10196 6.73772 7.89534 6.77227L8.14275 8.25173ZM8.51904 8.221H14.019V6.721H8.51904V8.221ZM14.0134 8.22098C15.2773 8.23051 16.2943 9.26265 16.2851 10.5265L17.785 10.5375C17.8002 8.4453 16.1168 6.7368 14.0247 6.72102L14.0134 8.22098ZM16.285 10.532V14.248H17.785V10.532H16.285ZM16.285 14.2489C16.2852 14.3887 16.273 14.5283 16.2486 14.666L17.7255 14.928C17.7654 14.7032 17.7853 14.4754 17.785 14.2471L16.285 14.2489ZM7.88869 6.77342C6.06575 7.09516 4.74009 8.68395 4.75006 10.535L6.25003 10.527C6.244 9.40676 7.04624 8.44529 8.1494 8.25058L7.88869 6.77342ZM4.75004 10.531V19H6.25004V10.531H4.75004ZM5.86683 19.6542L8.88283 17.9632L8.14926 16.6548L5.13326 18.3458L5.86683 19.6542ZM8.51604 18.059H14.016V16.559H8.51604V18.059ZM14.021 18.059C15.8485 18.047 17.4057 16.7293 17.7199 14.9289L16.2422 14.6711C16.0527 15.757 15.1134 16.5518 14.0111 16.559L14.021 18.059ZM8.75801 7.64021C8.94671 6.55256 9.88748 5.75633 10.9914 5.74999L10.9827 4.25001C9.15263 4.26052 7.59293 5.58059 7.28008 7.38379L8.75801 7.64021ZM10.987 5.75H16.487V4.25H10.987V5.75ZM16.4806 5.74997C17.7437 5.76075 18.7593 6.79252 18.7501 8.05554L20.25 8.06646C20.2652 5.97576 18.5841 4.26786 16.4934 4.25003L16.4806 5.74997ZM18.75 8.061V11.777H20.25V8.061H18.75ZM18.7501 11.782C18.7576 12.9034 17.955 13.8665 16.8507 14.0614L17.1114 15.5386C18.9362 15.2165 20.2624 13.6249 20.25 11.772L18.7501 11.782Z" fill="#000000"></path> </g></svg>See Comments</a></div>
        )}
        <ul className="BtnList">
          {
            Array
              .from({ length: pageCount }, (v, i) => (i + 1))
              .map(x => <li key={x}><a href="#" className={page === x ? 'activePage' : ''} onClick={e => { e.preventDefault(); changePage(x); }}>{x}</a></li>)
          }
        </ul>

      </div>
    </div >
  )
}

function PostDetail() {
  const { setPostId, postId } = useContext(PostContext);


  const [comments, setComments] = useState(localStorage.comments ? JSON.parse(localStorage.comments) : []);
  const [Newcomments, setNewComments] = useState(localStorage.Newcomments ? JSON.parse(localStorage.Newcomments) : []);
  console.log(postId)


  async function getData() {
    const commentsData = await fetch(`https://dummyjson.com/posts/${postId}/comments`).then(r => r.json());

    setComments(commentsData.comments);
  }
  console.log(comments)

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formObj = Object.fromEntries(formData);
    setNewComments([...Newcomments, {
      id: crypto.randomUUID(),
      postId: postId,
      body: formObj.body,
      user: {
        fullName: formObj.fullName
      }
    }]);
    e.target.reset();
    dialogRef.current.close();
  }

  useEffect(() => {
    localStorage.comments = JSON.stringify(comments);
    localStorage.Newcomments = JSON.stringify(Newcomments);
  }, [comments, Newcomments]);

  useEffect(() => {
    if (postId !== null) {
      getData();
    }
  }, [postId]);



  return (
    <>

      <div className="commentList">
        {comments.length !== 0 ? <>
          {comments.map(
            x => <p key={x.id} className='commentItem'><strong>{x.user.fullName}</strong> : {x.body}</p>
          )}
          {Newcomments.map(
            x => <p key={x.id} className='commentItem' style={{
              display: `${x.postId === comments[0].postId ? "block" : "none"}`
            }}><strong>{x.user.fullName}</strong> : {x.body}</p>
          )}
        </> :
          <>
            {Newcomments.map(
              x => <p key={x.id} className='commentItem' style={{
                display: `${x.postId === postId ? "block" : "none"}`
              }}><strong>{x.user.fullName}</strong> : {x.body}</p>
            )}
          </>
        }</div>

      <form onSubmit={handleSubmit}>
        <input required type="text" name="fullName" placeholder='Fullname' />
        <input required type="text" name="body" placeholder='Add Comments' />
        <button type='submit'><svg fill="#000000" width="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.013 492.013" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M119.8,62.761l-41.4-17.5l-10.3-4.4l-0.6-0.3l-0.3-0.1l-1.8-0.7l-1.4-0.4l-2.7-0.9c-3.2-0.8-7.7-1.7-10.9-1.8 c-6.5-0.3-13.1,0.8-19.1,3.1c-5.9,2.4-11.5,5.7-16,10.2c-9.3,8.5-14.9,21.1-15.3,34.2c0.1,6.5,1.1,13.1,3.6,18.8l0.9,2.2 c0.3,0.8,0.6,1.5,0.8,1.8l1.2,2.5l2.5,5l19.8,40.2c13.4,26.8,26.7,53.5,40,80.2l0.2,0.3c2.9,5.8,8.8,10,15.7,10.5 c47.3,3.4,94.4,6.4,141.5,9.1c47.2,2.7,86.8,1.3,84.1-8c-2.5-8.5-35.5-17.3-83.8-22.3c-43.1-4.3-86.4-8.7-129.8-13 c-16.3-34.4-32.8-68.9-49.7-103.1l-5.8-11.8l-2.9-5.9c-0.3-0.6-0.3-0.7-0.4-1l-0.3-0.7c-0.2-0.5-0.5-0.9-0.5-1.4 c-0.6-1.8-0.4-3.5-0.1-5.2c0.3-1.7,1.2-3.5,2.4-4.9c2.4-3.1,6.2-4.7,9.6-4.6c0.4,0,0.3,0.1,0.6,0c0.1,0,0.1-0.1,0.3-0.1l1.6,0.5 l1.6,0.5l0.8,0.3l0,0l2.6,1.1l12.2,5l97.8,39.8l195.7,79.2c28.6,13.5,57.3,26.7,86.2,39.7c0.4,0.2,1,0.4,1.2,0.6l0.6,0.4 c0.4,0.2,0.8,0.4,1.2,0.6c0.5,0.6,1.4,0.9,1.7,1.6c1.1,1.1,1.7,2.5,2.3,3.9c1,3,0.6,6.6-0.9,9.1c-0.5,1.3-1.9,2.3-2.6,3 c-0.1,0-0.1,0-0.1,0.1c0,0,0.1,0-0.1,0.1l-0.7,0.3l-1.3,0.6l-1.1,0.5l0,0l-0.3,0.1l-2.8,1.1l-22.2,8.8 c-59.2,23.5-118.2,47.8-177.3,72.4c-59,24.7-118.1,49.5-177.2,74.2l-11.1,4.6l-5.5,2.3c-0.9,0.3-0.8,0.2-1.3,0.4 c-0.3,0.1-0.7,0.4-1,0.3c-1.2,0.3-2.3,0.2-3.4,0c-1.1-0.4-2.2-0.8-3.3-1.6c-2.1-1.6-3.5-4.2-3.5-6.3c-0.2-0.5,0.1-1.2,0-1.6 c0.1,0,0,0.1-0.1,0.1h-0.1c0,0-0.1,0,0-0.3l0.6-1.4l0.6-1.4l0.2-0.6l1-2.1l2.7-5.4c14.2-28.6,28.5-57.2,42.7-85.8 c5.1-10.2,9.8-27.7,10.1-33.8c0.5-12.1-9.6-1-21.9,17c-10.2,14.9-20.4,30.7-30.7,47.4c-5.1,8.3-10.3,16.9-15.5,25.6 c-2.6,4.4-5.1,8.8-7.7,13.2l-3.9,6.7l-1.9,3.4l-1,1.7l-1.1,2.4l-0.8,1.8l-0.4,0.9l-0.4,1.4c-0.5,1.8-1.2,3.8-1.4,5.7 c-0.2,1.8-0.4,3.5-0.5,5.3c0.1,1.8,0.2,3.6,0.3,5.4c0.9,7.2,4,14,8.7,19.6c4.6,5.6,11,10,18.2,12.4c7.3,2.4,15.4,2.4,22.7,0.3 c4.1-1.2,6.2-2.1,8.8-3.1l7.6-2.9c5.1-2,10.2-3.9,15.3-5.9c10.2-4,20.4-8.1,30.6-12.1c98.3-39.4,196.6-78.9,295.1-118.4l36.9-15 l4.6-1.9l2.3-0.9l1.2-0.5l0.3-0.1l1.6-0.7l0.6-0.3l2.2-1.1l1.1-0.6c0.4-0.2,1.3-0.8,1.9-1.2c2.7-1.8,5.7-3.9,7.4-5.7 c8.1-7.7,13.3-18.4,14.2-29.3c1-10.8-1.5-22.2-8-31.4c-1.6-2.3-3.3-4.5-5.4-6.5c-1.9-2.1-4.1-3.8-6.4-5.3 c-2.2-1.7-4.7-2.8-7.1-4.1l-1.8-0.8l-1.1-0.5l-2.3-1l-36.8-15.4c-49.1-20.5-98.3-40.6-147.8-60.4c-24.2-10.5-48.4-20.9-72.6-31.4 L119.8,62.761z"></path> </g> </g> </g></svg></button>
      </form>
    </>
  )
}

function NotFound() {
  return (
    <p>Page not found. <a href="#/">return home</a></p>
  )
}

export default App
