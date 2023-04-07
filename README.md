# Bookmarkey GUI

Bookmarkey is a convenient bookmarking app that lets you save web pages and add RSS feeds. It is an open-source project built using SvelteKit and leveraging Pocketbase as its backend. Its modern interface is easy to use and allows you to organize bookmarks.

You can save articles for offline reading or share them with others. Bookmarkey simplifies your web browsing experience and keeps you organized.

## Production

You can visit the site at: https://bookmarkey.app

## Run Locally

Install [`go-task`](https://taskfile.dev/installation/),

To setup the project locally you can do:

```bash
git@gitlab.com:bookmarkey/gui.git
cd gui
pnpm install

# starts docker with backend server and frontend gui
task start
```

## Related

Here are some related projects:

- [Bookmarkey API](https://gitlab.com/bookmarkey/api)

## Appendix

- This project is tested with [BrowserStack](https://www.browserstack.com/)
