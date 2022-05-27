const barang = [
    { id: 1, nama: 'Coca Cola', tipe: 'Minuman', soda: true, alkohol: false, stock: 3, image: 'asset/img/coca-cola.png', harga: 7000 },
    { id: 2, nama: 'Cola Zero', tipe: 'Minuman', soda: true, alkohol: false, stock: 20, image: 'asset/img/cola-zero.jpg', harga: 6000 },
    { id: 3, nama: 'Del Monte Boba', tipe: 'Minuman', soda: false, alkohol: false, stock: 20, image: 'asset/img/boba.webp', harga: 5000 },
    { id: 4, nama: 'Bintang Beer', tipe: 'Minuman', soda: true, alkohol: true, stock: 16, image: 'asset/img/beer.jpg', harga: 21000 },
    { id: 5, nama: 'Chum Churum Soju', tipe: 'Minuman', soda: false, alkohol: true, stock: 24, image: 'asset/img/soju.webp', harga: 78000 },
    { id: 6, nama: 'Sparkling Wine', tipe: 'Minuman', soda: true, alkohol: true, stock: 5, image: 'asset/img/sparkling-wine.png', harga: 10000000 },
    { id: 7, nama: 'Tequilla', tipe: 'Minuman', soda: false, alkohol: true, stock: 10, image: 'asset/img/tequila.png', harga: 750000 },
    { id: 8, nama: 'Red Bull', tipe: 'Minuman', soda: true, alkohol: false, stock: 25, image: 'asset/img/redbull.jpg', harga: 21000 },
    { id: 9, nama: 'Mug', tipe: 'Merchandise', soda: false, alkohol: false, stock: 13, image: 'asset/img/mug.jpg', harga: 20000 },
    { id: 10, nama: 'Thermos', tipe: 'Merchandise', soda: false, alkohol: false, stock: 12, image: 'asset/img/thermos.webp', harga: 78000 },
    { id: 11, nama: 'T-shirt', tipe: 'Merchandise', soda: false, alkohol: false, stock: 28, image: 'asset/img/tshirt.webp', harga: 56000 },
    { id: 12, nama: 'Tumbler', tipe: 'Merchandise', soda: false, alkohol: false, stock: 17, image: 'asset/img/tumbler.jpg', harga: 69000 }
]

console.log(barang)

let cart = [] //array of objects

//Menampilkan produk di halaman utama
//Untuk pertama kali, tampilkan semua produk
//kalau ada filter, saring sesuai filter
// kalau kedua parameter string kosong: tampilkan semua
function tampilkanProduk(namaDicari = "", filterDicari = []) {

    if (namaDicari === "" && filterDicari.length === 0) {
        renderBarang(barang)
    } else {
        //filter data berdasarkan nama yg dicari dan filter yg dicari
        let newData = []

        if (namaDicari === "") {
            newData = barang
        }

        for (let i = 0; i < barang.length; i++) {
            let splitNamaProduk = barang[i].nama.split(" ")
            for (let j = 0; j < splitNamaProduk.length; j++) {
                if (splitNamaProduk[j].toLowerCase() === namaDicari.toLowerCase()) {
                    newData.push(barang[i])
                    break;
                }
            }
        }

        let filteredData = []

        //Filter barang berdasarkan checkbox merchandise
        if (filterDicari[0] === 'merchandise') {
            for (let k = 0; k < newData.length; k++) {
                if (newData[k].tipe === 'Merchandise') {
                    filteredData.push(newData[k])
                }
            }
        } else {
            filteredData = newData
        }

        //Filter barang berdasarkan checkbox alkohol dan soda
        let temp = []
        if (filterDicari.includes("non-alkohol") && filterDicari[0] !== 'merchandise') {
            for (let k = 0; k < filteredData.length; k++) {
                if (!filteredData[k].alkohol) {
                    temp.push(filteredData[k])
                }
            }

            filteredData = temp
            temp = []
        }

        if (filterDicari.includes("non-soda")) {
            for (let k = 0; k < filteredData.length; k++) {
                if (!filteredData[k].soda) {
                    temp.push(filteredData[k])
                }
            }

            filteredData = temp
            temp = []
        }
        renderBarang(filteredData)
    }

}

function renderBarang(data) {
    let dataBarang = document.getElementById("dataBarang") //ambil div data barang

    dataBarang.innerHTML = ''

    let index = 0

    let jumlahRow = 0
    let jumlahCol = 0
    let colLastRow = 0

    //Menghitung jumlah baris dan kolom barang yg akan ditampilkan
    if (data.length > 5) {
        jumlahRow = Math.ceil(data.length / 5)
        jumlahCol = 5
        colLastRow = data.length % 5
    } else {
        jumlahRow = 1
        jumlahCol = data.length
    }

    for (let j = 1; j <= jumlahRow; j++) {
        let row = document.createElement("div") //Membuat baris baru
        row.classList.add("data1") //menambahkan kelas untuk div (supaya ada cssnya)

        if (j === jumlahRow && colLastRow !== 0) {
            jumlahCol = colLastRow

        }

        for (let i = 1; i <= jumlahCol; i++) {
           
            //bikin div baru dengan kelas carddara
            let card = document.createElement("div")
            card.classList.add("carddata")

            //bikin image produk
            let img = document.createElement('img')
            img.src = data[index].image
            img.width = "100"
            img.height = "150"
            img.style.objectFit = "cover"
            card.appendChild(img)

            //bikin nama produk
            let nama = document.createElement('p')
            nama.innerHTML = `<b>${data[index].nama}</b>`
            card.appendChild(nama)

            //bikin harga produk
            let harga = document.createElement('p')
            harga.innerHTML = `Rp.${data[index].harga.toLocaleString()},-`
            card.appendChild(harga)

            //bikin stock
            let stock = document.createElement('p')
            stock.innerHTML = `Stock: ${data[index].stock}`
            if(data[index].stock<5){
                stock.style.color = 'red'
            }else{
                stock.style.color = 'darkgreen'
            }
            card.appendChild(stock)

            //bikin tombol beli
            let beli = document.createElement('button')
            beli.innerHTML = "Beli"
            beli.classList.add("button")
            let idBarang = data[index].id
            beli.onclick = function(){
                for (let j = 0; j < barang.length; j++) {
        
                    if (idBarang === barang[j].id && barang[j].stock > 0) {
                        
                        cart.push({
                            id: barang[j].id,
                            Nama: barang[j].nama,
                            Harga: barang[j].harga,
                            
                        })

                        barang[j].stock--


                        console.log(barang)

                        tampilkanProduk()

                        alert("Barang berhasil ditambahkan ke cart");
                    }else if(idBarang === barang[j].id && barang[j].stock === 0){
                        alert("Maaf Stock Habis :(");
                    }
                }

                
            }
            
            card.appendChild(beli)

            //masukkan card ke row
            row.appendChild(card)

            index++
        }

        dataBarang.appendChild(row)

    }
}


//Fungsi Search dan Filter

let checked = []
let stringSearch = ''

function cariProduk() {
    //Mengambil value searchbar
    let searchInput = document.getElementById("searchbar")
    stringSearch = searchInput.value

    tampilkanProduk(stringSearch, checked)
}

function filterProduk() {
    checked = []

    //Mengambil nilai checkbox
    let checkbox = document.getElementsByClassName('filterValue')

    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            checked.push(checkbox[i].value)
        }
    }

    tampilkanProduk(stringSearch, checked)
}

//Initial Render

tampilkanProduk()


//Function untuk pindah halaman + passing data
function bukaHalamanCart(){
    localStorage.cart = JSON.stringify(cart);
    localStorage.barang = JSON.stringify(barang);
}

