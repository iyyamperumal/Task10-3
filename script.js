const API = "https://www.dnd5eapi.co";
let container1 = document.getElementById("Container1");
let container2 = document.getElementById("Container2");
let container3 = document.getElementById("Container3");
let element = "";
let ele2 = [];

fetch("https://www.dnd5eapi.co/api/ability-scores")
    .then((res) => res.json())
    .then((data) => {
        data.results.forEach(ele => {
            createFirstPageCard(ele);
            fetch(`${API}${ele.url}`)
                .then((res) => res.json())
                .then((data1) => {
                    data1.skills.forEach(ele1 => {
                        container1.addEventListener("click", (e) => {
                            e.preventDefault();
                            if (e.target.id == "first") {
                                createSecondPageCard(ele1);
                            }
                        });
                        fetch(`${API}${ele1.url}`)
                            .then((res) => res.json())
                            .then((data2) => {
                                data2.desc.forEach(ele2 => {
                                    ele2 = data2;
                                    container2.addEventListener("click", (ev) => {
                                        ev.preventDefault();
                                        if (ev.target.id == "second") {
                                            createThirdPageCard(ele2);
                                        }
                                    });
                                });
                            })
                            .catch((err) => console.log(err));
                    });
                })
                .catch((err) => console.log(err));
        });
    })
    .catch((err) => console.log(err));

function createFirstPageCard(ele) {
    container1.innerHTML += `
    <h2>${ele.name}</h2>
        <p>Index: <span>${ele.index}</span></p>
        <p>Url: <span><a onclick="createSecondPageCard()" id="first" href="${API}${ele.url}">${API}${ele.url}</a></span></p>
        `;
    container2.style.display = "none";
    container3.style.display = "none";

}
function createSecondPageCard(ele1) {
    container2.innerHTML += `
    <h2>${ele1.name}</h2>
        <p>Index: <span>${ele1.index}</span></p>
        <p>Url: <span><a id="second" href="${API}${ele1.url}">${API}${ele1.url}</a></span></p>
        `;
    container1.style.display = "none";
    container2.style.display = "block";
    container3.style.display = "none";
}
function createThirdPageCard(ele2) {
    container3.innerHTML += `
    <h2>${ele2.name}</h2>
        <p>Index: <span>${ele2.index}</span></p>
        <p>Desc: <span>${ele2.desc}</span></p>
        `;
    container1.style.display = "none";
    container2.style.display = "none";
    container3.style.display = "block";
}



