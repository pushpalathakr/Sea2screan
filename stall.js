let stallId = localStorage.getItem("selectedStall");

let stallData = {
    hassan_fish_market: {
        name: "Hassan Fish Market",
        img: "hassan_fish_market.jpeg",
        location: "Near City Market",
        rating: "⭐ 4.3",
        time: "Open until 8:00 PM",
        map: "https://www.google.com/maps/search/?api=1&query=Hassan+City+Market"
    },

    malnad_fish_center: {
        name: "Malnad Fish Center",
        img: "malnad_fish_center.jpeg",
        location: "Vidyanagar",
        rating: "⭐ 4.5",
        time: "Open until 7:00 PM",
        map: "https://www.google.com/maps/search/?api=1&query=Vidyanagar+Hassan"
    },

    fishermans_choice: {
        name: "Fisherman’s Choice",
        img: "fishermans_choice.jpeg",
        location: "Bangalore Road",
        rating: "⭐ 4.7",
        time: "Open until 10:00 PM",
        map: "https://www.google.com/maps/search/?api=1&query=Bangalore+Road+Hassan"
    },

    img1: {
        name: "Manglore Fish",
        img: "img1.png",
        location: "KR Puram Hassan",
        rating: "⭐ 3.5",
        time: "Open until 9:30 PM",
        map: "https://www.google.com/maps/search/?api=1&query=KR+Puram+Hassan"
    },

    m_a_r_sea_food: {
        name: "Manglore A R Sea Food",
        img: "m_a_r_sea_food.jpeg",
        location: "Sampige Road",
        rating: "⭐ 4.0",
        time: "Open until 9:00 PM",
        map: "https://www.google.com/maps/search/?api=1&query=Sampige+Road+Hassan"
    },

    fish_hunters: {
        name: "Fish Hunters",
        img: "fish_hunters.jpeg",
        location: "MG Road",
        rating: "⭐ 5.0",
        time: "Open until 8:00 PM",
        map: "https://www.google.com/maps/search/?api=1&query=MG+Road+Hassan"
    },

    yagachi_fish_land: {
        name: "Yagachi Fish Land",
        img: "yagachi_fish_land.jpeg",
        location: "Kandali",
        rating: "⭐ 4.2",
        time: "Open until 11:00 PM",
        map: "https://www.google.com/maps/search/?api=1&query=Kandali+Hassan"
    },

    fresh_fish_center: {
        name: "Sham Fish Center",
        img: "fresh_fish_center.jpeg",
        location: "Vidyanagar",
        rating: "⭐ 4.0",
        time: "Open until 11:30 PM",
        map: "https://www.google.com/maps/search/?api=1&query=Vidyanagar+Hassan"
    },

    manglore_fresh_fish_center: {
        name: "Manglore Fresh Fish Center",
        img: "manglore_fresh_fish_center.jpeg",
        location: "Salgame Road",
        rating: "⭐ 3.9",
        time: "Open until 9:00 PM",
        map: "https://www.google.com/maps/search/?api=1&query=Salgame+Road+Hassan"
    },

    ahamad_manglore_sea_fish: {
        name: "Ahad Manglore Sea Fish",
        img: "ahamad_manglore_sea_fish.jpeg",
        location: "Goruru Road",
        rating: "⭐ 3.6",
        time: "Open until 8:00 PM",
        map: "https://www.google.com/maps/search/?api=1&query=Goruru+Road+Hassan"
    }
};

// ⭐ LOAD REVIEWS
function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem(stallId + "_reviews")) || [];
    let reviewDiv = document.getElementById("reviewsList");

    if (!reviewDiv) return;

    reviewDiv.innerHTML = "";

    reviews.forEach(r => {
        reviewDiv.innerHTML += `<p>📝 ${r}</p>`;
    });
}


// ➕ ADD REVIEW
function addReview() {

    let loginType = localStorage.getItem("loginType");

    // ❌ BLOCK ADMIN
    if (loginType !== "user") {
        alert("Only users can add reviews ❌");
        return;
    }

    let input = document.getElementById("reviewInput").value.trim();
    if (!input) return;

    let reviews = JSON.parse(localStorage.getItem(stallId + "_reviews")) || [];
    reviews.push(input);

    localStorage.setItem(stallId + "_reviews", JSON.stringify(reviews));

    document.getElementById("reviewInput").value = "";
    loadReviews();
}

// 🔄 TAB SWITCH
function showTab(tab, el) {

    document.getElementById("photos").style.display = "none";
    document.getElementById("reviews").style.display = "none";
    document.getElementById("details").style.display = "none";

    document.getElementById(tab).style.display = "block";

    document.querySelectorAll(".tab-link").forEach(t => t.classList.remove("active"));
    el.classList.add("active");
}


// ⭐ RATE
function rate(value) {

    let loginType = localStorage.getItem("loginType");

    // ❌ BLOCK ADMIN
    if (loginType !== "user") {
        alert("Only users can rate ❌");
        return;
    }

    document.querySelectorAll(".star").forEach((s, index) => {
        s.classList.toggle("active", index < value);
    });

    localStorage.setItem(stallId + "_rating", value);
    calculateAverage();
}


// ⭐ SHOW RATING
function calculateAverage() {
    let rating = localStorage.getItem(stallId + "_rating");

    if (!rating) return;

    document.getElementById("avgRating").innerText =
        "Your Rating: ⭐ " + rating;
}


// 🗑 DELETE (FIXED)
function deleteStall() {

    let id = localStorage.getItem("selectedStall");
    let stall = JSON.parse(localStorage.getItem("stall_" + id));

    let loginType = localStorage.getItem("loginType");
    let currentAdmin = localStorage.getItem("adminUser");

    if (!stall.createdBy) {
        stall.createdBy = currentAdmin; // fix old data
    }

    // ❌ USERS
    if (loginType !== "admin") {
        alert("Only admin can delete ❌");
        return;
    }

    // ❌ OTHER ADMIN
    if ((stall.createdBy || "").toLowerCase() !== (currentAdmin || "").toLowerCase()) {
        alert("You can only delete your own stall ❌");
        return;
    }

    // ✅ DELETE
    if (confirm("Delete this stall?")) {

        localStorage.removeItem("stall_" + id);
        localStorage.removeItem(id + "_reviews");
        localStorage.removeItem(id + "_rating");

        alert("Stall deleted ✅");
        window.location.href = "index.html";
    }
}

// 🔙 HOME
function goHome() {
    window.location.href = "index.html";
}


// 🚀 LOAD STALL DETAILS
window.addEventListener("load", function () {

    let stored = localStorage.getItem("stall_" + stallId);

    let stall;

    // ✅ ADMIN STALL
    if (stored) {

        stall = JSON.parse(stored);

        document.getElementById("stallName").innerText = stall.name;
        document.getElementById("stallImage").src = stall.image;

        let loginType = localStorage.getItem("loginType");
        let currentAdmin = localStorage.getItem("adminUser");

        let deleteBtn = document.getElementById("deleteBtn");

        if (deleteBtn) {

            if (
                loginType !== "admin" ||
                (stall.createdBy || "").toLowerCase() !== (currentAdmin || "").toLowerCase()
            ) {
                deleteBtn.style.display = "none";
            }
        }

        document.getElementById("stallLocation").innerText = "📍 " + (stall.location || "N/A");
        document.getElementById("stallRating").innerText = "⭐ 4.0";
        document.getElementById("stallTime").innerText =
            "Open until " + (stall["open until"] || "N/A");
        document.getElementById("stallMap").href = stall.map || "#";

        document.getElementById("photos").innerHTML =
            `<img src="${stall.image}" class="stall-main-img">`;
    }

    // ✅ STATIC STALL
    else if (stallData[stallId]) {

        stall = stallData[stallId];

        document.getElementById("stallName").innerText = stall.name;
        document.getElementById("stallImage").src = stall.img;
        document.getElementById("stallLocation").innerText = "📍 " + stall.location;
        document.getElementById("stallRating").innerText = stall.rating;
        document.getElementById("stallTime").innerText = stall.time;
        document.getElementById("stallMap").href = stall.map;

        document.getElementById("photos").innerHTML =
            `<img src="${stall.img}" class="stall-main-img">`;
    }

    else {
        alert("Stall not found ❌");
        window.location.href = "index.html";
        return;
    }

    loadReviews();
    calculateAverage();

    // ✅ ADD HERE 👇 (REVIEW + RATING CONTROL)

    let loginType = localStorage.getItem("loginType");

    if (loginType !== "user") {

        let reviewBox = document.getElementById("reviewInput");
        if (reviewBox) reviewBox.style.display = "none";

        let reviewBtn = document.getElementById("reviewBtn");
        if (reviewBtn) reviewBtn.style.display = "none";

        document.querySelectorAll(".star").forEach(s => s.style.display = "none");
    }

});