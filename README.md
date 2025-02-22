# Personal Finance Visualizer

A simple and interactive web application to track and visualize your personal finances.

## 🚀 Tech Stack

- **Frontend:** Next.js 15, React, shadcn/ui, Recharts , framer-motion, react-icons
- **Backend:** Next.js Server API
- **Database:** MongoDB
- **Deployment:** Vercel

## 🌟 Features

### Stage 1: Basic Transaction Tracking
- Add/Edit/Delete transactions (amount, date, description, type , category)
- Transaction list view
- Monthly expenses bar chart
- Basic form validation

### Stage 2: Categories
- Predefined categories for transactions
- Category-wise pie chart
- Dashboard with summary cards (total income, total expenses, current month ans prev month comparision charts, category breakdown, recent transactions)

### Stage 3: Budgeting
- Set monthly category budgets
- Budget vs actual comparison chart
- Simple spending insights

## 🛠 Setup & Installation

1. **Clone the repository:**

```bash
$ git clone https://github.com/Priyank-Aggarwal1024/personal-finance-visualizer.git
$ cd personal-finance-visualizer
```

2. **Install dependencies:**

```bash
$ npm install
```

3. **Set up environment variables:**

Create a `.env.local` file and add the following:

```env
MONGO_URI=mongodb+srv://your_mongodb_uri
API_URL=http://localhost:3000/api/transactions
```

4. **Run the development server:**

```bash
$ npm run dev
```

Access the app at `http://localhost:3000`

5. **Build for production:**

```bash
$ npm run build
$ npm start
```

## 📁 Project Structure

```
.
├── app
│   ├── api
│   │   ├── savedata
│   │   │   └── route.js
│   │   └── transactions
│   │       └── route.js
│   ├── components
│   ├── pages
│   │   ├── index.js
│   │   └── transactions.js
│   └── styles
├── .env.local
├── next.config.js
├── package.json
└── README.md
```

## ✅ Production Build Output

```
▲ Next.js 15.1.7
- Environments: .env.local

Creating an optimized production build ...
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data    
✓ Generating static pages (8/8)
✓ Collecting build traces    
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    105 kB          324 kB
├ ○ /_not-found                          143 B           106 kB
├ ƒ /api/savedata                        143 B           106 kB
├ ƒ /api/transactions                    143 B           106 kB
└ ○ /transactions                        11.6 kB         226 kB
+ First Load JS shared by all            106 kB
```

## 💡 Notes

- Ensure data persists in MongoDB.
- Handle error states gracefully.

---

💻 Built with ❤️ by [Priyank Aggarwal] 

