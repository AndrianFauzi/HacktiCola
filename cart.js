//tampilkan alert: Checkout Berhasil

function batalkanPesanan(){
    let text = "Batalkan Pesanan?";
    if (confirm(text) == true) {
        window.location.href = "market.html";
  }
}

function checkOut() {

    let inputName = document.getElementById('inputName').value
    let inputAlamat = document.getElementById('inputAlamat').value
    let inputPayment = document.getElementById('inputPayment').value
    let inputKurir = document.getElementById('inputKurir').value

    if(inputName.length>0 && inputAlamat.length>0){
        let stringData = ""

        stringData=inputName+inputAlamat+inputPayment+inputKurir
    
        let container = document.getElementById('containerForm')
    
        let containerStruk = document.createElement('div')
        containerStruk.classList.add('card')
    
        let judul = document.createElement('h2')
        judul.innerText = 'Payment Details'
        judul.style.padding = '20px'
        containerStruk.appendChild(judul)
    
        let name = document.createElement('p')
        name.classList.add('namecard')
        name.innerText = `Name: ${inputName}`
        containerStruk.appendChild(name)
    
        let alamat = document.createElement('p')
        alamat.classList.add('namecard')
        alamat.innerText = `Alamat: ${inputAlamat}`
        containerStruk.appendChild(alamat)
    
        let payment = document.createElement('p')
        payment.classList.add('namecard')
        payment.innerText = `Payment: ${inputPayment}`
        containerStruk.appendChild(payment)
    
        let deliv = document.createElement('p')
        deliv.classList.add('namecard')
        deliv.innerText = `Delivery: ${inputKurir}`
        containerStruk.appendChild(deliv)
    
        let qrCode = document.createElement('img')
        qrCode.classList.add("imgcode")
        qrCode.src = "https://chart.googleapis.com/chart?cht=qr&chl=<data>" + stringData + "&chs=300x300"
        containerStruk.appendChild(qrCode)
    
        let instruksi = document.createElement('p')
        instruksi.innerText = 'Lakukan pembayaran dengan menunjukkan QR code diatas.'
        instruksi.style.textAlign = 'center'
        instruksi.style.padding = '20px'
        containerStruk.appendChild(instruksi)
    
        container.appendChild(containerStruk)
    }else{
        alert("Lengkapi Form Terlebih Dahulu!");
    }

}

var sumCart = {totalHarga:0} //Cart yang sudah di ringkas
let InitialRender = true
var storedCart = JSON.parse(localStorage.cart);
var storedBarang = JSON.parse(localStorage.barang)
summaryCart(storedCart) 

console.log(storedBarang)

//Menampilkan isi cart di halaman cart
function tampilkanCart() {
    
    console.log(sumCart)

    let container = document.getElementById('sideBar')

    let judul = document.createElement('h3')
    judul.innerHTML = "Pesanan <hr>"
    container.appendChild(judul)
    
    for(const key in sumCart){
        
        let pembungkus = document.createElement('div')
        pembungkus.classList.add('pembungkus')

        //ambil barang
        let barang = {}

        for(let j=0;j<storedBarang.length;j++){
            if(storedBarang[j].id==key){
                barang = storedBarang[j]
                break;
            }
        }

        if(key==='totalHarga'){
            let displayHarga = document.createElement('p')
            displayHarga.setAttribute('id','totalharga')
            displayHarga.style.marginTop = '10px'
            displayHarga.style.margin = '15px'
            displayHarga.innerHTML = `Total Harga <b>Rp.${sumCart.totalHarga.toLocaleString()},-</b>`
            pembungkus.appendChild(displayHarga)

            container.appendChild(pembungkus)
        }else{
            //memasukkan image
            let displayBarang = document.createElement('div')
            displayBarang.classList.add('cardDalam')

            let img = document.createElement('img')
            img.classList.add('foto')
            img.src = barang.image
            displayBarang.appendChild(img)

            pembungkus.appendChild(displayBarang)

            //memasukkan detail barang
            let divDetail = document.createElement('div')
            divDetail.classList.add('cardDalam2')

            let nama = document.createElement('p')
            nama.innerHTML = `<b>${barang.nama}</b>`
            divDetail.appendChild(nama)

            let harga = document.createElement('p')
            harga.innerHTML = `Rp ${barang.harga.toLocaleString()}.-`
            divDetail.appendChild(harga)

            let stock = document.createElement('p')
            stock.innerHTML = `Stock: ${barang.stock}`
            if(barang.stock<5){
                stock.style.color = 'red'
            }else{
                stock.style.color = 'darkgreen'
            }
            divDetail.appendChild(stock)

            //memasukkan jumlah dan tombol +/-
            let divTombol = document.createElement('div')
            divTombol.classList.add('cardDalam3')

            let minButton = document.createElement('button')
            minButton.classList.add('left')
            minButton.style.marginRight = '10px'
            minButton.innerHTML = ' - '
            minButton.addEventListener("click", function(){
                
                for(let q=0;q<storedCart.length;q++){
                    console.log(storedCart[q].id)
                    if(storedCart[q].id===barang.id){
                        storedCart.splice(q,1)
                        barang.stock++
                        console.log(storedBarang)
                        break;
                    }
                }

                summaryCart(storedCart)
                container.innerHTML = ''
                tampilkanCart()
            })
            divTombol.appendChild(minButton)

            let jumlah = document.createElement('p')
            jumlah.innerHTML = ` ${sumCart[key]} `
            divTombol.appendChild(jumlah)

            let plusButton = document.createElement('button')
            plusButton.classList.add('right')
            plusButton.style.marginLeft = '10px'
            plusButton.innerHTML = ' + '
            plusButton.addEventListener("click", function(){
                console.log(storedBarang)
                
                for(let q=0;q<storedBarang.length;q++){
                    if(storedBarang[q].id===barang.id && storedBarang[q].stock>0){
                        let temp = {id:0, Nama:'', Harga:0}
                        temp.id = barang.id
                        temp.Nama = barang.nama
                        temp.Harga = barang.harga

                        barang.stock--

                        storedCart.push(temp)

                        console.log(storedBarang)
                        break;
                    }else if(storedBarang[q].id===barang.id && storedBarang[q].stock===0){
                        alert('Maaf, Stock Habis!')
                    }
                }

                summaryCart(storedCart)
                container.innerHTML = ''
                tampilkanCart()
            })
            divTombol.appendChild(plusButton)

            divDetail.appendChild(divTombol)

            pembungkus.appendChild(divDetail)

            container.appendChild(pembungkus)
        }

       
    }
}

function summaryCart(cart){
    sumCart={}

    for(let i=0;i<cart.length;i++){
        let item = cart[i]
        if(!sumCart[item.id]){
            sumCart[item.id]=1
        }else{
            sumCart[item.id]++
        }
    }
    
    sumCart.totalHarga=hitungTotalHarga(cart)
}

//output number totalHarga
function hitungTotalHarga(cart) {
    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {

        totalPrice += cart[i].Harga
    }

    return totalPrice
}


//Intial Render
tampilkanCart()
