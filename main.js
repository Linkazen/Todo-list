(()=>{"use strict";let e=[];function t(){let t=document.querySelector("#todoform");e.push({title:t[0].value,desc:t[1].value,datedue:t[4].value,priority:t[5].checked})}document.querySelector("#todobtn").addEventListener("click",(function(){let e=document.querySelector("#content"),n=function(){let e=document.createElement("form");e.id="todoform";let t=["title","desc","nodate","enterdate","picktime","important"],n=["text","text","radio","radio","datetime-local","checkbox","button","button"],d=["Enter The Name","Task Specifications","Whenever","Specific date","Pick a date and time","Important?","Close","Create"];for(let o=0;o<n.length;o++)if(o<6){let c=document.createElement("input"),i=document.createElement("label");if(c.name=t[o],i.for=t[o],i.textContent=d[o],c.type=n[o],2==o){let t=document.createElement("p");t.textContent="when does the to-do need finishing?",e.appendChild(t)}o<2||o>3?(e.appendChild(i),e.appendChild(c)):(e.appendChild(c),e.appendChild(i))}else{let t=document.createElement("button");t.type=n[o],t.textContent=d[o],e.appendChild(t)}return e}();!function(e){e[6].addEventListener("click",(e=>{!function(e){e.srcElement.parentNode.remove()}(e)})),e[7].addEventListener("click",t)}(n),e.appendChild(n)}))})();