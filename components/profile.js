export const user = {
    props: {
        'profileBanner' : String,
        'profileIcon' : String
    },
    data() {
        return {
            drinks: [
                {
                    img: "https://www.petitefleursg.com//image/cache/catalog/271376_pizzolato_ros_extra_dry_m-use_nv_pp-700x700.jpg",
                    name: "Pizzolato Rosé Extra Dry",
                    type: "wine",
                    rating: 3
                },
                {
                    img: "https://cdn.loveandlemons.com/wp-content/uploads/2020/07/mojito.jpg",
                    name: "Mojito",
                    type: "cocktail",
                    rating: 4
                },
                {
                    img: "https://www.peakales.co.uk/cdn/shop/products/PA_Beer_Bottle_IPA_Front.jpg?v=1633509043",
                    name: "IPA",
                    type: "beer",
                    rating: 5
                },
                {
                    img: "https://hips.hearstapps.com/hmg-prod/images/sangria-index-643044ca71f12.jpg?crop=0.502xw:1.00xh;0.210xw,0&resize=1200:*",
                    name: "Sangria",
                    type: "cocktail",
                    rating: 4
                },
                {
                    img: "https://www.foodandwine.com/thmb/RdbOj6gOlRyV4cpvmmUK7bI0TP4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Wine-Guide-Cabernet-Sauvignon-FT-BLOG0622-2000-6b414113ef0449178e4ee5bf69ceeb5c.jpg",
                    name: "Cabernet Sauvignon",
                    type: "wine",
                    rating: 4
                },
                {
                    img: "https://www.petitefleursg.com//image/cache/catalog/271376_pizzolato_ros_extra_dry_m-use_nv_pp-700x700.jpg",
                    name: "Piña Colada",
                    type: "cocktail",
                    rating: 4
                },
                {
                    img: "https://www.petitefleursg.com//image/cache/catalog/271376_pizzolato_ros_extra_dry_m-use_nv_pp-700x700.jpg",
                    name: "Stout",
                    type: "beer",
                    rating: 4
                },
                {
                    img: "https://www.petitefleursg.com//image/cache/catalog/271376_pizzolato_ros_extra_dry_m-use_nv_pp-700x700.jpg",
                    name: "Margarita",
                    type: "cocktail",
                    rating: 4
                },
            ]
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
                        <li class="nav-item">
                        <a class="nav-link link-fancy" href="#tracking">Tracking</a>
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
                <table>
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">Name of Drink</th>
                        <th scope="col" class="text-center">Rating</th>
                        <th scope="col">Type of Drink</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="drink in drinks">
                        <td></td>
                        <td>{{ drink.name }}</td>
                        <td v-if="drink.rating" class="text-center"><span class="bi bi-star-fill d-inline-block" style="vertical-align:2px; font-size:12px"></span> {{ drink.rating }}</td>
                        <td>{{ drink.type }}</td>
                        <td>{{ drink.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="container rounded-3 background3 p-4 shadow-sm mb-4" id="tracking">
                
            </div>
        </div>
    `
}