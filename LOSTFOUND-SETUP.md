# Campus Lost & Found – React conversion

## Run it
```bash
composer install
npm install
cp .env.example .env        # skip if you already have one
php artisan key:generate
touch database/database.sqlite   # only if you use sqlite
php artisan migrate:fresh --seed # creates the tables + 9 sample items + test@example.com / password
npm run dev                      # and in another terminal: php artisan serve
```

## Where each HTML file went
| HTML | React (resources/js) | Route |
|---|---|---|
| landing.html | Pages/Landing/page.jsx (+ `_sections/`) | `/` |
| login.html | Pages/Auth/Login.jsx | `/login` |
| signup.html | Pages/Auth/Register.jsx | `/register` |
| dashboard.html | Pages/Dashboard/page.jsx → Components/Campus/OverviewView.jsx | `/dashboard` |
| products.html | Pages/Products/page.jsx → Components/Campus/ProductsView.jsx | `/products` (also inside the dashboard sidebar → "Product Management") |

Dashboard and Products are the same component (`Components/Campus/CampusApp.jsx`).

## How Dashboard and Products stay in sync
* `Hooks/useItems.js` is the only place that talks to the server (GET/POST/PUT/DELETE `/items`).
* `CampusApp` calls it once and gives the same `items` to the Overview, the Product table, the sidebar badge and the stat tiles – so add / edit / delete updates all of them instantly.
* Every request is saved in the `products` table (all 7 columns: name, icon, category, color, status, date, location).
* The list re-loads when the tab regains focus and every 15 s, so a second browser tab / user also stays in sync.
* The landing page "Global Item Directory" reads the same table.

## Backend changes
* `database/migrations/…recreate_products_table_for_lost_found.php` – table with the 7 columns (replaces the old product/price demo table).
* `database/migrations/…add_student_id_to_users_table.php` – the signup "Student ID".
* `app/Models/Products.php` ($fillable + date cast), `Store/UpdateProductsRequest.php` (validation for all 7 inputs).
* `routes/web.php` – `/items` CRUD behind `auth` (session + CSRF). The old unauthenticated `/api/products` route was removed from `routes/api.php`.
* `database/seeders/ProductsSeeder.php` – the 9 sample items from products.html.
* Tests: `tests/Feature/ProductsCrudTest.php` (run `php artisan test`).

## Heads-up
`resources/js/Pages/Example/*` (the IT help-desk demo) has unresolved git merge-conflict markers
(`<<<<<<< HEAD` in HeroSection.jsx and `>>>>>>>` in FormSection.jsx). It is not used any more and is excluded
from the Vite page glob in `app.jsx` so `npm run build` works. Fix or delete it when you like.
