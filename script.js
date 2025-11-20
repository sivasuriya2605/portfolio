// Image preview modal logic
const previewImg = document.getElementById('previewImg');
const imageview = document.getElementById('imageview');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('close');
const btn1 = document.getElementById('btn1');
const profile = document.getElementById('profile')
const hmbtn = document.getElementById('homebtn');
const list = document.getElementById('list');   // FIXED
const navLinks = document.querySelectorAll("#nav ul li a");

// Preview Image
previewImg.onclick = function() {
    imageview.style.display = 'flex';
    modalImg.src = previewImg.src;
}

closeBtn.onclick = function() {
    imageview.style.display = 'none';
}

imageview.onclick = function(e) {
    if (e.target === imageview) {
        imageview.style.display = 'none';
    }
}

(btn1.onclick = function() {
    btn1.style.display = 'none';  
    previewImg.style.display = 'none'; 
    list.style.display = 'flex';   // show menu list
    list.style.marginTop = '90px';
    profile.style.display = 'none';
});

hmbtn.onclick = function() {
    profile.style.display = 'flex';
    previewImg.style.display = 'flex';
    list.style.display = 'none';   
    btn1.style.display = 'block';
    btn1.style.textAlign = 'center';
    list.style.marginTop = '9000px';
}

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        navLinks.forEach(l => l.classList.remove("active-link"))
        this.classList.add("active-link");
        list.style.display = "flex";
    });
});
