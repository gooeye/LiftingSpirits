export default {
    props: {
        'page': String,
        'isLoggedIn': Boolean
    },
    template: `
   
        <div id="app" class="min-vh-100 d-flex flex-column background2">
            <vertical-navbar :page="page" :is-logged-in="isLoggedIn"></vertical-navbar>
            <div class="container col-10 flex-grow-1 p-2 ps-0">
                <div class="text-center mb-4">
                    <h1 class="display-4">Unit and Calorie Tracking</h1>
                    <p class="subText text-muted">You are advised to drink less than 14 units a week</p>
                </div>
                <div class="row row-cols-md-2 row-cols-sm-1">
                    <div class="col justify-content-center">
                        <div class="calorieTable">
                            <div class="container">
                                <div class="row justify-content-center row-cols-md-2 row-cols-sm-1">
                                    <!-- Your existing HTML content for drink items goes here -->
                                    <div v-for="(item, index) in items" :key="index" class="col-md-4 itemContainer" @click="onItemClick(item)">
                                        <div class="col">
                                            <img :src="'../components/img/' + item.path + '.png'" :alt="item.name + '.png'" class="mb-2">
                                            <h3>{{ item.name }}</h3>
                                            <p>{{ item.calories }} calories</p>
                                            <span class="click-count">{{ item.count }}</span>
                                        </div>
                                    </div>
                                    <!-- ... -->

                                    <!-- Total Calories Display -->
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
                    <!-- ... -->
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            totalCalories: 0,
            items: [
                { name: "Beer, 4%", calories: 180, count: 0, path: "Pint" },
                { name: "Beer, 5%", calories: 142.5, count: 0, path: "Beer" },
                { name: "Cider, 4.5%", calories: 204.5, count: 0, path: "Cider" },
                { name: "Wine, 13%", calories: 149.75, count: 0, path: "Wine" },
                { name: "Champagne, 12%", calories: 132, count: 0, path: "Champagne" },
                { name: "Spirits, 40%", calories: 56, count: 0, path: "Spirits" },
                { name: "Alcopops, 4%", calories: 110, count: 0, path: "Alcopops" }
            ]
        };
    },
    methods: {
        onItemClick(item) {
            item.count++;
            this.totalCalories += item.calories;
        }
    },
    style: `
        .itemContainer {
            cursor: pointer;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin: 10px;
            transition: all 0.3s;
        }

        .itemContainer:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            transform: scale(1.02);
            background-color: #aaffaa;
        }

        .itemContainer h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }

        .itemContainer p {
            font-size: 1rem;
            color: #6c757d;
        }

        .itemContainer img {
            width: 50px;
            height: 50px;
            object-fit: contain;
            border-radius: 50%;
            margin-bottom: 10px;
        }

        .total-calories {
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 20px;
        }

        .equivalent-section {
            margin-top: 40px;
        }

        .equivalent-section h2 {
            font-size: 24px;
            margin-bottom: 20px;
        }

        .equivalent-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }

        .equivalent-item span {
            font-weight: bold;
        }
        `
};
