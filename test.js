"use strict";
let viewBox1=0;
let viewBox2=0;
let viewBox3=400;
let viewBox4=400;
let moveModifier=50;
let map = document.querySelector('svg#worldMap');
let loader = document.querySelector('.loader');
map.setAttribute('viewBox', `${viewBox1} ${viewBox2} ${viewBox3} ${viewBox4}`);
window.addEventListener('keydown', (e)=>{

    //console.log(e.key);
    let keyFound=true;
    switch(e.key){
        case "ArrowLeft":
            viewBox1-=moveModifier;
            break;
        case "ArrowUp":
            viewBox2-=moveModifier;
            break;
        case "ArrowRight":
            viewBox1+=moveModifier;
            break;
        case "ArrowDown":
            viewBox2+=moveModifier;
            break;
        case "q":
            viewBox3+=moveModifier;
            viewBox4+=moveModifier;
            break;
        case "w":
            viewBox3-=moveModifier;
            viewBox4-=moveModifier;
            break;
        default:
            keyFound=false;
            break;
    }
    map.setAttribute('viewBox', `${viewBox1} ${viewBox2} ${viewBox3} ${viewBox4}`);
    if(keyFound){
        e.preventDefault();
    }
});
document.querySelector('button#zoomOut').addEventListener('click', e=>{
    viewBox3+=moveModifier;
    viewBox4+=moveModifier;
    map.setAttribute('viewBox', `${viewBox1} ${viewBox2} ${viewBox3} ${viewBox4}`);
});
document.querySelector('button#zoomIn').addEventListener('click', e=>{
    viewBox3-=moveModifier;
    viewBox4-=moveModifier;
    map.setAttribute('viewBox', `${viewBox1} ${viewBox2} ${viewBox3} ${viewBox4}`);
});
let paths = document.querySelectorAll('path');
paths.forEach(p=>{
    p.addEventListener('click', e=>{
        p.classList.add('visited');
        loader.classList.remove('hidden');
        map.classList.add('opaque')
        var x = document.querySelector('#jsonp')
        if(x){
            document.getElementsByTagName('head')[0].removeChild(x);
        }
        let script = document.createElement('script');
        script.src = `https://em.wemakesites.net/country/${p.id}/?api_key=22633d89-46fa-469f-a34f-cda935684cac&callback=foo`
        script.id = "jsonp";
        document.getElementsByTagName('head')[0].appendChild(script);

    })
});

function foo(d){
    const country = document.querySelector(`#${d.data.country_code}`).getAttribute('title');
    const data = d.data;
    console.log(data)
    let template = document.querySelector('#bandList').content;
    let temp = template.cloneNode(true)
    temp.querySelector('header h1').textContent=country;
    temp.querySelector('header h2').textContent = data.search_results.length===200 ? `More than 200 bands` : `${data.search_results.length} bands`;
    temp.querySelector('header button').addEventListener('click', e=>document.body.removeChild(e.target.parentNode.parentNode));
    let ul = temp.querySelector('ul')
    data.search_results.forEach(b=>{
        let li = document.createElement('li');
        li.addEventListener('click', e=>e.target.querySelector('span').classList.toggle('hidden'));
        let p = document.createElement('p'), span = document.createElement('span');
        p.textContent = b.name;
        span.textContent = b.genres.join(', ');
        span.classList.add('hidden');
        p.appendChild(span);
        li.appendChild(p)
        ul.appendChild(li);
    })
    document.body.appendChild(temp);
    loader.classList.add('hidden');
    map.classList.remove('opaque')
}
/*
//const countries = [{id:"AE"},{id:"AF"},{id:"AL"},{id:"AM"},{id:"AO"},{id:"AR"},{id:"AT"},{id:"AU"},{id:"AZ"},{id:"BA"},{id:"BD"},{id:"BE"},{id:"BF"},{id:"BG"},{id:"BI"},{id:"BJ"},{id:"BN"},{id:"BO"},{id:"BR"},{id:"BS"},{id:"BT"},{id:"BW"},{id:"BY"},{id:"BZ"},{id:"CA"},{id:"CD"},{id:"CF"},{id:"CG"},{id:"CH"},{id:"CI"},{id:"CL"},{id:"CM"},{id:"CN"},{id:"CO"},{id:"CR"},{id:"CU"},{id:"CY"},{id:"CZ"},{id:"DE"},{id:"DJ"},{id:"DK"},{id:"DO"},{id:"DZ"},{id:"EC"},{id:"EE"},{id:"EG"},{id:"EH"},{id:"ER"},{id:"ES"},{id:"ET"},{id:"FK"},{id:"FI"},{id:"FJ"},{id:"FR"},{id:"GA"},{id:"GB"},{id:"GE"},{id:"GF"},{id:"GH"},{id:"GL"},{id:"GM"},{id:"GN"},{id:"GQ"},{id:"GR"},{id:"GT"},{id:"GW"},{id:"GY"},{id:"HN"},{id:"HR"},{id:"HT"},{id:"HU"},{id:"ID"},{id:"IE"},{id:"IL"},{id:"IN"},{id:"IQ"},{id:"IR"},{id:"IS"},{id:"IT"},{id:"JM"},{id:"JO"},{id:"JP"},{id:"KE"},{id:"KG"},{id:"KH"},{id:"KP"},{id:"KR"},{id:"XK"},{id:"KW"},{id:"KZ"},{id:"LA"},{id:"LB"},{id:"LK"},{id:"LR"},{id:"LS"},{id:"LT"},{id:"LU"},{id:"LV"},{id:"LY"},{id:"MA"},{id:"MD"},{id:"ME"},{id:"MG"},{id:"MK"},{id:"ML"},{id:"MM"},{id:"MN"},{id:"MR"},{id:"MW"},{id:"MX"},{id:"MY"},{id:"MZ"},{id:"NA"},{id:"NC"},{id:"NE"},{id:"NG"},{id:"NI"},{id:"NL"},{id:"NO"},{id:"NP"},{id:"NZ"},{id:"OM"},{id:"PA"},{id:"PE"},{id:"PG"},{id:"PH"},{id:"PL"},{id:"PK"},{id:"PR"},{id:"PS"},{id:"PT"},{id:"PY"},{id:"QA"},{id:"RO"},{id:"RS"},{id:"RU"},{id:"RW"},{id:"SA"},{id:"SB"},{id:"SD"},{id:"SE"},{id:"SI"},{id:"SJ"},{id:"SK"},{id:"SL"},{id:"SN"},{id:"SO"},{id:"SR"},{id:"SS"},{id:"SV"},{id:"SY"},{id:"SZ"},{id:"TD"},{id:"TF"},{id:"TG"},{id:"TH"},{id:"TJ"},{id:"TL"},{id:"TM"},{id:"TN"},{id:"TR"},{id:"TT"},{id:"TW"},{id:"TZ"},{id:"UA"},{id:"UG"},{id:"US"},{id:"UY"},{id:"UZ"},{id:"VE"},{id:"VN"},{id:"VU"},{id:"YE"},{id:"ZA"},{id:"ZM"},{id:"ZW"}];
let my = document.createElement('button')
document.querySelector('div').appendChild(my)
my.addEventListener('click', (e)=>{
    countries.forEach((c)=>{
        "use strict";
        if(!c.classList.contains('visited')){
            c.classList.add('fadeOut')
        }
    })
})
let countries = document.querySelectorAll('path.land');
countries.forEach(c=>{
    "use strict";
    addEventListener('click', (e)=>{
        //console.log(e, e.target.getAttribute('title'))
        e.target.classList.add('visited')
    })
})*/
/*
let countries = document.querySelectorAll('path.land');
    countries.forEach(c=>{
        "use strict";
        addEventListener('mouseover', (e)=>{
            console.log(e, e.target.getAttribute('title'))
            e.target.classList.add('visited')
        })
    })
*/
/*
fetch("http://em.wemakesites.net/country/SE/?api_key=22633d89-46fa-469f-a34f-cda935684cac&callback=foo")
    .then((e)=>e.json())
    .then((e)=>{
    "use strict";
        console.log(e)
    })

*/
//get countries
/*
fetch("http://api.population.io:80/1.0/countries")
    .then(e=>e.json())
    .then(l=>{
        "use strict";
        console.log(l)
        getPop(1980, l.countries[0]);
    })
function getPop(year, name){
fetch(`http://api.population.io:80/1.0/population/${year}/${name}/`)
    .then(e=>e.json())
    .then(e=>{
        "use strict";
        console.log(e[0].total, e)
        const totalPop = e.reduce((total, stats) => {
            return total + stats.total;
        }, 0);

        console.log(name, totalPop);
    })
}*/
/*
function foo(data)
{
    console.log(data.data.search_results.length)
}

var script = document.createElement('script');
script.src = 'http://em.wemakesites.net/country/LU/?api_key=22633d89-46fa-469f-a34f-cda935684cac&callback=foo'

document.getElementsByTagName('head')[0].appendChild(script);
    */