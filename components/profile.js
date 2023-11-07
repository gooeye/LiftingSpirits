
import modal from "/components/modal.js"
import { getDrinksInList, addDrinkToList } from "/js/users.js"
import { email } from "/js/check_login.js"
// import tracking from "/components/tracker.js"
export const user = {
    components: {
        'modal': modal,
        // 'tracking': tracking
    },
    props: {
        'profileBanner': String,
        'profileIcon': String
    },
    data() {
        return {
            selected: [],
            showModal: false,
            showEditModal: false,
            totalCalories: 0,
            items: [
                { name: "Beer, 4%", calories: 180, count: 0, path: "Pint" },
                { name: "Beer, 5%", calories: 142.5, count: 0, path: "Beer" },
                { name: "Cider, 4.5%", calories: 204.5, count: 0, path: "Cider" },
                { name: "Wine, 13%", calories: 149.75, count: 0, path: "Wine" },
                { name: "Champagne, 12%", calories: 132, count: 0, path: "Champagne" },
                { name: "Spirits, 40%", calories: 56, count: 0, path: "Spirits" },
                { name: "Alcopops, 4%", calories: 110, count: 0, path: "Alcopops" }
            ],
            editSelDef: null,
            editDrink: null,
            editSelected: null,
            rateDrink: null,
            drinks: []
        }
    },
    methods: {
        select() {
            this.selected = document.querySelectorAll('.drinkSel:checked')
        },
        selectAll() {
            let allChecks = document.querySelectorAll('.drinkSel')
            for (let check of allChecks) check.checked = true
        },
        deselectAll() {
            let allChecks = document.querySelectorAll('.drinkSel')
            for (let check of allChecks) check.checked = false
        },
        onItemClick(item) {
            item.count++;
            this.totalCalories += item.calories;
        },
        async getData() {
            this.drinks = await getDrinksInList(email)
            console.log(this.drinks, "hi")
        },
        openEditModal(drink, status) {
            this.showEditModal = true
            this.editSelDef = status
            this.editDrink = drink
        },
        async updateDrink(drink, status) {
            console.log(drink, "status")
            await addDrinkToList(email, status, drink, null)
            for (let d of this.drinks) {
                if (d.name == drink) {
                    d.status = status
                }
            }
            this.showEditModal = false
        },
        openModal (drink) {
            this.showModal = true
            this.rateDrink = drink
        },
        async updateRating(drink, rating) {
            await addDrinkToList(email, 1, drink, rating)
            this.showModal = false
            for (let d of this.drinks) {
                if (d.name == drink) {
                    d.rating = rating
                }
            }
        }
    },
    mounted() {
        this.getData()
    },
    computed: {
        drinksSelected() {
            return this.selected.length
        }
    },
    template: `
        <div :style="{height: '200px', backgroundImage: 'url(' + profileBanner + ')',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}" class="position-relative">
            <div class="position-absolute bottom-0 left p-3 ps-5 w-100 d-flex align-items-center">
                <div :style="{height: '100px', width: '100px', backgroundImage: 'url(' + profileIcon + ')',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}" class="rounded-circle border border-2 d-inline-block"></div>
                <div class="d-inline-block flex-column justify-center ms-3">
                    <h1 class="d-block fs-4 text-capitalize">{{ $route.params.id }}</h1>
                    <button class="btn btn-secondary d-block">{{1 ? "Edit" : "2"}}</button>
                </div>
            </div>
        </div>
        <div class="container sticky-top background2">
            <nav class="navbar navbar-expand">
                <div class="container-fluid justify-content-center">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link active link-fancy" aria-current="page" href="#activity">Activity</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link link-fancy" href="#list">List</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="container px-5">
            <div class="container rounded-3 background3 p-4 shadow-sm mb-4" id="activity">
                Activity Placeholder
            </div>
            <div class="container rounded-3 background3 p-4 shadow-sm mb-4" id="list">
                <h2 class="fs-4 mb-4">Your Drinks List</h2>
                <div v-if="drinksSelected" class="drink-alert rounded container form-group" style="height:50px">
                <div class="row ">
                    <div class="col-10 align-items-center d-flex">
                        <span class="me-4">{{ drinksSelected }} drink(s) selected</span>
                        <a @click="selectAll" style="cursor:pointer">Select All</a>
                        <span> · </span>
                        <a @click="deselectAll" style="cursor:pointer">Select None</a>
                    </div>
                    <div class="col-2"><button class=" btn btn-primary bg-orange float-end">Move To</button></div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">Name of Drink</th>
                        <th scope="col" class="text-center" style="width:10%">Rating</th>
                        <th scope="col" class="text-center" style="width:15%">Type of Drink</th>
                        <th scope="col" class="text-center" style="width:15%">Status</th>
                        <th scope="col" class="text-center" style="width:8%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="drink in drinks">
                        <td class="text-center"><input type="checkbox" class="check-fancy drinkSel mx-auto" @click="select"/></td>
                        <td><img :src="drink.img" height="50" width="45" style="object-fit:cover" class="rounded me-3"/>{{ drink.name }}</td>
                        <td v-if="drink.rating" class="text-center"><span class="bi bi-star-fill d-inline-block" style="vertical-align:2px; font-size:12px"></span> {{ drink.rating }}</td>
                        <td v-if="!drink.rating" class="text-center">
                            <span v-if="drink.status != 1" >-</span>
                            <button v-if="drink.status == 1" class="rounded-circle mx-auto button-fancy-circle" style="" @click="openModal(drink.name) = true"></button>
                            
                        </td>
                        <td class="text-center">
                            {{ drink.type }}
                        </td>
                        <td class="text-center">
                            {{ drink.status == 1 ? "Tasted" : drink.status == 0 ? "Want to try" : "Won't try" }}
                        </td>
                        <td class="text-center">
                            <button class="btn btn-secondary " @click="openEditModal(drink.name)">edit</button>
                            
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <modal :show="showModal" @close="showModal = false">
                <template #header>
                    <h3>Rate this drink</h3>
                </template>
                <template #body>
                    <span class="rating-parent">
                    <span class="star-parent" v-for="i in 5">
                    <input class="check-rating-fancy" type="checkbox" @click="updateRating(rateDrink, i)"/>
                    </span>
                    </span>
                </template>
                <template #footer>
                <span></span>
                </template>
                </modal>
            </teleport>
            <teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <modal :show="showEditModal" @close="showEditModal = false">
                <template #header>
                    <h3>Update status</h3>
                </template>
                <template #body>
                    <select id="newStatus" v-model="editSelected">
                        <option value="2" :selected="editSelDef == 2 ? true : null">Won't Try</option>
                        <option value="0" :selected="editSelDef == 0 ? true : null">Want to Try</option>
                        <option value="1" :selected="editSelDef == 1 ? true : null">Tried</option>
                        <option value="3">Remove from list</option>
                    </select>
                </template>
                <template #footer>
                    <button @click="updateDrink(editDrink, editSelected)" class="btn btn-primary justify-content-centre mt-2 mr-2" >Update</button>
                </template>
                </modal>
            </teleport>
            <div class="container rounded-3 background3 p-4 shadow-sm mb-4" id="tracking">
            <div class="min-vh-100 d-flex flex-column">
                <div class="container-fluid">
                    <div class="row">
                        <div class="container col-md-9">
                            <div class="text-center mb-4">
                                <h1 class="display-4">Unit and Calorie Tracking</h1>
                                <p class="subText">You are advised to drink less than 14 units a week</p>
                            </div>
                            <div class="row row-cols-md-2 row-cols-sm-1 gx-3 gy-3">
                                <!-- Your existing HTML content for drink items goes here -->
                                <div v-for="(item, index) in items" class="col-md-4">
                                    <div :key="index" class="itemContainer h-100" @click="onItemClick(item)">
                                        <div class="col">
                                            <img :src="'../components/img/' + item.path + '.png'" :alt="item.name + '.png'" class="mb-2">
                                            <h3>{{ item.name }}</h3>
                                            <p>{{ item.calories }} calories</p>
                                            <span class="click-count">{{ item.count }}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- ... -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="total-calories text-center">
                                <h2 class="mb-3">Total Calories: <span class="text-danger">{{ totalCalories.toFixed(2) }}</span></h2>
                            </div>
                            <!-- Equivalent Comparison -->
                            <div class="equivalent-section text-center">
                                <h2 class="mb-4">Equivalent Comparison</h2>
                                
                                <div class="equivalent-item">
                                    <div class="text-light">Number of Cheeseburgers:</div>
                                    <div class="font-weight-bold">{{ (totalCalories / 250).toFixed(2) }}</div>
                                </div>
                                <div class="equivalent-item">
                                    <div class="text-light">Minutes of Running:</div>
                                    <div class="font-weight-bold">{{ (totalCalories / 10).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `,
};

