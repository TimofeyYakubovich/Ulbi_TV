import {makeAutoObservable} from "mobx"

export default class DeviceStore {
    constructor() {
        // поа не делаем запросы к серверу в массивы вручную помещаем нужные объекты с данными такими же как на бекенде
        this._types = []
        // this._types = [
        //     {id: 1, name: 'Холодильники'},
        //     {id: 2, name: 'Смартфоны'},
        //     {id: 3, name: 'Ноутбуки'},
        //     {id: 4, name: 'Телевизоры'}
        // ]
        this._brands = []
        // this._brands = [	
        //     {id: 1, name: "Samsung"},
        //     {id: 2, name: "Apple"},
        //     {id: 3, name: "Lenovo"},
        //     {id: 4, name: "Asus"},
        // ]
        this._devices = []
        // this._devices = [								
        //     {id: 1, name: "Iphone 12 pro", price: 25000, rating: 5,	img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
        //     {id: 2, name: "Iphone 12 pro", price: 25000, rating: 5,	img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
        //     {id: 3, name: "Iphone 12 pro", price: 25000, rating: 5,	img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
        //     {id: 4, name: "Iphone 12 pro", price: 25000, rating: 5,	img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
        //     {id: 5, name: "Iphone 12 pro", price: 25000, rating: 5,	img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
        //     {id: 6, name: "Iphone 12 pro", price: 25000, rating: 5,	img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
        //     {id: 7, name: "Iphone 12 pro", price: 25000, rating: 5,	img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'}
        // ]
        // при нажатии на какой то тип надо будет его выделять и где то хранить его
        this._selectedType = {}
        this._selectedBrand = {}

        this._page = 1 // текущая страница поумолчанию 1
        this._totalCount = 0 // общее количество товаров каторое доступно по данному запросу
        this._limit = 3 // количество товаров на одной сранице поумолчанию 3

        makeAutoObservable(this) 
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1) // что бы при смене бренда или типа сраница становилась первой
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }


    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}