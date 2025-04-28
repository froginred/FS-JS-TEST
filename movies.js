const movieArr = [
    {
        Num: 1,
        img: "https://www.movieposters.com/cdn/shop/files/backtofuture.mpw_480x.progressive.jpg?v=1708444122",
        name: "Back to the Furture",
        MainCharacter: "Marty McFly",
        Charlink: "https://backtothefuture.fandom.com/wiki/Marty_McFly",
        rating: 4,
        price: 40,
        TicketType: "VIP",
    },
    {
        Num: 2,
        img: "https://www.movieposters.com/cdn/shop/files/ItemP2658_jpg_480x.progressive.jpg?v=1692302023", 
        name: "Lord Of the Rings - Fellowship of the Ring",
        MainCharacter: "Frodo Baggins",
        Charlink: "https://lotr.fandom.com/wiki/Frodo_Baggins",
        rating: 5,
        price: 30,
        TicketType: "Regular",
    },
    {
        Num: 3,
        img: "https://www.movieposters.com/cdn/shop/files/prettywoman.mpw.123722_480x.progressive.jpg?v=1732553673", 
        name: "Pretty Woman",
        MainCharacter: "Vivian Ward",
        Charlink: "https://moviedatabase.fandom.com/wiki/Vivian_Ward",
        rating: 2,
        price: 30,
        TicketType: "Regular",
    },
    {
        Num: 4,
        img: "https://www.movieposters.com/cdn/shop/files/77d36e45a60df30800609f965ba10362_cb2d3a3d-f5a4-46e2-ab0d-ad024855beef_480x.progressive.jpg?v=1706637459", 
        name: "Indiana Jones And The Kingdom Of The Crystal Skul",
        MainCharacter: "Indiana Jones",
        Charlink: "https://disney.fandom.com/wiki/Indiana_Jones",
        rating: 1,
        price: 50,
        TicketType: "VIP",
    },

]


const MovieTable = document.getElementById("MovieTable");
const BuyTable = document.getElementById("BuyTable");
const sendbtn = document.querySelector(".send");


//sort icons later
movieArr.forEach((Movie, i) => {
    //main table logic
    const tr = document.createElement("tr");
    MovieTable.append(tr);
    tr.innerHTML = `
                <th>${Movie.Num}</th>
                <td><img class="poster" src="${Movie.img}" alt="Poster" ></td> 
                <td><b>${Movie.name}<b></td>
                <td><a href="${Movie.Charlink}" target="_blank">${Movie.MainCharacter}</a></td>
                <td>${Movie.rating}/5<i class="fa-solid fa-star" style="color: gold;"></i></td> 
                <td>${Movie.price}&#x20AA</td>
                <td>${Movie.TicketType}</td>
                <td>
                    <button id="buy${i}" type="button" class="btn buy btn-warning">Buy</button>
                    <button id="rem${i}" type="button" class="btn remove btn-danger d-none">-</button>
                </td>
                `
    //rating color logicx
    if (Movie.rating < 2) {
        tr.classList.add('bg-danger');
    } else if (Movie.rating >= 3) {
        tr.classList.add('bg-success');
    };


});

//buy table logic -event delegation

let ticketCount = 0;
let totalPrice = 0;
let selectedMovieIndex = -1;


MovieTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("buy") || e.target.classList.contains("remove")) {
        let index = parseInt(e.target.id.slice(3));
        let Movie = movieArr[index]; 

        if (e.target.classList.contains("buy")) {
            //handle logic -buy counterx
            const removeBtn = e.target.parentElement.querySelector(".remove");
            removeBtn.classList.remove("d-none");

            if (selectedMovieIndex !== index) {
                //means new movie is selected
                ticketCount = 1;
                totalPrice = Movie.price;
                selectedMovieIndex = index;
                document.querySelectorAll(".buy").forEach(btn => {
                    btn.disabled = false
                    btn.textContent = "Buy";
                });
                document.querySelectorAll(".remove").forEach((btn, btnIndex) => {
                    if (btnIndex !== index) {
                        btn.classList.add("d-none");
                    }
                });
                
                // console.log(selectedMovieIndex);
            } else if (ticketCount >= 5) {
                alert("You can't buy more than 5 tickets");
                e.target.disabled = true;
            } else  {    
                ticketCount++;
                totalPrice += Movie.price;
            };
            e.target.textContent = "Add";


        } else if (e.target.classList.contains("remove")) {
            if (ticketCount > 0) {
                ticketCount--;
                totalPrice -= Movie.price;
                document.querySelectorAll(".buy").forEach(btn => btn.disabled = false);
                if (ticketCount === 0) {
                    BuyTable.innerHTML ="";
                    sendbtn.classList.add("d-none");
                    e.target.classList.add("d-none");     
                    selectedMovieIndex = -1;
                    const addBtn = e.target.parentElement.querySelector(".buy");
                    addBtn.textContent = "Buy";
                    return;
                
                };
        }};

    BuyTable.classList.remove("d-none");
    BuyTable.innerHTML = `  
                    <tr>
                    <th>Name of the movie:</th>
                    <td>${Movie.name}</td>
                    </tr>
                    <tr>
                    <th>Price:</th>
                    <td>${totalPrice} &#x20AA (${ticketCount} tickets)</td>
                        </tr>
                    <tr>
                    <th>Credit card number:</th>
                    <td>xxx xxx xxx xxx</td>
                    </tr>
                    <tr>
                    <th>Date of expiration:</th>
                    <td>xx/xx/xxxx</td>
                    </tr>
                    `
    sendbtn.classList.remove("d-none");

}});



//send button logic
sendbtn.addEventListener("click", () => {
    BuyTable.innerHTML = "";
    sendbtn.classList.add("d-none");
    
    //reset logic
    ticketCount = 0;
    totalPrice = 0;
    selectedMovieIndex = -1;

    document.querySelectorAll(".buy").forEach(btn => {
        btn.disabled = false;
        btn.textContent = "Buy";
    document.querySelectorAll(".remove").forEach(btn => btn.classList.add("d-none"));


    });
});