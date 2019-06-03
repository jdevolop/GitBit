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


function getGithub(url, generate, res) {
  req = new XMLHttpRequest();
  const d = document.createElement('div')
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      resp = JSON.parse(this.responseText).data;
      res.removeChild(d);
      for (let a = 0; a <= resp.length; a++) {
        let card = generate(resp[a].full_name, resp[a].html_url, resp[a].description,
          resp[a].updated_at, resp[a].stargazers_count, resp[a].language);
        res.appendChild(card);
      }

    } else if (this.readyState !== 4) {
      const loaders = `<div class="progress">
        <div class="indeterminate"></div>
        </div>`;
      d.innerHTML = loaders  
      res.appendChild(d);
    } else if (this.status >= 400) {
      res.innerHTML = '<h1>Some error. Please reload</h1>';
    }
  }

  req.open('GET', url, true);
  req.send(null);

}






const some_data = [{
    full_name: "dtrupenn/Tetris",
    html_url: "https://github.com/dtrupenn/Tetris",
    description: "A C implementation of Tetris using Pennsim through LC4",
    updated_at: "2013-01-05T17:58:47Z",
    stargazers_count: 100,
    language: "C++"
},
{
  full_name: "dtrupn/Tetris",
  html_url: "https://github.com/dtrupenn/Tetris",
  description: "A C imple Tetris using Pennsim through LC4",
  updated_at: "2013-01-05T17:58:47Z",
  stargazers_count: 10,
  language: "PHP"
},
{
  full_name: "dtrups",
  html_url: "https://github.com/dtrupenn/Tetris",
  description: "A C imple Tetris using Pennsim throasdddddddddddddugh LC4",
  updated_at: "2013-01-05T17:58:47Z",
  stargazers_count: 50,
  language: "Javascript"
}]

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

    icon.innerHTML = 'grade';  
    span_title.innerHTML = fullname;
    html_link.setAttribute('href', link);
    div9.innerHTML = '&nbsp' + stars;
    div6.innerHTML = lang;    
    p.innerHTML = description;
    up_date.innerHTML = 'Updated: ' + moment(u).format('MMMM DD YYYY, h:mm:ss');
    
    html_link.appendChild(span_title);
    div5.appendChild(html_link);
    div4.appendChild(div5);
    div8.appendChild(icon);
    div7.appendChild(div8);
    div7.appendChild(div9);
    div4.appendChild(div6);
    div4.appendChild(div7);
    div3.appendChild(div4);
    div_action.appendChild(up_date)
    div3.appendChild(p);
    div2.appendChild(div3);
    div2.appendChild(div_action);
    div1.appendChild(div2);

    return div1;
}

function more() {
    // let div = document.createElement('div');
    let card = content(some_data.full_name, some_data.html_url, some_data.description,
        some_data.updated_at, some_data.stargazers_count, some_data.language);
    // div.appendChild(card);
    // return div;
    return card;
}





const loadera = `
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
`;

function loader() {
    let loader_div = document.createElement('div');
    
    let one = document.createElement('div');
    let two = document.createElement('div');
    let three = document.createElement('div');
    let four = document.createElement('div');
    let five = document.createElement('div');
    let six = document.createElement('div');
    let seven = document.createElement('div');
    let eigth = document.createElement('div');

    one.className = 'preloader-wrapper big active';
    two.className = 'spinner-layer spinner-blue-only';
    three.className = 'circle-clipper left';
    four.className = 'circle';
    five.className = 'gap-patch';
    six.className = 'circle';
    seven.className = 'circle-clipper right';
    eigth.className = 'circle'

    seven.appendChild(eigth);
    five.appendChild(six);
    three.appendChild(four);
    two.appendChild(three);
    two.appendChild(five);
    two.appendChild(seven);
    one.appendChild(two);

    loader_div.className = 'loader';
    loader_div.appendChild(one);
    
    return loader_div
}

const submit = document.getElementById('search')

submit.onclick = function() {
    let search_term = document.getElementById('input1').value;
    getGithub('http://localhost/github/api/search/?search_term='+search_term, content, res);
}


    
function seeCommit(hash, h_link, message, username, u_link, date, ava){
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
  
    let h4 = document.createElement('h4');
    let hash_link = document.createElement('a');
    let msg = document.createElement('p');
    let avatar = document.createElement('img');
    let user_link = document.createElement('a');
  
  
    div1.className = 'modal'
    div1.setAttribute('id', 'modal1');
    div2.className = 'modal-content';
    div3.className = 'row';
    div4.className = 'col s12 valign-wrapper';
  
    h4.innerHTML = 'The Last Commit';
  
  
}
















