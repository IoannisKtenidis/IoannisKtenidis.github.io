# Ioannis Ktenidis - Personal Portfolio Website

A fast, responsive, and modern personal website & GitHub profile portfolio built with **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript**. Designed with a sleek left vertical sidebar navigation inspired by academic and research profiles, with real-time GitHub repository and profile stats integration.

## 🚀 Features

- **Left-Sidebar Navigation (Desktop):** Profile avatar, status badge, quick links with icons (Home, About, Experience, Projects & GitHub, Education, Skills, Contact), and social links.
- **Responsive Mobile Drawer:** Smooth slide-out mobile menu for phones and tablets.
- **ScrollSpy with IntersectionObserver:** Automatically highlights the active section in the sidebar as you scroll.
- **Live GitHub API Integration:** Fetches repository stars, forks, and repository count dynamically from `https://api.github.com/users/IoannisKtenidis/repos`.
- **Project Filtering:** Interactive category filters (`All`, `AI & MLOps`, `Cybersecurity & IoT`, `Web & Tools`).
- **Curated Sections from CV:**
  - **About:** Summary, career focus, technical interests, and quick contact details.
  - **Experience:** Timeline for Public Power Corporation S.A. (SECASSURED), Ithaca Lab UOWM (AI4CYBER, ASKOS, TORNADO), Freelance Web Development, and Madit Advertising.
  - **Education:** MSc in AI (European University of Cyprus), BSc in Applied Informatics (University of Macedonia), Financial Services Seminar (NKUA).
  - **Skills:** Grouped cards for Back-End, AI/ML, Databases, DevOps/CI/CD, Web Technologies, and Certifications.
  - **Contact:** One-click email button, phone, LinkedIn, and GitHub.

---

## 💻 How to Preview Locally

You can open `index.html` directly in any web browser (Chrome, Edge, Firefox), or run a lightweight local server:

### Using Python:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## 🌐 How to Deploy to GitHub Pages (Free)

### Step 1: Create a Repository on GitHub
1. Log in to [GitHub](https://github.com/).
2. Create a new public repository named:
   ```text
   IoannisKtenidis.github.io
   ```
   *(Note: Using `<your-username>.github.io` makes it your primary personal site URL).*

### Step 2: Initialize Git and Push

Open PowerShell or terminal inside this `IoannisKtenidis.github.io` folder:

```bash
git init
git add .
git commit -m "Initial commit: Ioannis Ktenidis portfolio website"
git branch -M main
git remote add origin https://github.com/IoannisKtenidis/IoannisKtenidis.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/IoannisKtenidis/IoannisKtenidis.github.io`.
2. Click **Settings** -> **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Within 1-2 minutes, your website will be live at:
   ```text
   https://ioannisktenidis.github.io/
   ```
