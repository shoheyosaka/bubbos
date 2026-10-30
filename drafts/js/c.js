// 案C「余白」の動き
// スクロールで表示、ヘッダーの線、メニュー、作品の拡大表示、ことば、絵と話

const artworks = [
  "assets/art-sun.jpg",
  "assets/art-portrait.jpg",
  "assets/art-cosmos.jpg",
  "assets/art-hills.jpg",
  "assets/art-flower.jpg",
  "assets/art-trees.jpg",
  "assets/art-stars.jpg",
]

// 「もうひとつ、扉をひらく」で出てくることば（案A・最終案の doorWords と同じ）
const doorWords = [
  "迷子になるのも、ひとつの地図。",
  "ふざけることは、ほんとうは真剣だ。",
  "正しさより、おもしろさを信じてみる。",
  "空を見上げた瞬間、宇宙旅行はもう始まっている。",
  "遠回りした道ほど、景色を覚えている。",
  "失敗は、まだ名前のついていない発明。",
  "子どもの落書きに、世界の設計図がある。",
  "何もしない時間が、いちばん色を育てる。",
  "となりの人も、まだ見ぬ惑星。",
  "笑った回数だけ、地球は少し軽くなる。",
  "答えを急がない。問いのまま、遊んでおく。",
  "線をはみ出したところから、絵は生きはじめる。",
  "毎日は同じに見えて、同じ日は一度もない。",
  "心がほどけると、世界もほどける。",
]

const storyPages = [
  { title: "恋をもたらす女神花", text: "この花は、誰かを探しに行くための花ではありません。\n自分の中心に還ったとき、すでに始まっている恋に気づくための花です。", art: 0 },
  { title: "澄んだ目でみた山", text: "目が澄んだ瞬間、いつも汚れて見えていた山が、青く見えた。\n美しく愛してくれる世界は、ずっと変わっていなかった。", art: 1 },
  { title: "BUDDHA IN THE BODY", text: "幸せは分泌される。\n悟りもまた、現象として起こる。\nそれを、見ているものが在る。", art: 2 },
  { title: "After", text: "世界は、何も変わっていない。\n変わったのは、見ている位置だけだ。", art: 3 },
  { title: "グレートマザー", text: "ずっと、世界は与えていた。\n私が、受け取れていなかっただけだった。\n無限の豊かさはあなたのものです。", art: 4 },
  { title: "空から、花が降ってきた。", text: "ある日、空から、花が降ってきた。\n願いじゃなくて、祝福だった。", art: 5 },
  { title: "開合功", text: "開いたら、入ってきた。\n合わせたら、すでに満ちていた。", art: 6 },
]

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
const pad2 = (value) => String(value).padStart(2, "0")
const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])
// 文字が消えてから差し替える（動きを減らす設定ならすぐ差し替える）
const swap = (el, update) => {
  if (reducedMotion.matches) return update()
  el.classList.add("is-changing")
  window.setTimeout(() => {
    update()
    el.classList.remove("is-changing")
  }, 350)
}

const scrollLocks = new Set()
const setScrollLock = (key, locked) => {
  if (locked) scrollLocks.add(key)
  else scrollLocks.delete(key)
  document.body.style.overflow = scrollLocks.size ? "hidden" : ""
}

document.addEventListener("DOMContentLoaded", () => {
  initFade()
  initHead()
  initMenu()
  initLightbox()
  initWords()
  initStory()
})

// ---- スクロールでふわっと表示 ----
function initFade() {
  const targets = document.querySelectorAll(".fade")
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"))
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-in")
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: "0px 0px -10% 0px" },
  )
  targets.forEach((el) => observer.observe(el))
}

// ---- 少しスクロールしたら、ヘッダーの下に細い線を引く ----
function initHead() {
  const head = document.querySelector("[data-head]")
  if (!head) return
  const update = () => head.classList.toggle("is-scrolled", window.scrollY > 40)
  window.addEventListener("scroll", update, { passive: true })
  update()
}

// ---- モバイルメニュー ----
function initMenu() {
  const menu = document.querySelector("[data-menu]")
  const openButton = document.querySelector("[data-menu-open]")
  if (!menu || !openButton) return
  const setOpen = (open) => {
    menu.hidden = !open
    openButton.setAttribute("aria-expanded", String(open))
    setScrollLock("menu", open)
    if (open) menu.querySelector("[data-menu-close]").focus()
  }
  openButton.addEventListener("click", () => setOpen(true))
  menu.querySelector("[data-menu-close]").addEventListener("click", () => {
    setOpen(false)
    openButton.focus()
  })
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)))
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) setOpen(false)
  })
}

// ---- 作品の拡大表示 ----
function initLightbox() {
  const box = document.querySelector("[data-lightbox]")
  if (!box) return
  const image = box.querySelector("[data-lightbox-image]")
  const number = box.querySelector("[data-lightbox-number]")
  const closeButton = box.querySelector("[data-lightbox-close]")
  let returnFocus = null

  const close = () => {
    box.hidden = true
    setScrollLock("lightbox", false)
    returnFocus?.focus()
  }
  document.querySelectorAll("[data-art]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.art)
      returnFocus = button
      image.src = artworks[index]
      image.alt = `ブッボスの作品 ${pad2(index + 1)}`
      number.textContent = `Artwork ${pad2(index + 1)}`
      box.hidden = false
      setScrollLock("lightbox", true)
      closeButton.focus()
    })
  })
  closeButton.addEventListener("click", close)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !box.hidden) close()
  })
}

// ---- ことば：押すたびに、まだ出ていないことばをひとつ選ぶ ----
function initWords() {
  const word = document.querySelector("[data-word]")
  const button = document.querySelector("[data-word-next]")
  if (!word || !button) return
  const count = document.querySelector("[data-word-count]")
  document.querySelector("[data-word-total]").textContent = pad2(doorWords.length)

  // 読み込むたびに順番をばらばらにして、一巡するまで同じことばは出さない
  const order = doorWords.map((_, i) => i).sort(() => Math.random() - 0.5)
  let position = 0
  const show = () => {
    word.textContent = doorWords[order[position]]
    count.textContent = pad2(position + 1)
  }
  show()
  button.addEventListener("click", () => {
    position = (position + 1) % order.length
    swap(word, show)
  })
}

// ---- 絵と話 ----
function initStory() {
  const page = document.querySelector("[data-story-page]")
  if (!page) return
  const current = document.querySelector("[data-story-current]")
  document.querySelector("[data-story-total]").textContent = pad2(storyPages.length)
  let index = 0

  const render = () => {
    const story = storyPages[index]
    page.innerHTML = `
      <figure><img src="${artworks[story.art]}" alt="ブッボスの作品「${escapeHtml(story.title)}」"></figure>
      <div>
        <p class="label">Base Shop Words / ${pad2(index + 1)}</p>
        <h3>${escapeHtml(story.title)}</h3>
        <p>${escapeHtml(story.text)}</p>
      </div>`
    current.textContent = pad2(index + 1)
  }
  const go = (delta) => {
    index = (index + delta + storyPages.length) % storyPages.length
    swap(page, render)
  }
  document.querySelector("[data-story-prev]").addEventListener("click", () => go(-1))
  document.querySelector("[data-story-next]").addEventListener("click", () => go(1))
}
