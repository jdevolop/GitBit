const el = document.querySelectorAll('.tabs')
var instance = M.Tabs.init(el, {
    swipeable: false
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {
        accordion: true,
        inDuration: 200,
        outDuration: 200,
    });
    const elem = document.querySelectorAll('.modal');
    var ins = M.Modal.init(elem, {
      opacity: 0.8,
      preventScrolling: true,
    });
  });

let res = document.querySelector('#result');
const loader = document.getElementById('loader');
let just = document.querySelector('#just');

function com() {
  let btns = a[0].getElementsByTagName('button');
  let urls = a[0].getElementsByClassName('card-title');

  for (let a = 0; a <= btns.length; a++) {
    btns[a].onclick = function() {
      getGithubCommit(urls[a].textContent, getCommit, mo);
    }
  }
}

const loaders = `<div class="progress">
        <div class="indeterminate"></div>
        </div>`;

const gitCsv = document.querySelector('#inp1');
const bitCsv = document.querySelector('#inp2');    

async function getGithub(url, generate, term) {
  req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      resp = JSON.parse(this.responseText).data;
      gitCsv.innerHTML = `<a href="http://127.0.0.1/github/api/download/csv?search_term=${term}" class="waves-effect waves-light btn">Download as CSV</a>`;

      if (just) {
        just.innerHTML = '';
      }

      loader.innerHTML = '';

      for (let a = 0; a <= resp.length; a++) {
        let card = generate(resp[a].full_name, resp[a].html_url, resp[a].description,
          resp[a].updated_at, resp[a].stargazers_count, resp[a].language);
        just.appendChild(card);
      }
     
       
      res.appendChild(just);      

    } else if (this.readyState !== 4) {
      gitCsv.innerHTML = '';
      loader.innerHTML = loaders;  
    } else if (this.status >= 500) {
      gitCsv.innerHTML = '';
      loader.innerHTML = '';  
      res.innerHTML = '<h1>Some error. Please reload</h1>';
    } else if (this.status === 404) {
      gitCsv.innerHTML = '';
      load.innerHTML = '';  
      res.innerHTML = '<h4>Not Found. Please reload</h4>';
    }
  }


  req.open('GET', url, true);
  req.send(null);

}

function get_csv_btn(url) {
  let btn = `<a href="http://127.0.0.1/${url}" class="waves-effect waves-light btn">Download as CSV</a>`
  // let a = document.createElement('a');
  // a.className = "waves-effect waves-light btn right";
  // a.setAttribute('href')
  // a.innerText = "";
  return btn;
}


mod = document.querySelector('.row .right');
comloader = document.querySelector('#comload');

async function getGithubCommit(url, gen) {
  const req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      comloader.innerHTML = '';
      // res.innerHTML = '';

      let { hash, message, committer_date, url,
        login, avatar_url, html_url
       } = JSON.parse(this.responseText);

      gen(hash, url, message, login, html_url, committer_date, avatar_url);

    } else if (this.readyState !== 4) {
      comloader.innerHTML = loaders;  
    } else if (this.status >= 500) {
      comloader.innerHTML = '';  
      res.innerHTML = '<h1>Some error. Please reload</h1>';
    } else if (this.status === 404) {
      load.innerHTML = '';  
      res.innerHTML = '<h4>Not Found. Please reload</h4>';
    }
  }

  req.open('GET', 'http://localhost/github/api/commit/'+url, true);
  req.send(null);
}



function content(fullname, link, description, u, stars, lang) {
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    let div5 = document.createElement('div');
    let div6 = document.createElement('div');
    let div7 = document.createElement('div');
    let div8 = document.createElement('div');
    let div9 = document.createElement('div');

    let icon = document.createElement('i');
    let span_title = document.createElement('span');
    let p = document.createElement('p');
    let div_action = document.createElement('div')
    let html_link = document.createElement('a');
    let up_date = document.createElement('span');
    let commit = document.createElement('span');
    let com_btn = document.createElement('button');


    div1.className = 'col s12 m6';
    div2.className = 'card white darken-1 hoverable';
    div3.className = 'card-content black-text';    
    div4.className = 'row';
    div5.className = 'col s7';
    div6.className = 'col s1 center';
    div7.className = 'ro right';
    div8.className = 'col s1';
    div9.className = 'col s1';
    span_title.className = 'card-title';
    div_action.className = 'card-action';
    icon.className = 'material-icons md-18';
    commit.className = 'right';
    com_btn.className = 'waves-effect waves btn-flat blue-text';
    com_btn.innerHTML = 'see the last commit';

    icon.innerHTML = 'grade';  
    span_title.innerHTML = fullname;
    html_link.setAttribute('href', link);
    div9.innerHTML = '&nbsp' + stars;
    div6.innerHTML = lang;    
    p.innerHTML = description;
    up_date.innerHTML = 'Updated: ' + moment(u).format('MMMM DD YYYY, h:mm:ss');
    
    commit.appendChild(com_btn);
    html_link.appendChild(span_title);
    div5.appendChild(html_link);
    div4.appendChild(div5);
    div8.appendChild(icon);
    div7.appendChild(div8);
    div7.appendChild(div9);
    div4.appendChild(div6);
    div4.appendChild(div7);
    div3.appendChild(div4);
    div_action.appendChild(commit);
    div_action.appendChild(up_date);
    div3.appendChild(p);
    div2.appendChild(div3);
    div2.appendChild(div_action);
    div1.appendChild(div2);

    return div1;
}






const submit = document.getElementById('search');


submit.onclick = async function() {

    let search_term = document.getElementById('input1').value;
    await getGithub('http://localhost/github/api/search/?search_term='+search_term, content, search_term);
    setInterval(com, 6000);
}

const a = document.querySelectorAll('#just');

function getCommit(hash, h_link, message, username, u_link, date, ava) {
  let hash_link = document.querySelector('#hash');
  let msg = document.querySelector('#message');
  let avatar = document.querySelector('#ava');
  let user_link = document.querySelector('#username');
  let da = document.querySelector('#date');

  hash_link.innerHTML = hash;
  hash_link.setAttribute('href', h_link);
  msg.className = 'black-text';
  msg.innerHTML = message;
  avatar.setAttribute('src', ava);
  avatar.setAttribute('alt', '');
  avatar.setAttribute('width', '30');
  avatar.setAttribute('height', '30');
  user_link.setAttribute('href', u_link);
  user_link.innerHTML = '&nbsp' + username;
  da.innerHTML = '&nbsp&nbsp&nbsp&nbspUpdated on ' + moment(date).format('MMMM DD YYYY, h:mm:ss');

}


let mo = document.getElementById('commit');



////////////////////////////////////////////////////////////////////////////////////

let result = document.querySelector('#res');
let st = document.querySelector('#st');
let load = document.querySelector('#loader1');


function contentBit(fullname, link, description, u, lang, private='') {
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let div3 = document.createElement('div');
  let div4 = document.createElement('div');
  let div5 = document.createElement('div');
  let div6 = document.createElement('div');
  let div7 = document.createElement('div');
  let div8 = document.createElement('div');
  let div9 = document.createElement('div');

  let span_title = document.createElement('span');
  let p = document.createElement('p');
  let div_action = document.createElement('div')
  let html_link = document.createElement('a');
  let up_date = document.createElement('span');
  let commit = document.createElement('span');
  let com_btn = document.createElement('button');


  div1.className = 'col s12 m6';
  div2.className = 'card white darken-1 hoverable';
  div3.className = 'card-content black-text';    
  div4.className = 'row';
  div5.className = 'col s7';
  div6.className = 'col s1 center';
  div7.className = 'ro right';
  div8.className = 'col s1';
  div9.className = 'col s1 red-text';
  span_title.className = 'card-title';
  div_action.className = 'card-action';
  commit.className = 'right';
  com_btn.className = 'waves-effect waves btn-flat blue-text';
  com_btn.innerHTML = 'see the last commit';

  span_title.innerHTML = fullname;
  html_link.setAttribute('href', link);
  div9.innerHTML = '&nbsp' + private;
  div6.innerHTML = lang;    
  p.innerHTML = description;
  up_date.innerHTML = 'Updated: ' + moment(u).format('MMMM DD YYYY, h:mm:ss');
  
  commit.appendChild(com_btn);
  html_link.appendChild(span_title);
  div5.appendChild(html_link);
  div4.appendChild(div5);
  div7.appendChild(div8);
  div7.appendChild(div9);
  div4.appendChild(div6);
  div4.appendChild(div7);
  div3.appendChild(div4);
  div_action.appendChild(commit);
  div_action.appendChild(up_date);
  div3.appendChild(p);
  div2.appendChild(div3);
  div2.appendChild(div_action);
  div1.appendChild(div2);

  return div1;
}

async function getBitRepo(url, gen, result, term) {
  req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let resp = JSON.parse(this.responseText).data;
      bitCsv.innerHTML = `<a href="http://127.0.0.1/bitbucket/api/download/csv?username=${term}" class="waves-effect waves-light btn">Download as CSV</a>`;
      
      // result.innerHTML = '';

      if (st) {
        st.innerHTML = '';
      }

      load.innerHTML = '';

      for (let a = 0; a <= resp.length; a++) {
        let card;
        if (resp[a].is_private === true) {
          card = gen(resp[a].full_name, resp[a].html_url, resp[a].description,
            resp[a].updated_at, resp[a].language, 'private');
        } else {
          card = gen(resp[a].full_name, resp[a].html_url, resp[a].description,
            resp[a].updated_at, resp[a].language);
        }
        
        st.appendChild(card);
      }
     
       
      result.appendChild(st);
      
    } else if (this.readyState !== 4) {
      load.innerHTML = loaders;  
      bitCsv.innerHTML = '';
    } else if (this.status >= 500) {
      bitCsv.innerHTML = '';
      load.innerHTML = '';  
      result.innerHTML = '<h1>Some error. Please reload</h1>';
    } else if (this.status === 404) {
      bitCsv.innerHTML = '';
      load.innerHTML = '';  
      result.innerHTML = '<h4>Not Found. Please reload</h4>';
    }
  }


  req.open('GET', url, true);
  req.send(null);
}


function getBitCommit(url, gener, result) {
  const req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      comloader.innerHTML = '';

      // result.innerHTML = '';

      let { hash, message, updated_at, html_url,
        author_name, author_url, author_img
       } = JSON.parse(this.responseText);

      gener(hash, html_url, message, author_name, author_url, updated_at, author_img);

    } else if (this.readyState !== 4) {
      comloader.innerHTML = loaders;  
    } else if (this.status >= 500) {
      comloader.innerHTML = '';  
      result.innerHTML = '<h1>Some error. Please reload</h1>';
    } else if (this.status === 404) {
      load.innerHTML = '';  
      result.innerHTML = '<h4>Not Found. Please reload</h4>';
    }
  }

  req.open('GET', 'http://localhost/bitbucket/api/commit/'+url, true);
  req.send(null);
}


const b = document.querySelectorAll('#st');

function coma() {
  let btns = b[0].getElementsByTagName('button');
  let urls = b[0].getElementsByClassName('card-title');

  for (let a = 0; a <= btns.length; a++) {
    btns[a].onclick = function() {
      getBitCommit(urls[a].textContent, getCommit, result);
    }
  }
}


const sub = document.getElementById('search1');


sub.onclick = async function() {

    let search_term = document.getElementById('input2').value;
    await getBitRepo('http://localhost/bitbucket/api/search/'+search_term+'/repos/', contentBit, result, search_term);
    
    setInterval(coma, 4000);
}


