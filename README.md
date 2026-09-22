# Landing Page + Google Sheets Lead Capture

This starter project lets you build a Swipe Pages-style landing page using:

- HTML
- CSS
- JavaScript
- Git Bash
- GitHub / GitHub Pages
- Google Sheets
- Google Apps Script

## 1. Create the local project with Git Bash

Open Git Bash in the project folder and run:

```bash
git init
git add .
git commit -m "Initial landing page"
```

To preview locally:

### Option A: VS Code Live Server
Open `index.html` with the Live Server extension.

### Option B: Python local server
If Python is installed:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## 2. Create your Google Sheet

Create a blank Google Sheet, for example:

`Doctyn Landing Page Leads`

You do not need to manually create the columns. The Apps Script creates them automatically.

## 3. Add the Google Apps Script

Inside the Google Sheet:

1. Extensions
2. Apps Script
3. Delete the default code
4. Copy the contents of `apps-script/Code.gs`
5. Save

## 4. Deploy the Apps Script

In Apps Script:

1. Click **Deploy**
2. Click **New deployment**
3. Type: **Web app**
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Click **Deploy**
7. Authorize access
8. Copy the Web App URL

It will look similar to:

```text
https://script.google.com/macros/s/XXXXXXXXXXXX/exec
```

## 5. Connect the landing page

Open `config.js` and replace:

```js
window.APP_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

with your actual Apps Script URL.

## 6. Test a lead

Submit the form.

Your Google Sheet should create a `Leads` tab and add the enquiry.

## 7. Test UTM tracking

Open the page with a URL such as:

```text
http://localhost:5500/?utm_source=facebook&utm_medium=paid_social&utm_campaign=fccm_sep&utm_content=video_1
```

Submit the form and check the UTM columns in Google Sheets.

## 8. Push to GitHub using Git Bash

Create an empty GitHub repository first.

Then:

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

For later updates:

```bash
git add .
git commit -m "Update landing page"
git push
```

## 9. Publish with GitHub Pages

On GitHub:

1. Repository → Settings
2. Pages
3. Build and deployment
4. Source: Deploy from a branch
5. Branch: `main`
6. Folder: `/root`
7. Save

Your site will get a public URL.

## Recommended lead columns

The included Apps Script creates:

- Timestamp
- Full Name
- Phone
- Email
- City
- Qualification
- Course
- UTM Source
- UTM Medium
- UTM Campaign
- UTM Content
- UTM Term
- Page URL
- Client Submitted At
- Lead Status
- Counsellor
- Follow-up Date
- Notes

## Important production notes

- Add your privacy policy link before running paid ads.
- Add Meta Pixel / GA4 / Google Ads conversion tracking.
- Consider adding server-side validation or CAPTCHA if spam becomes a problem.
- Do not expose private API keys in frontend JavaScript.
- Apps Script is suitable for moderate lead volumes, but a dedicated backend is better for very high traffic.
