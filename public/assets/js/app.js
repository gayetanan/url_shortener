import {dateFormater,displayMessageToUI} from "./utils.js";
const form = document.querySelector("#form");
const expirationInput = document.querySelector("#expiration")
const button = document.querySelector("#button");
const siteInput = document.querySelector("#site");
const amount = document.querySelector("#amount");
const list = document.querySelector("#list");

function disabledBtn(){
    if(siteInput.value.trim().length < 4 || document.querySelector(".alert")){
        button.setAttribute("disabled","true");
    }else{
        button.removeAttribute("disabled")
    }
};


const LinkItem= ({url,id})=>{
    const li = document.createElement("li");
    li.setAttribute("class","link-ctn")
    li.innerHTML = `
                <a href="/${id}" target="_blank">${id}</a>
                <span class="iconCtn">
                    <a href="/urls/${id}">
                        <span class="openIcon material-symbols-outlined">open_in_new</span>
                    </a>
                    <span class="copyIcon material-symbols-outlined" data-link="${url}">Link</span>
                </span>
                `;
    return li;
};

window.addEventListener("DOMContentLoaded",()=>{
    disabledBtn();
    const date = new Date().getTime() + 60_0000;
    const formatDate = dateFormater(date,true);
    expirationInput.value = formatDate;
})

list.addEventListener("click",async(e)=>{
    const link = e.target.dataset.link
    if(link){
        try {
            await navigator.clipboard.writeText(link)
            e.target.setAttribute("data-copy","yes")
        } catch (error) {
           console.log(error) 
        }
    }
});


siteInput.addEventListener("input",disabledBtn);

form.addEventListener("submit",async(e)=>{
    try {
        e.preventDefault();
        const data = {site:siteInput.value,expiration:expirationInput.value};
        
        const res = await fetch("/create",{
            method:"POST",
            headers:{"Content-Tye":"application/json"},
            body:JSON.stringify(data)
        })

        if(!res.ok){
            const {msg} = await res.json();
            throw new Error(`${msg}`);
        }else{
            const {msg,url,id} = await res.json();
            siteInput.value = "";
            list.insertBefore(LinkItem({url,id}),list.firstChild)
            const listAmount = Number(amount.innerHTML)
            amount.innerHTML = listAmount ? listAmount +1: 1;
            displayMessageToUI("success",msg,document.body,disabledBtn)
        }
    } catch (error) {
        displayMessageToUI("danger",error.message,document.body,disabledBtn)
    }
});

